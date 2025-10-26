# GrahmOS Investor Portal

🚀 **V2.0.0 - Production-Ready Neon PostgreSQL Authentication System**

The official investor portal and authentication hub for the GRAHMOS ecosystem (.info, .store, .com, .net, .io). This V2 release uses **Neon PostgreSQL** for serverless, scalable authentication with comprehensive role-based access control.

## 🏷️ **Version Information**
- **Current Version**: V2.0.0 (Neon PostgreSQL)
- **Release Date**: October 2025
- **Status**: Production Ready ✅
- **Live Site**: [https://grahmos.info](https://grahmos.info)
- **Purpose**: Source of truth for GRAHMOS ecosystem authentication
- **Database**: Neon PostgreSQL (serverless, autoscaling)

## 🌟 **V1 Key Features**

### 🔐 **Authentication System** (Source of Truth for GRAHMOS Ecosystem)
- Complete signup/login/logout flow with JWT tokens
- Password reset with secure token-based system
- Role-based access control (Admin, Investor, Standard, Pending)
- **Neon PostgreSQL** for serverless, scalable user management
- Email notifications for registrations and approvals
- Session management with secure HTTP-only cookies
- Automated database migrations and schema management

### 🏢 **Company Progress Hub** 
- Real-time updates on GRAHMOS development progress
- Market analysis and competitive intelligence
- Financial projections and team information
- Product roadmap and feature updates
- **Currently FREE** - will be behind paywall in future versions

### 💼 **Investor Portal Access**
- Protected investor-only content and documents
- Investment application system with admin approval workflow
- Investor dashboard with portfolio information
- Admin dashboard for user and application management
- Role-based route protection

### 🎛️ **Admin Management System**
- User approval workflow for investor access
- Application review and decision tracking
- User role management and verification
- Admin action logging and audit trail
- Demo account management for testing

## 🗺️ **Site Architecture & Routing**

### **Public Routes** (No Authentication Required)
- **`/`** - Overview/Landing page with company progress
- **`/overview`** - Company overview and mission
- **`/market`** - Market analysis and opportunities
- **`/product`** - Product information and roadmap
- **`/competitive`** - Competitive analysis
- **`/financial`** - Financial projections
- **`/team`** - Team information
- **`/auth`** - Login/Signup page
- **`/auth/reset-password`** - Password reset page

### **Protected Routes** (Authentication Required)
- **`/dashboard`** - User dashboard (all authenticated users)
- **`/investor-portal`** - Investor-only content (requires 'investor' or 'admin' role)
- **`/investor/apply`** - Investment application form (authenticated users)
- **`/admin`** - Admin dashboard (admin-only)
- **`/admin/dashboard`** - Admin user management (admin-only)
- **`/admin/requests`** - Admin application reviews (admin-only)

### **Legacy/Test Routes**
- **`/test-portal`** - Demo portal for testing
- **`/demo`** - Alternative demo access
- **`/portal/:slug`** - Legacy portal routing

## 🔄 **User Approval System for Investor Portal Access**

### **How Approval Works**
1. **User Registration**: New users sign up via `/auth` with email/password
2. **Application Submission**: Users submit investor applications via `/investor/apply`
3. **Admin Review**: Admins review applications in `/admin/requests`
4. **Approval Decision**: Admin approves/denies applications
5. **Role Upgrade**: Approved users get 'investor' role and access to investor portal
6. **Email Notifications**: Automated emails sent to users and admins

### **User Roles & Permissions**
- **`pending`**: New users awaiting verification (limited access)
- **`standard`**: Verified users (dashboard access only)
- **`investor`**: Approved investors (full investor portal access)
- **`admin`**: System administrators (full system access)

### **Admin Approval Workflow**
1. Admin logs into `/admin` with admin credentials
2. Views pending applications in `/admin/requests`
3. Reviews application details (pitch, accreditation status)
4. Clicks "Approve" or "Deny" for each application
5. System automatically updates user role and sends notifications
6. Approved users gain immediate access to investor portal

## 🌐 **GRAHMOS Ecosystem Integration**

This V1 authentication system is designed to be the **source of truth** for all GRAHMOS domains:

### **Planned Domain Integration**
- **grahmos.info** (Current) - Company progress and investor portal
- **grahmos.store** (Future) - E-commerce platform
- **grahmos.com** (Future) - Main corporate website
- **grahmos.net** (Future) - Developer and API platform
- **grahmos.io** (Future) - Community and social platform

### **Shared Authentication Features**
- Single Sign-On (SSO) across all domains
- Unified user profiles and roles
- Centralized user management
- Consistent security policies
- Cross-domain session management

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/c058a360-7fc4-4b60-b164-9c8e700d0dfa) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## 💻 **Technology Stack**

### **Frontend**
- **Vite** - Build tool and development server
- **TypeScript** - Type-safe JavaScript
- **React 18** - UI framework with hooks
- **React Router** - Client-side routing
- **shadcn-ui** - Modern component library
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library

### **Backend & Database**
- **Netlify Functions** - Serverless API endpoints
- **Neon PostgreSQL** - Serverless, autoscaling database
- **@neondatabase/serverless** - Optimized Postgres client
- **JWT Tokens** - Session management with HTTP-only cookies
- **bcrypt** - Password hashing (12 rounds)
- **SendGrid** - Email service for notifications

### **Authentication & Security**
- Custom JWT-based authentication system
- Role-based access control (RBAC)
- Secure password reset with tokens
- Session management with HTTP-only cookies
- Input validation and SQL injection protection

### **Development & Deployment**
- **Git** - Version control with semantic tagging
- **Netlify** - Hosting and CI/CD
- **Environment Variables** - Configuration management
- **Error Boundaries** - Graceful error handling

## 📊 **Neon PostgreSQL Setup**

This project uses **Neon PostgreSQL** - a serverless, autoscaling Postgres platform. See [NEON_SETUP.md](./NEON_SETUP.md) for detailed setup instructions.

### Quick Setup

1. **Create a Neon Account**:
   - Go to https://console.neon.tech
   - Create a new project and get the connection string

2. **Create a Notion Database**:
   - Create a full-page database in Notion
   - Add required properties: Email, First Name, Last Name, Password, Role, User Type, Created At
   - Share the database with your integration

3. **Configure Environment Variables**:
   ```bash
   NOTION_API_KEY=secret_your_token_here
   NOTION_DATABASE_ID=your_database_id_here
   VITE_NOTION_API_KEY=secret_your_token_here
   VITE_NOTION_DATABASE_ID=your_database_id_here
   ```

4. **Test the Setup**:
   ```bash
   npm run dev
   ```

For complete instructions, see [NOTION_SETUP.md](./NOTION_SETUP.md).

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/c058a360-7fc4-4b60-b164-9c8e700d0dfa) and click on Share -> Publish.

**Important**: Before deploying, make sure to:
1. Set up your Notion database (see above)
2. Add Notion environment variables in Netlify dashboard
3. Test authentication locally first

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
