/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        crm: {
          50: '#f0f5ff',
          100: '#e0ecff',
          200: '#c7dcff',
          300: '#9ec2ff',
          400: '#6d9eff',
          500: '#3b75f6',
          600: '#2557eb',
          700: '#1d42d8',
          800: '#1e38af',
          900: '#1e338a',
          950: '#0f172a',
        },
        swarm: {
          green: '#10b981',
          emerald: '#059669',
          amber: '#f59e0b',
          purple: '#8b5cf6',
          cyan: '#06b6d4',
          rose: '#f43f5e',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'slide-up': 'slideUp 0.3s ease-out forwards',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(59, 117, 246, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(59, 117, 246, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
