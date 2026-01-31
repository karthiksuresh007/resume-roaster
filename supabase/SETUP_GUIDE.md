# Supabase Database Setup Guide

## 📋 Step-by-Step Instructions

### Step 1: Open Supabase SQL Editor
1. Go to: https://supabase.com/dashboard/project/pkuhfwjqfxvlqmgptsyr
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**

### Step 2: Run the Schema Script
1. Open the file: `supabase/schema.sql`
2. Copy ALL the SQL code
3. Paste it into the Supabase SQL Editor
4. Click **Run** (or press Ctrl+Enter)
5. Wait for success message: "Success. No rows returned"

### Step 3: Verify Tables Created
1. Click on **Table Editor** in the left sidebar
2. You should see 4 new tables:
   - ✅ `users`
   - ✅ `resumes`
   - ✅ `analyses`
   - ✅ `user_activity`

### Step 4: Create Storage Buckets

#### Create 'resumes' Bucket (Private)
1. Click on **Storage** in the left sidebar
2. Click **New bucket**
3. Settings:
   - Name: `resumes`
   - Public: **OFF** (unchecked)
   - File size limit: `5242880` (5MB)
   - Allowed MIME types: `application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document`
4. Click **Create bucket**

#### Create 'avatars' Bucket (Public)
1. Click **New bucket** again
2. Settings:
   - Name: `avatars`
   - Public: **ON** (checked)
   - File size limit: `2097152` (2MB)
   - Allowed MIME types: `image/jpeg,image/png,image/webp`
3. Click **Create bucket**

### Step 5: Set Storage Policies

#### For 'resumes' bucket:
1. Click on the `resumes` bucket
2. Click **Policies** tab
3. Click **New Policy**
4. Choose **Custom policy**
5. Add these policies:

**Policy 1: Users can upload their own resumes**
```sql
CREATE POLICY "Users can upload own resumes"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'resumes' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

**Policy 2: Users can view their own resumes**
```sql
CREATE POLICY "Users can view own resumes"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'resumes' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

**Policy 3: Users can delete their own resumes**
```sql
CREATE POLICY "Users can delete own resumes"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'resumes' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

#### For 'avatars' bucket:
1. Click on the `avatars` bucket
2. Click **Policies** tab
3. Click **New Policy**
4. Choose **Custom policy**

**Policy 1: Users can upload their own avatars**
```sql
CREATE POLICY "Users can upload own avatars"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

**Policy 2: Anyone can view avatars (public)**
```sql
CREATE POLICY "Anyone can view avatars"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');
```

**Policy 3: Users can update their own avatars**
```sql
CREATE POLICY "Users can update own avatars"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

---

## ✅ Verification Checklist

After completing all steps, verify:

- [ ] 4 tables created (`users`, `resumes`, `analyses`, `user_activity`)
- [ ] All tables have RLS enabled (green shield icon)
- [ ] 2 storage buckets created (`resumes`, `avatars`)
- [ ] `resumes` bucket is **private**
- [ ] `avatars` bucket is **public**
- [ ] Storage policies are set up

---

## 🚨 Troubleshooting

**Error: "relation already exists"**
- Tables already created, you're good!

**Error: "permission denied"**
- Make sure you're logged in as the project owner

**Error: "auth.uid() does not exist"**
- This is normal for RLS policies, they work when users are authenticated

---

## 📝 Notes

- The `auth.uid()` in RLS policies refers to the Firebase user ID
- We'll sync Firebase auth with Supabase using the user's Firebase UID as the primary key
- Storage files will be organized by user ID: `resumes/{user_id}/filename.pdf`

---

**Once you've completed these steps, let me know and I'll continue building the frontend!** 🚀
