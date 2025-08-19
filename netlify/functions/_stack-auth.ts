import jwt from 'jsonwebtoken';
import { sql, isAdminEmail } from './_db';

interface StackAuthUser {
  id: string;
  primaryEmail: string | null;
  primaryEmailVerified: boolean;
  displayName: string | null;
  profileImageUrl: string | null;
  signedUpAtMillis: number;
  clientMetadata: Record<string, any>;
  serverMetadata: Record<string, any>;
}

interface StackAuthPayload {
  sub: string; // user ID
  email?: string;
  email_verified?: boolean;
  name?: string;
  picture?: string;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
}

export async function validateStackAuthToken(authHeader: string | undefined): Promise<StackAuthUser | null> {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  
  try {
    // For now, decode the JWT without verification
    // In production, you should verify with Stack Auth's public key
    const decoded = jwt.decode(token) as StackAuthPayload;
    
    if (!decoded || !decoded.sub) {
      console.error('Invalid JWT token structure');
      return null;
    }

    console.log('Decoded token:', { sub: decoded.sub, email: decoded.email, name: decoded.name });

    return {
      id: decoded.sub,
      primaryEmail: decoded.email || null,
      primaryEmailVerified: decoded.email_verified || false,
      displayName: decoded.name || null,
      profileImageUrl: decoded.picture || null,
      signedUpAtMillis: (decoded.iat || 0) * 1000,
      clientMetadata: {},
      serverMetadata: {}
    };
  } catch (error) {
    console.error('Stack Auth token validation error:', error);
    return null;
  }
}

export async function ensureUserInDatabase(stackUser: StackAuthUser): Promise<any> {
  if (!stackUser.primaryEmail) {
    throw new Error('User must have an email');
  }

  const role = isAdminEmail(stackUser.primaryEmail) ? 'admin' : 'standard';
  
  // First, check if user already exists by stack_user_id
  const existingUser = await sql`
    SELECT * FROM users WHERE stack_user_id = ${stackUser.id}
  `;
  
  if (existingUser.length > 0) {
    return existingUser[0];
  }

  // If not, create or update by email
  const rows = await sql`
    INSERT INTO users (stack_user_id, email, first_name, last_name, role, is_verified)
    VALUES (
      ${stackUser.id}, 
      ${stackUser.primaryEmail}, 
      ${stackUser.displayName ? stackUser.displayName.split(' ')[0] : null}, 
      ${stackUser.displayName ? stackUser.displayName.split(' ').slice(1).join(' ') || null : null}, 
      ${role}, 
      ${stackUser.primaryEmailVerified}
    )
    ON CONFLICT (email) DO UPDATE SET 
      stack_user_id = EXCLUDED.stack_user_id,
      first_name = EXCLUDED.first_name, 
      last_name = EXCLUDED.last_name,
      role = EXCLUDED.role,
      is_verified = EXCLUDED.is_verified,
      updated_at = NOW()
    RETURNING *
  `;

  return rows[0];
}

export async function requireAuth(authHeader: string | undefined): Promise<{ stackUser: StackAuthUser; dbUser: any }> {
  const stackUser = await validateStackAuthToken(authHeader);
  if (!stackUser) {
    throw new Error('Authentication required');
  }

  const dbUser = await ensureUserInDatabase(stackUser);
  return { stackUser, dbUser };
}
