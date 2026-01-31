Resume Roaster — Design Document (DD)

Design Version: 1.0
Design Inspiration: WonderKids Landing Page (Dribbble)
Design System Type: Dark / Glassmorphism / Neon Accent / Playful Brutalism
Primary Goal: Maximize upload → roast → share → pay

1. Design Inspiration Mapping (Critical)
Reference: WonderKids Landing Page

Key elements we are borrowing exactly in spirit:

Soft glassmorphism cards

Rounded XL containers (20–28px radius)

Floating decorative shapes

Bold headline + friendly subtext

Clean hierarchy, playful spacing

Subtle gradients + blur

What we adapt for Resume Roaster
WonderKids	Resume Roaster
Pastel background	Deep dark background
Child-friendly	Gen-Z savage
Soft illustrations	Fire, glitch, neon
Whimsical	Brutally playful
2. Global Design System
2.1 Color Palette (Exact Hex)

Base

Background Primary: #0B0D12

Background Secondary: #11141B

Glass Card: rgba(255,255,255,0.08)

Glass Border: rgba(255,255,255,0.12)

Text

Primary Text: #FFFFFF

Secondary Text: #B5B9C6

Muted Text: #7A8194

Neon Accents

Neon Green (Success): #3DFF7A

Neon Pink (Savage): #FF4D9D

Neon Orange (Warning): #FF9F1C

Neon Red (Fail): #FF3B3B

Gradients

background: linear-gradient(135deg, #FF4D9D 0%, #FF9F1C 100%);

2.2 Typography

Primary Font (UI & Headings)

Inter / Satoshi / SF Pro (choose one)

Weights: 400, 600, 700, 800

Roast Font (Terminal Style)

JetBrains Mono / IBM Plex Mono

Scale

Usage	Size
Hero Headline	48–56px
Section Title	28–32px
Body Text	16–18px
Roast Text	15–16px
Microcopy	12–13px
3. Layout System
3.1 Grid

Desktop: 12-column grid

Max width: 1200px

Gutter: 24px

3.2 Breakpoints
Device	Width
Mobile	< 640px
Tablet	640–1024px
Desktop	> 1024px
4. Core Screens (Wireframe → UI → Interaction)
4.1 Landing Page
Desktop Layout
------------------------------------------------
| Logo      Roast Counter        CTA Button   |
------------------------------------------------
|                                              |
|  "Your Resume Sucks. Let Us Fix It."          |
|  Subtext                                     |
|                                              |
|  [ Large Glass Upload Card ]                 |
|                                              |
|  ↓ Social Proof / Stats                      |
------------------------------------------------

Upload Card (Inspired by WonderKids)

Glassmorphic container

Radius: 24px

Dashed neon border (animated pulse)

Center emoji 🔥📄

Microcopy

Title: “Drop your resume here”

Subtitle: “PDF or DOCX • Max 5MB”

CTA: Roast Me 🔥

Hover

Card slightly lifts (translateY(-4px))

Glow shadow

Mobile Layout

Single column

Upload card occupies 70% viewport height

CTA fixed at bottom

4.2 Processing State

Visual

Dark background

Floating fire particles

Typing text:

“Reading resume…”
“Judging life choices…”
“Calling HR…”

Animation

Dots animation

Progress illusion (no real % needed)

4.3 Results Page (Main Experience)
Section Order (Very Important)

Roast

ATS Score

Fixes

Paywall

4.4 Roast Section (Hero of the App)
UI

Glass card

Slight red/pink gradient glow

Monospace font

Typewriter animation (50ms)

Savage Toggle

Pill switch

Mild 🌶️ / Savage 🔥

Toggle triggers re-render (no reload)

Effects

Shake animation on harsh lines

Fire emoji bursts

Optional sound toggle

4.5 ATS Score Section
Score Gauge

Circular neon ring

Animated count-up (0 → score)

Color Logic

0–40: Neon Red

41–70: Neon Orange

71–100: Neon Green

Caption Examples

<40: “Ghosted harder than a bad Tinder date.”

40–70: “Almost hireable. Almost.”

70+: “Okay… this actually slaps.”

4.6 Actionable Fixes Section
Card Layout

Vertical stack of cards

Each card:

Mistake Title

❌ Before

✅ After

Interaction

Expand on click

Highlight changed words in neon green

4.7 Paywall Modal (Money Screen 💰)
Trigger

After fixes scroll

Or CTA: “Unlock the Glow-Up”

Modal Design

Full-screen blur overlay

Center glass card

Preview

Blurred resume text

“This could be your resume 👀”

Pricing Cards

Basic

$5

Resume rewrite

CTA: “Fix My Resume”

Pro

$9

Resume + LinkedIn + Cold Email

Highlighted (default)

5. Mobile-Specific Adjustments

Roast text larger line height

Fixed “Unlock” button

Swipe between sections

No hover-based interactions

Touch target ≥ 44px

6. Component Naming (Figma / Code Friendly)
Page/Landing
Page/Results

Card/Glass
Card/Upload
Card/Roast
Card/Fix
Card/Pricing

Button/Primary
Button/Secondary
Toggle/RoastMode

Text/Headline
Text/Roast
Text/Muted

Modal/Paywall
Gauge/ATS

7. Animation & Micro-Interactions
Element	Animation
Upload card	Hover lift + glow
Roast text	Typewriter
Score	Count-up + pulse
Low score	Fire particles
Paywall	Scale + blur fade-in
8. Accessibility & UX Rules

Contrast ≥ WCAG AA

Disable motion option

Clear loading states

No hidden CTAs

No forced signup

9. Assets Needed

Fire particle SVG

Resume icon

Emoji set

Gradient overlays

Optional mascot (roasted paper 😄)

---

## 10. Tailwind Configuration (tailwind.config.js)

```javascript
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Base
        'bg-primary': '#0B0D12',
        'bg-secondary': '#11141B',
        'glass': 'rgba(255, 255, 255, 0.08)',
        'glass-border': 'rgba(255, 255, 255, 0.12)',
        
        // Text
        'text-primary': '#FFFFFF',
        'text-secondary': '#B5B9C6',
        'text-muted': '#7A8194',
        
        // Neon
        'neon-green': '#3DFF7A',
        'neon-pink': '#FF4D9D',
        'neon-orange': '#FF9F1C',
        'neon-red': '#FF3B3B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'hero': ['56px', { lineHeight: '1.1', fontWeight: '800' }],
        'section': ['32px', { lineHeight: '1.2', fontWeight: '700' }],
        'body': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'roast': ['16px', { lineHeight: '1.8', fontWeight: '400' }],
        'micro': ['13px', { lineHeight: '1.4', fontWeight: '400' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '20px',
        '2xl': '24px',
        '3xl': '28px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glow-pink': '0 0 40px rgba(255, 77, 157, 0.4)',
        'glow-green': '0 0 40px rgba(61, 255, 122, 0.4)',
        'glow-orange': '0 0 40px rgba(255, 159, 28, 0.4)',
        'glow-red': '0 0 40px rgba(255, 59, 59, 0.4)',
      },
      backdropBlur: {
        'glass': '12px',
      },
      animation: {
        'pulse-border': 'pulse-border 2s ease-in-out infinite',
        'typewriter': 'typewriter 0.05s steps(1) forwards',
        'count-up': 'count-up 2s ease-out forwards',
        'shake': 'shake 0.5s ease-in-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-border': {
          '0%, 100%': { borderColor: 'rgba(255, 77, 157, 0.5)' },
          '50%': { borderColor: 'rgba(255, 77, 157, 1)' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-4px)' },
          '75%': { transform: 'translateX(4px)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
```

---

## 11. Spacing System (Design Tokens)

| Token | Value | Usage |
|-------|-------|-------|
| `space-xs` | 8px | Icon gaps, tight spacing |
| `space-sm` | 12px | Button padding |
| `space-md` | 16px | Card padding (mobile) |
| `space-lg` | 24px | Card padding (desktop), section gaps |
| `space-xl` | 32px | Section spacing |
| `space-2xl` | 48px | Major section dividers |
| `space-3xl` | 64px | Hero spacing |

---

## 12. Shadow & Glow System

### Glass Shadow
```css
box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
backdrop-filter: blur(12px);
```

### Neon Glows (by state)
| State | Color | Shadow |
|-------|-------|--------|
| Success (71-100) | Neon Green | `0 0 40px rgba(61, 255, 122, 0.4)` |
| Warning (41-70) | Neon Orange | `0 0 40px rgba(255, 159, 28, 0.4)` |
| Fail (0-40) | Neon Red | `0 0 40px rgba(255, 59, 59, 0.4)` |
| Savage Mode | Neon Pink | `0 0 40px rgba(255, 77, 157, 0.4)` |

---

## 13. Z-Index Layers

| Layer | Value | Usage |
|-------|-------|-------|
| Base | 0 | Default content |
| Floating | 10 | Upload card, decorative shapes |
| Dropdown | 50 | Tooltips, dropdowns |
| Modal Overlay | 100 | Paywall backdrop |
| Modal Content | 110 | Paywall card |
| Toast | 200 | Error/success messages |

---

## 14. Component State Specifications

### Button States
| State | Background | Border | Text | Transform |
|-------|-----------|--------|------|-----------|
| Default | `gradient(pink→orange)` | None | White | None |
| Hover | `gradient(pink→orange)` | None | White | `scale(1.02)` |
| Active | `gradient(pink→orange)` | None | White | `scale(0.98)` |
| Disabled | `rgba(255,255,255,0.1)` | None | `#7A8194` | None |
| Loading | `gradient(pink→orange)` | None | White | Spinner |

### Upload Card States
| State | Border | Background | Glow |
|-------|--------|-----------|------|
| Idle | `2px dashed glass-border` | `glass` | None |
| Hover | `2px dashed neon-pink` | `glass` | `glow-pink` |
| Dragging | `2px solid neon-pink` | `rgba(255,77,157,0.1)` | `glow-pink` |
| Processing | `2px solid neon-orange` | `glass` | `glow-orange` |
| Error | `2px solid neon-red` | `glass` | `glow-red` |

### Glass Card States
| State | Background | Border | Blur |
|-------|-----------|--------|------|
| Default | `rgba(255,255,255,0.08)` | `rgba(255,255,255,0.12)` | 12px |
| Hover | `rgba(255,255,255,0.12)` | `rgba(255,255,255,0.18)` | 12px |
| Active | `rgba(255,255,255,0.15)` | `rgba(255,255,255,0.22)` | 12px |

---

## 15. Typography Hierarchy (Exact Implementation)

```jsx
// Hero Headline
<h1 className="text-[56px] leading-tight font-extrabold text-text-primary">
  Your Resume Sucks. Let Us Fix It. 🔥
</h1>

// Section Title
<h2 className="text-[32px] leading-tight font-bold text-text-primary">
  The Roast
</h2>

// Body Text
<p className="text-[18px] leading-relaxed text-text-secondary">
  Get roasted by AI, then get hired by humans.
</p>

// Roast Text (Monospace)
<p className="font-mono text-[16px] leading-loose text-text-primary">
  Your summary says 'hardworking'. So does literally everyone.
</p>

// Microcopy
<span className="text-[13px] text-text-muted">
  PDF or DOCX • Max 5MB
</span>
```

---

## 16. Responsive Breakpoint Rules

### Mobile (< 640px)
- Hero headline: 40px
- Section title: 24px
- Card padding: 16px
- Upload card: 70vh height
- Fixed bottom CTA
- Single column layout
- Touch targets: min 44px

### Tablet (640-1024px)
- Hero headline: 48px
- Section title: 28px
- Card padding: 20px
- 2-column grid for fixes
- Floating CTA

### Desktop (> 1024px)
- Hero headline: 56px
- Section title: 32px
- Card padding: 24px
- Max width: 1200px
- Center aligned
- 3-column grid for pricing

---

## 17. Animation Timing Functions

| Animation | Duration | Easing | Delay |
|-----------|----------|--------|-------|
| Page transition | 300ms | ease-out | 0ms |
| Card hover | 200ms | ease-in-out | 0ms |
| Typewriter (per char) | 50ms | steps(1) | 0ms |
| Score count-up | 2000ms | ease-out | 500ms |
| Shake | 500ms | ease-in-out | 0ms |
| Modal fade-in | 250ms | ease-out | 0ms |
| Button press | 100ms | ease-in-out | 0ms |

---

## 18. Interaction Patterns

### Upload Flow
1. **Idle**: Dashed border, subtle pulse
2. **Hover**: Lift 4px, pink glow
3. **Drag Over**: Solid border, background tint
4. **Drop**: Scale animation, immediate processing
5. **Processing**: Orange glow, loading spinner
6. **Success**: Green glow, fade to results
7. **Error**: Red glow, shake animation

### Roast Mode Toggle
1. **Click**: Instant switch (no animation delay)
2. **Content**: Fade out old (150ms) → Fade in new (150ms)
3. **Icon**: Rotate 180° (200ms)

### Score Reveal
1. **Enter viewport**: Trigger animation
2. **Count**: 0 → score over 2s
3. **Ring**: Draw from 0° to score% (2s)
4. **Pulse**: Continuous if score < 40
5. **Caption**: Fade in after count completes

---

## 19. Error & Empty States

### File Upload Errors
```jsx
// File too large
<div className="text-neon-red text-center">
  <span className="text-4xl">🚫</span>
  <p className="text-body mt-2">
    Whoa there! Your resume is bigger than your ambitions.
  </p>
  <p className="text-micro text-text-muted">Keep it under 5MB</p>
</div>

// Wrong format
<div className="text-neon-orange text-center">
  <span className="text-4xl">📄</span>
  <p className="text-body mt-2">
    We need a PDF or DOCX. Screenshots don't count.
  </p>
</div>
```

### Processing States
```jsx
const processingMessages = [
  "Reading resume…",
  "Judging life choices…",
  "Consulting with HR…",
  "Preparing the roast…"
];
```

---

## 20. Accessibility Requirements

### Keyboard Navigation
- All interactive elements: `tabindex` in logical order
- Upload zone: Enter/Space to trigger file picker
- Toggle: Arrow keys to switch
- Modal: Escape to close
- Focus visible: 2px neon-pink outline

### Screen Reader
```jsx
// Upload zone
<div role="button" aria-label="Upload resume file, PDF or DOCX, maximum 5 megabytes">

// Score gauge
<div role="meter" aria-valuenow={score} aria-valuemin="0" aria-valuemax="100" aria-label="ATS Score">

// Roast mode toggle
<button aria-pressed={mode === 'savage'} aria-label="Toggle between mild and savage roast mode">
```

### Motion Preferences
```jsx
// Respect prefers-reduced-motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Disable animations if true
const animationProps = prefersReducedMotion 
  ? {} 
  : { initial: { opacity: 0 }, animate: { opacity: 1 } };
```

---

## 21. Component File Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── Button.jsx           // Primary, Secondary variants
│   │   ├── GlassCard.jsx        // Base glass card
│   │   ├── Toggle.jsx           // Roast mode toggle
│   │   └── Gauge.jsx            // ATS score gauge
│   ├── landing/
│   │   ├── Hero.jsx
│   │   ├── UploadZone.jsx
│   │   └── SocialProof.jsx
│   ├── results/
│   │   ├── RoastDisplay.jsx
│   │   ├── ATSScore.jsx
│   │   ├── FixesList.jsx
│   │   └── FixCard.jsx
│   ├── paywall/
│   │   ├── PaywallModal.jsx
│   │   ├── PricingCard.jsx
│   │   └── BlurredPreview.jsx
│   └── effects/
│       ├── FireParticles.jsx
│       ├── TypewriterText.jsx
│       └── FloatingShapes.jsx
├── pages/
│   ├── Landing.jsx
│   └── Results.jsx
├── utils/
│   ├── animations.js           // Framer Motion variants
│   ├── parseResume.js
│   └── analytics.js
└── styles/
    └── globals.css
```

---

## 22. Framer Motion Variants (Reusable)

```javascript
// animations.js
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.2 }
};

export const slideInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.3 }
};

export const shake = {
  animate: {
    x: [0, -4, 4, -4, 4, 0],
    transition: { duration: 0.5 }
  }
};

export const hoverLift = {
  whileHover: { y: -4, transition: { duration: 0.2 } },
  whileTap: { scale: 0.98 }
};

export const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.25 }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: { duration: 0.2 }
  }
};
```

---

## 23. Development Checklist

### Phase 1: Setup
- [ ] Initialize Vite + React
- [ ] Install Tailwind CSS
- [ ] Install Framer Motion
- [ ] Configure `tailwind.config.js` with design tokens
- [ ] Set up Google Fonts (Inter + JetBrains Mono)
- [ ] Create base `globals.css`

### Phase 2: UI Components
- [ ] `Button.jsx` (Primary/Secondary)
- [ ] `GlassCard.jsx`
- [ ] `Toggle.jsx` (Roast mode)
- [ ] `Gauge.jsx` (ATS score)
- [ ] `TypewriterText.jsx`
- [ ] `FireParticles.jsx`

### Phase 3: Landing Page
- [ ] `Hero.jsx`
- [ ] `UploadZone.jsx` (with drag & drop)
- [ ] `SocialProof.jsx`
- [ ] `Landing.jsx` (compose)

### Phase 4: Results Page
- [ ] `RoastDisplay.jsx` (typewriter effect)
- [ ] `ATSScore.jsx` (animated gauge)
- [ ] `FixCard.jsx`
- [ ] `FixesList.jsx`
- [ ] `Results.jsx` (compose)

### Phase 5: Paywall
- [ ] `PaywallModal.jsx`
- [ ] `PricingCard.jsx`
- [ ] `BlurredPreview.jsx`

### Phase 6: Polish
- [ ] Responsive testing (mobile/tablet/desktop)
- [ ] Accessibility audit
- [ ] Animation performance
- [ ] Error states
- [ ] Loading states

---

## 24. Performance Optimization

### Image Optimization
- Use WebP format for all images
- Lazy load below-the-fold content
- Preload hero fonts

### Animation Performance
- Use `transform` and `opacity` only (GPU-accelerated)
- Avoid animating `width`, `height`, `top`, `left`
- Use `will-change` sparingly

### Code Splitting
```javascript
// Lazy load heavy components
const PaywallModal = lazy(() => import('./components/paywall/PaywallModal'));
const FireParticles = lazy(() => import('./components/effects/FireParticles'));
```

### Bundle Size
- Framer Motion: Tree-shake unused features
- Tailwind: PurgeCSS enabled in production
- Target: < 200KB initial bundle

---

## 25. Quality Assurance Checklist

### Visual QA
- [ ] All colors match design tokens exactly
- [ ] Font sizes match typography scale
- [ ] Spacing follows 8px grid
- [ ] Border radius consistent (20/24/28px)
- [ ] Glassmorphism effect visible on all cards
- [ ] Neon glows render correctly

### Interaction QA
- [ ] Upload drag & drop works
- [ ] Roast mode toggle instant
- [ ] Typewriter effect smooth (50ms)
- [ ] Score counts up over 2s
- [ ] Modal opens/closes smoothly
- [ ] All buttons have hover states

### Responsive QA
- [ ] Mobile: Upload card 70vh
- [ ] Mobile: Fixed bottom CTA
- [ ] Tablet: 2-column fixes
- [ ] Desktop: Max 1200px width
- [ ] All touch targets ≥ 44px

### Accessibility QA
- [ ] Keyboard navigation works
- [ ] Screen reader labels present
- [ ] Focus indicators visible
- [ ] Color contrast ≥ WCAG AA
- [ ] Motion can be disabled