# 🚨 SETUP FIXES - Database Connection Issues

## ❌ Current Issues

The errors you're seeing are caused by:

1. **Invalid Database URL**: Using placeholder `db.grahmos.info` instead of real Neon endpoint
2. **Missing Environment Variables**: SESSION_SECRET and ADMIN_EMAILS not configured
3. **Wrong Development Server**: Need to use `netlify dev` instead of `vite dev`

## ✅ Quick Fix Instructions

### 1. Get Your Real Neon Database URL

1. Go to [console.neon.tech](https://console.neon.tech)
2. Sign in to your Neon account
3. Select your project
4. Go to "Connection Details"
5. Copy the **Pooled connection** string (it looks like this):
   ```
   postgresql://username:password@ep-something-something.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

### 2. Update Your .env File

Replace the current DATABASE_URL in your `.env` file:

```bash
# Replace this:
DATABASE_URL=postgresql://username:password@ep-example.us-east-2.aws.neon.tech/neondb?sslmode=require

# With your actual Neon connection string:
DATABASE_URL=postgresql://your-actual-neon-connection-string

# Also update this:
VITE_DATABASE_URL=postgresql://your-actual-neon-connection-string
```

### 3. Configure Admin Emails

Update the ADMIN_EMAILS in your `.env`:
```bash
ADMIN_EMAILS=your-admin@email.com,another-admin@email.com
```

### 4. Start the Correct Development Server

Instead of `npm run dev`, use:
```bash
npm run dev
# This now runs: netlify dev (which includes both Vite + Functions)
```

Or manually:
```bash
npx netlify dev
```

### 5. Run Database Migration

Once the server is running, visit:
```
http://localhost:8888/.netlify/functions/db-migrate
```

This will create all the required tables.

### 6. Test the System

1. **Access Portal**: http://localhost:8888/access
2. **Sign Up**: http://localhost:8888/signup
3. **Login**: http://localhost:8888/login

## 🔧 Alternative: Use Local Development Database

If you don't have a Neon database set up yet, you can:

1. **Create a free Neon database**:
   - Go to [console.neon.tech](https://console.neon.tech)
   - Sign up (free tier available)
   - Create a new project
   - Copy the connection string

2. **Or use PostgreSQL locally**:
   - Install PostgreSQL locally
   - Create a database
   - Use: `postgresql://localhost:5432/your_db_name`

## 🧪 Quick Test Script

I've created a test script. After updating your `.env`, run:

```bash
node test-database-connection.js
```

This will:
- ✅ Test database connection
- ✅ Show existing tables
- ✅ Run migration if needed
- ✅ Confirm setup

## 🎯 Expected Success Output

When everything is working, you should see:

```
✅ Database connection successful!
✅ Database migration completed successfully!
📊 Final table count: 3
  ✓ admin_actions
  ✓ investor_applications  
  ✓ users
🎉 Database setup complete and ready for Access Portal!
```

## 🔍 Troubleshooting

**Still getting "ENOTFOUND"?**
- Double-check your Neon connection string
- Make sure you copied the full URL including `?sslmode=require`
- Verify your Neon database is running (check Neon console)

**Functions not working?**
- Make sure you're using `netlify dev` not `vite dev`
- Check that port 8888 is not blocked
- Verify .env file has all required variables

**"Method not allowed" errors?**
- This happens when functions aren't running
- Restart with `netlify dev`
- Check function logs in terminal

## 📞 Next Steps

After fixing the database connection:

1. ✅ Test user registration
2. ✅ Test admin login (with admin email)
3. ✅ Test investor application flow
4. ✅ Test admin approval process

The system should then work perfectly! 🎉
