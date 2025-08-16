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
      
      return {
        success: false,
        error: 'Failed to subscribe to newsletter',
        details: error instanceof Error ? error.message : 'Unknown error'
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
          details: 'An account with this email already exists'
        };
      }
      
      return {
        success: false,
        error: 'Failed to create account',
        details: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  },

  // User login (basic)
  async loginUser(email: string, password: string) {
    try {
      await initializeDatabase();
      
      const user = await dbOperations.getUserByEmail(email);
      if (!user) {
        return {
          success: false,
          error: 'User not found',
          details: 'No account found with this email address'
        };
      }

      // In a real app, you'd verify the password hash here
      // For demo purposes, we'll just return the user
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
        details: error instanceof Error ? error.message : 'Unknown error'
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
