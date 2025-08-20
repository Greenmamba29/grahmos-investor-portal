import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL?.replace('/grahmos_investor', '/neondb') || process.env.DATABASE_URL!;
export const sql = neon(databaseUrl);

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
