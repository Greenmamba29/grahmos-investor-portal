# GrahmOS Investor Portal - Site Architecture & Routing Map

## 🗺️ **Complete Site Map**

This document provides a comprehensive overview of all routes, pages, components, and access levels in the GrahmOS Investor Portal V1.0.0.

---

## 🌐 **PUBLIC ROUTES** (No Authentication Required)

### **Main Landing & Company Information**
```
/ (Root)
├── 📄 Overview.tsx - Company mission, vision, and current progress
├── 🎨 Layout.tsx - Navigation, header, footer wrapper
└── 🔗 Redirects to /overview

/overview
├── 📄 Overview.tsx - Detailed company overview
├── 📊 Progress updates and milestones  
├── 🎯 Mission statement and vision
└── 📈 Key performance indicators

/market
├── 📄 MarketAnalysis.tsx - Market research and analysis
├── 📊 Industry trends and opportunities
├── 🎯 Target market identification
├── 📈 Market size and growth projections
└── 🔍 Competitive landscape overview

/product
├── 📄 Product.tsx - Product information and roadmap
├── 🛠️ Feature descriptions and benefits
├── 🗓️ Development roadmap and timelines
├── 📱 Product demos and screenshots
└── 🔧 Technical specifications

/competitive
├── 📄 Competitive.tsx - Competitive analysis
├── 🏢 Competitor profiles and analysis
├── 📊 Market positioning comparison
├── 💪 Competitive advantages
└── 🎯 Differentiation strategies

/financial
├── 📄 Financial.tsx - Financial projections and data
├── 💰 Revenue projections and models
├── 📈 Growth metrics and KPIs
├── 💼 Investment opportunities
└── 📊 Financial performance data

/team
├── 📄 Team.tsx - Team member profiles
├── 👥 Leadership team bios
├── 🎓 Team expertise and experience
├── 🏆 Advisory board information
└── 🤝 Company culture and values
```

### **Authentication & Access**
```
/auth
├── 📄 Auth.tsx - Main authentication page
├── 🔐 Login form (email/password)
├── ✍️ Signup form (registration)
├── 🔄 Forgot password tab
├── 📧 Password reset request
└── 🎨 Modern glassmorphism design

/auth/reset-password
├── 📄 ResetPassword.tsx - Password reset completion
├── 🔑 Token validation
├── 🔒 New password form
├── ✅ Success confirmation
└── 🔗 Redirect to login after success
```

### **Legacy & Demo Routes**
```
/test-portal
├── 📄 TestPortal.tsx - Demo portal for testing
├── 🧪 Test scenarios and examples
├── 🎮 Interactive demonstrations
└── 📝 No authentication required

/demo
├── 🔗 Redirects to /test-portal
└── 📄 Alternative demo access

/portal/:slug
├── 📄 Portal.tsx - Legacy portal routing
├── 🔗 Dynamic slug-based routing
└── 🔄 Backward compatibility support

/portal (without slug)
├── 🔗 Redirects to / (root)
└── 📄 Legacy route cleanup
```

---

## 🔐 **PROTECTED ROUTES** (Authentication Required)

### **General User Dashboard**
```
/dashboard
├── 🛡️ ProtectedRoute (any authenticated user)
├── 📄 Dashboard.tsx - User dashboard home
├── 👤 User profile information
├── 📊 Account overview and stats
├── 🔗 Quick links to available features
├── 📧 Recent notifications
└── ⚙️ Account settings access
```

### **Investment Application System**
```
/investor/apply
├── 🛡️ ProtectedRoute (authenticated users only)
├── 📄 InvestorApply.tsx - Investment application form
├── 💼 Investment interest pitch textarea
├── ✅ Accredited investor checkbox
├── 📋 Terms and conditions acceptance
├── 📧 Email notifications on submission
└── 🔄 Application status tracking
```

---

## 💼 **INVESTOR-ONLY ROUTES** (Requires 'investor' or 'admin' role)

### **Main Investor Portal**
```
/investor-portal
├── 🛡️ ProtectedRoute (roles: ['investor', 'admin'])
├── 📄 InvestorPortal.tsx - Main investor dashboard
├── 📊 Investment portfolio overview
├── 📈 Performance metrics and charts
├── 📋 Investment documents library
├── 📧 Investor communications
├── 🎯 Investment opportunities
└── 📞 Contact information for investor relations

/investor
├── 🔗 Redirects to /investor-portal
└── 📄 Alternative investor access route

/investor/:slug
├── 🛡️ ProtectedRoute (roles: ['investor', 'admin'])
├── 📄 InvestorPortal.tsx - Dynamic investor pages
├── 🔗 Slug-based routing for investor-specific content
└── 📄 Personalized investor information
```

---

## ⚡ **ADMIN-ONLY ROUTES** (Requires 'admin' role)

### **Admin Dashboard & Management**
```
/admin
├── 🛡️ ProtectedRoute (role: 'admin')
├── 📄 AdminDashboard.tsx - Main admin dashboard
├── 📊 User statistics and overview
├── 📈 Platform usage metrics
├── 👥 User management table
├── 🎛️ System configuration options
└── 🧪 Demo credentials display

/admin/dashboard
├── 🛡️ ProtectedRoute (role: 'admin')
├── 📄 AdminDashboard.tsx - Detailed admin dashboard
├── 📊 Advanced analytics and reporting
├── 👥 Comprehensive user management
├── 📋 System health monitoring
└── ⚙️ Administrative tools and settings

/admin/requests
├── 🛡️ ProtectedRoute (role: 'admin')
├── 📄 AdminRequests.tsx - Investment application review
├── 📋 Pending application queue
├── 👤 Applicant information and details
├── 💼 Investment pitch review
├── ✅ Approve/Deny decision buttons
├── 📧 Automated notification system
├── 📝 Decision tracking and audit trail
└── 🔍 Application search and filtering
```

---

## 🔧 **API ENDPOINTS** (Serverless Functions)

### **Authentication API**
```
/.netlify/functions/auth-signup
├── 📝 POST - User registration
├── 🔒 Password hashing with bcrypt
├── 📧 Welcome email dispatch
├── 🗄️ Database user creation
└── 🔑 JWT token generation

/.netlify/functions/auth-login
├── 📝 POST - User authentication
├── 🔐 Credential validation
├── 🔑 JWT token generation
├── 🍪 Session cookie setting
└── 👤 User profile return

/.netlify/functions/auth-logout
├── 📝 POST - Session termination
├── 🍪 Cookie clearing
├── 🔑 Token invalidation
└── ✅ Logout confirmation

/.netlify/functions/auth-me
├── 📝 GET - Current user info
├── 🔑 JWT token validation
├── 👤 User profile data
└── 🛡️ Role and permissions check

/.netlify/functions/auth-forgot-password
├── 📝 POST - Password reset request
├── 🔑 Reset token generation
├── 📧 Reset email dispatch
├── ⏰ Token expiration setting
└── 🗄️ Database token storage

/.netlify/functions/auth-reset-password
├── 📝 POST - Password reset completion
├── 🔑 Token validation and verification
├── 🔒 New password hashing
├── 🗄️ Database password update
└── ✅ Reset confirmation
```

### **Application Management API**
```
/.netlify/functions/investor-apply
├── 📝 POST - Investment application submission
├── 🛡️ Authentication required
├── 📋 Application data storage
├── 📧 Admin notification dispatch
└── 🔄 Application status tracking

/.netlify/functions/admin-requests
├── 📝 GET - List all applications (admin only)
├── 📝 POST - Approve/deny applications (admin only)
├── 🛡️ Admin role validation
├── 🗄️ Application status updates
├── 👤 User role upgrades (investor approval)
├── 📧 Decision notification emails
└── 📝 Admin action audit logging
```

### **Database & System API**
```
/.netlify/functions/stack-auth-webhook
├── 📝 POST - User sync webhook (legacy)
├── 🔄 Stack Auth integration (disabled)
└── 🗄️ User data synchronization

/.netlify/functions/test-auth
├── 📝 GET - Authentication testing
├── 🧪 System health check
├── 🔧 Development diagnostics
└── 📊 Auth flow validation

/.netlify/functions/test-demo-accounts
├── 📝 GET - Demo account management
├── 👥 Test user creation
├── 🗄️ Database seeding
└── 🧪 Development setup
```

---

## 🧭 **NAVIGATION STRUCTURE**

### **Public Navigation** (Layout.tsx)
```
Header Navigation:
├── 🏠 Home (/) - Company Overview
├── 📊 Market (/market) - Market Analysis  
├── 🛠️ Product (/product) - Product Info
├── 🏢 Competitive (/competitive) - Competitive Analysis
├── 💰 Financial (/financial) - Financial Data
├── 👥 Team (/team) - Team Information
└── 🔐 Sign In (/auth) - Authentication

Footer Links:
├── 📧 Contact Information
├── 🔗 Social Media Links
├── 📄 Legal Pages
└── 🌐 External Resources
```

### **Authenticated User Navigation**
```
User Menu:
├── 📊 Dashboard (/dashboard) - User home
├── 💼 Apply for Investment (/investor/apply) - Application form
├── ⚙️ Account Settings - Profile management
└── 🚪 Logout - Session termination
```

### **Investor Navigation** (Additional)
```
Investor Menu:
├── 📊 Dashboard (/dashboard) - User home  
├── 💼 Investor Portal (/investor-portal) - Investor content
├── 📋 Portfolio - Investment overview
├── 📈 Performance - Investment tracking
└── 📞 Investor Relations - Contact info
```

### **Admin Navigation** (Additional)
```
Admin Menu:
├── 📊 Dashboard (/dashboard) - User home
├── 🎛️ Admin Dashboard (/admin) - Admin home
├── 👥 User Management (/admin/dashboard) - User control
├── 📋 Review Applications (/admin/requests) - Application review
├── 📊 System Analytics - Usage statistics
└── ⚙️ System Settings - Configuration
```

---

## 🔒 **ACCESS CONTROL MATRIX**

| Route | Public | Standard | Investor | Admin |
|-------|--------|----------|----------|-------|
| `/`, `/overview`, etc. | ✅ | ✅ | ✅ | ✅ |
| `/auth` | ✅ | ✅ | ✅ | ✅ |
| `/dashboard` | ❌ | ✅ | ✅ | ✅ |
| `/investor/apply` | ❌ | ✅ | ✅ | ✅ |
| `/investor-portal` | ❌ | ❌ | ✅ | ✅ |
| `/admin/*` | ❌ | ❌ | ❌ | ✅ |

---

## 📱 **COMPONENT ARCHITECTURE**

### **Core Components**
```
src/components/
├── Layout.tsx - Main layout wrapper with navigation
├── ErrorBoundary.tsx - Error handling and fallback UI
├── ui/ - Reusable UI components (shadcn-ui)
├── auth/
│   ├── AuthContext.tsx - Authentication context and state
│   ├── ProtectedRoute.tsx - Route protection HOC
│   └── UserProvider.tsx - User data management
└── common/
    ├── Navigation.tsx - Main navigation component
    ├── Footer.tsx - Footer component
    └── LoadingSpinner.tsx - Loading states
```

### **Page Components**
```
src/pages/
├── Overview.tsx - Company overview page
├── MarketAnalysis.tsx - Market research page
├── Product.tsx - Product information page
├── Competitive.tsx - Competitive analysis page
├── Financial.tsx - Financial data page
├── Team.tsx - Team information page
├── Auth.tsx - Authentication page
├── ResetPassword.tsx - Password reset page
├── Dashboard.tsx - User dashboard
├── InvestorPortal.tsx - Investor content
├── InvestorApply.tsx - Investment application
├── AdminDashboard.tsx - Admin dashboard
├── AdminRequests.tsx - Application review
├── TestPortal.tsx - Demo/test portal
└── NotFound.tsx - 404 error page
```

---

## 🛠️ **DEVELOPMENT NOTES**

### **Route Protection Implementation**
- **ProtectedRoute HOC**: Wraps components requiring authentication
- **Role-based access**: Multiple role support with `requiredRoles` array
- **Access denied UI**: User-friendly error pages instead of redirects
- **Loading states**: Proper loading indicators during auth checks

### **Navigation Flow**
- **Public users**: Can browse all public content and access auth page
- **Authenticated users**: Additional access to dashboard and application
- **Investors**: Full access including investor portal and content
- **Admins**: Complete system access including user management

### **Future Route Additions**
- `/settings` - User account settings
- `/notifications` - User notification center  
- `/help` - Help documentation and support
- `/api-docs` - API documentation for integrations
- `/analytics` - Advanced analytics dashboard (admin)

This sitemap provides a complete overview of the current V1.0.0 architecture and serves as a reference for future development and content updates.
