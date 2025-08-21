import type { Handler } from '@netlify/functions';
import { json } from './_db';

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      }
    };
  }

  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  try {
    const { neon } = await import('@neondatabase/serverless');
    const neonConnectionString = process.env.DATABASE_URL || 
      process.env.NEON_DATABASE_URL || 
      `postgresql://neondb_owner:npg_ENQYfp57iyKU@ep-icy-breeze-ae05c0wt-pooler.c-2.us-east-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require`;
    const sql = neon(neonConnectionString);

    // Add reset token columns if they don't exist
    await sql`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS reset_token VARCHAR(255)
    `;
    
    await sql`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS reset_token_expires TIMESTAMPTZ
    `;

    console.log('Reset token columns added successfully');

    return json(200, {
      success: true,
      message: 'Reset token columns migration completed successfully'
    });

  } catch (error) {
    console.error('Migration error:', error);
    return json(500, {
      error: 'Migration failed',
      details: error instanceof Error ? error.message : 'Failed to add reset token columns'
    });
  }
};
