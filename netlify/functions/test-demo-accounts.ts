import type { Handler } from '@netlify/functions';
import { json } from './_db';

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      }
    };
  }

  if (event.httpMethod !== 'GET') {
    return json(405, { error: 'Method not allowed' });
  }

  try {
    const { dbOperations } = await import('../../src/lib/schema');
    
    // Get all users to see what demo accounts exist
    const { neon } = await import('@neondatabase/serverless');
    const neonConnectionString = process.env.DATABASE_URL || 
      process.env.NEON_DATABASE_URL || 
      `postgresql://neondb_owner:npg_ENQYfp57iyKU@ep-icy-breeze-ae05c0wt-pooler.c-2.us-east-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require`;
    const sql = neon(neonConnectionString);

    const users = await sql`
      SELECT id, email, first_name, last_name, role, user_type, is_verified, created_at
      FROM users 
      ORDER BY created_at DESC
      LIMIT 10
    `;
    
    console.log('Demo accounts found:', users);

    return json(200, {
      success: true,
      demoAccounts: users,
      message: 'Demo accounts retrieved successfully'
    });

  } catch (error) {
    console.error('Demo accounts error:', error);
    return json(500, {
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Failed to retrieve demo accounts'
    });
  }
};
