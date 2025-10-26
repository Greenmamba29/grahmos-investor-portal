# Authentication Testing Guide

## Test Accounts Setup ✅

Test accounts have been successfully created in your Neon database.

### Available Test Accounts

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@grahmos.info | TestAdmin123! |
| **Investor** | investor@test.com | TestInvestor123! |
| **Standard** | standard@test.com | TestStandard123! |

---

## Manual Testing Instructions

### 1. Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:8888`

### 2. Test Sign In Flow

1. Navigate to `http://localhost:8888/auth`
2. Enter test account credentials (use any from the table above)
3. Click "Sign In"
4. You should be redirected to the dashboard
5. Verify your role is displayed correctly

### 3. Test Sign Out Flow

1. While logged in, click the "Sign Out" button (typically in header/nav)
2. You should be redirected to the home page or auth page
3. Verify you can no longer access protected routes

### 4. Test Re-Sign In (Frictionless)

1. After signing out, go back to `/auth`
2. Sign in again with the same credentials
3. Verify the process is smooth and fast
4. Check that session persists correctly

### 5. Test Different Roles

Test each role to verify proper access:

#### Admin Account
- Can access: `/admin/*` routes
- Can access: `/investor-portal`
- Can access: `/dashboard`
- Can manage users and approve applications

#### Investor Account  
- Can access: `/investor-portal`
- Can access: `/dashboard`
- Cannot access: `/admin/*` routes

#### Standard Account
- Can access: `/dashboard`
- Cannot access: `/investor-portal`
- Cannot access: `/admin/*` routes

---

## Automated Testing

### Setup Test Accounts (Run anytime to reset credentials)

```bash
npm run setup:test-accounts
```

This will:
- Connect to Neon database
- Create or update test accounts
- Display credentials for testing

### Run Full Auth Flow Test (Requires dev server running)

```bash
npm run test:auth
```

This automated test will:
1. Test database connection
2. Create test accounts if needed
3. Test login for each account
4. Validate session tokens
5. Test logout functionality
6. Verify session cleanup

---

## Expected Behavior

### ✅ Successful Sign In
- User receives JWT token in HTTP-only cookie
- User data is returned (id, email, name, role)
- User is redirected to appropriate dashboard
- Session persists across page refreshes

### ✅ Successful Sign Out
- Session cookie is cleared
- User is redirected to public page
- Protected routes become inaccessible
- No stale session data remains

### ✅ Frictionless Experience
- Login completes in < 2 seconds
- No unnecessary redirects
- Clear feedback on success/failure
- Session remembers user (optional "Remember Me")

---

## Troubleshooting

### Issue: "Invalid credentials" error
- Verify test accounts exist: `npm run setup:test-accounts`
- Check that DATABASE_URL is set correctly in `.env`
- Ensure bcrypt password hashing is working

### Issue: Can't access protected routes after login
- Check browser cookies (should have `session` cookie)
- Verify JWT secret is set: `SESSION_SECRET` in `.env`
- Check browser console for errors

### Issue: Session expires immediately
- Verify `SESSION_SECRET` is at least 32 characters
- Check JWT expiration settings in `src/lib/auth.ts`
- Ensure cookies are being set with correct domain

### Issue: "Database connection failed"
- Run: `npm run test:db` to verify connection
- Check `DATABASE_URL` or `NEON_DATABASE_URL` in `.env`
- Ensure Neon database is accessible

---

## Quick Command Reference

```bash
# Setup/reset test accounts
npm run setup:test-accounts

# Start development server
npm run dev

# Test database connection
npm run test:db

# Run automated auth tests (requires server running)
npm run test:auth

# Validate environment variables
npm run validate-env
```

---

## Security Notes

⚠️ **Important**: These test accounts are for **development only**

- Never use these credentials in production
- Test passwords are intentionally simple
- Change `SESSION_SECRET` before deployment
- Use strong passwords for production accounts
- Consider implementing 2FA for production

---

## Next Steps

After verifying frictionless auth:

1. ✅ Test accounts created
2. ✅ Manual sign in/out tested
3. ✅ Role-based access verified
4. 🔄 Add automated E2E tests (optional)
5. 🔄 Add password reset flow testing
6. 🔄 Add session timeout testing
7. 🔄 Performance testing (load testing)

---

## Support

If you encounter issues:

1. Check the console logs (browser & server)
2. Review `.env` configuration
3. Verify Neon database schema is up to date: `curl http://localhost:8888/.netlify/functions/db-migrate`
4. Check WARP.md for architecture details
