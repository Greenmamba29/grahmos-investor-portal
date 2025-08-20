import { neon } from '@neondatabase/serverless';

const neonConnectionString = process.env.DATABASE_URL || 
  process.env.NEON_DATABASE_URL || 
  `postgresql://neondb_owner:npg_ENQYfp57iyKU@ep-icy-breeze-ae05c0wt-pooler.c-2.us-east-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require`;
export const sql = neon(neonConnectionString);

export const isAdminEmail = (email: string) => {
  const admins = (process.env.ADMIN_EMAILS || '').split(',').map(s => s.trim().toLowerCase());
  return admins.includes(email.toLowerCase());
};

export const json = (status: number, body: unknown) => ({
  statusCode: status,
  headers: { 
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  },
  body: JSON.stringify(body)
});
