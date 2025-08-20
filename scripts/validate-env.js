#!/usr/bin/env node

/**
 * Environment Variable Validation Script
 * 
 * This script ensures all required environment variables are properly configured
 * before deployment. It prevents the common issue of missing environment variables
 * causing authentication and database connection failures in production.
 */

import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file (if exists)
config({ path: join(__dirname, '../.env') });

// Define all required environment variables with their purposes
const REQUIRED_ENV_VARS = {
  // Database Configuration
  DATABASE_URL: {
    description: 'Primary database connection string for server-side operations',
    example: 'postgresql://user:pass@host:port/database?sslmode=require',
    critical: true,
  },
  VITE_DATABASE_URL: {
    description: 'Database connection string accessible to client-side code',
    example: 'postgresql://user:pass@host:port/database?sslmode=require',
    critical: true,
  },
  
  // Stack Auth Configuration
  VITE_STACK_PROJECT_ID: {
    description: 'Stack Auth project ID for client-side authentication',
    example: 'ada3eda8-4a4f-4b3c-8f8c-b1716adc752a',
    critical: true,
  },
  VITE_STACK_PUBLISHABLE_CLIENT_KEY: {
    description: 'Stack Auth publishable client key for frontend',
    example: 'pck_1ae430ykxyskj34n8ggkfbhvh389vp414n7d2gejt0j20',
    critical: true,
  },
  STACK_SECRET_SERVER_KEY: {
    description: 'Stack Auth secret server key for backend operations',
    example: 'ssk_fk4nrts5f6acxa478atjwfdmbba3aqa057jntm7h9ja9g',
    critical: true,
  },
  NEXT_PUBLIC_STACK_PROJECT_ID: {
    description: 'Stack Auth project ID for Next.js compatibility',
    example: 'ada3eda8-4a4f-4b3c-8f8c-b1716adc752a',
    critical: false,
  },
  NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY: {
    description: 'Stack Auth client key for Next.js compatibility',
    example: 'pck_1ae430ykxyskj34n8ggkfbhvh389vp414n7d2gejt0j20',
    critical: false,
  },
  
  // Application URLs
  VITE_APP_URL: {
    description: 'Primary application URL',
    example: 'https://grahmos.info',
    critical: true,
  },
  VITE_API_URL: {
    description: 'API base URL for serverless functions',
    example: 'https://grahmos.info/.netlify/functions',
    critical: true,
  },
};

// Additional environment-specific variables
const ENVIRONMENT_SPECIFIC_VARS = {
  development: {
    VITE_APP_URL: 'http://localhost:8888',
    VITE_API_URL: 'http://localhost:8888/.netlify/functions',
  },
  production: {
    VITE_APP_URL: 'https://grahmos.info',
    VITE_API_URL: 'https://grahmos.info/.netlify/functions',
  }
};

/**
 * Get current environment (development, production, etc.)
 */
function getCurrentEnvironment() {
  if (process.env.NODE_ENV === 'production' || process.env.CONTEXT === 'production') {
    return 'production';
  }
  return 'development';
}

/**
 * Validate that a database URL is properly formatted
 */
function validateDatabaseUrl(url) {
  if (!url) return false;
  
  // Check if it's a placeholder
  if (url.includes('username:password@host') || url.includes('your_')) {
    return false;
  }
  
  // Basic PostgreSQL URL validation
  const pgUrlPattern = /^postgresql:\/\/[^:]+:[^@]+@[^\/]+\/[^?]+(\?.*)?$/;
  return pgUrlPattern.test(url);
}

/**
 * Validate that Stack Auth keys are properly formatted
 */
function validateStackAuthKey(key, type) {
  if (!key) return false;
  
  const patterns = {
    project_id: /^[a-f0-9-]{36}$/,
    publishable_key: /^pck_[a-z0-9]+$/,
    secret_key: /^ssk_[a-z0-9]+$/,
  };
  
  return patterns[type] ? patterns[type].test(key) : true;
}

/**
 * Check if all required environment variables are set and valid
 */
function validateEnvironmentVariables() {
  const environment = getCurrentEnvironment();
  const errors = [];
  const warnings = [];
  
  console.log('🔧 Environment Variable Validation');
  console.log(`📍 Environment: ${environment}`);
  console.log('=' .repeat(50));
  
  // Check all required variables
  for (const [varName, config] of Object.entries(REQUIRED_ENV_VARS)) {
    const value = process.env[varName];
    
    if (!value) {
      const error = {
        variable: varName,
        reason: 'Missing required environment variable',
        description: config.description,
        example: config.example,
        critical: config.critical,
      };
      
      if (config.critical) {
        errors.push(error);
      } else {
        warnings.push(error);
      }
      continue;
    }
    
    // Validate specific variable types
    if (varName.includes('DATABASE_URL')) {
      if (!validateDatabaseUrl(value)) {
        errors.push({
          variable: varName,
          reason: 'Invalid database URL format or contains placeholder values',
          description: config.description,
          example: config.example,
          critical: true,
        });
        continue;
      }
    }
    
    if (varName.includes('STACK_PROJECT_ID')) {
      if (!validateStackAuthKey(value, 'project_id')) {
        errors.push({
          variable: varName,
          reason: 'Invalid Stack Auth project ID format',
          description: config.description,
          example: config.example,
          critical: config.critical,
        });
        continue;
      }
    }
    
    if (varName.includes('PUBLISHABLE_CLIENT_KEY')) {
      if (!validateStackAuthKey(value, 'publishable_key')) {
        errors.push({
          variable: varName,
          reason: 'Invalid Stack Auth publishable key format',
          description: config.description,
          example: config.example,
          critical: config.critical,
        });
        continue;
      }
    }
    
    if (varName.includes('SECRET_SERVER_KEY')) {
      if (!validateStackAuthKey(value, 'secret_key')) {
        errors.push({
          variable: varName,
          reason: 'Invalid Stack Auth secret key format',
          description: config.description,
          example: config.example,
          critical: config.critical,
        });
        continue;
      }
    }
    
    console.log(`✅ ${varName}: Valid`);
  }
  
  // Check environment-specific URLs
  const expectedUrls = ENVIRONMENT_SPECIFIC_VARS[environment];
  if (expectedUrls) {
    for (const [varName, expectedValue] of Object.entries(expectedUrls)) {
      const actualValue = process.env[varName];
      if (actualValue && actualValue !== expectedValue) {
        warnings.push({
          variable: varName,
          reason: `URL mismatch for ${environment} environment`,
          description: `Expected: ${expectedValue}, Got: ${actualValue}`,
          critical: false,
        });
      }
    }
  }
  
  // Report warnings
  if (warnings.length > 0) {
    console.log('\n⚠️  Warnings:');
    warnings.forEach((warning, i) => {
      console.log(`${i + 1}. ${warning.variable}`);
      console.log(`   Reason: ${warning.reason}`);
      console.log(`   Description: ${warning.description}`);
      if (warning.example) {
        console.log(`   Example: ${warning.example}`);
      }
      console.log('');
    });
  }
  
  // Report errors
  if (errors.length > 0) {
    console.log('\n❌ Critical Errors:');
    errors.forEach((error, i) => {
      console.log(`${i + 1}. ${error.variable}`);
      console.log(`   Reason: ${error.reason}`);
      console.log(`   Description: ${error.description}`);
      if (error.example) {
        console.log(`   Example: ${error.example}`);
      }
      console.log('');
    });
    
    console.log('🚨 DEPLOYMENT BLOCKED: Fix the above errors before deploying.');
    console.log('\n💡 Quick Fix Commands:');
    console.log('For Netlify deployments, use:');
    errors.forEach(error => {
      console.log(`netlify env:set ${error.variable} "YOUR_VALUE_HERE"`);
    });
    
    process.exit(1);
  }
  
  console.log('\n🎉 All environment variables are properly configured!');
  console.log(`✨ Ready for ${environment} deployment.`);
}

// Export for programmatic use
export { validateEnvironmentVariables, REQUIRED_ENV_VARS };

// Run validation if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  validateEnvironmentVariables();
}
