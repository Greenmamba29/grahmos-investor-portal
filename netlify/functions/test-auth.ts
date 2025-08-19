import type { Handler } from '@netlify/functions';
import { json } from './_db';

export const handler: Handler = async (event) => {
  console.log('=== TEST AUTH ENDPOINT ===');
  console.log('Method:', event.httpMethod);
  console.log('Headers:', event.headers);
  console.log('Authorization header:', event.headers.authorization);
  
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      },
      body: '',
    };
  }

  try {
    // Check environment variables
    const envVars = {
      STACK_PROJECT_ID: process.env.VITE_STACK_PROJECT_ID,
      STACK_PUBLISHABLE_KEY: process.env.VITE_STACK_PUBLISHABLE_CLIENT_KEY,
      STACK_SECRET_KEY: process.env.STACK_SECRET_SERVER_KEY,
      DATABASE_URL: !!process.env.DATABASE_URL,
    };

    return json(200, {
      message: 'Test auth endpoint working',
      timestamp: new Date().toISOString(),
      environment: envVars,
      authHeader: event.headers.authorization ? 'Present' : 'Missing',
    });
  } catch (error) {
    console.error('Test auth error:', error);
    return json(500, { 
      error: 'Test failed',
      details: error.message 
    });
  }
};
