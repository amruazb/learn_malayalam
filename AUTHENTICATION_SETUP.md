# Authentication Setup Guide

This guide will help you enable user authentication in your Learn Malayalam app using Supabase.

## 🎯 What You Get

- ✅ User registration (sign up)
- ✅ User login (sign in)
- ✅ Password reset functionality
- ✅ Email verification
- ✅ Secure session management
- ✅ User profile data

## 📋 Prerequisites

- Supabase project created (you already have this!)
- `.env` file configured with Supabase credentials (already done!)

## 🔧 Step 1: Enable Email Authentication in Supabase

1. **Go to your Supabase Dashboard**: https://app.supabase.com
2. **Select your project** (lwncoislrtenwonrjxbp)
3. **Click on "Authentication"** in the left sidebar
4. **Click on "Providers"**
5. **Find "Email"** in the list
6. **Make sure it's ENABLED** (it should be enabled by default)

### Optional: Configure Email Settings

By default, Supabase sends confirmation emails. You can customize this:

1. In **Authentication → Providers → Email**
2. Toggle **"Confirm email"** if you want to require email verification
3. Toggle **"Secure email change"** for additional security

## 🔧 Step 2: Configure Email Templates (Optional)

Customize the emails users receive:

1. Go to **Authentication → Email Templates**
2. You can customize:
   - **Confirm signup** - Email sent when user registers
   - **Magic Link** - For passwordless login (optional)
   - **Change Email Address** - When user changes email
   - **Reset Password** - Password reset email

## 🔧 Step 3: Set Up Redirect URLs

For password reset to work properly:

1. Go to **Authentication → URL Configuration**
2. Add your site URL:
   - For local development: `http://localhost:5173`
   - For production: Your deployed URL (e.g., `https://your-app.vercel.app`)
3. Add to **Redirect URLs**:
   - `http://localhost:5173/**`
   - `https://your-app.vercel.app/**` (when deployed)

## 🔧 Step 4: Database Setup (Already Done!)

The `user_progress` table you created earlier is already set up with proper authentication:

```sql
-- This is already in your database from earlier setup
CREATE TABLE user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  ...
);
```

The Row Level Security (RLS) policies ensure users can only see their own data.

## ✅ Step 5: Test the Authentication

### Test Registration

1. **Start your app**: `npm run dev`
2. **Open**: http://localhost:5173
3. **Click "Sign Up"** in the navigation
4. **Fill in the form**:
   - Full Name: Your Name
   - Email: your.email@example.com
   - Password: At least 6 characters
   - Confirm Password: Same password
5. **Click "Sign Up"**
6. **Check your email** for confirmation link (if email confirmation is enabled)

### Test Login

1. **Click "Sign In"** in the navigation
2. **Enter your credentials**
3. **Click "Sign In"**
4. You should be logged in and see your email in the navigation

### Test Password Reset

1. **Go to login page**
2. **Click "Forgot Password?"**
3. **Enter your email**
4. **Click "Send Reset Link"**
5. **Check your email** for the reset link

## 🎨 Features Included

### Login Page (`/login`)
- Email and password login
- "Forgot Password" functionality
- Link to registration page
- Error handling
- Loading states

### Registration Page (`/register`)
- Full name, email, password fields
- Password confirmation
- Validation (6+ characters, matching passwords)
- Success message
- Auto-redirect after signup

### Navigation Bar
- Shows "Sign In" and "Sign Up" when logged out
- Shows user email and "Sign Out" when logged in
- Responsive design

### Authentication Context
- Global user state management
- Sign up, sign in, sign out functions
- Password reset functionality
- Profile update capability

## 🔒 Security Features

### Already Implemented

1. **Row Level Security (RLS)** - Users can only access their own data
2. **Secure password storage** - Handled by Supabase
3. **JWT tokens** - Automatic session management
4. **HTTPS required** - For production deployments
5. **Email verification** - Optional, can be enabled in Supabase

### Best Practices

- ✅ Never store passwords in plain text (Supabase handles this)
- ✅ Use environment variables for API keys (already done)
- ✅ Validate user input on both client and server
- ✅ Use HTTPS in production
- ✅ Enable email verification for production

## 📧 Email Configuration (Production)

For production, you'll want to use a custom email provider:

1. Go to **Authentication → Email Templates**
2. Click **"Settings"** at the top
3. Configure SMTP settings with your email provider:
   - Gmail
   - SendGrid
   - AWS SES
   - Mailgun
   - etc.

**Note**: Supabase free tier includes email sending, but with limits. For production, use a custom SMTP provider.

## 🚀 Next Steps

### Optional Enhancements

1. **Social Login** (Google, GitHub, etc.)
   - Enable in Supabase Authentication → Providers
   - Add social login buttons to Login page

2. **User Profile Page**
   - Create a profile page to edit user info
   - Update full name, avatar, etc.

3. **Protected Routes**
   - Require login for certain features
   - Redirect to login if not authenticated

4. **Remember Me**
   - Add "Remember Me" checkbox
   - Extend session duration

## 🐛 Troubleshooting

### "Invalid login credentials"
- Check email and password are correct
- Verify email is confirmed (if confirmation is enabled)
- Check Supabase dashboard for user existence

### "Email not confirmed"
- Check your email inbox (and spam folder)
- Resend confirmation email from Supabase dashboard
- Or disable email confirmation in Supabase settings

### Password reset not working
- Verify redirect URLs are configured in Supabase
- Check email for reset link
- Ensure SMTP is configured (for production)

### User not persisting after refresh
- Check browser console for errors
- Verify Supabase credentials in `.env`
- Clear browser cache and cookies

## 📊 Monitoring Users

### View Users in Supabase

1. Go to **Authentication → Users**
2. See all registered users
3. Manually verify emails
4. Delete test users
5. View user metadata

### User Metadata

Each user has:
- `id` - Unique user ID
- `email` - User's email
- `user_metadata.full_name` - Full name from registration
- `created_at` - Registration date
- `last_sign_in_at` - Last login time

## 🎉 You're All Set!

Your Learn Malayalam app now has:
- ✅ Complete user authentication
- ✅ Secure login and registration
- ✅ Password reset functionality
- ✅ User session management
- ✅ Protected user data

Users can now:
1. Create an account
2. Sign in and out
3. Reset their password
4. Have their progress tracked (linked to their account)

---

**Need help?** Check the Supabase documentation: https://supabase.com/docs/guides/auth

