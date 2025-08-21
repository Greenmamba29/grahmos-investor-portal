# GrahmOS Investor Portal - Approval System Documentation

## 🔐 **User Approval System Overview**

The GrahmOS Investor Portal uses a comprehensive approval system to manage access to investor-only content. This system ensures that only verified and approved investors can access sensitive financial information and investment opportunities.

## 👥 **User Roles & Permissions**

### **Role Hierarchy**
```
Admin > Investor > Standard > Pending
```

### **Role Definitions**

#### **`pending`** - New Unverified Users
- **Access Level**: Minimal
- **Can Access**: 
  - Public pages (`/`, `/overview`, `/market`, `/product`, etc.)
  - Authentication pages (`/auth`, `/auth/reset-password`)
  - Basic dashboard (`/dashboard`)
- **Cannot Access**: 
  - Investor portal (`/investor-portal`)
  - Admin areas (`/admin/*`)
  - Investment applications (`/investor/apply`)

#### **`standard`** - Verified Users
- **Access Level**: Standard
- **Can Access**: 
  - All public content
  - User dashboard (`/dashboard`)
  - Investment application form (`/investor/apply`)
- **Cannot Access**: 
  - Investor portal (`/investor-portal`)
  - Admin areas (`/admin/*`)

#### **`investor`** - Approved Investors
- **Access Level**: High
- **Can Access**: 
  - All standard user content
  - Full investor portal (`/investor-portal`)
  - Investment documents and data
  - Portfolio information
- **Cannot Access**: 
  - Admin areas (`/admin/*`)

#### **`admin`** - System Administrators
- **Access Level**: Full
- **Can Access**: 
  - Everything investors can access
  - Admin dashboard (`/admin`, `/admin/dashboard`)
  - Application review system (`/admin/requests`)
  - User management functions
  - System configuration

## 🔄 **Approval Workflow**

### **Step 1: User Registration**
```
User → /auth → Signup Form → Database Entry (role: 'standard')
```
- User creates account with email/password
- Account created with 'standard' role by default
- Welcome email sent to user
- Admin notification sent about new registration

### **Step 2: Investment Application**
```
User → /investor/apply → Application Form → Database Entry → Admin Notification
```
- Authenticated users can submit investor applications
- Application includes:
  - Investment pitch/interest statement
  - Accreditation status (checkbox)
  - Contact information (from user profile)
- Application stored in `investor_applications` table
- Admin receives email notification about new application

### **Step 3: Admin Review**
```
Admin → /admin/requests → Review Applications → Approve/Deny → Database Update
```
- Admin logs into admin dashboard
- Views all pending applications with full details
- Can see applicant information, pitch, and accreditation status
- Makes approval/denial decision with single click

### **Step 4: Role Assignment**
```
Approval → Database Update → Email Notification → Access Grant
```
- **If Approved**: 
  - User role upgraded to 'investor'
  - User gains immediate access to investor portal
  - Approval email sent to user
  - Admin action logged for audit trail
- **If Denied**: 
  - User role remains 'standard'
  - Denial email sent with feedback (if provided)
  - Admin action logged

### **Step 5: Access Enforcement**
```
User Login → JWT Token → Role Check → Route Protection → Content Access
```
- User authentication generates JWT token with role information
- `ProtectedRoute` component checks user role against required permissions
- Access granted or denied based on role hierarchy

## 🎯 **Admin Dashboard Usage**

### **Accessing Admin Functions**
1. **Login**: Use admin credentials at `/auth`
2. **Navigate**: Go to `/admin` or `/admin/dashboard`
3. **Manage**: View users and pending applications

### **Admin Dashboard Features**

#### **User Statistics**
- Total registered users
- Users by role (investors, standard, admins)
- Recent registration trends
- Verification status overview

#### **User Management Table**
- **View**: All users with roles and verification status
- **Edit**: User information and roles
- **Verify**: Manual user verification
- **Delete**: Remove users if necessary

#### **Demo Credentials Display**
Shows test account credentials for development:
```
Investor: investor@grahmos.info / InvestorDemo123!
Standard: user@grahmos.info / UserDemo123!
Admin: admin@grahmos.info / AdminDemo123!
Pending: pending@grahmos.info / PendingDemo123!
```

### **Application Review Interface**
Access via `/admin/requests`:

#### **Application Cards Display**
- **Applicant Info**: Name, email, application date
- **Status Badge**: Pending, Approved, or Denied
- **Accreditation Badge**: Shows if user claims accredited status
- **Investment Pitch**: Full text of applicant's investment interest
- **Decision History**: Who approved/denied and when

#### **Review Actions**
- **Approve Button**: Instantly upgrades user to investor role
- **Deny Button**: Maintains standard role, logs decision
- **Audit Trail**: All decisions tracked with admin info and timestamps

## 🔒 **Route Protection Implementation**

### **ProtectedRoute Component**
Located in `src/components/auth/ProtectedRoute.tsx`

#### **Usage Patterns**
```tsx
// Basic authentication required
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>

// Specific role required
<ProtectedRoute requiredRole="admin">
  <AdminDashboard />
</ProtectedRoute>

// Multiple roles allowed
<ProtectedRoute requiredRoles={['investor', 'admin']}>
  <InvestorPortal />
</ProtectedRoute>
```

#### **Access Denied Handling**
- Shows informative error page instead of redirect
- Displays current user role and required role
- Provides navigation options (go back, return home)
- Maintains user-friendly experience

## 📧 **Email Notification System**

### **Automated Emails**
Located in `netlify/functions/_notifications.ts`

#### **User Registration**
- **Trigger**: New user signup
- **Recipient**: User + Admin
- **Content**: Welcome message, next steps

#### **Application Submission**
- **Trigger**: Investment application submitted
- **Recipient**: User + Admin
- **Content**: Application confirmation, review timeline

#### **Application Decision**
- **Trigger**: Admin approval/denial
- **Recipient**: User
- **Content**: Decision outcome, next steps, contact info

### **Email Templates**
- Professional HTML formatting
- GRAHMOS branding and styling
- Clear call-to-action buttons
- Mobile-responsive design

## 🗄️ **Database Schema**

### **Users Table**
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  role VARCHAR(20) DEFAULT 'standard',
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  reset_token VARCHAR(255),
  reset_token_expires TIMESTAMP
);
```

### **Investor Applications Table**
```sql
CREATE TABLE investor_applications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  pitch TEXT,
  accreditation BOOLEAN DEFAULT false,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  decided_at TIMESTAMP,
  decided_by INTEGER REFERENCES users(id)
);
```

### **Admin Actions Table**
```sql
CREATE TABLE admin_actions (
  id SERIAL PRIMARY KEY,
  admin_id INTEGER REFERENCES users(id),
  action VARCHAR(50) NOT NULL,
  target_application_id INTEGER REFERENCES investor_applications(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🚀 **API Endpoints**

### **Authentication Endpoints**
- `POST /auth-signup` - User registration
- `POST /auth-login` - User authentication
- `POST /auth-logout` - Session termination
- `GET /auth-me` - Current user info
- `POST /auth-forgot-password` - Password reset request
- `POST /auth-reset-password` - Password reset completion

### **Application Management**
- `POST /investor-apply` - Submit investment application
- `GET /admin-requests` - List all applications (admin only)
- `POST /admin-requests` - Approve/deny applications (admin only)

### **User Management**
- `GET /admin-users` - List all users (admin only)
- `PUT /admin-users/:id` - Update user info (admin only)
- `DELETE /admin-users/:id` - Delete user (admin only)

## ⚙️ **Configuration**

### **Required Environment Variables**
```env
DATABASE_URL=postgresql://...
SESSION_SECRET=your_secret_key
EMAIL_API_KEY=your_email_service_key
ADMIN_EMAIL=admin@grahmos.info
```

### **Role Configuration**
Roles can be modified in the database schema and auth logic. Current roles are hardcoded but can be made configurable.

### **Security Settings**
- JWT token expiration: 24 hours
- Password reset token expiration: 1 hour
- Session cookie: HTTP-only, secure, same-site
- Rate limiting: Implemented on auth endpoints

## 🧪 **Testing the Approval System**

### **Test Account Creation**
1. **Register**: New account at `/auth`
2. **Apply**: Submit application at `/investor/apply`
3. **Admin Review**: Login as admin and review at `/admin/requests`
4. **Verify Access**: Test investor portal access

### **Demo Accounts Available**
All demo accounts have known credentials for testing different user flows and roles.

## 🔧 **Troubleshooting**

### **Common Issues**

#### **"Access Denied" Errors**
- Check user role in database
- Verify JWT token contains correct role
- Ensure ProtectedRoute has correct role requirements

#### **Applications Not Appearing**
- Verify database connection
- Check `investor_applications` table for entries
- Ensure admin has proper role assignment

#### **Email Notifications Failing**
- Verify EMAIL_API_KEY environment variable
- Check email service configuration
- Review notification function logs

#### **Role Not Updating After Approval**
- Check database transaction completion
- Verify admin has proper permissions
- Review approval API endpoint logs

## 📈 **Future Enhancements**

### **Planned Features**
- Bulk application processing
- Application templates and categories
- Advanced user search and filtering
- Role-based content customization
- Integration with external KYC/AML services
- Automated approval based on criteria
- Advanced audit logging and reporting

This approval system provides a solid foundation for managing investor access while maintaining security and providing excellent user experience.
