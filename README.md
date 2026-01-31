# Resume Roaster 🔥

**Get roasted by AI, then get hired by humans.**

A brutally honest AI-powered resume analyzer that roasts your resume with savage humor, then provides actionable fixes to help you land your dream job.

## 🎯 Features

- **Instant Resume Analysis** - Upload PDF/DOCX and get feedback in 60 seconds
- **Savage AI Roasting** - Choose between Mild 🌶️ or Savage 🔥 feedback modes
- **ATS Score** - See how your resume performs against Applicant Tracking Systems
- **Actionable Fixes** - Get specific before/after examples to improve your resume
- **AI Rewrite** - Premium feature to get a fully optimized resume

## 🛠️ Tech Stack

- **Frontend**: React (Vite) + Tailwind CSS + Framer Motion
- **Backend**: Supabase (Edge Functions)
- **AI**: OpenAI GPT-4 / Google Gemini
- **Payments**: Stripe
- **Hosting**: Vercel
- **Analytics**: Plausible Analytics

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Stripe account (for payments)
- OpenAI/Gemini API key

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/resumer.git
cd resumer

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys

# Run development server
npm run dev
```

### Environment Variables

Create a `.env` file with the following:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
VITE_APP_URL=http://localhost:5173
```

## 📁 Project Structure

```
resumer/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   ├── landing/         # Landing page components
│   │   ├── results/         # Results page components
│   │   ├── paywall/         # Paywall & pricing components
│   │   └── effects/         # Animation effects
│   ├── pages/               # Page components
│   ├── utils/               # Utility functions
│   └── styles/              # Global styles
├── supabase/
│   └── functions/           # Edge functions
├── public/                  # Static assets
└── docs/                    # Documentation
    ├── prd.md              # Product Requirements
    ├── designdoc.md        # Design Specifications
    └── todo.md             # Development Checklist
```

## 🎨 Design System

- **Theme**: Dark mode with glassmorphism
- **Colors**: Neon accents (Pink, Green, Orange, Red)
- **Typography**: Inter (UI) + JetBrains Mono (Code)
- **Animations**: Framer Motion for smooth interactions

## 📝 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test

# Lint code
npm run lint
```

## 🚢 Deployment

The project is configured for deployment on Vercel:

1. Push to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy!

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please read CONTRIBUTING.md for details.

## 📧 Contact

For questions or support, reach out at: support@resumeroaster.com

---

**Built with 🔥 by [Your Name]**
