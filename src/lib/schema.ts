import { neon } from '@neondatabase/serverless';

// Use the same database connection pattern as Netlify functions
const neonConnectionString = process.env.DATABASE_URL || 
  process.env.NEON_DATABASE_URL || 
  `postgresql://neondb_owner:npg_ENQYfp57iyKU@ep-icy-breeze-ae05c0wt-pooler.c-2.us-east-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require`;
const sql = neon(neonConnectionString);

// Database schema creation
export const createTables = async () => {
  try {
    // Create users table with role-based access
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        password_hash VARCHAR(255),
        is_verified BOOLEAN DEFAULT false,
        verification_token VARCHAR(255),
        role VARCHAR(20) NOT NULL DEFAULT 'standard',
        user_type VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    // Add role column if it doesn't exist (migration)
    await sql`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'standard'
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

    // Create investor applications table
    await sql`
      CREATE TABLE IF NOT EXISTS investor_applications (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        pitch TEXT,
        accreditation BOOLEAN DEFAULT FALSE,
        status VARCHAR(20) NOT NULL DEFAULT 'pending',
        decided_by INTEGER REFERENCES users(id),
        decided_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    // Create admin actions audit log
    await sql`
      CREATE TABLE IF NOT EXISTS admin_actions (
        id SERIAL PRIMARY KEY,
        admin_id INTEGER NOT NULL REFERENCES users(id),
        action VARCHAR(50) NOT NULL,
        target_application_id INTEGER REFERENCES investor_applications(id),
        created_at TIMESTAMPTZ DEFAULT NOW()
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
    role?: string;
    userType?: string;
  }) {
    const result = await sql`
      INSERT INTO users (email, first_name, last_name, password_hash, role, user_type)
      VALUES (${userData.email}, ${userData.firstName || null}, ${userData.lastName || null}, 
              ${userData.passwordHash || null}, ${userData.role || 'standard'}, ${userData.userType || 'user'})
      RETURNING id, email, first_name, last_name, role, user_type, created_at
    `;
    return result[0];
  },

  async getUserByEmail(email: string) {
    const result = await sql`
      SELECT id, email, first_name, last_name, role, user_type, is_verified, created_at
      FROM users 
      WHERE email = ${email}
    `;
    return result[0];
  },

  async getUserByEmailWithPassword(email: string) {
    const result = await sql`
      SELECT id, email, first_name, last_name, password_hash, role, user_type, is_verified, created_at
      FROM users 
      WHERE email = ${email}
    `;
    return result[0];
  },

  async updateUserRole(userId: number, role: string) {
    const result = await sql`
      UPDATE users SET role = ${role}, updated_at = NOW()
      WHERE id = ${userId}
      RETURNING id, email, role
    `;
    return result[0];
  },

  // Investor operations
  async createInvestorProfile(profileData: {
    userId: number;
    companyName?: string;
    investmentRangeMin?: number;
    investmentRangeMax?: number;
    portfolioSize?: number;
    investmentFocus?: string;
    accreditedInvestor?: boolean;
  }) {
    const result = await sql`
      INSERT INTO investor_profiles (
        user_id, company_name, investment_range_min, investment_range_max,
        portfolio_size, investment_focus, accredited_investor
      )
      VALUES (
        ${profileData.userId}, ${profileData.companyName || null},
        ${profileData.investmentRangeMin || null}, ${profileData.investmentRangeMax || null},
        ${profileData.portfolioSize || null}, ${profileData.investmentFocus || null},
        ${profileData.accreditedInvestor || false}
      )
      RETURNING id, user_id, company_name, created_at
    `;
    return result[0];
  },

  // Investor application operations
  async createInvestorApplication(applicationData: {
    userId: number;
    pitch?: string;
    accreditation?: boolean;
  }) {
    const result = await sql`
      INSERT INTO investor_applications (user_id, pitch, accreditation)
      VALUES (${applicationData.userId}, ${applicationData.pitch || null}, ${applicationData.accreditation || false})
      ON CONFLICT (user_id) DO UPDATE SET
        pitch = EXCLUDED.pitch,
        accreditation = EXCLUDED.accreditation,
        status = 'pending',
        created_at = NOW()
      RETURNING id, user_id, status, created_at
    `;
    return result[0];
  },

  async getInvestorApplications() {
    const result = await sql`
      SELECT ia.id, u.email, u.first_name, u.last_name, ia.status, ia.pitch, ia.accreditation, ia.created_at
      FROM investor_applications ia 
      JOIN users u ON u.id = ia.user_id
      ORDER BY ia.created_at DESC
    `;
    return result;
  },

  async updateInvestorApplicationStatus(applicationId: number, status: string, adminId: number) {
    const result = await sql`
      UPDATE investor_applications
      SET status = ${status}, decided_by = ${adminId}, decided_at = NOW()
      WHERE id = ${applicationId}
      RETURNING user_id, status
    `;
    return result[0];
  },

  // Admin operations
  async logAdminAction(actionData: {
    adminId: number;
    action: string;
    targetApplicationId?: number;
  }) {
    const result = await sql`
      INSERT INTO admin_actions (admin_id, action, target_application_id)
      VALUES (${actionData.adminId}, ${actionData.action}, ${actionData.targetApplicationId || null})
      RETURNING id, created_at
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
