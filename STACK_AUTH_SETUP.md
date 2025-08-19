# Stack Auth Setup Guide

## Current Status
✅ Stack Auth SDK integrated in React app
✅ Database schema updated for Stack Auth user IDs
✅ Backend API functions updated to validate Stack Auth JWTs
✅ Webhook handler created for user creation
✅ Frontend components updated to use Stack Auth

## Required Configuration

### 1. Stack Auth Dashboard Configuration

In your Stack Auth project dashboard (https://app.stack-auth.com), you need to configure:

#### Webhook URL
- **Development**: `http://localhost:8888/.netlify/functions/stack-auth-webhook`
- **Production**: `https://grahmos.info/.netlify/functions/stack-auth-webhook`

#### Webhook Events
Enable the following webhook events:
- `user.created` - When a new user signs up
- `user.updated` - When user information is updated
- `user.deleted` - When a user is deleted

#### Allowed Domains
- Development: `http://localhost:8888`
- Production: `https://grahmos.info`

### 2. Environment Variables (Already Configured)
```bash
VITE_STACK_PROJECT_ID=4cf4e61e-76b7-44cf-93e0-b49fda7ee3f8
VITE_STACK_PUBLISHABLE_CLIENT_KEY=pck_hmbs7s7tzvssez37j686zdahr6rw3az4jsdg99vea10g0
STACK_SECRET_SERVER_KEY=ssk_jyds80j0jvk1fjm1f83chfkyfkwtw352kttfwvrpnn318
```

### 3. Database Migration (Completed)
The database has been updated with:
- `stack_user_id` column added to users table
- Old auth system users cleaned up

## Testing the Integration

### Test User Creation via Webhook
```bash
curl -X POST 'http://localhost:8888/.netlify/functions/stack-auth-webhook' \
  -H 'Content-Type: application/json' \
  -d '{
    "type": "user.created",
    "data": {
      "user": {
        "id": "test-user-123",
        "primaryEmail": "test@example.com",
        "primaryEmailVerified": true,
        "displayName": "Test User",
        "profileImageUrl": null,
        "signedUpAtMillis": 1609459200000,
        "clientMetadata": {},
        "serverMetadata": {}
      }
    }
  }'
```

### Test Authentication
```bash
# Create test JWT
node -e "
const jwt = require('jsonwebtoken');
const token = jwt.sign({
  sub: 'test-user-123',
  email: 'test@example.com',
  email_verified: true,
  name: 'Test User',
  iat: Math.floor(Date.now() / 1000),
  exp: Math.floor(Date.now() / 1000) + 3600
}, 'test-secret');
console.log(token);
"

# Test auth-me endpoint
curl -X GET 'http://localhost:8888/.netlify/functions/auth-me' \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN_HERE'
```

## Authentication Flow

1. User signs up via Stack Auth UI at `/auth/signup`
2. Stack Auth creates user account
3. Stack Auth calls webhook to create user in Neon database
4. User can now access protected features
5. Frontend uses Stack Auth JWT tokens for API calls
6. Backend validates tokens and returns user data

## Current Issues Resolved

✅ **Email already registered error**: Cleaned up conflicting users from old auth system
✅ **Users not in database**: Webhook automatically creates users
✅ **API authentication**: All endpoints now use Stack Auth JWT validation
✅ **Frontend integration**: Components use Stack Auth hooks and send proper headers

## Next Steps

1. Configure webhook URL in Stack Auth dashboard
2. Test end-to-end signup flow
3. Deploy to production and update webhook URL

## Notes

- The current JWT validation is simplified for development (decode only)
- For production, implement proper JWT verification with Stack Auth public keys
- Webhook handler supports user.created, user.updated, and user.deleted events
- Admin users are automatically detected based on ADMIN_EMAILS environment variable
