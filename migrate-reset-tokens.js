import { neon } from '@neondatabase/serverless';

const neonConnectionString = process.env.DATABASE_URL || 
  `postgresql://neondb_owner:npg_ENQYfp57iyKU@ep-icy-breeze-ae05c0wt-pooler.c-2.us-east-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require`;

const sql = neon(neonConnectionString);

async function migrateResetTokens() {
  try {
    console.log('Adding reset token columns to users table...');
    
    await sql`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS reset_token VARCHAR(255)
    `;
    
    await sql`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS reset_token_expires TIMESTAMPTZ
    `;

    console.log('✅ Reset token columns added successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
  }
}

migrateResetTokens();
