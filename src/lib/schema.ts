import { sql } from './database';

// Database schema creation
export const createTables = async () => {
  try {
    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        password_hash VARCHAR(255),
        is_verified BOOLEAN DEFAULT false,
        verification_token VARCHAR(255),
        user_type VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create newsletter_signups table
    await sql`
      CREATE TABLE IF NOT EXISTS newsletter_signups (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        signup_source VARCHAR(100) DEFAULT 'website',
        is_confirmed BOOLEAN DEFAULT false,
        confirmation_token VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create investor_profiles table
    await sql`
      CREATE TABLE IF NOT EXISTS investor_profiles (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        company_name VARCHAR(255),
        investment_range_min DECIMAL(15,2),
        investment_range_max DECIMAL(15,2),
        portfolio_size INTEGER,
        investment_focus TEXT,
        accredited_investor BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create portal_sessions table for tracking access
    await sql`
      CREATE TABLE IF NOT EXISTS portal_sessions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        session_token VARCHAR(255) UNIQUE NOT NULL,
        ip_address INET,
        user_agent TEXT,
        last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create indexes for better performance
    await sql`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_signups(email)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_sessions_token ON portal_sessions(session_token)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_sessions_user ON portal_sessions(user_id)`;

    console.log('✅ Database tables created successfully');
    return true;
  } catch (error) {
    console.error('❌ Error creating database tables:', error);
    return false;
  }
};

// Database utility functions
export const dbOperations = {
  // User operations
  async createUser(userData: {
    email: string;
    firstName?: string;
    lastName?: string;
    passwordHash?: string;
    userType?: string;
  }) {
    const result = await sql`
      INSERT INTO users (email, first_name, last_name, password_hash, user_type)
      VALUES (${userData.email}, ${userData.firstName || null}, ${userData.lastName || null}, 
              ${userData.passwordHash || null}, ${userData.userType || 'user'})
      RETURNING id, email, first_name, last_name, user_type, created_at
    `;
    return result[0];
  },

  async getUserByEmail(email: string) {
    const result = await sql`
      SELECT id, email, first_name, last_name, user_type, is_verified, created_at
      FROM users 
      WHERE email = ${email}
    `;
    return result[0];
  },

  // Newsletter operations
  async addToNewsletter(newsletterData: {
    email: string;
    firstName?: string;
    lastName?: string;
    signupSource?: string;
  }) {
    const result = await sql`
      INSERT INTO newsletter_signups (email, first_name, last_name, signup_source)
      VALUES (${newsletterData.email}, ${newsletterData.firstName || null}, 
              ${newsletterData.lastName || null}, ${newsletterData.signupSource || 'website'})
      ON CONFLICT (email) DO UPDATE SET
        first_name = COALESCE(newsletter_signups.first_name, ${newsletterData.firstName}),
        last_name = COALESCE(newsletter_signups.last_name, ${newsletterData.lastName}),
        created_at = CURRENT_TIMESTAMP
      RETURNING id, email, first_name, last_name, created_at
    `;
    return result[0];
  },

  async getNewsletterSubscriber(email: string) {
    const result = await sql`
      SELECT id, email, first_name, last_name, signup_source, is_confirmed, created_at
      FROM newsletter_signups 
      WHERE email = ${email}
    `;
    return result[0];
  },

  // Analytics
  async getSignupStats() {
    const [userCount, newsletterCount] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM users`,
      sql`SELECT COUNT(*) as count FROM newsletter_signups`
    ]);
    
    return {
      totalUsers: parseInt(userCount[0].count),
      totalNewsletterSignups: parseInt(newsletterCount[0].count)
    };
  }
};
