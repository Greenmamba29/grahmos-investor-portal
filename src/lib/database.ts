import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// Get the database URL from environment variables
const getDatabaseUrl = (): string => {
  // In a Vite app, we need to handle environment variables differently
  // For server-side operations, we'll use import.meta.env or process.env
  const databaseUrl = 
    typeof process !== 'undefined' && process.env?.DATABASE_URL ||
    import.meta.env?.DATABASE_URL ||
    'postgresql://username:password@host/database?sslmode=require';
  
  return databaseUrl;
};

// Create Neon client
const sql = neon(getDatabaseUrl());

// Create Drizzle instance
export const db = drizzle(sql);

// Database connection helper
export const connectToDatabase = async () => {
  try {
    // Test the connection
    await sql`SELECT 1`;
    console.log('✅ Connected to Neon database successfully');
    return true;
  } catch (error) {
    console.error('❌ Failed to connect to Neon database:', error);
    return false;
  }
};

// Export the raw SQL client for direct queries if needed
export { sql };
