# GrahmOS Access Portal System

## 🚀 Overview

The GrahmOS Access Portal is a production-ready role-based access control system built with React, Vite, Tailwind CSS, and Neon Postgres. It provides secure authentication and authorization for three distinct user roles: **Standard Users**, **Investors**, and **Super Admins**.

## ✨ Features

### 🔐 Role-Based Access Control (RBAC)
- **Standard Users**: Basic dashboard access and platform features
- **Investors**: Application process, approved investors get private portal access
- **Super Admins**: Application review and user management capabilities

### 🌐 Complete Authentication System
- User registration and login with bcrypt password hashing
- JWT-based session management with HTTP-only cookies
- Secure serverless API endpoints via Netlify Functions
- Environment-based admin role assignment

### 🎯 Access Portal Hub (`/access`)
- Dynamic three-card interface adapting to user role
- Real-time authentication status checking
- Seamless navigation to appropriate portals

### 📊 Admin Dashboard (`/admin/requests`)
- View all investor applications with detailed information
- Approve/deny applications with audit logging
- Real-time status updates and role promotion
- Application history and decision tracking

### 🏢 Investor Application Flow (`/investor/apply`)
- Secure application form with pitch and accreditation fields
- Automatic role upgrade upon admin approval
- Email notifications and status tracking
- Protected route requiring authentication

## 🛠 Technical Architecture

### Frontend (React + Vite + Tailwind)
```
src/
├── pages/
│   ├── AccessPortal.tsx      # Main hub page
│   ├── Signup.tsx           # User registration
│   ├── Login.tsx            # User authentication
│   ├── InvestorApply.tsx    # Investor application
│   └── AdminRequests.tsx    # Admin dashboard
├── components/
│   └── ui/                  # Reusable UI components
└── lib/
    ├── api.ts              # API integration
    ├── database.ts         # Database connection
    └── schema.ts           # Database operations
```

### Backend (Netlify Functions)
```
netlify/functions/
├── _db.ts                  # Database utilities
├── db-migrate.ts          # Database migration
├── auth-signup.ts         # User registration
├── auth-login.ts          # User authentication
├── auth-me.ts             # Session validation
├── investor-apply.ts      # Application submission
└── admin-requests.ts      # Admin management
```

### Database Schema (Neon Postgres)
```sql
-- Users with role-based access
users (
  id, email, first_name, last_name, 
  password_hash, role, created_at, updated_at
)

-- Investor applications
investor_applications (
  id, user_id, pitch, accreditation, 
  status, decided_by, decided_at, created_at
)

-- Admin action audit log
admin_actions (
  id, admin_id, action, target_application_id, created_at
)
```

## 🚀 Quick Start

### 1. Environment Setup

**IMPORTANT**: The `.env` file contains placeholder values that MUST be replaced.

Update your `.env` file with real Neon database credentials:
```bash
# Neon Database - Get from https://console.neon.tech
# Example: postgresql://user:pass@ep-something.us-east-2.aws.neon.tech/neondb?sslmode=require
DATABASE_URL=postgresql://your-actual-neon-connection-string
VITE_DATABASE_URL=postgresql://your-actual-neon-connection-string

# Authentication
SESSION_SECRET=your-strong-random-secret

# Admin Configuration - Use your actual admin emails
ADMIN_EMAILS=your-admin@email.com,another-admin@email.com

# Application URLs
VITE_APP_URL=http://localhost:8888
VITE_API_URL=http://localhost:8888/api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Database Migration
Run the migration endpoint once to create tables:
```bash
# Start dev server
npm run dev

# Visit migration endpoint (one-time setup)
curl http://localhost:8888/.netlify/functions/db-migrate
```

### 4. Access the Portal
- **Main Hub**: http://localhost:8888/access
- **Sign Up**: http://localhost:8888/signup
- **Sign In**: http://localhost:8888/login

## 🔄 User Workflows

### Standard User Journey
1. Visit `/signup` → Create account
2. Visit `/login` → Authenticate
3. Visit `/access` → See Standard User card
4. Access basic dashboard features

### Investor Journey  
1. Create standard account first
2. Visit `/investor/apply` → Submit application
3. Admin reviews and approves
4. User role upgraded to 'investor'
5. Access investor portal via `/access`

### Admin Journey
1. Sign up with email listed in `ADMIN_EMAILS`
2. Automatically assigned 'admin' role
3. Visit `/admin/requests` → Review applications
4. Approve/deny applications
5. Monitor system via admin dashboard

## 🌍 Deployment

### Netlify Configuration
The system is optimized for Netlify deployment with:
- **Functions**: Serverless API endpoints
- **Environment Variables**: Secure credential management
- **Redirects**: SPA routing support
- **Branch Previews**: Automatic Neon database branches

Required Netlify Environment Variables:
```
DATABASE_URL=<production-neon-url>
SESSION_SECRET=<strong-random-string>
ADMIN_EMAILS=<comma-separated-admin-emails>
NODE_VERSION=18
```

### GitHub Repository Setup
Required GitHub secrets for Neon branch automation:
```
NEON_API_KEY=<neon-api-key>
DATABASE_URL=<main-database-url>
```

Required GitHub variables:
```
NEON_PROJECT_ID=<neon-project-id>
```

### CI/CD Pipeline
The included GitHub Actions workflow automatically:
- Creates Neon database branches for each PR
- Runs migrations on preview databases
- Comments PR with database information
- Cleans up database branches when PR closes

## 🧪 Testing

### Manual Testing Checklist

**Authentication Flow:**
- [ ] Sign up with new email → account created
- [ ] Sign in with credentials → redirected to access portal
- [ ] Invalid credentials → proper error message
- [ ] Session persistence → stays logged in on refresh

**Role Assignment:**
- [ ] Standard user sees appropriate access cards
- [ ] Admin email automatically gets admin role
- [ ] Investor approval upgrades user role correctly

**Investor Application:**
- [ ] Unauthenticated users redirected to login
- [ ] Application form submits successfully
- [ ] Admin can see application in dashboard
- [ ] Approval/denial works correctly

**Admin Dashboard:**
- [ ] Only admin users can access
- [ ] Applications display with correct information
- [ ] Approve/deny actions work correctly
- [ ] Audit logging captures admin actions

### Security Testing
- [ ] SQL injection protection
- [ ] XSS prevention
- [ ] CSRF protection via HTTP-only cookies
- [ ] Environment variable security
- [ ] Rate limiting (implement as needed)

## 🔒 Security Features

### Password Security
- bcrypt hashing with salt rounds
- Minimum password length enforcement
- Secure password confirmation

### Session Management
- JWT tokens with expiration
- HTTP-only cookies prevent XSS
- Secure flag for HTTPS environments
- Session validation on protected routes

### Database Security
- Parameterized queries prevent SQL injection
- Connection pooling via Neon
- SSL-required connections
- Environment-based credential management

### API Security
- Input validation and sanitization
- Role-based endpoint protection
- CORS configuration
- Error message sanitization

## 🚨 Troubleshooting

### Common Issues

**Database Connection Failed:**
- Verify `DATABASE_URL` in environment
- Check Neon database is running
- Confirm SSL mode is enabled

**Functions Not Working:**
- Ensure Netlify Functions are deployed
- Check function logs in Netlify dashboard
- Verify environment variables are set

**Authentication Issues:**
- Clear browser cookies
- Check `SESSION_SECRET` is set
- Verify JWT token format

**Admin Access Denied:**
- Confirm email is in `ADMIN_EMAILS`
- Check environment variable is loaded
- Verify comma-separated format

### Debug Mode
Enable debug logging by setting:
```bash
DEBUG=true
```

## 📈 Next Steps

### Production Considerations
1. **Enhanced Security**: Implement bcrypt with higher salt rounds
2. **Rate Limiting**: Add API endpoint rate limiting
3. **Email Notifications**: Send emails for application status
4. **Advanced RBAC**: Add granular permissions
5. **Audit Logging**: Comprehensive action tracking
6. **Monitoring**: Error tracking and performance monitoring

### Feature Enhancements
1. **User Profiles**: Extended user information
2. **Dashboard Analytics**: Usage statistics
3. **Multi-factor Authentication**: Enhanced security
4. **API Documentation**: Swagger/OpenAPI specs
5. **Automated Testing**: Comprehensive test suite

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/access-portal-enhancement`
3. Commit changes: `git commit -m 'Add new access control feature'`
4. Push to branch: `git push origin feature/access-portal-enhancement`
5. Submit Pull Request

## 📄 License

This access portal system is part of the GrahmOS investor portal project. All rights reserved.

---

**Built with ❤️ for the GrahmOS ecosystem**
