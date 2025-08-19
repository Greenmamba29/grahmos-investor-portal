import type { Handler } from '@netlify/functions';
import { json, sql } from './_db';
import { sendAdminNotification } from './_notifications';
import { requireAuth } from './_stack-auth';

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return json(200, {});
  }

  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  try {
    const { stackUser, dbUser } = await requireAuth(event.headers.authorization);

    const { pitch, accreditation } = JSON.parse(event.body || '{}');
    
    const rows = await sql`
      INSERT INTO investor_applications (user_id, pitch, accreditation)
      VALUES (${dbUser.id}, ${pitch||null}, ${!!accreditation})
      ON CONFLICT (user_id) DO UPDATE SET
        pitch = EXCLUDED.pitch,
        accreditation = EXCLUDED.accreditation,
        status = 'pending',
        created_at = NOW()
      RETURNING id, status`;
      
    // Send admin notification about new investor application
    await sendAdminNotification({
      type: 'investor_application',
      email: dbUser.email,
      data: {
        pitch,
        accreditation: !!accreditation,
        applicationId: rows[0].id
      }
    });
      
    return json(200, { ok: true, application: rows[0] });
  } catch (e) { 
    console.error('Apply error:', e);
    return json(500, { error: 'apply failed', detail: String(e) }); 
  }
};
