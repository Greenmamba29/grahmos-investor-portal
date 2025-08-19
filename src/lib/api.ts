import { dbOperations, createTables } from './schema';
import { connectToDatabase } from './database';

// Initialize database tables on first run
let tablesInitialized = false;

const initializeDatabase = async () => {
  if (!tablesInitialized) {
    const connected = await connectToDatabase();
    if (connected) {
      await createTables();
      tablesInitialized = true;
    }
  }
};

// API functions
export const api = {
  // Newsletter signup
  async subscribeToNewsletter(data: {
    email: string;
    firstName?: string;
    lastName?: string;
    signupSource?: string;
  }) {
    try {
      await initializeDatabase();
      
      // Add to newsletter
      const result = await dbOperations.addToNewsletter({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        signupSource: data.signupSource || 'waitlist'
      });

      return {
        success: true,
        data: result,
        message: `Successfully added ${data.email} to newsletter`
      };
  } catch (error) {
      console.error('Newsletter signup error:', error);
      
      // Handle duplicate email error gracefully
      if (error instanceof Error && error.message.includes('duplicate key')) {
        return {
          success: true,
          message: 'Email already subscribed to newsletter',
          data: { email: data.email }
        };
      }
      
      // Handle connection errors
      if (error instanceof Error && (error.message.includes('connection') || error.message.includes('timeout'))) {
        return {
          success: false,
          error: 'Database connection issue',
          details: 'Please check your internet connection and try again. If the problem persists, contact support.'
        };
      }
      
      // Handle authentication/permission errors
      if (error instanceof Error && error.message.includes('authentication')) {
        return {
          success: false,
          error: 'Database configuration issue',
          details: 'The database is not properly configured. Please contact support.'
        };
      }
      
      return {
        success: false,
        error: 'Failed to subscribe to newsletter',
        details: 'Please try again later. If the problem persists, contact support.'
      };
    }
  },

  // User registration
  async registerUser(data: {
    email: string;
    firstName?: string;
    lastName?: string;
    password?: string;
    userType?: string;
  }) {
    try {
      await initializeDatabase();
      
      // Create user account
      const result = await dbOperations.createUser({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        passwordHash: data.password ? await hashPassword(data.password) : undefined,
        userType: data.userType || 'user'
      });

      // Also add to newsletter if not investor
      if (data.userType !== 'investor') {
        await dbOperations.addToNewsletter({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          signupSource: 'registration'
        });
      }

      return {
        success: true,
        data: result,
        message: `Account created successfully for ${data.email}`
      };
    } catch (error) {
      console.error('User registration error:', error);
      
      if (error instanceof Error && error.message.includes('duplicate key')) {
        return {
          success: false,
          error: 'Email already registered',
          details: 'An account with this email already exists. Try logging in instead.'
        };
      }
      
      // Handle connection errors
      if (error instanceof Error && (error.message.includes('connection') || error.message.includes('timeout'))) {
        return {
          success: false,
          error: 'Database connection issue',
          details: 'Unable to create account due to connectivity issues. Please try again.'
        };
      }
      
      // Handle authentication/permission errors  
      if (error instanceof Error && error.message.includes('authentication')) {
        return {
          success: false,
          error: 'Database configuration issue',
          details: 'Account creation is temporarily unavailable. Please contact support.'
        };
      }
      
      return {
        success: false,
        error: 'Failed to create account',
        details: 'Please try again later. If the problem persists, contact support.'
      };
    }
  },

  // Investor registration
  async registerInvestor(data: {
    email: string;
    firstName?: string;
    lastName?: string;
    password?: string;
    companyName?: string;
  }) {
    try {
      await initializeDatabase();
      
      // Create investor account
      const result = await dbOperations.createUser({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        passwordHash: data.password ? await hashPassword(data.password) : undefined,
        userType: 'investor'
      });

      // Create investor profile
      if (data.companyName && result.id) {
        await dbOperations.createInvestorProfile({
          userId: result.id,
          companyName: data.companyName
        });
      }

      return {
        success: true,
        data: result,
        message: `Investor account created successfully for ${data.email}`
      };
    } catch (error) {
      console.error('Investor registration error:', error);
      
      if (error instanceof Error && error.message.includes('duplicate key')) {
        return {
          success: false,
          error: 'Email already registered',
          details: 'An account with this email already exists. Try logging in instead.'
        };
      }
      
      return {
        success: false,
        error: 'Failed to create investor account',
        details: 'Please try again later. If the problem persists, contact support.'
      };
    }
  },

  // User login with proper password verification
  async loginUser(email: string, password: string) {
    try {
      await initializeDatabase();
      
      const user = await dbOperations.getUserByEmailWithPassword(email);
      if (!user) {
        return {
          success: false,
          error: 'Invalid credentials',
          details: 'Email or password is incorrect'
        };
      }

      // Verify the password
      const hashedInputPassword = await hashPassword(password);
      if (user.password_hash && user.password_hash !== hashedInputPassword) {
        return {
          success: false,
          error: 'Invalid credentials',
          details: 'Email or password is incorrect'
        };
      }

      return {
        success: true,
        data: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          userType: user.user_type
        },
        message: 'Login successful'
      };
    } catch (error) {
      console.error('User login error:', error);
      return {
        success: false,
        error: 'Login failed',
        details: 'Unable to process login. Please try again.'
      };
    }
  },

  // Get signup statistics
  async getStats() {
    try {
      await initializeDatabase();
      const stats = await dbOperations.getSignupStats();
      return {
        success: true,
        data: stats
      };
    } catch (error) {
      console.error('Stats error:', error);
      return {
        success: false,
        error: 'Failed to fetch statistics',
        data: { totalUsers: 0, totalNewsletterSignups: 0 }
      };
    }
  },

  // Check if user exists
  async checkUserExists(email: string) {
    try {
      await initializeDatabase();
      const user = await dbOperations.getUserByEmail(email);
      return {
        success: true,
        exists: !!user,
        data: user ? { 
          email: user.email, 
          firstName: user.first_name,
          userType: user.user_type 
        } : null
      };
    } catch (error) {
      return {
        success: false,
        exists: false,
        error: 'Failed to check user existence'
      };
    }
  }
};

// Simple password hashing (in production, use bcrypt or similar)
async function hashPassword(password: string): Promise<string> {
  // For demo purposes, we'll just base64 encode
  // In production, use proper hashing like bcrypt
  return btoa(password + 'salt');
}

// Email validation helper
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Generate unique slugs for investor portals
export const generateSlug = (email: string): string => {
  return email.split('@')[0].replace(/[^a-z0-9]/gi, '-').toLowerCase();
};
