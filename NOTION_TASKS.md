# GrahmOS Investor Portal - Authentication System Tasks

## 🎯 Objective
Establish a unified, production-ready authentication system for the GrahmOS Investor Portal that works seamlessly across multiple domains (.info, .app, .store, .net, .org).

---

## 📋 Current State Assessment

### Issues Identified
1. **Hybrid Database Architecture**: Application uses both Notion API (`_notion.ts`) and Neon PostgreSQL (`_db.ts`) inconsistently
2. **Authentication Flow Confusion**: Login/signup functions call Notion API, but database schema is built for Neon
3. **Environment Variable Conflicts**: `.env.example` shows Neon as "legacy" but code still references both
4. **No Clear Data Source**: Unclear which system is the source of truth for user data

### Current Architecture
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: Netlify Functions (serverless)
- **Database Options**: 
  - Neon PostgreSQL (with schema defined in `src/lib/schema.ts`)
  - Notion API (with operations in `netlify/functions/_notion.ts`)
- **Auth Method**: JWT tokens with HTTP-only cookies
- **RBAC Roles**: `pending`, `standard`, `investor`, `admin`

---

## ✅ Tasks to Complete

### Phase 1: Database Architecture Decision & Implementation

#### Task 1.1: Choose Primary Database System
**Priority**: CRITICAL  
**Assignee**: Backend Team Lead

**Decision Required**: Select ONE primary database system:

**Option A: Neon PostgreSQL (Recommended)**
- ✅ Production-grade relational database
- ✅ Full ACID compliance
- ✅ Better for complex queries and relationships
- ✅ Schema already defined and comprehensive
- ✅ Better for investor applications and audit logs
- ❌ Requires proper connection string configuration

**Option B: Notion API**
- ✅ No additional infrastructure
- ✅ Easy to view/manage data manually
- ❌ Not designed for production user authentication
- ❌ API rate limits
- ❌ Slower query performance
- ❌ Security concerns (storing passwords in Notion)

**Recommendation**: Use **Neon PostgreSQL** as primary database.

**Action Items**:
- [ ] Document final database decision
- [ ] Communicate decision to all team members
- [ ] Archive non-selected database code

---

#### Task 1.2: Configure Neon Database Connection
**Priority**: CRITICAL  
**Assignee**: DevOps / Backend Developer  
**Depends On**: Task 1.1

**Action Items**:
- [ ] Obtain Neon PostgreSQL connection string from Neon dashboard
- [ ] Add to `.env` file as `DATABASE_URL`
- [ ] Add to Netlify environment variables:
  ```bash
  netlify env:set DATABASE_URL "postgresql://user:pass@host/db?sslmode=require"
  ```
- [ ] Verify connection using test script: `npm run test:db`
- [ ] Document connection string format and where to obtain credentials

**Acceptance Criteria**:
- ✓ Database connection succeeds from local development
- ✓ Database connection succeeds from Netlify Functions
- ✓ Test script runs without errors

---

#### Task 1.3: Run Database Migrations
**Priority**: CRITICAL  
**Assignee**: Backend Developer  
**Depends On**: Task 1.2

**Action Items**:
- [ ] Run local migration: `curl http://localhost:8888/.netlify/functions/db-migrate`
- [ ] Verify all tables created:
  - `users` (with role, reset tokens, etc.)
  - `investor_applications`
  - `investor_profiles`
  - `admin_actions`
  - `newsletter_signups`
  - `portal_sessions`
- [ ] Run production migration after deployment
- [ ] Verify all indexes created properly

**Acceptance Criteria**:
- ✓ All tables exist in database
- ✓ All indexes created
- ✓ No migration errors in logs

---

### Phase 2: Authentication Function Refactoring

#### Task 2.1: Update auth-signup.ts to Use Neon
**Priority**: HIGH  
**Assignee**: Backend Developer  
**Depends On**: Task 1.3

**Current Issue**: Function imports from `_notion.ts` instead of using Neon database operations.

**Action Items**:
- [ ] Remove import from `_notion.ts`
- [ ] Import `dbOperations` from `src/lib/schema.ts` or `_db.ts`
- [ ] Replace `notionOperations.getUserByEmail()` with Neon query
- [ ] Replace `notionOperations.createUser()` with Neon insert
- [ ] Use `passwordHash` field instead of `password` field
- [ ] Ensure admin email detection works (`isAdminEmail()` from `_db.ts`)
- [ ] Test signup flow end-to-end

**Files to Modify**:
- `netlify/functions/auth-signup.ts`

**Acceptance Criteria**:
- ✓ New users created in Neon database
- ✓ Admin emails automatically get admin role
- ✓ Password properly hashed with bcrypt
- ✓ JWT token generated and returned
- ✓ Welcome email sent

---

#### Task 2.2: Update auth-login.ts to Use Neon
**Priority**: HIGH  
**Assignee**: Backend Developer  
**Depends On**: Task 1.3

**Current Issue**: Function imports from `_notion.ts` instead of using Neon database operations.

**Action Items**:
- [ ] Remove import from `_notion.ts`
- [ ] Import `dbOperations` from `src/lib/schema.ts`
- [ ] Replace `notionOperations.getUserByEmail()` with `dbOperations.getUserByEmailWithPassword()`
- [ ] Update password comparison to use `password_hash` field
- [ ] Ensure session token properly created
- [ ] Test login flow end-to-end

**Files to Modify**:
- `netlify/functions/auth-login.ts`

**Acceptance Criteria**:
- ✓ Users can log in with correct credentials
- ✓ Invalid credentials properly rejected
- ✓ JWT session token set as HTTP-only cookie
- ✓ User session data returned correctly

---

#### Task 2.3: Verify Other Auth Functions
**Priority**: MEDIUM  
**Assignee**: Backend Developer  
**Depends On**: Tasks 2.1, 2.2

**Action Items**:
- [ ] Review `auth-me.ts` - verify it uses JWT properly (✓ Already correct)
- [ ] Review `auth-logout.ts` - verify it clears session
- [ ] Review `auth-forgot-password.ts` - ensure uses Neon
- [ ] Review `auth-reset-password.ts` - ensure uses Neon
- [ ] Test all password reset flows

**Files to Review**:
- `netlify/functions/auth-me.ts` ✓
- `netlify/functions/auth-logout.ts`
- `netlify/functions/auth-forgot-password.ts`
- `netlify/functions/auth-reset-password.ts`

**Acceptance Criteria**:
- ✓ All auth endpoints use consistent database
- ✓ No references to Notion API in auth flow
- ✓ All flows tested and working

---

### Phase 3: Investor Application System

#### Task 3.1: Update Investor Application Functions
**Priority**: MEDIUM  
**Assignee**: Backend Developer  
**Depends On**: Phase 2 Complete

**Action Items**:
- [ ] Review `investor-apply.ts`
- [ ] Ensure uses `dbOperations.createInvestorApplication()`
- [ ] Verify creates entry in `investor_applications` table
- [ ] Test application submission flow

**Files to Review/Modify**:
- `netlify/functions/investor-apply.ts`

**Acceptance Criteria**:
- ✓ Investor applications saved to Neon database
- ✓ Users cannot submit duplicate applications
- ✓ Admin receives notification email

---

#### Task 3.2: Update Admin Request Functions
**Priority**: MEDIUM  
**Assignee**: Backend Developer  
**Depends On**: Phase 2 Complete

**Action Items**:
- [ ] Review `admin-requests.ts`
- [ ] Ensure uses `dbOperations.getInvestorApplications()`
- [ ] Ensure uses `dbOperations.updateInvestorApplicationStatus()`
- [ ] Verify admin actions logged in `admin_actions` table
- [ ] Test approval/rejection flow

**Files to Review/Modify**:
- `netlify/functions/admin-requests.ts`

**Acceptance Criteria**:
- ✓ Admins can view all applications
- ✓ Admins can approve/reject applications
- ✓ User role updated upon approval
- ✓ All actions logged for audit

---

### Phase 4: Environment Configuration & Documentation

#### Task 4.1: Create Production Environment Setup Guide
**Priority**: HIGH  
**Assignee**: DevOps / Technical Writer  
**Depends On**: Tasks 1.2, 2.1, 2.2

**Action Items**:
- [ ] Document Neon database setup process
- [ ] Document required environment variables
- [ ] Create step-by-step deployment checklist
- [ ] Document domain-specific configuration
- [ ] Create troubleshooting guide

**Deliverable**: `AUTH_SETUP_README.md` (see separate document)

---

#### Task 4.2: Update .env.example File
**Priority**: HIGH  
**Assignee**: Backend Developer  
**Depends On**: Task 1.2

**Action Items**:
- [ ] Remove confusing "legacy" comments
- [ ] Remove Notion API variables (if not using)
- [ ] Add clear instructions for each variable
- [ ] Specify which variables are required vs optional
- [ ] Add example values

**File to Modify**:
- `.env.example`

**Acceptance Criteria**:
- ✓ Clear documentation of all required variables
- ✓ No conflicting or confusing comments
- ✓ Easy for new developers to configure

---

#### Task 4.3: Configure Multi-Domain Deployment
**Priority**: MEDIUM  
**Assignee**: DevOps Engineer  
**Depends On**: Task 4.1

**Action Items**:
- [ ] Set up Netlify sites for each domain:
  - grahmos.info (primary)
  - grahmos.app
  - grahmos.store
  - grahmos.net
  - grahmos.org
- [ ] Configure environment variables per domain
- [ ] Set up custom domains in Netlify
- [ ] Configure SSL certificates
- [ ] Update `VITE_APP_URL` per domain
- [ ] Test authentication across all domains

**Acceptance Criteria**:
- ✓ All domains deployed and accessible
- ✓ Authentication works on each domain independently
- ✓ Sessions properly isolated per domain
- ✓ SSL/HTTPS working on all domains

---

### Phase 5: Testing & Quality Assurance

#### Task 5.1: Create Authentication Test Suite
**Priority**: MEDIUM  
**Assignee**: QA Engineer / Backend Developer

**Action Items**:
- [ ] Create manual test checklist
- [ ] Test signup flow (new user, existing email, invalid data)
- [ ] Test login flow (correct password, incorrect password, non-existent user)
- [ ] Test session persistence
- [ ] Test logout flow
- [ ] Test password reset flow
- [ ] Test role-based access (standard, investor, admin)
- [ ] Test protected routes
- [ ] Test investor application workflow
- [ ] Test admin approval workflow

**Deliverable**: Test results document

**Acceptance Criteria**:
- ✓ All test cases pass
- ✓ No critical bugs identified
- ✓ Edge cases handled properly

---

#### Task 5.2: Load Testing & Performance Validation
**Priority**: LOW  
**Assignee**: DevOps / Backend Developer

**Action Items**:
- [ ] Test concurrent login requests
- [ ] Verify database connection pooling
- [ ] Test session validation performance
- [ ] Monitor Netlify Function cold starts
- [ ] Verify no memory leaks

**Acceptance Criteria**:
- ✓ System handles expected load
- ✓ Response times acceptable (<2s for auth)
- ✓ No timeout errors under normal load

---

### Phase 6: Migration & Cleanup

#### Task 6.1: Data Migration (If Applicable)
**Priority**: CONDITIONAL  
**Assignee**: Backend Developer  
**Condition**: If existing users in Notion need to be moved to Neon

**Action Items**:
- [ ] Export users from Notion database
- [ ] Create migration script
- [ ] Test migration on staging environment
- [ ] Run production migration during maintenance window
- [ ] Verify all users migrated correctly
- [ ] Send notification to users about system update

---

#### Task 6.2: Remove Unused Code
**Priority**: LOW  
**Assignee**: Backend Developer  
**Depends On**: All Phase 2 & 3 tasks complete

**Action Items**:
- [ ] Remove `_notion.ts` file (if not using Notion)
- [ ] Remove Notion API dependencies from `package.json`
- [ ] Remove unused environment variables
- [ ] Update WARP.md documentation
- [ ] Clean up comments referencing old architecture

**Files to Modify**:
- `netlify/functions/_notion.ts` (delete)
- `package.json`
- `.env.example`
- `WARP.md`

---

## 🚀 Deployment Checklist

### Pre-Deployment
- [ ] All Phase 1 tasks complete
- [ ] All Phase 2 tasks complete
- [ ] All Phase 3 tasks complete
- [ ] Test suite passing (Task 5.1)
- [ ] Environment variables configured in Netlify
- [ ] Database migrations ready

### Deployment Steps
1. [ ] Run `npm run validate-env` locally
2. [ ] Run `npm run validate-deployment` locally
3. [ ] Deploy to staging/preview: `netlify deploy`
4. [ ] Test authentication on staging
5. [ ] Run database migration on staging
6. [ ] Test full user flows on staging
7. [ ] Deploy to production: `netlify deploy --prod`
8. [ ] Run database migration on production
9. [ ] Verify production authentication working
10. [ ] Monitor logs for errors (first 24 hours)

### Post-Deployment
- [ ] Test login/signup on production
- [ ] Test password reset flow
- [ ] Verify admin dashboard access
- [ ] Verify investor portal access
- [ ] Send test notifications
- [ ] Monitor error logs
- [ ] Update internal documentation

---

## 📊 Success Metrics

- **Authentication Success Rate**: >99.5%
- **Login Response Time**: <2 seconds (p95)
- **Session Persistence**: 7 days without re-login
- **Zero Critical Security Vulnerabilities**
- **Documentation Completeness**: 100%
- **Multi-Domain Deployment**: All 5 domains operational

---

## 🔐 Security Considerations

### Must-Haves
- [ ] Passwords hashed with bcrypt (salt rounds ≥12)
- [ ] JWT tokens signed with strong secret
- [ ] Session cookies set as HttpOnly, Secure, SameSite=Strict
- [ ] Database connection strings never exposed to client
- [ ] SQL injection protection (parameterized queries)
- [ ] Rate limiting on auth endpoints
- [ ] HTTPS enforced on all domains

### Nice-to-Haves
- [ ] Email verification on signup
- [ ] Two-factor authentication (2FA)
- [ ] Login attempt monitoring and blocking
- [ ] Session invalidation on password change
- [ ] Audit logs for all administrative actions

---

## 📞 Contacts & Resources

### Key Stakeholders
- **Project Lead**: [Name]
- **Backend Developer**: [Name]
- **DevOps Engineer**: [Name]
- **QA Engineer**: [Name]

### External Services
- **Neon Database**: https://console.neon.tech
- **Netlify Dashboard**: https://app.netlify.com
- **Domain Registrar**: [Provider Name]
- **Email Service**: SendGrid / Custom Webhook

### Documentation
- Project README: `README.md`
- Auth Setup Guide: `AUTH_SETUP_README.md`
- WARP Instructions: `WARP.md`
- Environment Variables: `.env.example`

---

## 📝 Notes

### Architecture Decision Records

**ADR-001: Database Selection**
- **Date**: [To be filled]
- **Decision**: [Neon PostgreSQL / Notion API]
- **Rationale**: [Reasons for selection]
- **Consequences**: [What needs to change]

**ADR-002: Multi-Domain Strategy**
- **Date**: [To be filled]
- **Decision**: [Shared database or separate per domain]
- **Rationale**: [Cost, complexity, isolation]
- **Consequences**: [Deployment implications]

---

## 🔄 Change Log

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2025-10-26 | 1.0.0 | Initial task list created | WARP Agent |
|  |  |  |  |

---

**Last Updated**: 2025-10-26  
**Document Owner**: Technical Team Lead  
**Review Frequency**: Weekly during implementation, monthly after completion
