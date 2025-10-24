#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const VALIDATION_TIMEOUT = 60000; // 1 minute

console.log('🔍 Starting pre-deployment validation...\n');

// Validation checks
const validationChecks = [
  {
    name: 'TypeScript compilation',
    command: 'npx tsc --noEmit',
    critical: true
  },
  {
    name: 'Production build',
    command: 'npm run build',
    critical: true
  },
  {
    name: 'ESLint check',
    command: 'npm run lint',
    critical: false
  }
];

let hasErrors = false;
let hasWarnings = false;

async function runValidation() {
  for (const check of validationChecks) {
    console.log(`🔧 Running: ${check.name}...`);
    
    try {
      const startTime = Date.now();
      execSync(check.command, { 
        stdio: 'inherit',
        timeout: VALIDATION_TIMEOUT,
        cwd: process.cwd()
      });
      const duration = Date.now() - startTime;
      console.log(`✅ ${check.name} passed (${duration}ms)\n`);
    } catch (error) {
      const errorMsg = `❌ ${check.name} failed`;
      
      if (check.critical) {
        console.error(`${errorMsg} - CRITICAL ERROR`);
        console.error(`Command: ${check.command}`);
        console.error(`Exit code: ${error.status || 'unknown'}\n`);
        hasErrors = true;
      } else {
        console.warn(`⚠️  ${check.name} failed - WARNING`);
        hasWarnings = true;
      }
    }
  }

  // Check for critical files
  console.log('🔍 Checking critical files...');
  const criticalFiles = [
    'dist/index.html',
    'dist/assets',
    'src/App.tsx',
    'src/main.tsx',
    'index.html'
  ];

  for (const file of criticalFiles) {
    if (!fs.existsSync(file)) {
      console.error(`❌ Critical file missing: ${file}`);
      hasErrors = true;
    } else {
      console.log(`✅ Found: ${file}`);
    }
  }

  // Check bundle sizes
  console.log('\n📊 Bundle analysis:');
  const distPath = path.join(process.cwd(), 'dist');
  if (fs.existsSync(distPath)) {
    const assets = fs.readdirSync(path.join(distPath, 'assets'));
    const jsFiles = assets.filter(f => f.endsWith('.js'));
    
    for (const file of jsFiles) {
      const filePath = path.join(distPath, 'assets', file);
      const stats = fs.statSync(filePath);
      const sizeKB = Math.round(stats.size / 1024);
      
      if (sizeKB > 500) {
        console.warn(`⚠️  Large bundle detected: ${file} (${sizeKB}KB)`);
        hasWarnings = true;
      } else {
        console.log(`✅ ${file}: ${sizeKB}KB`);
      }
    }
  }

  console.log('\n' + '='.repeat(50));
  
  if (hasErrors) {
    console.error('❌ VALIDATION FAILED - Deployment blocked');
    console.error('Please fix critical errors before deploying.\n');
    process.exit(1);
  } else if (hasWarnings) {
    console.warn('⚠️  VALIDATION COMPLETED WITH WARNINGS');
    console.warn('Deployment allowed but issues should be addressed.\n');
    process.exit(0);
  } else {
    console.log('✅ VALIDATION PASSED - Safe to deploy!');
    console.log('🚀 All checks passed successfully.\n');
    process.exit(0);
  }
}

// Catch unhandled errors
process.on('uncaughtException', (error) => {
  console.error('❌ VALIDATION CRASHED:', error.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('❌ VALIDATION PROMISE REJECTION:', reason);
  process.exit(1);
});

runValidation().catch((error) => {
  console.error('❌ VALIDATION ERROR:', error.message);
  process.exit(1);
});
