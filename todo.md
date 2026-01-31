# 🔥 Resume Roaster - Complete Development TODO

**Project:** Resume Roaster MVP  
**Timeline:** 8 Days  
**Tech Stack:** React (Vite) + Tailwind CSS + Framer Motion + Supabase  
**Design System:** Dark/Glassmorphism/Neon/Playful Brutalism  

---

## 📋 Phase 1: Project Setup & Foundation (Days 1-2)

### 1.1 Project Initialization
- [ ] Initialize Vite + React project
  ```bash
  npm create vite@latest resumer -- --template react
  ```
- [ ] Install core dependencies
  ```bash
  npm install tailwindcss postcss autoprefixer framer-motion
  npm install react-router-dom
  npm install @supabase/supabase-js
  ```
- [ ] Install dev dependencies
  ```bash
  npm install -D @types/node
  ```

### 1.2 Tailwind Configuration
- [ ] Initialize Tailwind CSS
  ```bash
  npx tailwindcss init -p
  ```
- [ ] Configure `tailwind.config.js` with design tokens:
  - [ ] Custom colors (bg-primary, bg-secondary, glass, neon variants)
  - [ ] Custom fonts (Inter, JetBrains Mono)
  - [ ] Custom font sizes (hero, section, body, roast, micro)
  - [ ] Custom spacing (18, 88, 128)
  - [ ] Custom border radius (xl: 20px, 2xl: 24px, 3xl: 28px)
  - [ ] Custom shadows (glass, glow-pink, glow-green, glow-orange, glow-red)
  - [ ] Custom animations (pulse-border, typewriter, count-up, shake, float)
  - [ ] Custom keyframes

### 1.3 Global Styles
- [ ] Create `src/styles/globals.css`
  - [ ] Import Tailwind directives
  - [ ] Import Google Fonts (Inter + JetBrains Mono)
  - [ ] Set dark background default
  - [ ] Add glassmorphism utilities
  - [ ] Add custom scrollbar styles
  - [ ] Add focus-visible styles (neon-pink outline)

### 1.4 Project Structure
- [ ] Create folder structure:
  ```
  src/
  ├── components/
  │   ├── ui/
  │   ├── landing/
  │   ├── results/
  │   ├── paywall/
  │   └── effects/
  ├── pages/
  ├── utils/
  └── styles/
  ```

### 1.5 Environment Setup
- [ ] Create `.env` file with variables:
  - [ ] `VITE_SUPABASE_URL`
  - [ ] `VITE_SUPABASE_ANON_KEY`
  - [ ] `VITE_STRIPE_PUBLISHABLE_KEY`
  - [ ] `VITE_APP_URL`
- [ ] Create `.env.example` for documentation
- [ ] Add `.env` to `.gitignore`

### 1.6 Supabase Setup
- [ ] Create Supabase project
- [ ] Create storage bucket `temp-resumes`:
  - [ ] Set public: false
  - [ ] Set max file size: 5MB
  - [ ] Set allowed MIME types: PDF, DOCX
  - [ ] Configure auto-delete: 24 hours
- [ ] Create `analysis_log` table:
  - [ ] `id` (uuid, primary key)
  - [ ] `created_at` (timestamp)
  - [ ] `ats_score` (int)
  - [ ] `roast_mode` (string)
  - [ ] `converted_to_paid` (boolean)

---

## 🎨 Phase 2: UI Components Library (Days 2-3)

### 2.1 Base Components (`src/components/ui/`)

#### Button.jsx
- [ ] Create Primary button variant
  - [ ] Gradient background (pink → orange)
  - [ ] White text
  - [ ] Hover: scale(1.02)
  - [ ] Active: scale(0.98)
  - [ ] Loading state with spinner
  - [ ] Disabled state
- [ ] Create Secondary button variant
  - [ ] Glass background
  - [ ] Glass border
  - [ ] Hover effects
- [ ] Add Framer Motion animations
- [ ] Add accessibility (aria-labels, keyboard support)

#### GlassCard.jsx
- [ ] Base glass card component
  - [ ] Background: `rgba(255,255,255,0.08)`
  - [ ] Border: `rgba(255,255,255,0.12)`
  - [ ] Border radius: 24px
  - [ ] Backdrop blur: 12px
  - [ ] Glass shadow
- [ ] Hover state (increased opacity)
- [ ] Accept children and className props
- [ ] Framer Motion wrapper

#### Toggle.jsx (Roast Mode)
- [ ] Pill-shaped toggle switch
- [ ] Two states: Mild 🌶️ / Savage 🔥
- [ ] Instant switch (no delay)
- [ ] Animated slider
- [ ] Neon pink accent
- [ ] Keyboard accessible (arrow keys)
- [ ] aria-pressed state

#### Gauge.jsx (ATS Score)
- [ ] Circular progress ring
- [ ] Animated count-up (0 → score over 2s)
- [ ] Color logic:
  - [ ] 0-40: Neon Red
  - [ ] 41-70: Neon Orange
  - [ ] 71-100: Neon Green
- [ ] Pulsing effect for low scores
- [ ] Center score display
- [ ] Caption below gauge
- [ ] Intersection Observer trigger
- [ ] aria-valuenow for accessibility

### 2.2 Utility Components (`src/utils/`)

#### animations.js
- [ ] Export `fadeInUp` variant
- [ ] Export `scaleIn` variant
- [ ] Export `slideInRight` variant
- [ ] Export `shake` variant
- [ ] Export `hoverLift` variant
- [ ] Export `modalVariants` variant
- [ ] Export `typewriterVariants` variant
- [ ] Export `pulseGlow` variant

#### parseResume.js
- [ ] PDF text extraction function
- [ ] DOCX text extraction function
- [ ] File validation (size, type)
- [ ] Error handling
- [ ] Return structured text

#### analytics.js
- [ ] Track page_view
- [ ] Track upload_start
- [ ] Track upload_complete
- [ ] Track roast_viewed
- [ ] Track toggle_roast_mode
- [ ] Track fixes_viewed
- [ ] Track paywall_shown
- [ ] Track payment_initiated
- [ ] Track payment_completed
- [ ] Track share_clicked

---

## 🏠 Phase 3: Landing Page (Day 3)

### 3.1 Landing Components (`src/components/landing/`)

#### Hero.jsx
- [ ] Hero headline (56px, extrabold)
  - [ ] "Your Resume Sucks. Let Us Fix It. 🔥"
- [ ] Subheadline (18px, secondary text)
  - [ ] "Get roasted by AI, then get hired by humans."
- [ ] Responsive font sizes (mobile: 40px, tablet: 48px)
- [ ] Fade-in animation
- [ ] Floating decorative shapes (optional)

#### UploadZone.jsx
- [ ] Large glass card (24px radius)
- [ ] Dashed neon border (animated pulse)
- [ ] Center emoji 🔥📄
- [ ] Title: "Drop your resume here"
- [ ] Subtitle: "PDF or DOCX • Max 5MB"
- [ ] Primary CTA button: "Roast Me 🔥"
- [ ] Drag & drop functionality:
  - [ ] onDragEnter: solid border, background tint
  - [ ] onDragLeave: revert to dashed
  - [ ] onDrop: process file
- [ ] File input (hidden, triggered by click)
- [ ] File validation:
  - [ ] Check file size (max 5MB)
  - [ ] Check file type (PDF, DOCX)
  - [ ] Show error states with humor
- [ ] States:
  - [ ] Idle: dashed border, subtle pulse
  - [ ] Hover: lift 4px, pink glow
  - [ ] Dragging: solid border, pink tint
  - [ ] Processing: orange glow, spinner
  - [ ] Error: red glow, shake animation
- [ ] Mobile: 70vh height, fixed bottom CTA
- [ ] Accessibility: aria-label, keyboard support

#### SocialProof.jsx
- [ ] Counter: "10,000+ resumes roasted"
- [ ] Star rating: "4.8★ on ProductHunt"
- [ ] Animated counter (optional)
- [ ] Fade-in animation

### 3.2 Landing Page (`src/pages/Landing.jsx`)
- [ ] Compose Hero + UploadZone + SocialProof
- [ ] Max width: 1200px
- [ ] Center aligned
- [ ] Proper spacing (space-3xl for hero)
- [ ] Background: bg-primary
- [ ] Handle file upload → navigate to Results
- [ ] Track analytics (page_view, upload_start)

---

## 🎯 Phase 4: Results Page (Days 4-5)

### 4.1 Effects Components (`src/components/effects/`)

#### TypewriterText.jsx
- [ ] Character-by-character reveal
- [ ] 50ms per character
- [ ] Monospace font (JetBrains Mono)
- [ ] Accept text prop
- [ ] onComplete callback
- [ ] Respect prefers-reduced-motion

#### FireParticles.jsx
- [ ] Floating fire emoji particles
- [ ] Random positions
- [ ] Float animation (3s ease-in-out infinite)
- [ ] Fade in/out
- [ ] Trigger on low ATS score (<40)
- [ ] Performance optimized (max 10 particles)

#### FloatingShapes.jsx
- [ ] Decorative background shapes
- [ ] Subtle gradients
- [ ] Slow float animation
- [ ] Low z-index (behind content)
- [ ] Optional (if time permits)

### 4.2 Results Components (`src/components/results/`)

#### RoastDisplay.jsx
- [ ] Glass card with pink gradient glow
- [ ] Roast mode toggle at top
- [ ] Typewriter effect for roast text
- [ ] Structure:
  - [ ] Intro line
  - [ ] Bullet points (array)
  - [ ] Conclusion line
- [ ] Shake animation on harsh lines
- [ ] Fire emoji bursts (optional)
- [ ] Sound toggle (optional)
- [ ] Handle mode switch (mild/savage)
- [ ] Fade transition between modes (150ms)

#### ATSScore.jsx
- [ ] Circular gauge component
- [ ] Large score number in center
- [ ] Animated count-up (0 → score over 2s)
- [ ] Ring animation (draw from 0° to score%)
- [ ] Color-coded by score range
- [ ] Pulsing glow for low scores
- [ ] Score breakdown (4 metrics):
  - [ ] Formatting
  - [ ] Keywords
  - [ ] Impact
  - [ ] Clarity
- [ ] Caption based on score:
  - [ ] <40: "Ghosted harder than a bad Tinder date."
  - [ ] 40-70: "Almost hireable. Almost."
  - [ ] 70+: "Okay… this actually slaps."
- [ ] Fade-in caption after count completes
- [ ] Intersection Observer trigger

#### FixCard.jsx
- [ ] Glass card
- [ ] Mistake category title
- [ ] Impact badge (high/medium/low)
- [ ] Before/After comparison:
  - [ ] ❌ Before (red text)
  - [ ] ✅ After (green text)
- [ ] Expand on click (optional)
- [ ] Highlight changed words in neon green
- [ ] Hover: slight lift
- [ ] Accessible (keyboard expandable)

#### FixesList.jsx
- [ ] Section title: "Top 5 Mistakes"
- [ ] Vertical stack of FixCard components
- [ ] Stagger animation (each card delays 100ms)
- [ ] Responsive grid:
  - [ ] Mobile: 1 column
  - [ ] Tablet: 2 columns
  - [ ] Desktop: 1 column (wider)

### 4.3 Results Page (`src/pages/Results.jsx`)
- [ ] Section order (critical):
  1. [ ] RoastDisplay
  2. [ ] ATSScore
  3. [ ] FixesList
  4. [ ] Paywall trigger
- [ ] Max width: 1200px
- [ ] Proper spacing between sections (space-2xl)
- [ ] Scroll-triggered animations
- [ ] Track analytics (roast_viewed, fixes_viewed)
- [ ] Handle roast mode toggle
- [ ] Trigger paywall after fixes scroll

---

## 🤖 Phase 4.5: Backend & AI Integration (Days 4.5-5) **[CRITICAL - MAKE IT WORK!]**

### 4.5.1 PDF/DOCX Text Extraction
- [ ] Install PDF parsing library
  ```bash
  npm install pdf-parse
  npm install mammoth  # for DOCX
  ```
- [ ] Create `src/utils/extractText.js`:
  - [ ] `extractFromPDF(file)` - Extract text from PDF
  - [ ] `extractFromDOCX(file)` - Extract text from DOCX
  - [ ] `extractText(file)` - Main function that detects type
  - [ ] Handle multi-page PDFs
  - [ ] Handle formatting (preserve structure)
  - [ ] Error handling for corrupted files
  - [ ] Return structured text object

### 4.5.2 AI API Integration (Choose ONE)

#### Option A: OpenAI GPT-4 (Recommended)
- [ ] Install OpenAI SDK
  ```bash
  npm install openai
  ```
- [ ] Add to `.env`:
  ```
  VITE_OPENAI_API_KEY=sk-...
  ```
- [ ] Create `src/services/openai.js`:
  - [ ] Initialize OpenAI client
  - [ ] `analyzeResume(resumeText, mode)` function
  - [ ] Prompt engineering for roast generation
  - [ ] Prompt for ATS score calculation
  - [ ] Prompt for fixes generation
  - [ ] Return structured JSON response
  - [ ] Handle rate limits
  - [ ] Handle API errors

#### Option B: Google Gemini (Free tier available)
- [ ] Install Gemini SDK
  ```bash
  npm install @google/generative-ai
  ```
- [ ] Add to `.env`:
  ```
  VITE_GEMINI_API_KEY=...
  ```
- [ ] Create `src/services/gemini.js`:
  - [ ] Initialize Gemini client
  - [ ] `analyzeResume(resumeText, mode)` function
  - [ ] Same prompts as OpenAI
  - [ ] Return structured JSON response

### 4.5.3 AI Prompt Engineering
- [ ] Create `src/prompts/resumeAnalysis.js`:
  - [ ] **System Prompt:**
    ```
    You are a brutal but helpful resume critic. Analyze resumes and provide:
    1. ATS score (0-100) based on formatting, keywords, impact, clarity
    2. Savage roast (funny, harsh but constructive)
    3. Mild roast (constructive, professional)
    4. Actionable fixes (before/after examples)
    ```
  - [ ] **Roast Prompt (Savage):**
    - Funny, sarcastic, but educational
    - Point out clichés, weak verbs, missing metrics
    - Use emojis and personality
  - [ ] **Roast Prompt (Mild):**
    - Professional, constructive
    - Same issues but nicer tone
  - [ ] **ATS Score Prompt:**
    - Calculate score based on:
      - Formatting (25 points)
      - Keywords (25 points)
      - Impact/metrics (25 points)
      - Clarity (25 points)
    - Return breakdown
  - [ ] **Fixes Prompt:**
    - Identify 5-10 specific issues
    - Provide before/after examples
    - Categorize (Summary, Experience, Skills, etc.)
    - Prioritize by impact

### 4.5.4 Resume Analysis Service
- [ ] Create `src/services/resumeAnalyzer.js`:
  - [ ] `analyzeResume(file, roastMode)` - Main function
  - [ ] Steps:
    1. [ ] Extract text from file
    2. [ ] Call AI API with prompts
    3. [ ] Parse AI response
    4. [ ] Structure data for frontend
    5. [ ] Handle errors gracefully
  - [ ] Return format:
    ```javascript
    {
      atsScore: {
        score: 47,
        breakdown: {
          formatting: 65,
          keywords: 35,
          impact: 40,
          clarity: 50
        }
      },
      roast: {
        mild: "...",
        savage: "..."
      },
      fixes: [
        {
          category: "Summary",
          issue: "...",
          before: "...",
          after: "..."
        }
      ]
    }
    ```

### 4.5.5 Supabase Edge Functions (Backend)
- [ ] Install Supabase CLI
  ```bash
  npm install -g supabase
  ```
- [ ] Initialize Supabase functions
  ```bash
  supabase functions new analyze-resume
  ```
- [ ] Create `supabase/functions/analyze-resume/index.ts`:
  - [ ] Accept POST request with file
  - [ ] Extract text from file
  - [ ] Call OpenAI/Gemini API
  - [ ] Return analysis JSON
  - [ ] Handle CORS
  - [ ] Rate limiting (max 10/hour per IP)
  - [ ] Error handling
  - [ ] Log to `analysis_log` table
- [ ] Deploy function:
  ```bash
  supabase functions deploy analyze-resume
  ```

### 4.5.6 Update Frontend to Use Real API
- [ ] Update `src/components/landing/UploadZone.jsx`:
  - [ ] Replace mock `processFile()` with real API call
  - [ ] Call `analyzeResume(file, 'savage')`
  - [ ] Show loading state during API call
  - [ ] Handle API errors (show user-friendly message)
  - [ ] Navigate to results with real data
- [ ] Update `src/pages/Results.jsx`:
  - [ ] Remove `mockResumeData` import
  - [ ] Use data from navigation state
  - [ ] Handle missing data gracefully
  - [ ] Show loading skeleton if data is still processing

### 4.5.7 Error Handling & Edge Cases
- [ ] Handle API failures:
  - [ ] Network errors
  - [ ] API rate limits
  - [ ] Invalid API keys
  - [ ] Timeout (>30 seconds)
- [ ] Handle file parsing errors:
  - [ ] Corrupted PDFs
  - [ ] Password-protected files
  - [ ] Scanned images (no text)
  - [ ] Empty files
- [ ] User-friendly error messages:
  - [ ] "Oops! Our AI is taking a coffee break. Try again?"
  - [ ] "This file is more encrypted than Fort Knox. Try a different one?"
  - [ ] "We couldn't read this file. Is it actually a resume?"

### 4.5.8 Testing Real Integration
- [ ] Test with real resume PDFs:
  - [ ] Well-formatted resume → High score
  - [ ] Poorly-formatted resume → Low score
  - [ ] Resume with clichés → Savage roast
- [ ] Test error scenarios:
  - [ ] Invalid API key
  - [ ] Network offline
  - [ ] Corrupted file
- [ ] Test performance:
  - [ ] Analysis completes in <10 seconds
  - [ ] Loading states show properly
  - [ ] No UI freezing

### 4.5.9 Cost Optimization
- [ ] Implement caching:
  - [ ] Cache analysis results by file hash
  - [ ] Avoid re-analyzing same resume
- [ ] Implement rate limiting:
  - [ ] Max 10 analyses per IP per hour
  - [ ] Show "Try again in X minutes" message
- [ ] Monitor API costs:
  - [ ] Track OpenAI/Gemini token usage
  - [ ] Set budget alerts
  - [ ] Consider switching to cheaper models for MVP

### 4.5.10 Environment Variables
- [ ] Update `.env.example`:
  ```
  # AI API (choose one)
  VITE_OPENAI_API_KEY=sk-...
  VITE_GEMINI_API_KEY=...
  
  # Supabase
  VITE_SUPABASE_URL=https://...
  VITE_SUPABASE_ANON_KEY=...
  
  # App
  VITE_APP_URL=http://localhost:5173
  ```
- [ ] Add to `.gitignore`:
  ```
  .env
  .env.local
  ```

---

## � Phase 4.75: Authentication & User Management (Days 5.5-6) **[CRITICAL FOR PRODUCTION]**

### 4.75.1 Supabase Authentication Setup
- [ ] Create Supabase project (if not already done)
- [ ] Enable authentication providers:
  - [ ] Google OAuth (primary)
  - [ ] Email/Password (fallback)
  - [ ] GitHub OAuth (optional)
- [ ] Configure OAuth redirect URLs:
  - [ ] Development: `http://localhost:5173/auth/callback`
  - [ ] Production: `https://yourdomain.com/auth/callback`
- [ ] Set up email templates:
  - [ ] Welcome email
  - [ ] Password reset
  - [ ] Email confirmation
- [ ] Configure JWT settings:
  - [ ] Token expiration (7 days)
  - [ ] Refresh token rotation
  - [ ] Secure secret key

### 4.75.2 Database Schema (Supabase)
- [ ] Create `users` table:
  ```sql
  - id (uuid, primary key, references auth.users)
  - email (text, unique)
  - full_name (text)
  - avatar_url (text)
  - subscription_tier (text: 'free', 'basic', 'pro')
  - credits_remaining (int, default: 10)
  - created_at (timestamp)
  - updated_at (timestamp)
  ```
- [ ] Create `resumes` table:
  ```sql
  - id (uuid, primary key)
  - user_id (uuid, references users.id)
  - file_name (text)
  - file_url (text, Supabase Storage)
  - file_type (text: 'pdf', 'docx')
  - file_size (int)
  - version (int, default: 1)
  - created_at (timestamp)
  ```
- [ ] Create `analyses` table:
  ```sql
  - id (uuid, primary key)
  - user_id (uuid, references users.id)
  - resume_id (uuid, references resumes.id)
  - ats_score (int)
  - ats_breakdown (jsonb)
  - roast_savage (text)
  - roast_mild (text)
  - fixes (jsonb)
  - roast_mode (text: 'savage', 'mild')
  - processing_time (int)
  - created_at (timestamp)
  ```
- [ ] Create `user_activity` table:
  ```sql
  - id (uuid, primary key)
  - user_id (uuid, references users.id)
  - action (text: 'upload', 'analyze', 'download', 'share')
  - metadata (jsonb)
  - created_at (timestamp)
  ```
- [ ] Set up Row Level Security (RLS):
  - [ ] Users can only read/write their own data
  - [ ] Enable RLS on all tables
  - [ ] Create policies for CRUD operations

### 4.75.3 Supabase Storage
- [ ] Create `resumes` bucket:
  - [ ] Private bucket (user-specific access)
  - [ ] Max file size: 5MB
  - [ ] Allowed types: PDF, DOCX
  - [ ] Auto-delete after 30 days (optional)
- [ ] Create `avatars` bucket:
  - [ ] Public bucket
  - [ ] Max file size: 2MB
  - [ ] Allowed types: JPG, PNG, WEBP

### 4.75.4 Authentication Service
- [ ] Create `src/services/auth.js`:
  - [ ] `signInWithGoogle()` - Google OAuth
  - [ ] `signInWithEmail(email, password)` - Email login
  - [ ] `signUpWithEmail(email, password, name)` - Email signup
  - [ ] `signOut()` - Logout
  - [ ] `getCurrentUser()` - Get current user
  - [ ] `updateProfile(data)` - Update user profile
  - [ ] `resetPassword(email)` - Password reset
  - [ ] `onAuthStateChange(callback)` - Listen to auth changes
- [ ] JWT token management:
  - [ ] Store in httpOnly cookies (secure)
  - [ ] Auto-refresh on expiration
  - [ ] Clear on logout

### 4.75.5 Auth Context & Provider
- [ ] Create `src/contexts/AuthContext.jsx`:
  - [ ] Provide user state globally
  - [ ] Handle auth state changes
  - [ ] Provide auth functions (login, logout, etc.)
  - [ ] Loading states
  - [ ] Error handling
- [ ] Wrap app with AuthProvider in `main.jsx`

### 4.75.6 Protected Routes
- [ ] Create `src/components/auth/ProtectedRoute.jsx`:
  - [ ] Check if user is authenticated
  - [ ] Redirect to login if not
  - [ ] Show loading state while checking
- [ ] Protect routes:
  - [ ] `/results` - Requires auth
  - [ ] `/dashboard` - Requires auth
  - [ ] `/profile` - Requires auth
  - [ ] `/` (Landing) - Public

### 4.75.7 Auth UI Components
- [ ] Create `src/pages/Login.jsx`:
  - [ ] "Sign in with Google" button (primary)
  - [ ] Email/password form (fallback)
  - [ ] "Forgot password?" link
  - [ ] "Don't have an account? Sign up" link
  - [ ] Beautiful glassmorphism design
  - [ ] Loading states
  - [ ] Error messages
- [ ] Create `src/pages/Signup.jsx`:
  - [ ] "Sign up with Google" button (primary)
  - [ ] Email/password/name form (fallback)
  - [ ] Terms of service checkbox
  - [ ] "Already have an account? Login" link
- [ ] Create `src/components/auth/AuthCallback.jsx`:
  - [ ] Handle OAuth redirect
  - [ ] Extract tokens
  - [ ] Redirect to dashboard
- [ ] Create `src/components/auth/UserMenu.jsx`:
  - [ ] User avatar dropdown
  - [ ] Profile link
  - [ ] Dashboard link
  - [ ] Logout button
  - [ ] Credits remaining badge

### 4.75.8 User Dashboard
- [ ] Create `src/pages/Dashboard.jsx`:
  - [ ] Welcome message with user name
  - [ ] Credits remaining card
  - [ ] Resume history (list of past analyses)
  - [ ] Quick stats:
    - [ ] Total resumes analyzed
    - [ ] Average ATS score
    - [ ] Improvement over time (chart)
  - [ ] "Analyze New Resume" CTA
- [ ] Create `src/components/dashboard/ResumeCard.jsx`:
  - [ ] Resume file name
  - [ ] Upload date
  - [ ] ATS score badge
  - [ ] "View Analysis" button
  - [ ] "Re-analyze" button
  - [ ] "Delete" button

### 4.75.9 User Profile Page
- [ ] Create `src/pages/Profile.jsx`:
  - [ ] Avatar upload
  - [ ] Edit name
  - [ ] Email (read-only)
  - [ ] Subscription tier badge
  - [ ] Credits remaining
  - [ ] "Upgrade Plan" button
  - [ ] "Change Password" button
  - [ ] "Delete Account" button (with confirmation)

### 4.75.10 Resume History & Versioning
- [ ] Update `src/services/resumeAnalyzer.js`:
  - [ ] Save resume to Supabase Storage
  - [ ] Save analysis to database
  - [ ] Link to user account
  - [ ] Track version number
- [ ] Create `src/services/resumeHistory.js`:
  - [ ] `getResumeHistory(userId)` - Fetch all resumes
  - [ ] `getAnalysis(analysisId)` - Fetch specific analysis
  - [ ] `deleteResume(resumeId)` - Delete resume
  - [ ] `compareVersions(id1, id2)` - Compare two analyses

### 4.75.11 Credits System
- [ ] Implement credit deduction:
  - [ ] Free tier: 10 credits
  - [ ] Basic tier: 50 credits/month
  - [ ] Pro tier: Unlimited
- [ ] Update `src/services/resumeAnalyzer.js`:
  - [ ] Check credits before analysis
  - [ ] Deduct 1 credit after successful analysis
  - [ ] Show "Out of credits" error
- [ ] Create `src/components/dashboard/CreditsCard.jsx`:
  - [ ] Show remaining credits
  - [ ] Progress bar
  - [ ] "Buy More Credits" button

### 4.75.12 Update Existing Components
- [ ] Update `src/components/landing/UploadZone.jsx`:
  - [ ] Check if user is logged in
  - [ ] Check credits before upload
  - [ ] Save resume to Supabase Storage
  - [ ] Link analysis to user account
- [ ] Update `src/pages/Results.jsx`:
  - [ ] Load analysis from database (if logged in)
  - [ ] Show "Save Analysis" button (if not logged in)
  - [ ] Add "Share" button (generate shareable link)
- [ ] Update `src/App.jsx`:
  - [ ] Add auth routes
  - [ ] Add protected routes
  - [ ] Add UserMenu to header

### 4.75.13 Environment Variables
- [ ] Update `.env`:
  ```
  # Supabase
  VITE_SUPABASE_URL=https://xxx.supabase.co
  VITE_SUPABASE_ANON_KEY=xxx
  
  # Google OAuth
  VITE_GOOGLE_CLIENT_ID=xxx
  
  # App
  VITE_APP_URL=http://localhost:5173
  ```

### 4.75.14 Testing
- [ ] Test Google OAuth flow
- [ ] Test email signup/login
- [ ] Test protected routes
- [ ] Test resume upload with auth
- [ ] Test resume history
- [ ] Test credits system
- [ ] Test logout
- [ ] Test token refresh

### 4.75.15 Security
- [ ] Implement CSRF protection
- [ ] Sanitize user inputs
- [ ] Validate file uploads server-side
- [ ] Rate limiting (Supabase Edge Functions)
- [ ] Secure cookies (httpOnly, secure, sameSite)
- [ ] XSS protection
- [ ] SQL injection protection (Supabase handles this)

---

## �💰 Phase 5: Paywall & Monetization (Day 7)

### 5.1 Paywall Components (`src/components/paywall/`)

#### BlurredPreview.jsx
- [ ] Blurred resume text preview
- [ ] Glass card
- [ ] Overlay text: "This could be your resume 👀"
- [ ] CSS blur filter (10px)
- [ ] Fade-in animation

#### PricingCard.jsx
- [ ] Glass card
- [ ] Pricing tier display
- [ ] Features list
- [ ] CTA button
- [ ] Two variants:
  - [ ] Basic ($5): Resume rewrite
  - [ ] Pro ($9): Resume + LinkedIn + Email (highlighted)
- [ ] Hover: lift + glow
- [ ] Selected state (neon pink border)

#### PaywallModal.jsx
- [ ] Full-screen blur overlay (z-index: 100)
- [ ] Center glass card (z-index: 110)
- [ ] Close button (X, top-right)
- [ ] BlurredPreview component
- [ ] Two PricingCard components (side-by-side on desktop)
- [ ] Stripe Checkout integration
- [ ] Modal animations (scale + fade)
- [ ] Escape key to close
- [ ] Click outside to close
- [ ] Prevent body scroll when open
- [ ] Track analytics (paywall_shown, payment_initiated)

### 5.2 Stripe Integration
- [ ] Install Stripe SDK
  ```bash
  npm install @stripe/stripe-js
  ```
- [ ] Create Stripe checkout session
- [ ] Handle payment success redirect
- [ ] Handle payment cancel redirect
- [ ] Track payment_completed event

### 5.3 Supabase Edge Functions
- [ ] Create `analyze-resume` function:
  - [ ] Accept file + roast_mode
  - [ ] Extract text from PDF/DOCX
  - [ ] Call OpenAI/Gemini API
  - [ ] Return JSON response (roast, score, fixes, preview)
  - [ ] Handle errors gracefully
- [ ] Create `stripe-webhook` function:
  - [ ] Verify webhook signature
  - [ ] Handle payment success
  - [ ] Generate full rewritten resume
  - [ ] Send email with download link
  - [ ] Update analytics log
- [ ] Create `deliver-premium` function:
  - [ ] Generate PDF of rewritten resume
  - [ ] Send via email (Resend API)
  - [ ] Return download link

---

## 🎬 Phase 6: Animations & Polish (Days 6-7)

### 6.1 Animations
- [ ] Page transitions (300ms ease-out)
- [ ] Card hover effects (200ms)
- [ ] Button press animations (100ms)
- [ ] Typewriter effect (50ms per char)
- [ ] Score count-up (2s ease-out)
- [ ] Shake animation (500ms)
- [ ] Modal fade-in (250ms)
- [ ] Fire particles (3s float loop)
- [ ] Pulse border (2s infinite)
- [ ] Respect prefers-reduced-motion

### 6.2 Micro-Interactions
- [ ] Upload card pulse animation (idle state)
- [ ] Button scale on hover/press
- [ ] Toggle switch slide animation
- [ ] Gauge ring draw animation
- [ ] Roast text shake on harsh lines
- [ ] Fix card expand animation
- [ ] Modal backdrop blur fade
- [ ] Pricing card glow on hover

### 6.3 Error Handling
- [ ] File too large error:
  - [ ] 🚫 emoji
  - [ ] "Whoa there! Your resume is bigger than your ambitions."
  - [ ] "Keep it under 5MB"
- [ ] Wrong format error:
  - [ ] 📄 emoji
  - [ ] "We need a PDF or DOCX. Screenshots don't count."
- [ ] Corrupted file error:
  - [ ] "This file is more broken than your career prospects. Try another."
- [ ] No text detected error:
  - [ ] "Is this resume invisible? We couldn't find any text."
- [ ] API timeout error:
  - [ ] "Our AI is thinking too hard. Give it another shot."
  - [ ] Retry button
- [ ] Rate limit error:
  - [ ] "Too many roasts at once! Wait 30 seconds."
  - [ ] Countdown timer
- [ ] Payment errors:
  - [ ] Card declined: "Your card said no. Maybe it's protecting you from the truth."
  - [ ] Network error: "Payment got lost in the void. Try again?"

### 6.4 Loading States
- [ ] Processing state:
  - [ ] Dark background
  - [ ] Fire particles
  - [ ] Rotating messages:
    - [ ] "Reading resume…"
    - [ ] "Judging life choices…"
    - [ ] "Consulting with HR…"
    - [ ] "Preparing the roast…"
  - [ ] Dots animation
- [ ] Button loading state (spinner)
- [ ] Skeleton loaders (optional)

### 6.5 Responsive Design
- [ ] Mobile (<640px):
  - [ ] Hero headline: 40px
  - [ ] Section title: 24px
  - [ ] Card padding: 16px
  - [ ] Upload card: 70vh height
  - [ ] Fixed bottom CTA
  - [ ] Single column layout
  - [ ] Touch targets ≥ 44px
- [ ] Tablet (640-1024px):
  - [ ] Hero headline: 48px
  - [ ] Section title: 28px
  - [ ] Card padding: 20px
  - [ ] 2-column grid for fixes
- [ ] Desktop (>1024px):
  - [ ] Hero headline: 56px
  - [ ] Section title: 32px
  - [ ] Card padding: 24px
  - [ ] Max width: 1200px
  - [ ] 3-column grid for pricing

### 6.6 Accessibility
- [ ] Keyboard navigation:
  - [ ] Tab order logical
  - [ ] Upload zone: Enter/Space to trigger
  - [ ] Toggle: Arrow keys to switch
  - [ ] Modal: Escape to close
  - [ ] Focus visible: 2px neon-pink outline
- [ ] Screen reader support:
  - [ ] Upload zone: aria-label
  - [ ] Score gauge: role="meter", aria-valuenow
  - [ ] Toggle: aria-pressed
  - [ ] Modal: aria-modal, aria-labelledby
  - [ ] Buttons: descriptive aria-labels
- [ ] Color contrast: WCAG AA compliant
- [ ] Motion preferences: respect prefers-reduced-motion
- [ ] Alt text for all images/emojis

### 6.7 SEO
- [ ] Meta tags:
  - [ ] Title: "Resume Roaster - Get Roasted by AI, Get Hired by Humans"
  - [ ] Description: "Upload your resume and get brutally honest AI feedback in 60 seconds. Then fix it and land your dream job."
  - [ ] OG image (create shareable image)
  - [ ] Twitter card
- [ ] Semantic HTML (h1, h2, section, article)
- [ ] Unique IDs for interactive elements
- [ ] robots.txt
- [ ] sitemap.xml

---

## 📄 Phase 7: Legal & Content (Day 7)

### 7.1 Legal Pages
- [ ] Create `src/pages/Privacy.jsx`
  - [ ] GDPR/CCPA compliant
  - [ ] Files deleted after 24 hours
  - [ ] No account = no data retention
  - [ ] Email only for paid users
  - [ ] No third-party sharing
- [ ] Create `src/pages/Terms.jsx`
  - [ ] Liability limitations
  - [ ] AI disclaimer
  - [ ] No job guarantee
- [ ] Create `src/pages/Refund.jsx`
  - [ ] 7-day money-back guarantee
  - [ ] Refund process
- [ ] Create `src/pages/Cookies.jsx`
  - [ ] Analytics disclosure
  - [ ] Cookie usage

### 7.2 Content
- [ ] Landing page copy (final polish)
- [ ] Error messages (all states)
- [ ] Processing messages (4 variations)
- [ ] Roast examples (savage mode, 10+ examples)
- [ ] Roast examples (mild mode, 10+ examples)
- [ ] Score captions (3 ranges)
- [ ] Email templates (payment confirmation, delivery)

---

## 🚀 Phase 8: Deployment & Launch (Day 8)

### 8.1 Testing
- [ ] Unit tests (file validation, score calculation)
- [ ] Integration tests (upload → roast → payment flow)
- [ ] User testing scenarios:
  - [ ] Upload valid PDF
  - [ ] Upload 10MB file (error)
  - [ ] Upload image as PDF (error)
  - [ ] Toggle roast mode
  - [ ] Complete payment
  - [ ] Cancel payment
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile device testing (iOS, Android)
- [ ] Accessibility audit (WAVE, axe DevTools)
- [ ] Performance audit (Lighthouse):
  - [ ] Performance > 90
  - [ ] Accessibility > 95
  - [ ] Best Practices > 90
  - [ ] SEO > 90

### 8.2 Performance Optimization
- [ ] Image optimization (WebP format)
- [ ] Lazy load below-the-fold content
- [ ] Preload hero fonts
- [ ] Code splitting (lazy load PaywallModal, FireParticles)
- [ ] Tree-shake Framer Motion
- [ ] Enable Tailwind PurgeCSS
- [ ] Minify bundle
- [ ] Target: <200KB initial bundle
- [ ] Enable gzip/brotli compression

### 8.3 Analytics Setup
- [ ] Install Plausible Analytics
- [ ] Configure events tracking
- [ ] Set up Sentry for error monitoring
- [ ] Enable Vercel Analytics
- [ ] Test all tracking events

### 8.4 Deployment
- [ ] Create GitHub repository
- [ ] Push code to `main` branch
- [ ] Connect Vercel to GitHub
- [ ] Configure environment variables in Vercel
- [ ] Deploy to production
- [ ] Configure custom domain (resumeroaster.com)
- [ ] Set up SSL certificate
- [ ] Test production build

### 8.5 Monitoring
- [ ] Set up UptimeRobot (5-minute checks)
- [ ] Configure Sentry alerts
- [ ] Monitor Core Web Vitals
- [ ] Set up Stripe dashboard alerts
- [ ] Monitor Supabase usage/costs

### 8.6 Launch
- [ ] Create ProductHunt listing:
  - [ ] Catchy tagline
  - [ ] Screenshots/GIFs
  - [ ] Demo video (optional)
- [ ] Social media posts:
  - [ ] Twitter/X
  - [ ] LinkedIn
  - [ ] Reddit (r/resumes, r/jobs)
- [ ] Share in communities:
  - [ ] Indie Hackers
  - [ ] Hacker News (Show HN)
  - [ ] Dev.to
- [ ] Monitor first users
- [ ] Collect feedback
- [ ] Iterate based on data

---

## 🎯 Success Metrics (Track These)

### Week 1 Goals
- [ ] 1,000 unique visitors
- [ ] 300 uploads (30% conversion)
- [ ] 15 payments (5% of uploads)
- [ ] $75 revenue

### Month 1 Goals
- [ ] 10,000 unique visitors
- [ ] 3,000 uploads
- [ ] 150 payments
- [ ] $750 revenue
- [ ] <5% refund rate
- [ ] >1.0 viral coefficient (shares per user)

---

## 🐛 Known Issues / Future Improvements

### Post-MVP Features (Don't build now)
- [ ] User accounts
- [ ] Resume history
- [ ] Multiple resume versions
- [ ] Mock interview bot
- [ ] Job matching
- [ ] LinkedIn optimizer
- [ ] Cover letter roaster
- [ ] Team/Enterprise plans
- [ ] API access
- [ ] Chrome extension

### Technical Debt (Address if time permits)
- [ ] Add comprehensive unit tests
- [ ] Add E2E tests (Playwright/Cypress)
- [ ] Improve error boundary handling
- [ ] Add retry logic for API calls
- [ ] Implement rate limiting on frontend
- [ ] Add request caching
- [ ] Optimize bundle size further
- [ ] Add service worker (PWA)

---

## 📝 Notes

### Design Principles
- **Dark mode default** - No light mode toggle needed for MVP
- **Glassmorphism everywhere** - All cards use glass effect
- **Neon accents** - Pink, green, orange, red for states
- **Playful brutalism** - Harsh but helpful tone
- **Mobile-first** - Design for mobile, enhance for desktop
- **No login required** - Reduce friction, increase conversions

### Development Principles
- **Ship fast** - 8 days max
- **No perfectionism** - MVP quality, not production-perfect
- **Reuse components** - DRY principle
- **Performance matters** - <200KB bundle, <10s roast time
- **Accessibility first** - WCAG AA minimum
- **Track everything** - Analytics on all user actions

### Content Tone
- **Savage but helpful** - Roast hard, then fix
- **Gen-Z humor** - Tinder jokes, emoji usage
- **No corporate speak** - Casual, direct language
- **Error messages stay on-brand** - Even errors are funny

---

**Last Updated:** 2026-01-31  
**Status:** Ready to start development  
**Next Step:** Phase 1.1 - Initialize Vite + React project
