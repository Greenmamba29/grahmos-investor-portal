#!/usr/bin/env node

import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

// Database connection
const DATABASE_URL = process.env.DATABASE_URL || 
  process.env.NEON_DATABASE_URL || 
  `postgresql://neondb_owner:npg_ENQYfp57iyKU@ep-icy-breeze-ae05c0wt-pooler.c-2.us-east-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require`;

const sql = neon(DATABASE_URL);

// Demo accounts to create
const demoAccounts = [
  {
    email: 'investor@grahmos.info',
    password: 'InvestorDemo123!',
    firstName: 'Alex',
    lastName: 'Investor',
    role: 'investor',
    userType: 'investor',
    isVerified: true,
    description: 'Demo investor account with full portal access'
  },
  {
    email: 'user@grahmos.info', 
    password: 'UserDemo123!',
    firstName: 'Jordan',
    lastName: 'Standard',
    role: 'standard',
    userType: 'user',
    isVerified: true,
    description: 'Demo standard user account'
  },
  {
    email: 'admin@grahmos.info',
    password: 'AdminDemo123!',
    firstName: 'Morgan',
    lastName: 'Administrator',
    role: 'admin',
    userType: 'admin',
    isVerified: true,
    description: 'Demo super admin account with full system access'
  },
  {
    email: 'pending@grahmos.info',
    password: 'PendingDemo123!',
    firstName: 'Casey',
    lastName: 'Pending',
    role: 'standard',
    userType: 'user',
    isVerified: false,
    description: 'Demo pending user account requiring approval'
  }
];

async function createTables() {
  try {
    console.log('🔧 Creating database tables...');

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
        created_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(user_id)
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
    await sql`CREATE INDEX IF NOT EXISTS idx_users_role ON users(role)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_signups(email)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_sessions_token ON portal_sessions(session_token)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_sessions_user ON portal_sessions(user_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_applications_status ON investor_applications(status)`;

    console.log('✅ Database tables created successfully');
    return true;
  } catch (error) {
    console.error('❌ Error creating database tables:', error);
    return false;
  }
}

async function seedDemoAccounts() {
  try {
    console.log('🌱 Seeding demo accounts...');

    for (const account of demoAccounts) {
      // Check if account already exists
      const existingUser = await sql`
        SELECT id, email FROM users WHERE email = ${account.email}
      `;

      if (existingUser.length > 0) {
        console.log(`⚠️  Account ${account.email} already exists, skipping...`);
        continue;
      }

      // Hash password
      const passwordHash = await bcrypt.hash(account.password, 12);

      // Create user
      const user = await sql`
        INSERT INTO users (
          email, first_name, last_name, password_hash, 
          role, user_type, is_verified
        )
        VALUES (
          ${account.email}, ${account.firstName}, ${account.lastName}, 
          ${passwordHash}, ${account.role}, ${account.userType}, ${account.isVerified}
        )
        RETURNING id, email, role, user_type
      `;

      console.log(`✅ Created ${account.role} account: ${account.email}`);

      // Create investor profile for investor accounts
      if (account.role === 'investor') {
        await sql`
          INSERT INTO investor_profiles (
            user_id, company_name, investment_range_min, investment_range_max,
            portfolio_size, investment_focus, accredited_investor
          )
          VALUES (
            ${user[0].id}, 'Demo Investment Group', 100000, 5000000,
            25, 'Emergency Communication Systems, SaaS, B2B Technology', true
          )
        `;

        // Create an approved investor application
        await sql`
          INSERT INTO investor_applications (user_id, pitch, accreditation, status)
          VALUES (
            ${user[0].id}, 
            'Experienced investor focused on emergency communication and crisis management technologies. Portfolio includes several successful SaaS exits.',
            true, 
            'approved'
          )
        `;

        console.log(`✅ Created investor profile and application for ${account.email}`);
      }

      // Add to newsletter for demo purposes
      await sql`
        INSERT INTO newsletter_signups (email, first_name, last_name, signup_source, is_confirmed)
        VALUES (${account.email}, ${account.firstName}, ${account.lastName}, 'demo_seed', true)
        ON CONFLICT (email) DO NOTHING
      `;
    }

    console.log('✅ Demo accounts seeded successfully');
    return true;
  } catch (error) {
    console.error('❌ Error seeding demo accounts:', error);
    return false;
  }
}

async function displayDemoCredentials() {
  console.log('\n🎯 Demo Account Credentials:');
  console.log('='.repeat(50));
  
  demoAccounts.forEach(account => {
    console.log(`\n📧 ${account.email}`);
    console.log(`🔑 Password: ${account.password}`);
    console.log(`👤 Role: ${account.role} (${account.userType})`);
    console.log(`📝 ${account.description}`);
  });

  console.log('\n🌐 Test URLs:');
  console.log('• Production: https://grahmos.info/auth');
  console.log('• Local Dev: http://localhost:8888/auth');
  console.log('\n🔧 Features to Test:');
  console.log('• Login/Logout with different role accounts');
  console.log('• Investor portal access (investor@grahmos.info)');
  console.log('• Admin panel access (admin@grahmos.info)');
  console.log('• Standard user features (user@grahmos.info)');
  console.log('• Account approval workflow (pending@grahmos.info)');
}

async function main() {
  try {
    console.log('🚀 Starting database seeding process...');
    
    const tablesCreated = await createTables();
    if (!tablesCreated) {
      throw new Error('Failed to create database tables');
    }

    const accountsSeeded = await seedDemoAccounts();
    if (!accountsSeeded) {
      throw new Error('Failed to seed demo accounts');
    }

    await displayDemoCredentials();

    console.log('\n✅ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    process.exit(1);
  }
}

// Run the seeding process
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export {
  createTables,
  seedDemoAccounts,
  displayDemoCredentials
};
