#!/usr/bin/env node
/**
 * Neon Database Authentication Test Script
 * Tests frictionless sign-in/sign-out with test accounts
 */

import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import * as bcrypt from 'bcryptjs';

// Test configuration
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

const BASE_URL = process.env.VITE_APP_URL || 'http://localhost:8888';

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message: string, color: string = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

async function testDatabaseConnection() {
  log('\n📊 Testing Neon Database Connection...', colors.cyan);
  
  try {
    const connectionString = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL or NEON_DATABASE_URL not found in environment');
    }

    const sql = neon(connectionString);
    const result = await sql`SELECT NOW() as current_time, version() as db_version`;
    
    log('✅ Database connection successful!', colors.green);
    log(`   Time: ${result[0].current_time}`, colors.reset);
    log(`   Version: ${result[0].db_version?.substring(0, 50)}...`, colors.reset);
    return sql;
  } catch (error) {
    log('❌ Database connection failed!', colors.red);
    console.error(error);
    process.exit(1);
  }
}

async function createTestAccounts(sql: any) {
  log('\n👥 Creating Test Accounts...', colors.cyan);
  
  for (const account of TEST_ACCOUNTS) {
    try {
      // Check if account already exists
      const existing = await sql`
        SELECT id, email FROM users WHERE email = ${account.email}
      `;

      if (existing.length > 0) {
        log(`⚠️  Account already exists: ${account.email}`, colors.yellow);
        continue;
      }

      // Hash password
      const passwordHash = await bcrypt.hash(account.password, 12);

      // Create user
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

      log(`✅ Created: ${account.email} (${account.role})`, colors.green);
    } catch (error) {
      log(`❌ Failed to create ${account.email}`, colors.red);
      console.error(error);
    }
  }
}

async function testSignup(account: typeof TEST_ACCOUNTS[0]) {
  log(`\n🔐 Testing Signup: ${account.email}`, colors.cyan);

  try {
    const response = await fetch(`${BASE_URL}/.netlify/functions/auth-signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: account.email,
        password: account.password,
        firstName: account.firstName,
        lastName: account.lastName,
        role: account.userType
      })
    });

    const data = await response.json();

    if (response.ok) {
      log(`✅ Signup successful for ${account.email}`, colors.green);
      return { success: true, cookies: response.headers.get('set-cookie') };
    } else {
      if (data.error === 'Email already registered') {
        log(`⚠️  Account already exists: ${account.email}`, colors.yellow);
        return { success: true, alreadyExists: true };
      }
      log(`❌ Signup failed: ${data.error}`, colors.red);
      return { success: false, error: data.error };
    }
  } catch (error) {
    log(`❌ Signup request failed: ${error}`, colors.red);
    return { success: false, error };
  }
}

async function testLogin(account: typeof TEST_ACCOUNTS[0]) {
  log(`\n🔑 Testing Login: ${account.email}`, colors.cyan);

  try {
    const response = await fetch(`${BASE_URL}/.netlify/functions/auth-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: account.email,
        password: account.password
      })
    });

    const data = await response.json();

    if (response.ok) {
      log(`✅ Login successful for ${account.email}`, colors.green);
      log(`   User ID: ${data.data.id}`, colors.reset);
      log(`   Role: ${data.data.role}`, colors.reset);
      log(`   Name: ${data.data.firstName} ${data.data.lastName}`, colors.reset);
      
      const sessionCookie = response.headers.get('set-cookie');
      return { success: true, data: data.data, sessionCookie };
    } else {
      log(`❌ Login failed: ${data.error}`, colors.red);
      return { success: false, error: data.error };
    }
  } catch (error) {
    log(`❌ Login request failed: ${error}`, colors.red);
    return { success: false, error };
  }
}

async function testSessionValidation(sessionCookie: string | null) {
  log('\n🔍 Testing Session Validation...', colors.cyan);

  try {
    const response = await fetch(`${BASE_URL}/.netlify/functions/auth-me`, {
      method: 'GET',
      headers: {
        'Cookie': sessionCookie || ''
      }
    });

    const data = await response.json();

    if (response.ok && data.success) {
      log(`✅ Session is valid`, colors.green);
      log(`   User: ${data.data.email}`, colors.reset);
      return { success: true, data: data.data };
    } else {
      log(`❌ Session validation failed`, colors.red);
      return { success: false };
    }
  } catch (error) {
    log(`❌ Session validation request failed: ${error}`, colors.red);
    return { success: false, error };
  }
}

async function testLogout(sessionCookie: string | null) {
  log('\n🚪 Testing Logout...', colors.cyan);

  try {
    const response = await fetch(`${BASE_URL}/.netlify/functions/auth-logout`, {
      method: 'POST',
      headers: {
        'Cookie': sessionCookie || ''
      }
    });

    const data = await response.json();

    if (response.ok) {
      log(`✅ Logout successful`, colors.green);
      return { success: true };
    } else {
      log(`❌ Logout failed: ${data.error}`, colors.red);
      return { success: false, error: data.error };
    }
  } catch (error) {
    log(`❌ Logout request failed: ${error}`, colors.red);
    return { success: false, error };
  }
}

async function testCompleteAuthFlow(account: typeof TEST_ACCOUNTS[0]) {
  log(`\n${'='.repeat(60)}`, colors.blue);
  log(`Testing Complete Auth Flow: ${account.email} (${account.role})`, colors.blue);
  log('='.repeat(60), colors.blue);

  // Test login
  const loginResult = await testLogin(account);
  if (!loginResult.success) {
    log(`❌ Auth flow failed at login step`, colors.red);
    return { success: false, stage: 'login' };
  }

  // Test session validation
  const sessionResult = await testSessionValidation(loginResult.sessionCookie);
  if (!sessionResult.success) {
    log(`❌ Auth flow failed at session validation`, colors.red);
    return { success: false, stage: 'session' };
  }

  // Test logout
  const logoutResult = await testLogout(loginResult.sessionCookie);
  if (!logoutResult.success) {
    log(`❌ Auth flow failed at logout`, colors.red);
    return { success: false, stage: 'logout' };
  }

  // Verify session is cleared
  const postLogoutSession = await testSessionValidation(loginResult.sessionCookie);
  if (postLogoutSession.success) {
    log(`⚠️  Warning: Session still valid after logout`, colors.yellow);
    return { success: false, stage: 'post-logout' };
  }

  log(`\n✅ Complete auth flow successful for ${account.email}!`, colors.green);
  return { success: true };
}

async function runAllTests() {
  log('\n🚀 Starting Neon Authentication Test Suite', colors.blue);
  log('=' .repeat(60), colors.blue);

  // Test database connection
  const sql = await testDatabaseConnection();

  // Create test accounts in database
  await createTestAccounts(sql);

  // Test complete auth flow for each account
  const results = [];
  for (const account of TEST_ACCOUNTS) {
    const result = await testCompleteAuthFlow(account);
    results.push({ email: account.email, ...result });
  }

  // Summary
  log('\n' + '='.repeat(60), colors.blue);
  log('📋 Test Summary', colors.blue);
  log('='.repeat(60), colors.blue);

  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  results.forEach(result => {
    const icon = result.success ? '✅' : '❌';
    const color = result.success ? colors.green : colors.red;
    const stage = result.stage ? ` (failed at: ${result.stage})` : '';
    log(`${icon} ${result.email}${stage}`, color);
  });

  log(`\nTotal: ${results.length} | Success: ${successful} | Failed: ${failed}`, colors.cyan);

  if (failed === 0) {
    log('\n🎉 All tests passed! Auth flow is frictionless.', colors.green);
  } else {
    log('\n⚠️  Some tests failed. Review the output above.', colors.yellow);
  }

  // Print test credentials
  log('\n' + '='.repeat(60), colors.blue);
  log('🔑 Test Account Credentials', colors.blue);
  log('='.repeat(60), colors.blue);
  TEST_ACCOUNTS.forEach(account => {
    log(`\nEmail: ${account.email}`, colors.cyan);
    log(`Password: ${account.password}`, colors.reset);
    log(`Role: ${account.role}`, colors.reset);
  });
}

// Run the tests
runAllTests().catch(error => {
  log('\n❌ Test suite failed with error:', colors.red);
  console.error(error);
  process.exit(1);
});
