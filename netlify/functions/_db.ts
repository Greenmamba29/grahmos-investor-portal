import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL && !process.env.NEON_DATABASE_URL) {
  throw new Error('DATABASE_URL or NEON_DATABASE_URL environment variable must be set');
}
const neonConnectionString = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL || '';
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
