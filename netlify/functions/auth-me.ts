import type { Handler } from '@netlify/functions';
import { json } from './_db';

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Cookie',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      }
    };
  }

  if (event.httpMethod !== 'GET') {
    return json(405, { error: 'Method not allowed' });
  }

  try {
    const { authUtils } = await import('../../src/lib/auth');
    
    const user = authUtils.getUserFromRequest(event.headers);
    
    if (!user) {
      return json(401, {
        user: null,
        message: 'Not authenticated'
      });
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
      },
      body: JSON.stringify({
        user,
        message: 'Authenticated'
      })
    };
  } catch (error) {
    console.error('Auth validation error:', error);
    return json(500, {
      user: null,
      error: error instanceof Error ? error.message : 'Authentication validation failed'
    });
  }
};
