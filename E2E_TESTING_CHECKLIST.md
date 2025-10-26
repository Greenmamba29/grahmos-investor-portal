# End-to-End Testing Checklist

**Project:** GrahmOS Investor Portal  
**Version:** V2.0.0  
**Database:** Neon PostgreSQL  
**Last Updated:** October 26, 2025

---

## Testing Environment Setup

###Prerequisites
```bash
# Ensure environment variables are set
cat .env | grep -E "DATABASE_URL|SESSION_SECRET|ADMIN_EMAILS"

# Start development server
npm run dev

# In a separate terminal, verify database connection
npm run test:db
```

---

## 1. Authentication Tests

### 1.1 User Signup ✅

**Test**: New user registration

```bash
# Test signup with valid data
curl -X POST http://localhost:8888/.netlify/functions/auth-signup \
  -H "Content-Type: application/json" \
  -d '{
    "email":"testuser-'$(date +%s)'@example.com",
    "password":"SecurePass123!",
    "firstName":"Test",
    "lastName":"User"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "testuser@example.com",
    "firstName": "Test",
    "lastName": "User",
    "role": "standard"
  }
}
```

**Verify in Database:**
```sql
SELECT id, email, role, created_at FROM users WHERE email LIKE 'testuser%';
```

**Manual Test (Browser):**
1. Navigate to http://localhost:8888/auth
2. Click "Sign Up" tab
3. Enter: email, password, first name, last name
4. Click "Create Account"
5. Should see success message and redirect to dashboard

---

### 1.2 Duplicate Email Prevention ✅

**Test**: Signup with existing email should fail

```bash
# First signup
curl -X POST http://localhost:8888/.netlify/functions/auth-signup \
  -H "Content-Type: application/json" \
  -d '{"email":"duplicate@test.com","password":"test123","firstName":"First","lastName":"User"}'

# Second signup with same email (should fail)
curl -X POST http://localhost:8888/.netlify/functions/auth-signup \
  -H "Content-Type: application/json" \
  -d '{"email":"duplicate@test.com","password":"test123","firstName":"Second","lastName":"User"}'
```

**Expected Response (2nd attempt):**
```json
{
  "error": "User already exists",
  "details": "An account with this email already exists"
}
```

---

### 1.3 Login with Correct Credentials ✅

**Test**: Login with valid email/password

```bash
curl -X POST http://localhost:8888/.netlify/functions/auth-login \
  -H "Content-Type: application/json" \
  -d '{"email":"testuser@example.com","password":"SecurePass123!"}'
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "testuser@example.com",
    "firstName": "Test",
    "lastName": "User",
    "role": "standard"
  },
  "message": "Login successful"
}
```

**Check**: Response should include `Set-Cookie` header with JWT token

---

### 1.4 Login with Incorrect Password ✅

**Test**: Login should fail with wrong password

```bash
curl -X POST http://localhost:8888/.netlify/functions/auth-login \
  -H "Content-Type: application/json" \
  -d '{"email":"testuser@example.com","password":"WrongPassword123"}'
```

**Expected Response:**
```json
{
  "error": "Invalid credentials",
  "details": "Email or password is incorrect"
}
```

---

### 1.5 Admin Role Assignment ✅

**Test**: Admin email gets admin role automatically

```bash
# Use email from ADMIN_EMAILS environment variable
curl -X POST http://localhost:8888/.netlify/functions/auth-signup \
  -H "Content-Type: application/json" \
  -d '{
    "email":"admin@grahmos.info",
    "password":"AdminPass123!",
    "firstName":"Admin",
    "lastName":"User"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "role": "admin"  // ← Should be admin, not standard
  }
}
```

**Verify:**
```sql
SELECT email, role FROM users WHERE email = 'admin@grahmos.info';
-- role should be 'admin'
```

---

### 1.6 Session Persistence ✅

**Test**: JWT token persists across requests

```bash
# 1. Login and save cookie
curl -X POST http://localhost:8888/.netlify/functions/auth-login \
  -H "Content-Type: application/json" \
  -d '{"email":"testuser@example.com","password":"SecurePass123!"}' \
  -c cookies.txt

# 2. Use cookie in subsequent request
curl -X GET http://localhost:8888/.netlify/functions/auth-session \
  -b cookies.txt
```

**Expected**: Session should be valid and return user data

**Manual Test:**
1. Login via browser
2. Navigate to /dashboard
3. Refresh page
4. Should remain logged in (not redirected to /auth)

---

### 1.7 Logout Functionality ✅

**Test**: Logout clears session

```bash
# 1. Login
curl -X POST http://localhost:8888/.netlify/functions/auth-login \
  -H "Content-Type: application/json" \
  -d '{"email":"testuser@example.com","password":"SecurePass123!"}' \
  -c cookies.txt

# 2. Logout
curl -X POST http://localhost:8888/.netlify/functions/auth-logout \
  -b cookies.txt \
  -c cookies-after-logout.txt

# 3. Try to access protected resource
curl -X GET http://localhost:8888/.netlify/functions/auth-session \
  -b cookies-after-logout.txt
```

**Expected**: 3rd request should fail with 401 Unauthorized

---

### 1.8 Password Reset Flow ✅

**Test**: Complete password reset process

```bash
# 1. Request password reset
curl -X POST http://localhost:8888/.netlify/functions/auth-forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"testuser@example.com"}'

# 2. Check database for reset token
# SELECT reset_token, reset_token_expires FROM users WHERE email = 'testuser@example.com';

# 3. Use reset token (replace TOKEN with actual value from DB)
curl -X POST http://localhost:8888/.netlify/functions/auth-reset-password \
  -H "Content-Type: application/json" \
  -d '{"token":"RESET_TOKEN_HERE","newPassword":"NewSecurePass123!"}'

# 4. Login with new password
curl -X POST http://localhost:8888/.netlify/functions/auth-login \
  -H "Content-Type: application/json" \
  -d '{"email":"testuser@example.com","password":"NewSecurePass123!"}'
```

**Expected**: Login with new password should succeed

---

## 2. Role-Based Access Control Tests

### 2.1 Standard User Cannot Access Admin Routes ✅

**Test**: Non-admin user redirected from admin pages

**Manual Test:**
1. Login as standard user
2. Navigate to http://localhost:8888/admin
3. Should see "Access Denied" or redirect to /dashboard

---

### 2.2 Investor Access to Investor Portal ✅

**Setup**: Create investor user and upgrade role

```sql
-- Upgrade test user to investor
UPDATE users SET role = 'investor' WHERE email = 'testuser@example.com';
```

**Manual Test:**
1. Login as user with investor role
2. Navigate to http://localhost:8888/investor-portal
3. Should see investor content (not access denied)

---

### 2.3 Standard User Cannot Access Investor Portal ✅

**Test**: Standard role blocked from investor content

**Manual Test:**
1. Login as standard user (not investor)
2. Navigate to http://localhost:8888/investor-portal
3. Should see "Access Denied" page

---

### 2.4 Admin Has Access to All Routes ✅

**Test**: Admin can access all protected routes

**Manual Test (as admin@grahmos.info):**
1. Login as admin
2. Navigate to /dashboard ✅
3. Navigate to /investor-portal ✅
4. Navigate to /admin ✅
5. Navigate to /admin/requests ✅
6. All should be accessible

---

## 3. Investor Application Tests

### 3.1 Submit Investor Application ✅

**Test**: Authenticated user can apply for investor status

```bash
# 1. Login first
curl -X POST http://localhost:8888/.netlify/functions/auth-login \
  -H "Content-Type: application/json" \
  -d '{"email":"testuser@example.com","password":"SecurePass123!"}' \
  -c cookies.txt

# 2. Submit application
curl -X POST http://localhost:8888/.netlify/functions/investor-apply \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "pitch":"I am interested in investing in GrahmOS because of its unique offline-first approach.",
    "accreditation":true
  }'
```

**Expected Response:**
```json
{
  "ok": true,
  "application": {
    "id": 1,
    "status": "pending"
  }
}
```

**Verify:**
```sql
SELECT * FROM investor_applications WHERE user_id = (SELECT id FROM users WHERE email = 'testuser@example.com');
```

---

### 3.2 Unauthenticated Cannot Apply ✅

**Test**: Application requires authentication

```bash
curl -X POST http://localhost:8888/.netlify/functions/investor-apply \
  -H "Content-Type: application/json" \
  -d '{"pitch":"Test","accreditation":true}'
```

**Expected Response:** 401 Unauthorized or 403 Forbidden

---

## 4. Admin Application Management Tests

### 4.1 Admin Can View Applications ✅

**Test**: Admin retrieves all pending applications

```bash
# Login as admin
curl -X POST http://localhost:8888/.netlify/functions/auth-login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@grahmos.info","password":"AdminPass123!"}' \
  -c admin-cookies.txt

# Get applications
curl -X GET http://localhost:8888/.netlify/functions/admin-requests \
  -b admin-cookies.txt
```

**Expected Response:**
```json
{
  "applications": [
    {
      "id": 1,
      "email": "testuser@example.com",
      "first_name": "Test",
      "last_name": "User",
      "status": "pending",
      "pitch": "...",
      "accreditation": true,
      "created_at": "2025-10-26T..."
    }
  ]
}
```

---

### 4.2 Approve Investor Application ✅

**Test**: Admin approves application and user role upgrades

```bash
# Login as admin
curl -X POST http://localhost:8888/.netlify/functions/auth-login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@grahmos.info","password":"AdminPass123!"}' \
  -c admin-cookies.txt

# Approve application (use real application ID)
curl -X POST http://localhost:8888/.netlify/functions/admin-requests \
  -H "Content-Type: application/json" \
  -b admin-cookies.txt \
  -d '{"applicationId":1,"decision":"approved"}'
```

**Expected Response:**
```json
{
  "ok": true,
  "decision": "approved",
  "applicationId": 1
}
```

**Verify Role Upgrade:**
```sql
SELECT id, email, role FROM users WHERE id = (SELECT user_id FROM investor_applications WHERE id = 1);
-- role should now be 'investor'
```

**Verify Admin Action Logged:**
```sql
SELECT * FROM admin_actions WHERE target_application_id = 1;
```

---

### 4.3 Deny Investor Application ✅

**Test**: Admin denies application (no role upgrade)

```bash
curl -X POST http://localhost:8888/.netlify/functions/admin-requests \
  -H "Content-Type: application/json" \
  -b admin-cookies.txt \
  -d '{"applicationId":2,"decision":"denied"}'
```

**Expected**: Application status = 'denied', user role remains 'standard'

---

### 4.4 Non-Admin Cannot Access Admin Endpoints ✅

**Test**: Standard user blocked from admin functions

```bash
# Login as standard user
curl -X POST http://localhost:8888/.netlify/functions/auth-login \
  -H "Content-Type: application/json" \
  -d '{"email":"testuser@example.com","password":"SecurePass123!"}' \
  -c user-cookies.txt

# Try to access admin endpoint
curl -X GET http://localhost:8888/.netlify/functions/admin-requests \
  -b user-cookies.txt
```

**Expected Response:** 403 Forbidden with "admin only" error

---

## 5. Database Integrity Tests

### 5.1 User Email Uniqueness ✅

**SQL Test:**
```sql
-- Should fail with unique constraint violation
INSERT INTO users (email, password_hash, role) 
VALUES ('duplicate@test.com', 'hash123', 'standard');

INSERT INTO users (email, password_hash, role) 
VALUES ('duplicate@test.com', 'hash456', 'standard');
-- ERROR: duplicate key value violates unique constraint "users_email_key"
```

---

### 5.2 Foreign Key Constraints ✅

**SQL Test:**
```sql
-- Should fail - user_id doesn't exist
INSERT INTO investor_applications (user_id, pitch, status) 
VALUES (99999, 'Test pitch', 'pending');
-- ERROR: insert or update on table "investor_applications" violates foreign key constraint
```

---

### 5.3 Cascade Deletes ✅

**SQL Test:**
```sql
-- Create test user
INSERT INTO users (email, password_hash, role) 
VALUES ('cascade-test@test.com', 'hash', 'standard') 
RETURNING id;

-- Create application (use ID from above)
INSERT INTO investor_applications (user_id, pitch, status) 
VALUES (123, 'Test', 'pending');

-- Delete user - application should also be deleted
DELETE FROM users WHERE email = 'cascade-test@test.com';

-- Verify application deleted
SELECT * FROM investor_applications WHERE user_id = 123;
-- Should return 0 rows
```

---

## 6. Navigation & UX Tests

### 6.1 Cross-Page Navigation ✅

**Manual Test:**
1. Navigate to http://localhost:8888/investor-relations
2. Click "How It Works" in navigation
3. Should redirect to homepage and scroll to #how-it-works section
4. Click "Principles" → should scroll to #principles
5. Click "Stories" → should scroll to #stories

---

### 6.2 Case Study Links ✅

**Manual Test:**
1. Navigate to http://localhost:8888/
2. Scroll to "Real Stories" section
3. Click "Read Full Case Study" button
4. Should navigate to /case-studies page
5. Verify 3 case studies displayed with metrics

---

### 6.3 Protected Route Redirects ✅

**Manual Test (Not Logged In):**
1. Navigate to http://localhost:8888/dashboard
2. Should redirect to /auth
3. Navigate to /investor-portal
4. Should redirect to /auth or show access denied

**Manual Test (Logged In as Standard):**
1. Login as standard user
2. Navigate to /investor-portal
3. Should show "Access Denied" (not redirect)
4. Can still navigate back using browser controls

---

## 7. Production Deployment Tests

### 7.1 Database Migration on Production ✅

**Test**: Run migration on production

```bash
curl -X POST https://grahmos.info/.netlify/functions/db-migrate
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Database tables created successfully"
}
```

---

### 7.2 Production Signup Test ✅

```bash
curl -X POST https://grahmos.info/.netlify/functions/auth-signup \
  -H "Content-Type: application/json" \
  -d '{
    "email":"prod-test-'$(date +%s)'@example.com",
    "password":"ProdTest123!",
    "firstName":"Prod",
    "lastName":"Test"
  }'
```

**Expected**: Success response with user data

---

### 7.3 Production Login Test ✅

```bash
curl -X POST https://grahmos.info/.netlify/functions/auth-login \
  -H "Content-Type: application/json" \
  -d '{"email":"prod-test@example.com","password":"ProdTest123!"}'
```

**Expected**: Success with JWT token in Set-Cookie header

---

### 7.4 SSL/HTTPS Verification ✅

**Test**: All endpoints use HTTPS

```bash
# Should return 301 redirect to HTTPS
curl -I http://grahmos.info

# Should return 200 OK
curl -I https://grahmos.info
```

---

## 8. Performance Tests

### 8.1 Database Query Performance ✅

**SQL Test:**
```sql
-- Explain query plan for login
EXPLAIN ANALYZE 
SELECT * FROM users WHERE email = 'test@example.com';

-- Should use index scan, not sequential scan
-- Execution time should be < 5ms
```

---

### 8.2 API Response Times ✅

**Test**: Endpoints respond within acceptable timeframe

```bash
# Measure login response time
time curl -X POST http://localhost:8888/.netlify/functions/auth-login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}' \
  -o /dev/null -s

# Should complete in < 500ms
```

---

## Testing Checklist Summary

| Category | Test | Status | Priority |
|----------|------|--------|----------|
| **Authentication** | | | |
| 1.1 | User Signup | ⬜ | P0 |
| 1.2 | Duplicate Email Prevention | ⬜ | P0 |
| 1.3 | Login with Correct Credentials | ⬜ | P0 |
| 1.4 | Login with Incorrect Password | ⬜ | P0 |
| 1.5 | Admin Role Assignment | ⬜ | P0 |
| 1.6 | Session Persistence | ⬜ | P0 |
| 1.7 | Logout Functionality | ⬜ | P0 |
| 1.8 | Password Reset Flow | ⬜ | P1 |
| **RBAC** | | | |
| 2.1 | Standard User Cannot Access Admin | ⬜ | P0 |
| 2.2 | Investor Access to Investor Portal | ⬜ | P0 |
| 2.3 | Standard User Cannot Access Investor Portal | ⬜ | P0 |
| 2.4 | Admin Has Access to All Routes | ⬜ | P0 |
| **Applications** | | | |
| 3.1 | Submit Investor Application | ⬜ | P1 |
| 3.2 | Unauthenticated Cannot Apply | ⬜ | P1 |
| **Admin** | | | |
| 4.1 | Admin Can View Applications | ⬜ | P1 |
| 4.2 | Approve Investor Application | ⬜ | P1 |
| 4.3 | Deny Investor Application | ⬜ | P1 |
| 4.4 | Non-Admin Cannot Access Admin Endpoints | ⬜ | P1 |
| **Database** | | | |
| 5.1 | User Email Uniqueness | ⬜ | P0 |
| 5.2 | Foreign Key Constraints | ⬜ | P2 |
| 5.3 | Cascade Deletes | ⬜ | P2 |
| **UX** | | | |
| 6.1 | Cross-Page Navigation | ⬜ | P1 |
| 6.2 | Case Study Links | ⬜ | P1 |
| 6.3 | Protected Route Redirects | ⬜ | P1 |
| **Production** | | | |
| 7.1 | Database Migration | ⬜ | P0 |
| 7.2 | Production Signup | ⬜ | P0 |
| 7.3 | Production Login | ⬜ | P0 |
| 7.4 | SSL/HTTPS Verification | ⬜ | P0 |

---

## Quick Test Suite (Copy-Paste)

```bash
#!/bin/bash
# Quick E2E test suite for GrahmOS Investor Portal

echo "🧪 Starting E2E Tests..."

# 1. Signup Test
echo "\n1️⃣ Testing Signup..."
curl -s -X POST http://localhost:8888/.netlify/functions/auth-signup \
  -H "Content-Type: application/json" \
  -d '{"email":"quick-test-'$(date +%s)'@test.com","password":"Test123!","firstName":"Quick","lastName":"Test"}' \
  | jq '.success'

# 2. Login Test
echo "\n2️⃣ Testing Login..."
curl -s -X POST http://localhost:8888/.netlify/functions/auth-login \
  -H "Content-Type: application/json" \
  -d '{"email":"quick-test@test.com","password":"Test123!"}' \
  -c test-cookies.txt \
  | jq '.success'

# 3. Session Test
echo "\n3️⃣ Testing Session..."
curl -s -X GET http://localhost:8888/.netlify/functions/auth-session \
  -b test-cookies.txt \
  | jq '.authenticated'

# 4. Database Test
echo "\n4️⃣ Testing Database Connection..."
npm run test:db

echo "\n✅ Quick tests complete!"
```

---

**Testing Status:** Ready for comprehensive E2E validation  
**Next Steps:** Run checklist systematically, mark completed items  
**Report Issues:** Document any failures with error messages and expected vs actual behavior
