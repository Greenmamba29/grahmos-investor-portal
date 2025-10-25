# Notion Database Setup Guide

This guide will help you set up the Notion database for the GrahmOS Investor Portal authentication system.

## Overview

The investor portal now uses **Notion as the database** instead of PostgreSQL. This simplifies the setup and makes it easier to manage user data through Notion's interface.

## Prerequisites

- A Notion account (free or paid)
- Access to create integrations in your Notion workspace

## Step 1: Create a Notion Integration

1. Go to [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Click **"+ New integration"**
3. Fill in the details:
   - **Name**: GrahmOS Investor Portal
   - **Associated workspace**: Select your workspace
   - **Type**: Internal integration
4. Click **"Submit"**
5. Copy the **Internal Integration Token** (starts with `secret_`)
6. Save this token securely - you'll need it for `NOTION_API_KEY`

## Step 2: Create the User Database

1. Create a new **full-page database** in Notion
2. Name it **"GrahmOS Users"** or similar
3. Configure the database with the following properties:

| Property Name | Property Type | Options/Notes |
|--------------|---------------|---------------|
| **Email** | Email | Primary identifier for users |
| **First Name** | Text | User's first name |
| **Last Name** | Text | User's last name |
| **Password** | Text | Bcrypt hashed password |
| **Role** | Select | Options: `pending`, `standard`, `investor`, `admin` |
| **User Type** | Select | Options: `user`, `waitlist`, `investor`, `admin` |
| **Created At** | Date | Automatically set when user signs up |

### Property Setup Instructions

1. **Email**: Click "+ Add a property" → Select "Email" type
2. **First Name**: Add property → Select "Text" type
3. **Last Name**: Add property → Select "Text" type
4. **Password**: Add property → Select "Text" type
5. **Role**: Add property → Select "Select" type
   - Add options: `pending`, `standard`, `investor`, `admin`
6. **User Type**: Add property → Select "Select" type
   - Add options: `user`, `waitlist`, `investor`, `admin`
7. **Created At**: Add property → Select "Date" type

## Step 3: Share Database with Integration

1. Open your **GrahmOS Users** database in Notion
2. Click the **"..." menu** in the top right
3. Scroll down and click **"Add connections"**
4. Search for **"GrahmOS Investor Portal"** (your integration name)
5. Click to add the connection
6. The integration now has access to read/write this database

## Step 4: Get Database ID

1. Open your **GrahmOS Users** database as a full page
2. Look at the URL in your browser:
   ```
   https://www.notion.so/workspace/<DATABASE_ID>?v=...
   ```
3. Copy the `<DATABASE_ID>` part (32-character string)
4. This is your `NOTION_DATABASE_ID`

**Alternative method:**
- Click "Share" on the database
- Click "Copy link"
- The database ID is in the URL after the last `/` and before the `?`

## Step 5: Configure Environment Variables

### For Local Development

Create or update your `.env` file:

```bash
# Notion Configuration
VITE_NOTION_API_KEY=secret_your_notion_integration_token_here
VITE_NOTION_DATABASE_ID=your_32_character_database_id_here
NOTION_API_KEY=secret_your_notion_integration_token_here
NOTION_DATABASE_ID=your_32_character_database_id_here

# Keep other existing variables
SESSION_SECRET=your-strong-random-secret-key-here
ADMIN_EMAILS=admin@grahmos.info
VITE_APP_URL=http://localhost:8888
```

**Note**: Both `VITE_*` and non-prefixed versions are needed:
- `VITE_*` variables are for frontend (Vite)
- Non-prefixed variables are for backend (Netlify Functions)

### For Netlify Deployment

1. Go to your Netlify site dashboard
2. Navigate to **Site settings → Environment variables**
3. Add the following variables:

```
NOTION_API_KEY=secret_your_notion_integration_token_here
NOTION_DATABASE_ID=your_32_character_database_id_here
VITE_NOTION_API_KEY=secret_your_notion_integration_token_here
VITE_NOTION_DATABASE_ID=your_32_character_database_id_here
```

## Step 6: Test the Setup

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to the auth page (usually `/auth`)

3. Try signing up with a test account:
   - Email: `test@example.com`
   - First Name: `Test`
   - Last Name: `User`
   - Password: `password123`

4. Check your Notion database - you should see a new entry!

## Database Schema

The Notion database stores users with the following structure:

```typescript
interface NotionUser {
  id: string;              // Notion page ID (auto-generated)
  email: string;           // User's email (unique identifier)
  firstName?: string;      // User's first name
  lastName?: string;       // User's last name
  password?: string;       // Bcrypt hashed password
  role?: string;          // User role (pending, standard, investor, admin)
  userType?: string;      // Account type (user, waitlist, investor, admin)
  createdAt?: string;     // ISO date string of account creation
}
```

## Security Notes

⚠️ **Important Security Considerations:**

1. **API Token Security**:
   - Never commit your Notion API token to version control
   - Keep it in `.env` files (which should be in `.gitignore`)
   - Rotate the token if it's ever exposed

2. **Password Storage**:
   - Passwords are stored as bcrypt hashes (never plain text)
   - The hash includes salt, making rainbow table attacks ineffective
   - Uses 12 rounds of bcrypt for strong security

3. **Database Permissions**:
   - The integration only has access to databases you explicitly share with it
   - Notion provides built-in access controls and audit logs
   - Consider creating a dedicated workspace for production data

4. **Environment Variables**:
   - Use different Notion databases for development and production
   - Never share production credentials in documentation or code

## Troubleshooting

### "Notion API key is invalid"
- Verify the token starts with `secret_`
- Check that the token is copied correctly without extra spaces
- Ensure the integration is active in Notion

### "Database not found"
- Verify the database ID is correct (32 characters)
- Ensure the database is shared with your integration
- Check that the database URL format matches expectations

### "Property not found"
- Make sure all required properties exist in your database
- Property names are case-sensitive
- Verify property types match the configuration

### "User already exists"
- This is expected behavior for duplicate email addresses
- Notion's API doesn't enforce unique constraints
- The application checks for existing users before creating new ones

## Migration from PostgreSQL

If you're migrating from the old PostgreSQL setup:

1. **Export existing users** from PostgreSQL
2. **Import to Notion** via CSV or API
3. **Update environment variables** to point to Notion
4. **Test authentication** with existing accounts
5. **Remove PostgreSQL credentials** once migration is confirmed

## Advanced Configuration

### Custom Properties

You can add additional properties to track:
- **Company Name** (for investors)
- **Investment Amount** (number)
- **Last Login** (date)
- **Account Status** (select)
- **Notes** (text)

### Notion Automations

Set up Notion automations to:
- Send notifications when new users sign up
- Auto-assign roles based on email domain
- Create follow-up tasks for new investor applications
- Archive inactive accounts after a certain period

## Support

For issues with:
- **Notion setup**: Check [Notion's API documentation](https://developers.notion.com)
- **Application integration**: Review the code in `src/lib/notion.ts`
- **Authentication flow**: Check Netlify Functions in `netlify/functions/`

## Related Files

- `src/lib/notion.ts` - Frontend Notion API utilities
- `netlify/functions/_notion.ts` - Backend Notion API utilities
- `netlify/functions/auth-login.ts` - Login endpoint
- `netlify/functions/auth-signup.ts` - Signup endpoint
- `.env.example` - Environment variable template

---

**Last Updated**: January 2025  
**Version**: 2.0 (Notion-based authentication)
