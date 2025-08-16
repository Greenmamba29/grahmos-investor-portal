# Neon Database Setup Guide

## 🚀 Quick Setup

### 1. Create a Neon Database
1. Go to [console.neon.tech](https://console.neon.tech)
2. Sign up or log in to your Neon account
3. Create a new project
4. Copy your connection string

### 2. Update Environment Variables
1. Open `.env` file in your project root
2. Replace the `DATABASE_URL` with your actual Neon connection string:

```bash
# Replace with your actual Neon database URL
DATABASE_URL=postgresql://username:password@ep-example.us-east-2.aws.neon.tech/neondb?sslmode=require
```

### 3. Test the Connection
Run the development server:
```bash
npm run dev
```

The database tables will be automatically created on first run.

## 🗄️ Database Schema

The following tables will be created automatically:

### `users` table
- `id` (Primary Key)
- `email` (Unique, Not Null)
- `first_name`
- `last_name`
- `password_hash`
- `is_verified` (Boolean, Default: false)
- `user_type` (Default: 'user')
- `created_at`, `updated_at`

### `newsletter_signups` table
- `id` (Primary Key)
- `email` (Unique, Not Null)
- `first_name`
- `last_name`
- `signup_source` (Default: 'website')
- `is_confirmed` (Boolean, Default: false)
- `created_at`

### `investor_profiles` table
- `id` (Primary Key)
- `user_id` (Foreign Key to users)
- `company_name`
- `investment_range_min`, `investment_range_max`
- `portfolio_size`
- `investment_focus`
- `accredited_investor` (Boolean)
- `created_at`, `updated_at`

### `portal_sessions` table
- `id` (Primary Key)
- `user_id` (Foreign Key to users)
- `session_token` (Unique)
- `ip_address`, `user_agent`
- `last_activity`, `expires_at`
- `created_at`

## 🔧 Features

### Newsletter Signup
- Saves email signups to `newsletter_signups` table
- Handles duplicate emails gracefully
- Tracks signup source (waitlist, registration, etc.)

### User Registration
- Creates user accounts in `users` table
- Automatically adds users to newsletter (except investors)
- Basic password hashing (upgrade to bcrypt for production)

### User Authentication
- Basic login functionality
- Session tracking capabilities
- Investor portal access

### Analytics
- Get signup statistics
- Track user engagement
- Monitor newsletter growth

## 🔒 Security Notes

1. **Password Hashing**: Currently using basic encoding. For production, implement proper password hashing with bcrypt.

2. **Environment Variables**: Never commit your actual database URL to version control.

3. **SSL Mode**: Always use `sslmode=require` for Neon connections.

4. **Connection Pooling**: Neon automatically handles connection pooling.

## 🚨 Troubleshooting

### Connection Issues
- Verify your DATABASE_URL is correct
- Check if your IP is whitelisted (Neon allows all by default)
- Ensure SSL mode is enabled

### Table Creation Issues
- Check console logs for detailed error messages
- Verify your database user has CREATE privileges
- Try manually connecting via psql to test

### Performance
- Neon automatically scales based on usage
- Consider connection pooling for high-traffic applications
- Monitor query performance in Neon console

## 📊 Monitoring

Access your Neon dashboard to:
- Monitor database performance
- View connection statistics
- Track storage usage
- Set up alerts

## 🔄 Migrations

For schema changes:
1. Update the schema in `src/lib/schema.ts`
2. Create migration scripts if needed
3. Test thoroughly in development
4. Deploy changes carefully

## 💡 Best Practices

1. **Environment Separation**: Use different databases for dev/staging/production
2. **Backup Strategy**: Neon provides automatic backups
3. **Monitoring**: Set up alerts for connection issues
4. **Security**: Regularly rotate database credentials
5. **Performance**: Monitor slow queries and optimize as needed
