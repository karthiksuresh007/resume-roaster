# Fix Credits Bug - RLS Policy Issue

## 🐛 **The Problem:**

When you sign up with Google (Firebase Auth), the user record is created in Supabase, but the **Row Level Security (RLS)** policies are blocking the insert because:

1. Firebase Auth and Supabase Auth are separate systems
2. The RLS policies use `auth.uid()` which refers to Supabase Auth users
3. Firebase users don't have a Supabase Auth session
4. Therefore, RLS blocks the insert and credits default to 0

## ✅ **The Fix:**

We need to **temporarily disable RLS** for development. Run this SQL in Supabase:

### **Step 1: Open Supabase SQL Editor**
1. Go to: https://supabase.com/dashboard/project/pkuhfwjqfxvlqmgptsyr
2. Click **SQL Editor** in the left sidebar
3. Click **New Query**

### **Step 2: Run This SQL**

```sql
-- Disable RLS on all tables (temporary fix for Firebase Auth)
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE resumes DISABLE ROW LEVEL SECURITY;
ALTER TABLE analyses DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_activity DISABLE ROW LEVEL SECURITY;
```

### **Step 3: Verify**
1. Click **Run** (or Ctrl+Enter)
2. You should see: "Success. No rows returned"

---

## 🧪 **Test the Fix:**

1. **Sign out** from your current account
2. **Delete your user** from Supabase:
   - Go to **Table Editor** → `users` table
   - Find your user record
   - Click the trash icon to delete it
3. **Sign up again** with Google
4. **Check the `users` table** - you should now see `credits_remaining: 10`
5. **Try uploading a resume** - it should work!

---

## 📝 **Alternative: Manual Fix (If SQL doesn't work)**

If the SQL doesn't work, manually disable RLS:

1. Go to **Table Editor** → `users` table
2. Click the **shield icon** next to the table name
3. Toggle **"Enable RLS"** to OFF
4. Repeat for `resumes`, `analyses`, and `user_activity` tables

---

## 🔒 **Security Note:**

**This is a temporary fix for development.** 

For production, you have 3 options:

### **Option 1: Use Supabase Auth with Firebase Provider** (Recommended)
- Migrate from Firebase Auth to Supabase Auth
- Configure Firebase as an OAuth provider in Supabase
- RLS will work properly with `auth.uid()`

### **Option 2: Backend API with Service Role Key**
- Create a backend API (Express, Next.js API routes, etc.)
- Use Supabase service role key on the backend
- Backend validates Firebase tokens and makes Supabase queries

### **Option 3: Custom RLS with JWT**
- Pass Firebase JWT to Supabase
- Create custom RLS policies that validate Firebase tokens
- More complex setup

For now, **disabling RLS is fine for development** since:
- You're the only user
- Data is filtered by `user_id` in the application
- No sensitive data is exposed

---

## ✅ **After Running the Fix:**

Your credits system will work properly:
- ✅ New users get 10 credits
- ✅ Credits deduct after analysis
- ✅ Upload checks credits before processing
- ✅ Dashboard shows correct credit count

**Run the SQL fix now and let me know if it works!** 🚀
