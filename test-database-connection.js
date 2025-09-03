import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://username:password@ep-example.us-east-2.aws.neon.tech/neondb?sslmode=require';

console.log('🔗 Testing Neon Database Connection...');
console.log('🌐 Database URL:', DATABASE_URL.replace(/:\/\/.*@/, '://***:***@'));

try {
  const sql = neon(DATABASE_URL);
  
  // Test basic connection
  console.log('📡 Attempting connection...');
  const result = await sql`SELECT NOW() as current_time, version() as db_version`;
  
  console.log('✅ Database connection successful!');
  console.log('⏰ Current time:', result[0].current_time);
  console.log('🗄️ Database version:', result[0].db_version.substring(0, 50) + '...');
  
  // Test if tables exist
  console.log('\n📋 Checking existing tables...');
  const tables = await sql`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public'
    ORDER BY table_name
  `;
  
  if (tables.length > 0) {
    console.log('📊 Existing tables:');
    tables.forEach(table => console.log(`  - ${table.table_name}`));
  } else {
    console.log('📝 No tables found. Database migration needed.');
  }
  
  // Test creating tables (migration)
  console.log('\n🔧 Running database migration...');
  
  const statements = [
    `CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      first_name VARCHAR(100),
      last_name VARCHAR(100),
      password_hash VARCHAR(255),
      is_verified BOOLEAN DEFAULT FALSE,
      role VARCHAR(20) NOT NULL DEFAULT 'standard',
      user_type VARCHAR(50) DEFAULT 'user',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )`,
    `CREATE TABLE IF NOT EXISTS investor_applications (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      pitch TEXT,
      accreditation BOOLEAN DEFAULT FALSE,
      status VARCHAR(20) NOT NULL DEFAULT 'pending',
      decided_by INTEGER REFERENCES users(id),
      decided_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )`,
    `CREATE TABLE IF NOT EXISTS admin_actions (
      id SERIAL PRIMARY KEY,
      admin_id INTEGER NOT NULL REFERENCES users(id),
      action VARCHAR(50) NOT NULL,
      target_application_id INTEGER REFERENCES investor_applications(id),
      created_at TIMESTAMPTZ DEFAULT NOW()
    )`
  ];
  
  for (const statement of statements) {
    await sql`${sql.unsafe(statement)}`;
  }
  
  console.log('✅ Database migration completed successfully!');
  
  // Test final table count
  const finalTables = await sql`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public'
    ORDER BY table_name
  `;
  
  console.log(`\n📊 Final table count: ${finalTables.length}`);
  finalTables.forEach(table => console.log(`  ✓ ${table.table_name}`));
  
  console.log('\n🎉 Database setup complete and ready for Access Portal!');
  
} catch (error) {
  console.error('❌ Database connection failed:', error.message);
  console.error('🔍 Full error:', error);
  
  if (error.message.includes('getaddrinfo ENOTFOUND') || error.message.includes('fetch failed')) {
    console.error('🌐 Network issue: Cannot resolve database hostname');
    console.error('💡 This usually means:');
    console.error('   1. The DATABASE_URL is still using placeholder values');
    console.error('   2. You need to set up a real Neon database');
    console.error('   3. Check your .env file has the correct DATABASE_URL');
    console.error('');
    console.error('🔧 To fix this:');
    console.error('   1. Go to https://console.neon.tech');
    console.error('   2. Create a new project');
    console.error('   3. Copy the connection string');
    console.error('   4. Update DATABASE_URL in your .env file');
  } else if (error.message.includes('authentication')) {
    console.error('🔐 Authentication issue: Check database credentials');
    console.error('💡 Verify your username and password in the DATABASE_URL');
  } else if (error.message.includes('timeout')) {
    console.error('⏱️ Connection timeout: Check database availability');
    console.error('💡 Your Neon database might be paused or unavailable');
  } else {
    console.error('💡 Check your DATABASE_URL format and network connectivity');
  }
}
