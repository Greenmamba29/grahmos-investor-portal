import type { Handler } from '@netlify/functions';
import { json, isAdminEmail } from './_db';
import { dbOperations } from '../../src/lib/schema';

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
    const { authUtils } = await import('../../src/lib/auth');
    
    const { email, password, fullName, firstName, lastName, role } = JSON.parse(event.body || '{}');

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

    // Use provided firstName/lastName or parse from fullName
    const nameParts = (fullName || '').split(' ');
    const userFirstName = firstName || nameParts[0] || '';
    const userLastName = lastName || nameParts.slice(1).join(' ') || '';

    // Determine user role - admin emails get admin role automatically
    const userRole = isAdminEmail(email) ? 'admin' : (role === 'investor' ? 'investor' : 'standard');

    const user = await dbOperations.createUser({
      email,
      firstName: userFirstName,
      lastName: userLastName,
      passwordHash,
      userType: role || 'user',
      role: userRole
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

    // Send welcome email notification
    try {
      const emailResponse = await fetch(`${process.env.URL || 'https://grahmos.info'}/.netlify/functions/send-notification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'welcome',
          userEmail: email,
          userName: `${firstName} ${lastName}`.trim() || email.split('@')[0]
        })
      });
      
      if (!emailResponse.ok) {
        console.warn('Failed to send welcome email:', await emailResponse.text());
      }
    } catch (emailError) {
      console.warn('Email service error:', emailError);
    }

    // Send admin alert for new accounts
    if (role === 'investor' || role === 'admin') {
      try {
        const adminAlertResponse = await fetch(`${process.env.URL || 'https://grahmos.info'}/.netlify/functions/send-notification`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'admin_alert',
            userEmail: 'admin@grahmos.info', // Send to admin
            userName: `${firstName} ${lastName}`.trim() || email.split('@')[0],
            applicationType: role === 'investor' ? 'Investor Registration' : 'Admin Registration'
          })
        });
        
        if (!adminAlertResponse.ok) {
          console.warn('Failed to send admin alert:', await adminAlertResponse.text());
        }
      } catch (emailError) {
        console.warn('Admin alert email error:', emailError);
      }
    }

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
        message: 'Account created successfully! Check your email for welcome instructions.'
      })
    };
  } catch (error) {
    console.error('Signup error:', error);
    return json(500, {
      error: 'Signup failed',
      details: error instanceof Error ? error.message : 'Internal server error'
    });
  }
};
