/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
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
