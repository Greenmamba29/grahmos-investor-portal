import type { Handler } from '@netlify/functions';
import { json } from './_db';
import { requireAuth } from './_stack-auth';

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return json(200, {});
  }

  try {
    const { stackUser, dbUser } = await requireAuth(event.headers.authorization);
    
    return json(200, { 
      user: {
        id: dbUser.id,
        stackUserId: stackUser.id,
        email: dbUser.email,
        firstName: dbUser.first_name,
        lastName: dbUser.last_name,
        role: dbUser.role,
        isVerified: dbUser.is_verified,
        displayName: stackUser.displayName,
        profileImageUrl: stackUser.profileImageUrl
      }
    });
  } catch (e) { 
    return json(401, { error: 'authentication required' }); 
  }
};
