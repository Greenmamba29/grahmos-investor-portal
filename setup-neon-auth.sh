#!/usr/bin/env bash
set -euo pipefail

# ========= CONFIG: EDIT THESE =========
NEON_DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB?sslmode=require"
ADMIN_EMAILS="mmcdonald@grahmos.com"   # comma-separated, no spaces
MIGRATION_ENDPOINT="http://localhost:8888/.netlify/functions/db-migrate"  # Netlify Dev endpoint
SIGNUP_ENDPOINT="http://localhost:8888/.netlify/functions/auth-signup"
LOGIN_ENDPOINT="http://localhost:8888/.netlify/functions/auth-login"
DEV_PORT=8888
# =====================================

# Colors
GREEN="$(printf '\033[0;32m')"; RED="$(printf '\033[0;31m')"; YELLOW="$(printf '\033[0;33m')"; NC="$(printf '\033[0m')"

say() { printf "%b\n" "$1"; }
ok() { say "${GREEN}✔${NC} $1"; }
warn() { say "${YELLOW}⚠${NC} $1"; }
err() { say "${RED}✖${NC} $1"; exit 1; }

# 0) Preflight
command -v node >/dev/null || err "Node.js not found"
command -v openssl >/dev/null || err "openssl not found"
if ! command -v npm >/dev/null && ! command -v pnpm >/dev/null; then
  err "Neither npm nor pnpm found"
fi

PM="npm"
command -v pnpm >/dev/null && PM="pnpm"

say "========================================="
say "🚀 GrahmOS Investor Portal - Auth Setup"
say "========================================="

# 1) Write .env entries (idempotent appends)
touch .env
if grep -q '^DATABASE_URL=' .env; then
  warn "DATABASE_URL already set in .env"
else
  if [ "$NEON_DATABASE_URL" = "postgresql://USER:PASSWORD@HOST:PORT/DB?sslmode=require" ]; then
    err "Please edit the script and set NEON_DATABASE_URL to your actual connection string"
  fi
  echo "DATABASE_URL=\"$NEON_DATABASE_URL\"" >> .env
  echo "NEON_DATABASE_URL=\"$NEON_DATABASE_URL\"" >> .env
  ok "Added DATABASE_URL to .env"
fi

SECRET="$(openssl rand -base64 32)"
if grep -q '^SESSION_SECRET=' .env; then
  warn "SESSION_SECRET already set in .env"
else
  echo "SESSION_SECRET=\"$SECRET\"" >> .env
  ok "Generated SESSION_SECRET and wrote to .env"
fi

if grep -q '^ADMIN_EMAILS=' .env; then
  warn "ADMIN_EMAILS already set in .env"
else
  echo "ADMIN_EMAILS=\"$ADMIN_EMAILS\"" >> .env
  ok "Added ADMIN_EMAILS to .env"
fi

# Ensure required URLs are set
if ! grep -q '^VITE_APP_URL=' .env; then
  echo "VITE_APP_URL=http://localhost:$DEV_PORT" >> .env
fi
if ! grep -q '^VITE_API_URL=' .env; then
  echo "VITE_API_URL=http://localhost:$DEV_PORT/api" >> .env
fi
if ! grep -q '^URL=' .env; then
  echo "URL=http://localhost:$DEV_PORT" >> .env
fi

ok "Ensured .env contains all required variables"

# 2) DB connectivity quick check
say "Testing database connection..."
node -e "
const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
client.connect()
  .then(() => client.query('SELECT 1'))
  .then(() => { console.log('${GREEN}✔${NC} Database reachable'); client.end(); })
  .catch(e => { console.error('${RED}✖${NC} Database error:', e.message); process.exit(1); });
" 2>/dev/null || err "Database connection failed. Check your DATABASE_URL"

# 3) Start dev server (if not already running)
if lsof -i :$DEV_PORT >/dev/null 2>&1; then
  warn "Port $DEV_PORT in use — assuming dev server already running"
else
  say "Starting Netlify Dev server in background..."
  $PM run dev >/tmp/netlify-dev.log 2>&1 &
  DEV_PID=$!
  say "Waiting for server to start (PID: $DEV_PID)..."
  
  # Wait up to 30 seconds for server to be ready
  for i in {1..30}; do
    if lsof -i :$DEV_PORT >/dev/null 2>&1; then
      ok "Dev server started on port $DEV_PORT"
      break
    fi
    sleep 1
    if [ $i -eq 30 ]; then
      err "Dev server did not start within 30 seconds. Check /tmp/netlify-dev.log"
    fi
  done
fi

# 4) Run migration
say "Running database migration..."
HTTP_STATUS=$(curl -s -o /tmp/migrate.out -w "%{http_code}" -X POST "${MIGRATION_ENDPOINT}" 2>/dev/null || echo "000")

if [ "$HTTP_STATUS" = "200" ] || [ "$HTTP_STATUS" = "201" ]; then
  ok "Migration succeeded"
  cat /tmp/migrate.out
elif [ "$HTTP_STATUS" = "000" ]; then
  err "Could not reach migration endpoint. Is the dev server running?"
else
  warn "Migration returned HTTP ${HTTP_STATUS}"
  say "Response:"
  cat /tmp/migrate.out
  err "Migration failed"
fi

# 5) Smoke test signup/login endpoints
TEST_EMAIL="test+$(date +%s)@grahmos.com"
TEST_PASS="TestPass123!"

say ""
say "========================================="
say "🧪 Testing Authentication Endpoints"
say "========================================="

say "Testing signup: ${TEST_EMAIL}"
SIGNUP_RESULT=$(curl -s -w "\n%{http_code}" -X POST "${SIGNUP_ENDPOINT}" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"${TEST_EMAIL}\",\"password\":\"${TEST_PASS}\",\"firstName\":\"Test\",\"lastName\":\"User\"}" 2>/dev/null)

SIGNUP_BODY=$(echo "$SIGNUP_RESULT" | head -n -1)
SIGNUP_STATUS=$(echo "$SIGNUP_RESULT" | tail -n 1)

if [ "$SIGNUP_STATUS" = "201" ] || [ "$SIGNUP_STATUS" = "200" ]; then
  ok "Signup successful"
  echo "$SIGNUP_BODY" | grep -q "success" && ok "Response contains success flag"
else
  warn "Signup returned HTTP ${SIGNUP_STATUS}"
  echo "$SIGNUP_BODY"
fi

sleep 1

say "Testing login: ${TEST_EMAIL}"
LOGIN_RESULT=$(curl -s -w "\n%{http_code}" -X POST "${LOGIN_ENDPOINT}" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"${TEST_EMAIL}\",\"password\":\"${TEST_PASS}\"}" 2>/dev/null)

LOGIN_BODY=$(echo "$LOGIN_RESULT" | head -n -1)
LOGIN_STATUS=$(echo "$LOGIN_RESULT" | tail -n 1)

if [ "$LOGIN_STATUS" = "200" ]; then
  ok "Login successful"
  echo "$LOGIN_BODY" | grep -q "success" && ok "Response contains success flag"
else
  warn "Login returned HTTP ${LOGIN_STATUS}"
  echo "$LOGIN_BODY"
fi

say ""
say "========================================="
say "✅ Local Setup Complete!"
say "========================================="
say ""
say "Next steps:"
say "1. Test the application in your browser at http://localhost:$DEV_PORT"
say "2. Configure the same environment variables in Netlify:"
say "   - DATABASE_URL"
say "   - SESSION_SECRET"
say "   - ADMIN_EMAILS"
say "3. Deploy to production: netlify deploy --prod"
say "4. Run migration on production: curl https://grahmos.info/.netlify/functions/db-migrate"
say ""
say "📚 Documentation:"
say "   - AUTH_SETUP_README.md - Complete setup guide"
say "   - IMPLEMENTATION_SUMMARY.md - Quick reference"
say "   - NOTION_IMPORT.md - Task tracking"
say ""
