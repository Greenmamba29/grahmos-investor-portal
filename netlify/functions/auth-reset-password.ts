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
    const { token, password } = JSON.parse(event.body || '{}');

    if (!token || !password) {
      return json(400, { 
        error: 'Missing required fields',
        details: 'Reset token and new password are required'
      });
    }

    if (password.length < 8) {
      return json(400, {
        error: 'Password too short',
        details: 'Password must be at least 8 characters long'
      });
    }

    // Verify reset token and get user
    const user = await dbOperations.getUserByResetToken(token);
    if (!user) {
      return json(400, {
        error: 'Invalid or expired reset token',
        details: 'The reset link is invalid or has expired. Please request a new password reset.'
      });
    }

    // Hash the new password
    const bcrypt = await import('bcryptjs');
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Update user's password and clear reset token
    await dbOperations.updateUserPassword(user.id, passwordHash);
    await dbOperations.clearPasswordResetToken(user.id);

    console.log(`Password successfully reset for user ${user.email}`);

    return json(200, {
      success: true,
      message: 'Password has been reset successfully. You can now login with your new password.'
    });

  } catch (error) {
    console.error('Reset password error:', error);
    return json(500, {
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Failed to reset password'
    });
  }
};
