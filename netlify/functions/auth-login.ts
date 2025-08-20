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
    const { dbOperations } = await import('../../src/lib/schema');
    const { authUtils } = await import('../../src/lib/auth');
    
    const { email, password } = JSON.parse(event.body || '{}');

    if (!email || !password) {
      return json(400, { 
        error: 'Missing credentials',
        details: 'Email and password are required'
      });
    }

    const user = await dbOperations.getUserByEmailWithPassword(email);
    if (!user) {
      return json(401, {
        error: 'Invalid credentials',
        details: 'Email or password is incorrect'
      });
    }

    const bcrypt = await import('bcryptjs');
    const isValidPassword = await bcrypt.compare(password, user.password_hash || '');
    
    if (!isValidPassword) {
      return json(401, {
        error: 'Invalid credentials',
        details: 'Email or password is incorrect'
      });
    }

    const userSession = {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      role: user.role,
      userType: user.user_type
    };

    const token = authUtils.generateToken(userSession);
    const sessionCookie = authUtils.createSessionCookie(token);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': sessionCookie,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
      },
      body: JSON.stringify({
        success: true,
        data: userSession,
        message: 'Login successful'
      })
    };
  } catch (error) {
    console.error('Login error:', error);
    return json(500, {
      error: 'Login failed',
      details: error instanceof Error ? error.message : 'Internal server error'
    });
  }
};
