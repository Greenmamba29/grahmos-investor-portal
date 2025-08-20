import type { Handler } from '@netlify/functions';
import { authUtils } from '../../src/lib/auth';

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
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  const clearCookie = authUtils.clearSessionCookie();

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': clearCookie,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true'
    },
    body: JSON.stringify({
      success: true,
      message: 'Logged out successfully'
    })
  };
};
