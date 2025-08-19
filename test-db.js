#!/usr/bin/env node

// Simple test script to verify Neon DB connection and authentication functions
import { api } from './src/lib/api.js';

async function testDatabase() {
  console.log('🧪 Testing Neon Database Connection and Authentication...\n');
  
  try {
    // Test 1: Database connection and table creation
    console.log('1. Testing database connection...');
    const testUser = {
      email: 'test@grahmos.com',
      firstName: 'Test',
      lastName: 'User',
      password: 'testpassword123'
    };
    
    // Test 2: User registration
    console.log('2. Testing user registration...');
    const signupResult = await api.registerUser(testUser);
    console.log('Signup Result:', signupResult.success ? '✅ Success' : '❌ Failed');
    if (!signupResult.success) {
      console.log('   Error:', signupResult.error);
      console.log('   Details:', signupResult.details);
    }
    
    // Test 3: User login
    console.log('3. Testing user login...');
    const loginResult = await api.loginUser(testUser.email, testUser.password);
    console.log('Login Result:', loginResult.success ? '✅ Success' : '❌ Failed');
    if (!loginResult.success) {
      console.log('   Error:', loginResult.error);
      console.log('   Details:', loginResult.details);
    } else {
      console.log('   User data:', loginResult.data);
    }
    
    // Test 4: Newsletter signup
    console.log('4. Testing newsletter signup...');
    const newsletterResult = await api.subscribeToNewsletter({
      email: 'newsletter@grahmos.com',
      firstName: 'Newsletter',
      lastName: 'Test',
      signupSource: 'test'
    });
    console.log('Newsletter Result:', newsletterResult.success ? '✅ Success' : '❌ Failed');
    
    // Test 5: Database statistics
    console.log('5. Testing database statistics...');
    const statsResult = await api.getStats();
    console.log('Stats Result:', statsResult.success ? '✅ Success' : '❌ Failed');
    if (statsResult.success) {
      console.log('   Users:', statsResult.data.totalUsers);
      console.log('   Newsletter signups:', statsResult.data.totalNewsletterSignups);
    }
    
    console.log('\n🎉 Database testing completed!');
    
  } catch (error) {
    console.error('❌ Database test failed:', error);
    console.error('Stack trace:', error.stack);
  }
}

// Run the test
testDatabase().then(() => {
  console.log('\n✨ Test script finished');
  process.exit(0);
}).catch((error) => {
  console.error('\n💥 Test script crashed:', error);
  process.exit(1);
});
