import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// Get the database URL from environment variables
const getDatabaseUrl = (): string => {
  // In a Vite app, we need to handle environment variables differently
  // For server-side operations, we'll use import.meta.env or process.env
  let databaseUrl: string;
  
  // Try different ways to get the database URL
  if (typeof process !== 'undefined' && process.env?.DATABASE_URL) {
    databaseUrl = process.env.DATABASE_URL;
  } else if (import.meta.env?.VITE_DATABASE_URL) {
    databaseUrl = import.meta.env.VITE_DATABASE_URL;
  } else if (import.meta.env?.DATABASE_URL) {
    databaseUrl = import.meta.env.DATABASE_URL;
  } else {
    // No database URL found in environment
    throw new Error('DATABASE_URL environment variable is not configured. Please set VITE_DATABASE_URL or DATABASE_URL in your .env file');
  }
  
  // Database URL configured
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
    // Connected to Neon database successfully
    return true;
  } catch (error) {
    // Failed to connect to Neon database
    
    // Check if it's a configuration issue
    const dbUrl = getDatabaseUrl();
    if (dbUrl.includes('username:password@host') || dbUrl === 'postgresql://username:password@host/database?sslmode=require') {
      // Database URL appears to be using placeholder values
    }
    
    return false;
  }
};

// Export the raw SQL client for direct queries if needed
export { sql };
