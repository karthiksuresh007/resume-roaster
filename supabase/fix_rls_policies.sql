-- QUICK FIX: Disable RLS on users table
-- Since we're using Firebase Auth (not Supabase Auth), RLS with auth.uid() doesn't work
-- We'll rely on application-level security instead

-- Disable RLS on users table
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- Keep RLS enabled on other tables but make policies permissive
-- (We'll add proper RLS later when we integrate Firebase with Supabase Auth)

-- For now, allow all operations on resumes, analyses, and user_activity
ALTER TABLE resumes DISABLE ROW LEVEL SECURITY;
ALTER TABLE analyses DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_activity DISABLE ROW LEVEL SECURITY;

-- Note: This is a temporary fix for development.
-- In production, you should:
-- 1. Use Supabase Auth with Firebase as a provider, OR
-- 2. Use service role key for server-side operations, OR
-- 3. Implement custom RLS policies that work with your auth system
