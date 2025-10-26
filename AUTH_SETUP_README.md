# GrahmOS Investor Portal - Authentication Setup & Multi-Domain Deployment Guide

## 📚 Table of Contents
1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Database Setup (Neon PostgreSQL)](#database-setup-neon-postgresql)
4. [Environment Configuration](#environment-configuration)
5. [Local Development Setup](#local-development-setup)
6. [Authentication Flow](#authentication-flow)
7. [Multi-Domain Deployment](#multi-domain-deployment)
8. [Testing](#testing)
9. [Troubleshooting](#troubleshooting)
10. [Security Best Practices](#security-best-practices)

---

## Overview

The GrahmOS Investor Portal uses a modern, serverless authentication system built on:
- **JWT-based authentication** with HTTP-only cookies
- **Neon PostgreSQL** for user data storage
- **Netlify Functions** for serverless backend
- **Role-Based Access Control (RBAC)** with 4 user roles
- **Multi-domain support** for .info, .app, .store, .net, .org

### User Roles
| Role | Access Level | Description |
|------|--------------|-------------|
| `pending` | Limited | New users awaiting verification |
| `standard` | Basic | Verified users with standard access |
| `investor` | Enhanced | Users approved for investor portal |
| `admin` | Full | Administrative access to all features |

---

## Architecture

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (React)                        │
│  ┌────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │ AuthContext│  │ProtectedRoute│  │  API Client  │        │
│  └────────────┘  └──────────────┘  └──────────────┘        │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTPS
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Netlify Functions (Serverless)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ auth-login   │  │ auth-signup  │  │  auth-me     │     │
│  │ auth-logout  │  │ auth-reset   │  │  investor-*  │     │
│  │ admin-*      │  │ db-migrate   │  │  ...         │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└────────────────────────┬────────────────────────────────────┘
                         │ SQL
                         ▼
┌─────────────────────────────────────────────────────────────┐
│           Neon PostgreSQL (Serverless Database)              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │    users     │  │   investor   │  │    admin     │     │
│  │              │  │ applications │  │   actions    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### Authentication Flow

```
User Request → Frontend → Netlify Function → Neon DB → Response
                                ↓
                         JWT Token Generated
                                ↓
                    Set HTTP-Only Cookie (session)
                                ↓
                   Return User Data to Frontend
```

### Key Files

**Frontend:**
- `src/components/auth/AuthContext.tsx` - Authentication state management
- `src/components/auth/ProtectedRoute.tsx` - Route protection
- `src/lib/auth.ts` - JWT utilities (shared with backend)
- `src/lib/api.ts` - API integration layer

**Backend:**
- `netlify/functions/_db.ts` - Database connection utilities
- `netlify/functions/auth-*.ts` - Authentication endpoints
- `src/lib/schema.ts` - Database schema and operations

**Configuration:**
- `.env` - Local environment variables (not committed)
- `.env.example` - Template for environment variables
- `netlify.toml` - Netlify build configuration

---

## Database Setup (Neon PostgreSQL)

### Step 1: Create Neon Database

1. **Sign up/Login to Neon**
   - Visit https://console.neon.tech
   - Create a free account or sign in

2. **Create New Project**
   ```
   Project Name: grahmos-investor-portal
   Region: Choose closest to your users (e.g., US East, EU Central)
   PostgreSQL Version: 15 or 16 (latest stable)
   ```

3. **Get Connection String**
   - Navigate to: **Dashboard** → **Connection Details**
   - Copy the connection string (starts with `postgresql://`)
   - Format: `postgresql://username:password@host/database?sslmode=require`
   - **Save this securely** - you'll need it for configuration

### Step 2: Database Schema

The database schema is defined in `src/lib/schema.ts`. It includes:

**Tables:**
- `users` - User accounts with authentication data
- `investor_applications` - Investment interest applications
- `investor_profiles` - Extended investor information
- `admin_actions` - Audit log for admin activities
- `newsletter_signups` - Newsletter subscription data
- `portal_sessions` - Session tracking (optional)

**Key Fields in `users` table:**
```sql
- id (SERIAL PRIMARY KEY)
- email (VARCHAR, UNIQUE, NOT NULL)
- first_name, last_name (VARCHAR)
- password_hash (VARCHAR) - bcrypt hashed
- role (VARCHAR) - 'pending', 'standard', 'investor', 'admin'
- user_type (VARCHAR) - Extended classification
- is_verified (BOOLEAN)
- reset_token, reset_token_expires - Password reset
- created_at, updated_at (TIMESTAMPTZ)
```

### Step 3: Run Migrations

**Local Development:**
```bash
# Start dev server
npm run dev

# In another terminal, run migration
curl http://localhost:8888/.netlify/functions/db-migrate
```

**Production:**
```bash
# After deploying to Netlify
curl https://your-domain.info/.netlify/functions/db-migrate
```

**Verify Migration:**
```bash
# Use Neon dashboard SQL editor to verify tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';
```

---

## Environment Configuration

### Required Environment Variables

Create a `.env` file in the project root:

```bash
# ============================================
# DATABASE CONFIGURATION
# ============================================
# Neon PostgreSQL connection string
# Get from: https://console.neon.tech → Connection Details
DATABASE_URL=postgresql://username:password@ep-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require
NEON_DATABASE_URL=postgresql://username:password@ep-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require

# ============================================
# AUTHENTICATION
# ============================================
# Secret key for JWT token signing (generate with: openssl rand -base64 32)
SESSION_SECRET=your-strong-random-secret-key-min-32-characters

# Admin emails (comma-separated, case-insensitive)
# These emails will automatically receive admin role on signup
ADMIN_EMAILS=admin@grahmos.info,support@grahmos.info,youremail@example.com

# ============================================
# APPLICATION URLS
# ============================================
# Your application domain (change per deployment)
VITE_APP_URL=http://localhost:8888
VITE_API_URL=http://localhost:8888/api
URL=http://localhost:8888

# ============================================
# EMAIL SERVICE (OPTIONAL)
# ============================================
# SendGrid API Key (for transactional emails)
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
FROM_EMAIL=noreply@grahmos.info

# Alternative: Custom webhook
WEBHOOK_URL=https://your-webhook-service.com/send-email
WEBHOOK_TOKEN=your_webhook_token

# ============================================
# DEVELOPMENT
# ============================================
NODE_ENV=development
```

### Generating Secure Secrets

**SESSION_SECRET:**
```bash
# Option 1: OpenSSL (Mac/Linux)
openssl rand -base64 32

# Option 2: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Option 3: Online generator
# Visit: https://generate-secret.vercel.app/32
```

### Environment Variable Priority

Variables are loaded in this order (later overrides earlier):
1. System environment variables
2. `.env` file (local development only, not committed to git)
3. Netlify environment variables (production)

---

## Local Development Setup

### Prerequisites
- **Node.js**: v18+ (LTS recommended)
- **npm**: v9+ (comes with Node.js)
- **Netlify CLI**: For local function testing

### Installation Steps

**1. Clone and Install**
```bash
# Clone repository
cd /Users/paco/grahmos-investor-portal

# Install dependencies
npm install

# Install Netlify CLI globally (if not already installed)
npm install -g netlify-cli
```

**2. Configure Environment**
```bash
# Copy example environment file
cp .env.example .env

# Edit .env with your actual values
nano .env  # or use your preferred editor
```

**3. Setup Database**
```bash
# Test database connection
npm run test:db

# Run migrations
npm run dev  # Start dev server first
curl http://localhost:8888/.netlify/functions/db-migrate
```

**4. Start Development Server**
```bash
# Start Netlify Dev (recommended - includes functions)
npm run dev

# Alternative: Vite only (no backend functions)
npm run dev:vite
```

**5. Access Application**
```
Frontend: http://localhost:8888
Functions: http://localhost:8888/.netlify/functions/[function-name]
```

### Development Commands

```bash
# Development
npm run dev              # Start Netlify Dev server (port 8888)
npm run dev:vite         # Start Vite only (port 5173)

# Building
npm run build            # Production build
npm run build:safe       # Build with environment validation

# Testing
npm run test:db          # Test database connection
npm run lint             # Run ESLint
npm run preview          # Preview production build

# Deployment
npm run validate-env     # Validate environment variables
npm run deploy           # Deploy with validation
npm run deploy:safe      # Quick validated deployment
```

---

## Authentication Flow

### Signup Flow

**1. User Registration**
```
POST /.netlify/functions/auth-signup
Body: { email, password, firstName, lastName }
```

**2. Backend Processing:**
```javascript
// netlify/functions/auth-signup.ts
1. Validate email/password
2. Check if email already exists (Neon DB query)
3. Hash password with bcrypt (12 rounds)
4. Check if email is in ADMIN_EMAILS
5. Insert user into database
6. Generate JWT token
7. Set HTTP-only session cookie
8. Send welcome email (optional)
9. Return user data
```

**3. Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "standard",
    "userType": "user"
  },
  "message": "Account created successfully!"
}
```

### Login Flow

**1. User Login**
```
POST /.netlify/functions/auth-login
Body: { email, password }
```

**2. Backend Processing:**
```javascript
// netlify/functions/auth-login.ts
1. Validate email/password provided
2. Query user by email (with password_hash)
3. Compare password with bcrypt
4. Generate JWT token
5. Set HTTP-only session cookie
6. Return user data
```

**3. Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "standard",
    "userType": "user"
  },
  "message": "Login successful"
}
```

### Session Validation

**1. Check Auth Status**
```
GET /.netlify/functions/auth-me
Headers: Cookie: session=[jwt-token]
```

**2. Backend Processing:**
```javascript
// netlify/functions/auth-me.ts
1. Extract JWT from session cookie
2. Verify JWT signature and expiration
3. Return user data if valid
4. Return 401 if invalid/expired
```

### Logout Flow

**1. User Logout**
```
POST /.netlify/functions/auth-logout
```

**2. Backend Processing:**
```javascript
// netlify/functions/auth-logout.ts
1. Clear session cookie (set Max-Age=0)
2. Return success response
```

### Password Reset Flow

**1. Request Reset**
```
POST /.netlify/functions/auth-forgot-password
Body: { email }
```

**2. Backend Processing:**
- Generate random reset token
- Store token + expiration in database
- Send reset email with token link

**3. Reset Password**
```
POST /.netlify/functions/auth-reset-password
Body: { token, newPassword }
```

**4. Backend Processing:**
- Validate token and expiration
- Hash new password
- Update user password
- Clear reset token
- Return success

---

## Multi-Domain Deployment

### Overview

Deploy the same codebase to multiple domains:
- **grahmos.info** (primary)
- **grahmos.app**
- **grahmos.store**
- **grahmos.net**
- **grahmos.org**

### Deployment Options

**Option A: Shared Database (Recommended)**
- All domains connect to the same Neon database
- Users can log in from any domain
- Simplest to maintain
- **Note:** Sessions are domain-specific (cookies don't transfer between domains)

**Option B: Separate Databases**
- Each domain has its own database
- Complete data isolation
- More complex maintenance
- Higher cost

### Setup for Each Domain

**1. Create Netlify Site**

```bash
# For each domain
netlify init

# Site settings:
# - Site name: grahmos-[extension] (e.g., grahmos-app)
# - Build command: npm run build
# - Publish directory: dist
```

**2. Configure Custom Domain**

```
Netlify Dashboard → Domain Settings → Add custom domain
Domain: grahmos.[extension]

Configure DNS:
- Add CNAME record: www → [site-name].netlify.app
- Add A record: @ → 75.2.60.5 (Netlify Load Balancer)
```

**3. Configure Environment Variables**

```bash
# For each site in Netlify Dashboard:
# Site Settings → Environment Variables → Add

# Required variables:
DATABASE_URL=postgresql://...                    # Same or different per domain
SESSION_SECRET=your-secret-key                   # Same for all domains recommended
ADMIN_EMAILS=admin@grahmos.info,support@grahmos.info
VITE_APP_URL=https://grahmos.[extension]        # Different per domain
VITE_API_URL=https://grahmos.[extension]/api    # Different per domain
URL=https://grahmos.[extension]                 # Different per domain
SENDGRID_API_KEY=SG.xxx                          # Same for all domains
FROM_EMAIL=noreply@grahmos.info                  # Same for all domains
NODE_ENV=production                              # Production setting
```

**4. Deploy Each Site**

```bash
# Link to specific site
netlify link

# Deploy to production
netlify deploy --prod

# Or use automated deployment
git push origin main  # If connected to GitHub
```

**5. Run Migrations**

```bash
# For each domain (only needed once if sharing database)
curl https://grahmos.[extension]/.netlify/functions/db-migrate
```

### Testing Multi-Domain Setup

**Checklist for each domain:**
- [ ] Site loads at https://grahmos.[extension]
- [ ] SSL certificate active (HTTPS working)
- [ ] Signup creates user in database
- [ ] Login works with created user
- [ ] Session persists after page refresh
- [ ] Logout clears session
- [ ] Protected routes redirect when not authenticated
- [ ] Admin emails receive admin role
- [ ] Password reset emails sent

### Domain-Specific Configuration

**Update these per domain:**

`netlify.toml` (if using different configs):
```toml
[build]
  command = "npm run build"
  publish = "dist"
  
[build.environment]
  VITE_APP_URL = "https://grahmos.app"
  
[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

---

## Testing

### Manual Testing Checklist

**Authentication:**
- [ ] Signup with new email
- [ ] Signup with existing email (should fail)
- [ ] Signup with weak password (should fail)
- [ ] Login with correct credentials
- [ ] Login with incorrect password (should fail)
- [ ] Login with non-existent email (should fail)
- [ ] Session persists after page refresh
- [ ] Logout clears session
- [ ] Access protected route without login (should redirect/deny)

**Admin Features:**
- [ ] Admin email gets admin role on signup
- [ ] Admin can access admin dashboard
- [ ] Standard user cannot access admin dashboard
- [ ] Admin can view investor applications
- [ ] Admin can approve/reject applications

**Investor Features:**
- [ ] Standard user can submit investor application
- [ ] Investor role can access investor portal
- [ ] Standard role cannot access investor portal

**Password Reset:**
- [ ] Request reset email for valid account
- [ ] Reset token link works
- [ ] Can set new password with valid token
- [ ] Cannot use expired token
- [ ] Cannot use token twice

### Testing Tools

**cURL Commands:**

```bash
# Signup
curl -X POST http://localhost:8888/.netlify/functions/auth-signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass123","firstName":"Test","lastName":"User"}'

# Login
curl -X POST http://localhost:8888/.netlify/functions/auth-login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass123"}' \
  -c cookies.txt

# Check auth status (with saved cookies)
curl -X GET http://localhost:8888/.netlify/functions/auth-me \
  -b cookies.txt

# Logout
curl -X POST http://localhost:8888/.netlify/functions/auth-logout \
  -b cookies.txt
```

**Database Queries:**

```sql
-- Check user creation
SELECT id, email, role, created_at FROM users ORDER BY created_at DESC LIMIT 5;

-- Check password hashes (should start with $2b$12$)
SELECT email, LEFT(password_hash, 20) as hash_preview FROM users;

-- Check admin roles
SELECT email, role FROM users WHERE role = 'admin';

-- Check investor applications
SELECT u.email, ia.status, ia.created_at 
FROM investor_applications ia 
JOIN users u ON u.id = ia.user_id 
ORDER BY ia.created_at DESC;
```

---

## Troubleshooting

### Common Issues

**1. "DATABASE_URL environment variable must be set"**

**Cause:** Missing or incorrectly named environment variable

**Solution:**
```bash
# Check .env file exists
ls -la .env

# Verify variable is set
cat .env | grep DATABASE_URL

# For Netlify Functions, also add NEON_DATABASE_URL
echo "NEON_DATABASE_URL=$DATABASE_URL" >> .env
```

**2. "Failed to connect to Neon database"**

**Cause:** Invalid connection string or network issue

**Solution:**
```bash
# Test connection
npm run test:db

# Verify connection string format
# Should be: postgresql://user:pass@host/db?sslmode=require

# Check Neon database is not suspended (free tier suspends after 7 days inactivity)
# Visit: https://console.neon.tech → wake up database
```

**3. "Invalid credentials" on login (but credentials are correct)**

**Cause:** User created with Notion API instead of Neon, or password field mismatch

**Solution:**
```bash
# Check which database the user is in
# Query Neon database in console.neon.tech:
SELECT email, password_hash FROM users WHERE email = 'your@email.com';

# If password_hash is NULL or user doesn't exist, recreate account
```

**4. Sessions not persisting**

**Cause:** Cookie not being set or different domain issues

**Solution:**
```bash
# Check cookie settings in browser DevTools → Application → Cookies

# Ensure SESSION_SECRET is set
echo $SESSION_SECRET

# For production, ensure HTTPS is enabled (required for Secure cookies)
```

**5. Admin emails not getting admin role**

**Cause:** ADMIN_EMAILS not configured correctly

**Solution:**
```bash
# Check environment variable (case-sensitive matching)
echo $ADMIN_EMAILS

# Should be comma-separated, no spaces
# Correct: admin@grahmos.info,support@grahmos.info
# Wrong: admin@grahmos.info, support@grahmos.info  (has space)

# Update user role manually if needed:
# In Neon console:
UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
```

**6. CORS errors on API requests**

**Cause:** Incorrect CORS headers or OPTIONS requests not handled

**Solution:**
```javascript
// All functions should have this OPTIONS handler:
if (event.httpMethod === 'OPTIONS') {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    }
  };
}
```

**7. "Notion API" errors (after migration)**

**Cause:** Old imports still referencing _notion.ts

**Solution:**
```bash
# Search for Notion imports
grep -r "from '.*_notion'" netlify/functions/

# Should return no results in auth functions
# If found, update to use _db.ts and dbOperations from schema.ts
```

### Debug Mode

**Enable verbose logging:**

```javascript
// Add to any function for debugging
console.log('🔍 Debug:', {
  headers: event.headers,
  body: event.body,
  env: {
    hasDatabaseUrl: !!process.env.DATABASE_URL,
    hasSessionSecret: !!process.env.SESSION_SECRET
  }
});
```

**View logs:**

```bash
# Local development
# Logs appear in terminal running `npm run dev`

# Production (Netlify)
# Visit: Netlify Dashboard → Functions → [function name] → Logs
# Or use CLI:
netlify functions:logs [function-name]
```

---

## Security Best Practices

### Password Security
- ✅ Passwords hashed with bcrypt (salt rounds = 12)
- ✅ Minimum 8 characters enforced
- ✅ Password never stored in plain text
- ✅ Password never logged or returned in API responses

### Session Security
- ✅ JWT tokens signed with strong secret (32+ chars)
- ✅ Tokens expire after 7 days
- ✅ HTTP-only cookies (not accessible to JavaScript)
- ✅ Secure flag (HTTPS only in production)
- ✅ SameSite=Strict (CSRF protection)

### Database Security
- ✅ Connection string never exposed to client
- ✅ Parameterized queries (SQL injection protection)
- ✅ Environment variables not committed to git
- ✅ Different secrets per environment

### API Security
- ✅ CORS configured properly
- ✅ OPTIONS requests handled
- ✅ Input validation on all endpoints
- ✅ Error messages don't leak sensitive info

### Recommended Enhancements

**Rate Limiting:**
```javascript
// Add to auth functions to prevent brute force
const loginAttempts = new Map();

function checkRateLimit(ip) {
  const attempts = loginAttempts.get(ip) || 0;
  if (attempts > 5) {
    throw new Error('Too many attempts. Try again in 15 minutes.');
  }
  loginAttempts.set(ip, attempts + 1);
  setTimeout(() => loginAttempts.delete(ip), 15 * 60 * 1000);
}
```

**Email Verification:**
```javascript
// On signup, send verification email
// User must verify before full access
is_verified: false  // in database
verification_token: uuid()  // random token
// Send email with link containing token
```

**Two-Factor Authentication (2FA):**
- Use TOTP (Time-based One-Time Password)
- Libraries: `otplib`, `speakeasy`
- Store 2FA secret encrypted in database

**Session Invalidation:**
```javascript
// When user changes password, invalidate all sessions
// Store session tokens in database
// On password change, delete all user's sessions
```

---

## Maintenance

### Regular Tasks

**Weekly:**
- [ ] Review error logs in Netlify dashboard
- [ ] Check database usage (Neon dashboard)
- [ ] Monitor authentication success rates

**Monthly:**
- [ ] Review and rotate SESSION_SECRET if needed
- [ ] Audit admin actions log
- [ ] Clean up expired password reset tokens

**Quarterly:**
- [ ] Security audit
- [ ] Update dependencies (`npm audit` and `npm update`)
- [ ] Review and update documentation

### Backup Strategy

**Database Backups:**
```bash
# Neon provides automatic backups (check your plan)
# For manual backup:
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql

# Restore from backup:
psql $DATABASE_URL < backup-20250101.sql
```

**Environment Variables Backup:**
```bash
# Export from Netlify
netlify env:list > env-backup-$(date +%Y%m%d).txt

# Keep securely (encrypted)
```

---

## Additional Resources

### Documentation
- **Neon Docs**: https://neon.tech/docs
- **Netlify Functions**: https://docs.netlify.com/functions
- **JWT**: https://jwt.io
- **bcrypt**: https://github.com/kelektiv/node.bcrypt.js

### Support
- **Project Issues**: [GitHub Issues]
- **Neon Support**: support@neon.tech
- **Netlify Support**: support@netlify.com

### Related Files
- `WARP.md` - Development commands and project structure
- `NOTION_TASKS.md` - Implementation task list
- `.env.example` - Environment variable template
- `package.json` - Scripts and dependencies

---

**Last Updated:** 2025-10-26  
**Version:** 1.0.0  
**Maintainer:** GrahmOS Development Team

---

## Quick Start Checklist

For a new domain deployment:

1. **Database Setup**
   - [ ] Create/use Neon database
   - [ ] Save connection string
   - [ ] Run migrations

2. **Environment Configuration**
   - [ ] Create .env file
   - [ ] Set DATABASE_URL
   - [ ] Set SESSION_SECRET
   - [ ] Set ADMIN_EMAILS
   - [ ] Set domain-specific URLs

3. **Netlify Setup**
   - [ ] Create new site
   - [ ] Configure custom domain
   - [ ] Set environment variables
   - [ ] Deploy code

4. **Testing**
   - [ ] Test signup
   - [ ] Test login
   - [ ] Test admin access
   - [ ] Test session persistence

5. **Go Live**
   - [ ] Configure DNS
   - [ ] Enable HTTPS
   - [ ] Test from multiple locations
   - [ ] Monitor for errors

**Time Estimate:** 30-45 minutes per domain (after first setup)
