# GrahmOS Authentication System - Action Items

## 🚨 CRITICAL - Do First

### 1. Configure Neon Database
**Owner:** DevOps  
**Status:** 🔴 Not Started  
**Priority:** P0 - BLOCKER

- [ ] Get Neon connection string from https://console.neon.tech
- [ ] Add `DATABASE_URL` to `.env` file
- [ ] Add `DATABASE_URL` to Netlify environment variables
- [ ] Test connection: `npm run test:db`

**Resources:** AUTH_SETUP_README.md Section 3

---

### 2. Generate Secrets
**Owner:** DevOps  
**Status:** 🔴 Not Started  
**Priority:** P0 - BLOCKER

- [ ] Generate `SESSION_SECRET`: `openssl rand -base64 32`
- [ ] Add to `.env` file
- [ ] Add to Netlify environment variables
- [ ] Configure `ADMIN_EMAILS` (comma-separated, no spaces)

**Resources:** AUTH_SETUP_README.md Section 4

---

### 3. Run Database Migration
**Owner:** Backend Developer  
**Status:** 🔴 Not Started  
**Priority:** P0 - BLOCKER  
**Depends On:** Task 1

- [ ] Start dev server: `npm run dev`
- [ ] Run migration: `curl http://localhost:8888/.netlify/functions/db-migrate`
- [ ] Verify tables created in Neon console
- [ ] Run migration on production after deployment

**Resources:** AUTH_SETUP_README.md Section 3.3

---

## 🔧 HIGH PRIORITY - Fix Authentication

### 4. Test Fixed Auth Functions
**Owner:** Backend Developer  
**Status:** 🟡 In Progress (Code Fixed, Testing Needed)  
**Priority:** P1 - HIGH  
**Depends On:** Tasks 1, 2, 3

**Already Fixed:**
- ✅ `auth-login.ts` - Updated to use Neon
- ✅ `auth-signup.ts` - Updated to use Neon

**Test Checklist:**
- [ ] Test signup with new email
- [ ] Test login with created account
- [ ] Verify admin email gets admin role
- [ ] Test session persistence
- [ ] Test logout
- [ ] Test invalid credentials handling

**Test Commands:**
```bash
# Signup test
curl -X POST http://localhost:8888/.netlify/functions/auth-signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass123","firstName":"Test","lastName":"User"}'

# Login test
curl -X POST http://localhost:8888/.netlify/functions/auth-login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass123"}'
```

**Resources:** AUTH_SETUP_README.md Section 8

---

### 5. Review & Update Other Auth Functions
**Owner:** Backend Developer  
**Status:** 🔴 Not Started  
**Priority:** P1 - HIGH  
**Depends On:** Task 4

Check these files for Notion API imports and update if needed:
- [ ] `auth-forgot-password.ts`
- [ ] `auth-reset-password.ts`
- [ ] `auth-logout.ts`

**Pattern to Follow:**
```typescript
// OLD (remove)
import { json, notionOperations } from './_notion';

// NEW (use)
import { json } from './_db';
import { dbOperations } from '../../src/lib/schema';
```

---

## 📦 MEDIUM PRIORITY - Application Features

### 6. Update Investor Application System
**Owner:** Backend Developer  
**Status:** 🔴 Not Started  
**Priority:** P2 - MEDIUM  
**Depends On:** Task 5

- [ ] Review `investor-apply.ts`
- [ ] Update to use `dbOperations.createInvestorApplication()`
- [ ] Test application submission
- [ ] Verify email notifications work

---

### 7. Update Admin Request System
**Owner:** Backend Developer  
**Status:** 🔴 Not Started  
**Priority:** P2 - MEDIUM  
**Depends On:** Task 5

- [ ] Review `admin-requests.ts`
- [ ] Update to use `dbOperations.getInvestorApplications()`
- [ ] Update to use `dbOperations.updateInvestorApplicationStatus()`
- [ ] Test approval/rejection workflow
- [ ] Verify audit logging works

---

## 🌍 Multi-Domain Deployment

### 8. Deploy to grahmos.info (Primary)
**Owner:** DevOps  
**Status:** 🔴 Not Started  
**Priority:** P1 - HIGH  
**Depends On:** Tasks 1-5 Complete

- [ ] Configure Netlify site
- [ ] Set environment variables in Netlify
- [ ] Deploy code: `netlify deploy --prod`
- [ ] Run database migration on production
- [ ] Test all auth flows
- [ ] Configure custom domain & SSL

**Time Estimate:** 45 minutes

---

### 9. Deploy to Additional Domains
**Owner:** DevOps  
**Status:** 🔴 Not Started  
**Priority:** P2 - MEDIUM  
**Depends On:** Task 8

For each domain (.app, .store, .net, .org):
- [ ] Create Netlify site
- [ ] Use SAME `DATABASE_URL` (shared database)
- [ ] Use DIFFERENT `VITE_APP_URL` per domain
- [ ] Deploy and test
- [ ] Configure DNS and SSL

**Time Estimate:** 30 minutes per domain

**Resources:** AUTH_SETUP_README.md Section 7

---

## ✅ Testing & QA

### 10. End-to-End Testing
**Owner:** QA Engineer  
**Status:** 🔴 Not Started  
**Priority:** P1 - HIGH  
**Depends On:** Task 8

**Authentication Tests:**
- [ ] Signup with new email
- [ ] Signup with existing email (should fail)
- [ ] Login with correct password
- [ ] Login with incorrect password (should fail)
- [ ] Session persistence after refresh
- [ ] Logout clears session
- [ ] Protected routes block unauthenticated users

**Role-Based Tests:**
- [ ] Admin email gets admin role
- [ ] Standard user cannot access admin pages
- [ ] Investor can access investor portal
- [ ] Standard user cannot access investor portal

**Password Reset:**
- [ ] Request reset email
- [ ] Reset link works
- [ ] Expired token rejected
- [ ] Token cannot be reused

---

## 🧹 Cleanup

### 11. Remove Unused Code (Optional)
**Owner:** Backend Developer  
**Status:** 🔴 Not Started  
**Priority:** P3 - LOW  
**Depends On:** All above tasks complete

**Decision Required:** Are you keeping Notion API for anything else?

If NO (moving entirely to Neon):
- [ ] Delete `netlify/functions/_notion.ts`
- [ ] Remove `@notionhq/client` from package.json
- [ ] Remove Notion API keys from environment variables
- [ ] Update documentation

If YES (keeping Notion for other features):
- [ ] Document what Notion API is used for
- [ ] Keep `_notion.ts` but ensure no auth code uses it

---

## 📊 Status Dashboard

| Phase | Tasks | Status | Priority |
|-------|-------|--------|----------|
| Database Setup | 1-3 | 🔴 Not Started | P0 - BLOCKER |
| Auth Fix | 4-5 | 🟡 Code Fixed | P1 - HIGH |
| Application Features | 6-7 | 🔴 Not Started | P2 - MEDIUM |
| Deployment | 8-9 | 🔴 Not Started | P1 - HIGH |
| Testing | 10 | 🔴 Not Started | P1 - HIGH |
| Cleanup | 11 | 🔴 Not Started | P3 - LOW |

---

## 🎯 Sprint 1 Goals (This Week)

**Must Complete:**
1. ✅ Fix auth code (DONE)
2. 🔴 Configure Neon database
3. 🔴 Generate secrets
4. 🔴 Run migrations
5. 🔴 Test authentication
6. 🔴 Deploy to grahmos.info

**Success Metrics:**
- Users can signup and login on grahmos.info
- Sessions persist correctly
- Admin emails get admin role
- No authentication errors in logs

---

## 🆘 Blockers

| Blocker | Impact | Owner | Resolution |
|---------|--------|-------|------------|
| No Neon connection string | 🔴 CRITICAL | DevOps | Get from console.neon.tech |
| No SESSION_SECRET | 🔴 CRITICAL | DevOps | Generate with openssl |

---

## 📚 Documentation

- **Main Setup Guide:** `AUTH_SETUP_README.md`
- **Full Task List:** `NOTION_TASKS.md`
- **Quick Summary:** `IMPLEMENTATION_SUMMARY.md`
- **Dev Commands:** `WARP.md`

---

## 💡 Key Decisions Made

| Decision | Rationale | Date |
|----------|-----------|------|
| Use Neon PostgreSQL | Production-grade, better for auth & applications | 2025-10-26 |
| Remove Notion from auth | Security concerns, not designed for auth | 2025-10-26 |
| Shared database for all domains | Simpler maintenance, users can use any domain | 2025-10-26 |

---

**Next Action:** Configure Neon database connection (Task 1)  
**Blocking:** Tasks 4-11 blocked until Tasks 1-3 complete  
**Estimated Time to Production:** 4-6 hours of focused work
