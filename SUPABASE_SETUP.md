# Supabase Setup Guide for Learn Malayalam

This guide will help you set up Supabase for progress tracking in the Learn Malayalam app.

## Why Supabase?

Supabase provides:
- **Free tier** with generous limits
- **User authentication** (optional)
- **PostgreSQL database** for storing progress
- **Real-time updates** (if needed later)
- **Easy to use** with JavaScript

## Step-by-Step Setup

### 1. Create a Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub, Google, or email

### 2. Create a New Project

1. Click "New Project"
2. Choose your organization (or create one)
3. Fill in project details:
   - **Name**: `learn-malayalam` (or any name you prefer)
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to your location
4. Click "Create new project"
5. Wait 2-3 minutes for setup to complete

### 3. Create the Database Table

1. In your Supabase dashboard, click on "SQL Editor" in the left sidebar
2. Click "New Query"
3. Copy and paste this SQL code:

```sql
-- Create user_progress table
CREATE TABLE user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,
  score INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- Create index for faster queries
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_lesson_id ON user_progress(lesson_id);

-- Enable Row Level Security
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Create policies for security
CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own progress"
  ON user_progress FOR DELETE
  USING (auth.uid() = user_id);
```

4. Click "Run" to execute the SQL
5. You should see "Success. No rows returned"

### 4. Get Your API Keys

1. Click on "Settings" (gear icon) in the left sidebar
2. Click on "API" under Project Settings
3. You'll see two important values:
   - **Project URL**: Something like `https://xxxxx.supabase.co`
   - **anon public key**: A long string starting with `eyJ...`
4. Copy both values

### 5. Configure Your App

1. In your project root, create a file named `.env`:

```bash
# In the learn_malayalam folder
touch .env
```

2. Add your Supabase credentials to `.env`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

3. Replace the values with your actual Project URL and anon key

4. Save the file

### 6. Enable Authentication (Optional)

If you want users to sign up and log in:

1. In Supabase dashboard, go to "Authentication" → "Providers"
2. Enable the providers you want:
   - **Email**: Simple email/password login
   - **Google**: OAuth with Google
   - **GitHub**: OAuth with GitHub
3. Configure each provider according to the instructions

### 7. Test the Setup

1. Restart your development server:
```bash
npm run dev
```

2. Open the app in your browser
3. The app should now connect to Supabase
4. Check the browser console for any errors

## Database Schema

The `user_progress` table has the following structure:

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key (auto-generated) |
| user_id | UUID | Reference to authenticated user |
| lesson_id | TEXT | Unique identifier for each lesson |
| score | INTEGER | Test score (0-100) |
| completed | BOOLEAN | Whether lesson is completed |
| created_at | TIMESTAMP | When record was created |
| updated_at | TIMESTAMP | When record was last updated |

## Viewing Your Data

To view the data in your database:

1. Go to "Table Editor" in Supabase dashboard
2. Select "user_progress" table
3. You'll see all progress records

## Security Notes

- ✅ Row Level Security (RLS) is enabled - users can only see their own data
- ✅ The anon key is safe to use in frontend code
- ✅ Never share your service_role key (keep it secret!)
- ✅ The `.env` file is in `.gitignore` (won't be committed to Git)

## Troubleshooting

### "Failed to fetch" error
- Check that your `.env` file has the correct URL and key
- Make sure you restarted the dev server after creating `.env`

### "JWT expired" error
- Your session has expired
- Implement proper authentication flow
- Or use the app without authentication (progress won't be saved)

### Can't insert data
- Check that RLS policies are created correctly
- Make sure user is authenticated
- Check browser console for detailed errors

## Free Tier Limits

Supabase free tier includes:
- ✅ 500 MB database space
- ✅ 1 GB file storage
- ✅ 2 GB bandwidth per month
- ✅ 50,000 monthly active users
- ✅ Unlimited API requests

This is more than enough for a personal learning app!

## Next Steps

Once Supabase is set up, you can:
1. Add user authentication UI
2. Save test scores automatically
3. Show progress charts
4. Add achievements and badges
5. Implement spaced repetition

## Need Help?

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord Community](https://discord.supabase.com)
- [GitHub Issues](your-repo-url/issues)

---

Happy learning! 🎉

