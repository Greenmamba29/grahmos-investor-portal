#!/usr/bin/env node
/**
 * Setup Test Accounts in Neon Database
 * Creates test accounts for authentication testing
 */

import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import * as bcrypt from 'bcryptjs';

// Test account configuration
const TEST_ACCOUNTS = [
  {
    email: 'admin@grahmos.info',
    password: 'TestAdmin123!',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    userType: 'admin'
  },
  {
    email: 'investor@test.com',
    password: 'TestInvestor123!',
    firstName: 'Investor',
    lastName: 'Test',
    role: 'investor',
    userType: 'investor'
  },
  {
    email: 'standard@test.com',
    password: 'TestStandard123!',
    firstName: 'Standard',
    lastName: 'User',
    role: 'standard',
    userType: 'user'
  }
];

async function setupTestAccounts() {
  console.log('\n🚀 Setting up test accounts in Neon Database...\n');

  try {
    // Connect to database
    const connectionString = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL or NEON_DATABASE_URL not found');
    }

    const sql = neon(connectionString);

    // Test connection
    const dbCheck = await sql`SELECT NOW() as time`;
    console.log('✅ Database connected:', dbCheck[0].time);

    // Create test accounts
    for (const account of TEST_ACCOUNTS) {
      try {
        // Check if account exists
        const existing = await sql`
          SELECT id, email, role FROM users WHERE email = ${account.email}
        `;

        if (existing.length > 0) {
          console.log(`⚠️  Account exists: ${account.email} (${existing[0].role})`);
          
          // Update password for existing account
          const passwordHash = await bcrypt.hash(account.password, 12);
          await sql`
            UPDATE users 
            SET password_hash = ${passwordHash},
                role = ${account.role},
                user_type = ${account.userType},
                is_verified = true
            WHERE email = ${account.email}
          `;
          console.log(`   ✓ Updated credentials and role\n`);
          continue;
        }

        // Create new account
        const passwordHash = await bcrypt.hash(account.password, 12);
        await sql`
          INSERT INTO users (email, first_name, last_name, password_hash, role, user_type, is_verified)
          VALUES (
            ${account.email},
            ${account.firstName},
            ${account.lastName},
            ${passwordHash},
            ${account.role},
            ${account.userType},
            true
          )
        `;

        console.log(`✅ Created: ${account.email} (${account.role})\n`);
      } catch (error) {
        console.error(`❌ Failed to process ${account.email}:`, error);
      }
    }

    // Display credentials
    console.log('\n' + '='.repeat(60));
    console.log('🔑 TEST ACCOUNT CREDENTIALS');
    console.log('='.repeat(60));
    TEST_ACCOUNTS.forEach(account => {
      console.log(`\n📧 Email: ${account.email}`);
      console.log(`🔐 Password: ${account.password}`);
      console.log(`👤 Role: ${account.role}`);
    });
    console.log('\n' + '='.repeat(60));
    
    console.log('\n✨ Test accounts ready!');
    console.log('\n📝 Next steps:');
    console.log('   1. Start the dev server: npm run dev');
    console.log('   2. Open http://localhost:8888/auth');
    console.log('   3. Sign in with any test account above');
    console.log('   4. Test sign out and sign back in');
    console.log('\n');

  } catch (error) {
    console.error('\n❌ Setup failed:', error);
    process.exit(1);
  }
}

setupTestAccounts();
