import type { Handler } from '@netlify/functions';
import { sql, isAdminEmail, json } from './_db';

interface StackAuthWebhookPayload {
  type: 'user.created' | 'user.updated' | 'user.deleted';
  data: {
    user: {
      id: string;
      primaryEmail: string | null;
      primaryEmailVerified: boolean;
      displayName: string | null;
      profileImageUrl: string | null;
      signedUpAtMillis: number;
      clientMetadata: Record<string, unknown>;
      serverMetadata: Record<string, unknown>;
    };
  };
}

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return json(200, {});
  }

  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  try {
    const payload: StackAuthWebhookPayload = JSON.parse(event.body || '{}');
    
    if (payload.type === 'user.created') {
      const user = payload.data.user;
      
      if (!user.primaryEmail) {
        console.log('User created without email, skipping database creation');
        return json(200, { ok: true, message: 'User has no email, skipped' });
      }

      const role = isAdminEmail(user.primaryEmail) ? 'admin' : 'standard';
      
      // Extract first and last name from display name
      const nameParts = user.displayName ? user.displayName.split(' ') : [];
      const firstName = nameParts[0] || null;
      const lastName = nameParts.slice(1).join(' ') || null;

      // Create user in database
      const rows = await sql`
        INSERT INTO users (stack_user_id, email, first_name, last_name, role, is_verified)
        VALUES (
          ${user.id}, 
          ${user.primaryEmail}, 
          ${firstName}, 
          ${lastName}, 
          ${role}, 
          ${user.primaryEmailVerified}
        )
        ON CONFLICT (email) DO UPDATE SET 
          stack_user_id = EXCLUDED.stack_user_id,
          first_name = EXCLUDED.first_name, 
          last_name = EXCLUDED.last_name,
          role = EXCLUDED.role,
          is_verified = EXCLUDED.is_verified,
          updated_at = NOW()
        RETURNING id, email, role
      `;

      console.log('User created in database:', rows[0]);
      return json(200, { ok: true, user: rows[0] });
    }
    
    if (payload.type === 'user.updated') {
      const user = payload.data.user;
      
      if (!user.primaryEmail) {
        return json(200, { ok: true, message: 'User has no email, skipped update' });
      }

      // Extract first and last name from display name
      const nameParts = user.displayName ? user.displayName.split(' ') : [];
      const firstName = nameParts[0] || null;
      const lastName = nameParts.slice(1).join(' ') || null;

      // Update user in database
      const rows = await sql`
        UPDATE users 
        SET 
          first_name = ${firstName}, 
          last_name = ${lastName},
          is_verified = ${user.primaryEmailVerified},
          updated_at = NOW()
        WHERE stack_user_id = ${user.id}
        RETURNING id, email, role
      `;

      console.log('User updated in database:', rows[0]);
      return json(200, { ok: true, user: rows[0] });
    }

    if (payload.type === 'user.deleted') {
      const user = payload.data.user;
      
      // Soft delete or mark as inactive (you might want to keep the records for referential integrity)
      await sql`
        UPDATE users 
        SET 
          email = CONCAT(email, '_deleted_', ${Date.now()}),
          updated_at = NOW()
        WHERE stack_user_id = ${user.id}
      `;

      console.log('User marked as deleted:', user.id);
      return json(200, { ok: true, message: 'User marked as deleted' });
    }

    return json(200, { ok: true, message: 'Webhook received but no action taken' });
  } catch (error) {
    console.error('Stack Auth webhook error:', error);
    return json(500, { error: 'Webhook processing failed', details: String(error) });
  }
};
