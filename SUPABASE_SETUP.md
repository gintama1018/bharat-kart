# 🚀 Supabase Setup Guide for BharatKart

## Quick Fix for Current Error

The error `supabaseKey is required` occurs because your `.env.local` file contains placeholder values instead of actual Supabase credentials.

## Step-by-Step Setup

### 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Choose your organization
5. Fill in project details:
   - Name: `bharat-kart`
   - Database Password: (create a strong password)
   - Region: (choose closest to your location)
6. Click "Create new project"

### 2. Get Your Project Credentials

Once your project is created:

1. Go to your project dashboard
2. Click on "Settings" in the sidebar
3. Navigate to "API" section
4. Copy the following values:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **anon (public) key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **service_role (secret) key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 3. Update Your Environment Variables

Open your `.env.local` file and replace the placeholder values:

```env
# Replace these with your actual Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=https://your-actual-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-actual-anon-key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-actual-service-role-key
```

### 4. Restart Your Development Server

After updating the environment variables:

```bash
# Stop your current server (Ctrl+C)
# Then restart it
npm run dev
```

## Database Setup (Optional)

If you want to set up the complete database schema:

1. Go to your Supabase project dashboard
2. Navigate to "SQL Editor"
3. Run the database migration scripts (we can provide these if needed)

## Troubleshooting

### Common Issues:

1. **Still getting the error after updating .env.local**
   - Make sure you restarted your development server
   - Check that there are no extra spaces in your environment variables
   - Ensure the file is named exactly `.env.local` (not `.env.local.txt`)

2. **Authentication not working**
   - Enable Email authentication in Supabase dashboard: Authentication > Settings > Email

3. **Can't find .env.local file**
   - Create it in the root directory of your project
   - Copy content from `.env.example` and update with real values

## Security Notes

- ✅ **anon key** is safe to expose in client-side code
- ❌ **service_role key** should NEVER be exposed to the client
- 🔒 Always use `.env.local` for local development
- 🚫 Never commit `.env.local` to version control

## Need Help?

If you're still having issues:
1. Double-check your Supabase project is fully created (this can take a minute)
2. Verify the URL format: `https://[project-id].supabase.co`
3. Make sure you copied the complete keys (they're quite long)

Once you update your `.env.local` with real Supabase credentials, the error will be resolved!