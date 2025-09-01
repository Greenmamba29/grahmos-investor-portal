#!/usr/bin/env node
// Quick test script for email functionality

async function testEmailNotification() {
  console.log('🧪 Testing email notification functionality...\n');
  
  const testUrl = process.env.NETLIFY_URL || 'http://localhost:8888';
  const endpoint = `${testUrl}/.netlify/functions/send-notification`;
  
  const testNotifications = [
    {
      type: 'welcome',
      userEmail: 'test@example.com',
      userName: 'Test User'
    },
    {
      type: 'admin_alert',
      userEmail: 'admin@grahmos.info',
      userName: 'Test Applicant',
      applicationType: 'Investor Application'
    }
  ];
  
  for (const notification of testNotifications) {
    try {
      console.log(`📧 Testing ${notification.type} email...`);
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(notification)
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        console.log(`✅ ${notification.type} email test: SUCCESS`);
        console.log(`   → Sent to: ${result.recipient}`);
      } else {
        console.log(`❌ ${notification.type} email test: FAILED`);
        console.log(`   → Error: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.log(`❌ ${notification.type} email test: FAILED`);
      console.log(`   → Error: ${error.message}`);
    }
    console.log('');
  }
}

// Run the test
testEmailNotification().catch(console.error);
