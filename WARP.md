# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

GrahmOS Investor Portal is a production-ready React/Vite application with role-based access control (RBAC), serving as the authentication hub for the GRAHMOS ecosystem. It features a modern tech stack with Tailwind CSS, Neon PostgreSQL, and Netlify Functions for serverless backend functionality.

## Development Commands

### Environment Setup & Validation
```bash
# Install dependencies
npm install

# Validate environment variables before deployment
npm run validate-env

# Test database connection
npm run test:db

# Sync local environment variables to Netlify
npm run env:sync
```

### Development Server
```bash
# Start development server (uses Netlify Dev)
npm run dev

# Alternative Vite-only server (port 8080)
npm run dev:vite
```

### Building & Deployment
```bash
# Build for production
npm run build

# Safe build with environment validation
npm run build:safe

# Deploy with comprehensive validation
npm run deploy

# Quick deployment (validate → build → deploy)
npm run deploy:safe
```

### Database Operations
```bash
# Initialize database tables (one-time setup)
curl http://localhost:8888/.netlify/functions/db-migrate

# Or visit the migration endpoint in browser during development
```

### Code Quality
```bash
# Run ESLint
npm run lint

# Preview production build
npm run preview
```

## Architecture Overview

### Authentication System
- **JWT-based authentication** with HTTP-only cookies for session management
- **Role-based access control** with four user roles: `pending`, `standard`, `investor`, `admin`
- **AuthContext** provides centralized authentication state management
- **ProtectedRoute** component handles role-based route protection with graceful access denial UI
- **Admin emails** defined in environment variables get automatic admin role assignment

### Database Architecture
- **Neon PostgreSQL** with connection pooling via `@neondatabase/serverless`
- **Database schema** includes users, investor_applications, admin_actions, newsletter_signups, and audit logging
- **Schema operations** centralized in `src/lib/schema.ts` with automated migrations
- **Database utilities** in `netlify/functions/_db.ts` for serverless function integration

### Frontend Architecture
- **React 18** with TypeScript for type safety
- **Vite** as build tool with SWC for fast compilation
- **React Router** for client-side routing with protected routes
- **Tailwind CSS** with dark mode support and custom animations
- **shadcn/ui** component library with Radix UI primitives
- **React Query** for server state management

### Backend Architecture
- **Netlify Functions** for serverless API endpoints
- **Authentication functions**: signup, login, logout, password reset, session validation
- **Application functions**: investor applications, admin approval workflow
- **Database functions**: migrations, health checks, demo account management

### Key Components Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── AuthContext.tsx      # Authentication state management
│   │   └── ProtectedRoute.tsx   # Role-based route protection
│   ├── Layout.tsx               # Main layout with navigation
│   └── ErrorBoundary.tsx        # Error handling wrapper
├── pages/
│   ├── Auth.tsx                 # Authentication page
│   ├── Dashboard.tsx            # User dashboard
│   ├── InvestorPortal.tsx       # Investor-only content
│   ├── InvestorApply.tsx        # Investment application form
│   ├── AdminDashboard.tsx       # Admin user management
│   └── AdminRequests.tsx        # Admin application review
├── lib/
│   ├── api.ts                   # API integration layer
│   ├── auth.ts                  # Authentication utilities
│   ├── database.ts              # Database connection
│   └── schema.ts                # Database operations
└── hooks/
    └── use-toast.ts             # Toast notifications
```

### Routing Structure
- **Public routes**: `/`, `/overview`, `/market`, `/product`, `/competitive`, `/financial`, `/team`, `/auth`
- **Authenticated routes**: `/dashboard`, `/investor/apply` (requires authentication)
- **Investor routes**: `/investor-portal` (requires investor or admin role)
- **Admin routes**: `/admin/*` (requires admin role)

### Environment Variables
Critical environment variables managed through deployment validation system:
- `DATABASE_URL` / `VITE_DATABASE_URL` - Neon PostgreSQL connection
- `ADMIN_EMAILS` - Comma-separated admin email list
- `SESSION_SECRET` - JWT signing secret
- `VITE_APP_URL` / `VITE_API_URL` - Application URLs

### Deployment System
- **Comprehensive validation** prevents deployment with misconfigured environment variables
- **Safe deployment scripts** with pre-deployment checks and error reporting
- **Environment synchronization** between local development and Netlify
- **Database connection testing** before deployment
- **Automated error prevention** for common configuration issues

### Role-Based Access Control
- **User roles**: `pending` (new users) → `standard` (verified) → `investor` (approved) / `admin` (elevated)
- **Application workflow**: Users apply for investor status → Admin reviews → Role upgrade on approval
- **Route protection**: ProtectedRoute component with role array support
- **Graceful denial**: Access denied pages instead of redirects for better UX

### Notable Implementation Details
- Uses Netlify Functions exclusively for backend (no traditional server)
- Database operations use direct SQL with parameterized queries for security
- Frontend uses custom JWT validation with automatic token refresh
- Error boundaries provide graceful failure handling throughout the application
- Tailwind configuration includes custom animations and dark mode variants
- Environment validation prevents common deployment failures

## Testing Approach

Manual testing checklist covers:
- Authentication flows (signup, login, logout, password reset)
- Role assignment and upgrade workflows  
- Route protection and access control
- Admin approval processes
- Database operations and migrations

The codebase prioritizes production stability with comprehensive error handling, environment validation, and role-based security throughout the application architecture.

<citations>
<document>
    <document_type>RULE</document_type>
    <document_id>8aQrtGjDp9g2g8xvtY6EIu</document_id>
</document>
<document>
    <document_type>RULE</document_type>
    <document_id>T3rJIbfjmiSQTN5t4Qilk3</document_id>
</document>
</citations>
