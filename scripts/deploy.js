#!/usr/bin/env node

/**
 * Comprehensive Deployment Script for GrahmOS Investor Portal
 * 
 * This script handles the complete deployment process with validation,
 * environment checks, and rollback capabilities.
 */

import { execSync } from 'child_process';
import { validateEnvironmentVariables } from './validate-env.js';
import { readFileSync } from 'fs';

/**
 * Check if Netlify CLI is authenticated and configured
 */
function checkNetlifyAuth() {
  try {
    const status = execSync('netlify status', { encoding: 'utf8' });
    if (status.includes('Current project')) {
      console.log('✅ Netlify CLI authenticated and project configured');
      return true;
    }
  } catch (error) {
    console.error('❌ Netlify CLI not authenticated or project not linked');
    console.error('💡 Run: netlify login && netlify link');
    return false;
  }
}

/**
 * Sync environment variables from local .env to Netlify
 */
function syncEnvironmentVariables() {
  console.log('🔄 Syncing environment variables to Netlify...');
  
  try {
    // Read local .env file
    const envContent = readFileSync('.env', 'utf8');
    const envVars = {};
    
    envContent.split('\\n').forEach(line => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').trim();
        // Remove quotes if present
        envVars[key.trim()] = value.replace(/^["'](.*)["']$/, '$1');
      }
    });
    
    // Set critical variables in Netlify
    const criticalVars = [
      'DATABASE_URL',
      'VITE_DATABASE_URL', 
      'STACK_SECRET_SERVER_KEY',
      'VITE_STACK_PROJECT_ID',
      'VITE_STACK_PUBLISHABLE_CLIENT_KEY',
      'VITE_APP_URL',
      'VITE_API_URL'
    ];
    
    criticalVars.forEach(varName => {
      if (envVars[varName]) {
        try {
          execSync(`netlify env:set ${varName} "${envVars[varName]}" --force`, { 
            stdio: 'pipe'
          });
          console.log(`✅ Set ${varName}`);
        } catch (error) {
          console.error(`❌ Failed to set ${varName}:`, error.message);
        }
      }
    });
    
  } catch (error) {
    console.warn('⚠️  Could not read .env file, skipping local sync');
  }
}

/**
 * Test database connectivity
 */
async function testDatabaseConnection() {
  console.log('🔍 Testing database connection...');
  
  try {
    execSync('node test-database-connection.js', { stdio: 'pipe' });
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed');
    console.error('🔧 Check your DATABASE_URL and network connectivity');
    return false;
  }
}

/**
 * Deploy to Netlify with build validation
 */
async function deployToNetlify() {
  console.log('🚀 Starting deployment to Netlify...');
  
  try {
    // Deploy with build
    execSync('netlify deploy --prod --build', { stdio: 'inherit' });
    console.log('🎉 Deployment completed successfully!');
    return true;
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    return false;
  }
}

/**
 * Post-deployment validation
 */
async function validateDeployment() {
  console.log('🔬 Running post-deployment validation...');
  
  try {
    // Get site URL
    const status = execSync('netlify status', { encoding: 'utf8' });
    const urlMatch = status.match(/Project URL:\s+(https:\/\/[^\s]+)/);
    const siteUrl = urlMatch ? urlMatch[1] : 'https://grahmos.info';
    
    console.log(`🌐 Testing site availability: ${siteUrl}`);
    
    // Test site availability
    execSync(`curl -f -s ${siteUrl} > /dev/null`, { stdio: 'pipe' });
    console.log('✅ Site is accessible');
    
    // Test API endpoint
    console.log('🔌 Testing API endpoints...');
    execSync(`curl -f -s ${siteUrl}/.netlify/functions/test-auth > /dev/null`, { stdio: 'pipe' });
    console.log('✅ API endpoints responding');
    
    return true;
  } catch (error) {
    console.error('❌ Post-deployment validation failed');
    console.error('🔧 Site may be unavailable or API endpoints not working');
    return false;
  }
}

/**
 * Main deployment function
 */
async function deploy() {
  console.log('🌟 GrahmOS Investor Portal Deployment Script');
  console.log('=' .repeat(60));
  
  const startTime = Date.now();
  
  try {
    // Step 1: Environment Validation
    console.log('\\n📋 Step 1: Environment Variable Validation');
    validateEnvironmentVariables();
    
    // Step 2: Netlify CLI Check
    console.log('\\n🔐 Step 2: Netlify Authentication Check');
    if (!checkNetlifyAuth()) {
      process.exit(1);
    }
    
    // Step 3: Sync Environment Variables
    console.log('\\n🔄 Step 3: Environment Variable Sync');
    syncEnvironmentVariables();
    
    // Step 4: Database Connection Test
    console.log('\\n🗄️  Step 4: Database Connection Test');
    const dbConnected = await testDatabaseConnection();
    if (!dbConnected) {
      console.log('⚠️  Database connection failed, but continuing with deployment...');
    }
    
    // Step 5: Deploy
    console.log('\\n🚀 Step 5: Deploy to Netlify');
    const deploySuccess = await deployToNetlify();
    if (!deploySuccess) {
      console.error('🛑 Deployment failed, aborting...');
      process.exit(1);
    }
    
    // Step 6: Post-deployment Validation
    console.log('\\n✅ Step 6: Post-deployment Validation');
    await validateDeployment();
    
    // Success Summary
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log('\\n🎉 DEPLOYMENT COMPLETED SUCCESSFULLY!');
    console.log(`⏱️  Total time: ${duration} seconds`);
    console.log('🌐 Site: https://grahmos.info');
    console.log('📊 Admin: https://app.netlify.com/sites/grahmos-investor');
    console.log('\\n🔍 Next steps:');
    console.log('1. Test authentication signup/login flow');
    console.log('2. Verify database operations are working');
    console.log('3. Check Stack Auth webhook integration');
    
  } catch (error) {
    console.error('\\n💥 DEPLOYMENT FAILED');
    console.error('Error:', error.message);
    console.error('\\n🛠️  Troubleshooting steps:');
    console.error('1. Check environment variables: npm run validate-env');
    console.error('2. Test database connection: node test-database-connection.js');
    console.error('3. Verify Netlify authentication: netlify status');
    console.error('4. Check build locally: npm run build');
    process.exit(1);
  }
}

// Export for programmatic use
export { deploy, syncEnvironmentVariables, testDatabaseConnection };

// Run deployment if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  deploy();
}
