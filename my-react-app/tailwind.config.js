/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-bg': '#0a0e1a',
        'custom-text': '#f1f5f9',
        'custom-muted': '#94a3b8',
        'custom-card': '#1a1f35',
        'custom-accent': '#3b82f6',
        'custom-accent-hover': '#2563eb',
        'custom-secondary': '#8b5cf6',
        'custom-success': '#10b981',
      },
      borderRadius: {
        'custom': '16px',
      },
      boxShadow: {
        'custom': '0 8px 30px rgba(59, 130, 246, 0.1)',
        'custom-hover': '0 15px 40px rgba(59, 130, 246, 0.2)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.7s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
