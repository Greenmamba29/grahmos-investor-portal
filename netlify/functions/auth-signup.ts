import type { Handler } from '@netlify/functions';
import { json } from './_db';
import { dbOperations } from '../../src/lib/schema';
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
    return json(405, { error: 'Method not allowed' });
  }

  try {
    const { email, password, firstName, lastName, userType } = JSON.parse(event.body || '{}');

    if (!email || !password) {
      return json(400, { 
        error: 'Missing required fields',
        details: 'Email and password are required'
      });
    }

    if (password.length < 8) {
      return json(400, {
        error: 'Password too short',
        details: 'Password must be at least 8 characters long'
      });
    }

    const existingUser = await dbOperations.getUserByEmail(email);
    if (existingUser) {
      return json(409, {
        error: 'Email already registered',
        details: 'An account with this email already exists'
      });
    }

    const bcrypt = await import('bcryptjs');
    const passwordHash = await bcrypt.hash(password, 12);

    const user = await dbOperations.createUser({
      email,
      firstName,
      lastName,
      passwordHash,
      userType: userType || 'user',
      role: 'standard'
    });

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
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': sessionCookie,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
      },
      body: JSON.stringify({
        success: true,
        data: userSession,
        message: 'Account created successfully'
      })
    };
  } catch (error) {
    console.error('Signup error:', error);
    return json(500, {
      error: 'Signup failed',
      details: 'Internal server error'
    });
  }
};
