-- ============================================
-- Resume Roaster - Supabase Database Schema
-- ============================================

-- 1. USERS TABLE
-- Stores user profile information
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'basic', 'pro')),
  credits_remaining INTEGER DEFAULT 10,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. RESUMES TABLE
-- Stores uploaded resume files
CREATE TABLE IF NOT EXISTS resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL CHECK (file_type IN ('pdf', 'docx')),
  file_size INTEGER NOT NULL,
  version INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ANALYSES TABLE
-- Stores resume analysis results
CREATE TABLE IF NOT EXISTS analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE,
  ats_score INTEGER NOT NULL,
  ats_breakdown JSONB NOT NULL,
  roast_savage TEXT NOT NULL,
  roast_mild TEXT NOT NULL,
  fixes JSONB NOT NULL,
  roast_mode TEXT DEFAULT 'savage' CHECK (roast_mode IN ('savage', 'mild')),
  processing_time INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. USER_ACTIVITY TABLE
-- Tracks user actions for analytics
CREATE TABLE IF NOT EXISTS user_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  action TEXT NOT NULL CHECK (action IN ('upload', 'analyze', 'download', 'share', 'login', 'signup')),
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES for better query performance
-- ============================================

CREATE INDEX IF NOT EXISTS idx_resumes_user_id ON resumes(user_id);
CREATE INDEX IF NOT EXISTS idx_analyses_user_id ON analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_analyses_resume_id ON analyses(resume_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_user_id ON user_activity(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_created_at ON user_activity(created_at);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activity ENABLE ROW LEVEL SECURITY;

-- USERS TABLE POLICIES
-- Users can read their own data
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (id = auth.uid());

-- Users can update their own data
CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (id = auth.uid());

-- RESUMES TABLE POLICIES
-- Users can view their own resumes
CREATE POLICY "Users can view own resumes"
  ON resumes FOR SELECT
  USING (user_id = auth.uid());

-- Users can insert their own resumes
CREATE POLICY "Users can insert own resumes"
  ON resumes FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Users can delete their own resumes
CREATE POLICY "Users can delete own resumes"
  ON resumes FOR DELETE
  USING (user_id = auth.uid());

-- ANALYSES TABLE POLICIES
-- Users can view their own analyses
CREATE POLICY "Users can view own analyses"
  ON analyses FOR SELECT
  USING (user_id = auth.uid());

-- Users can insert their own analyses
CREATE POLICY "Users can insert own analyses"
  ON analyses FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- USER_ACTIVITY TABLE POLICIES
-- Users can view their own activity
CREATE POLICY "Users can view own activity"
  ON user_activity FOR SELECT
  USING (user_id = auth.uid());

-- Users can insert their own activity
CREATE POLICY "Users can insert own activity"
  ON user_activity FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at on users table
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- STORAGE BUCKETS (Run these separately in Storage section)
-- ============================================

-- Note: Storage buckets must be created via Supabase Dashboard or Storage API
-- 1. Create 'resumes' bucket (Private)
-- 2. Create 'avatars' bucket (Public)

-- Storage policies will be added after buckets are created
