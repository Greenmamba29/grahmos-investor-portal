import type { Handler } from '@netlify/functions';
import { sql, json } from './_db';

const statements = [
  `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    stack_user_id VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    password_hash VARCHAR(255),
    is_verified BOOLEAN DEFAULT FALSE,
    role VARCHAR(20) NOT NULL DEFAULT 'standard',
    user_type VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
  )`,
  `ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'standard'`,
  `ALTER TABLE users ADD COLUMN IF NOT EXISTS stack_user_id VARCHAR(255) UNIQUE`,
  `CREATE TABLE IF NOT EXISTS investor_applications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    pitch TEXT,
    accreditation BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    decided_by INTEGER REFERENCES users(id),
    decided_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS admin_actions (
    id SERIAL PRIMARY KEY,
    admin_id INTEGER NOT NULL REFERENCES users(id),
    action VARCHAR(50) NOT NULL,
    target_application_id INTEGER REFERENCES investor_applications(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS idx_user_applications ON investor_applications(user_id)`,
  `CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`,
  `CREATE INDEX IF NOT EXISTS idx_applications_status ON investor_applications(status)`
];

export const handler: Handler = async () => {
  try {
    for (const s of statements) { 
      await sql`${sql.unsafe(s)}`; 
    }
    return json(200, { ok: true, message: 'Database migration completed' });
  } catch (error) {
    return json(500, { error: 'Migration failed', details: String(error) });
  }
};
