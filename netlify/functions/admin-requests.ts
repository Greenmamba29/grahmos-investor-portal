import type { Handler } from '@netlify/functions';
import { json, sql } from './_db';
import { requireAuth } from './_stack-auth';

const mustBeAdmin = async (authHeader: string | undefined) => {
  const { stackUser, dbUser } = await requireAuth(authHeader);
  if (dbUser.role !== 'admin') throw new Error('forbidden');
  return { stackUser, dbUser };
};

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return json(200, {});
  }

  try {
    const { stackUser, dbUser: admin } = await mustBeAdmin(event.headers.authorization);
    
    if (event.httpMethod === 'GET') {
      const rows = await sql`
        SELECT 
          ia.id, 
          u.email, 
          u.first_name, 
          u.last_name, 
          ia.status, 
          ia.pitch, 
          ia.accreditation, 
          ia.created_at,
          ia.decided_at,
          admin_u.email as decided_by_email
        FROM investor_applications ia 
        JOIN users u ON u.id = ia.user_id
        LEFT JOIN users admin_u ON admin_u.id = ia.decided_by
        ORDER BY ia.created_at DESC`;
      return json(200, { applications: rows });
    }

    if (event.httpMethod === 'POST') {
      const { applicationId, decision } = JSON.parse(event.body || '{}');
      if (!['approved','denied'].includes(decision)) {
        return json(400, { error: 'bad decision' });
      }

      const rows = await sql`
        UPDATE investor_applications
        SET status=${decision}, decided_by=${admin.id}, decided_at=NOW()
        WHERE id=${applicationId} 
        RETURNING user_id`;
      
      const target = rows[0];
      if (!target) {
        return json(404, { error: 'application not found' });
      }

      // If approved, upgrade user role to investor
      if (decision === 'approved') {
        await sql`UPDATE users SET role='investor' WHERE id=${target.user_id}`;
      }

      // Log admin action
      await sql`
        INSERT INTO admin_actions (admin_id, action, target_application_id)
        VALUES (${admin.id}, ${decision}, ${applicationId})`;

      return json(200, { ok: true, decision, applicationId });
    }

    return json(405, { error: 'method not allowed' });
  } catch (e) { 
    console.error('Admin error:', e);
    return json(403, { error: 'admin only', detail: String(e) }); 
  }
};
