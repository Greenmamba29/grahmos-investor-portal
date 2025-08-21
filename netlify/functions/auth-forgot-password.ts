import type { Handler } from '@netlify/functions';
import { json } from './_db';
import crypto from 'crypto';

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
    const { email } = JSON.parse(event.body || '{}');

    if (!email) {
      return json(400, { 
        error: 'Email is required',
        details: 'Please provide your email address'
      });
    }

    // Check if user exists
    const user = await dbOperations.getUserByEmail(email);
    if (!user) {
      // For security, don't reveal whether email exists or not
      return json(200, {
        success: true,
        message: 'If an account with this email exists, you will receive a password reset link shortly.'
      });
    }

    // Generate secure reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

    // Store reset token in database
    await dbOperations.storePasswordResetToken(user.id, resetToken, resetTokenExpiry);

    // In a real application, you would send an email here
    // For now, we'll just return success
    // TODO: Integrate with email service (SendGrid, Mailgun, etc.)
    
    console.log(`Password reset requested for ${email}`);
    console.log(`Reset token: ${resetToken} (expires at ${resetTokenExpiry})`);
    console.log(`Reset URL: ${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password?token=${resetToken}`);

    return json(200, {
      success: true,
      message: 'If an account with this email exists, you will receive a password reset link shortly.',
      // In development, include the token for testing
      ...(process.env.NODE_ENV === 'development' && { 
        resetToken,
        resetUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password?token=${resetToken}`
      })
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    return json(500, {
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Failed to process password reset request'
    });
  }
};
