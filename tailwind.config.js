/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vael: {
          bg: "#050505",
          "bg-secondary": "#070709",
          surface: "#0A0A0C",
          "surface-light": "#121216",
          silver: "#C0C0C5",
          "silver-bright": "#E2E8F0",
          "muted": "#71717A",
          "muted-dark": "#27272A",
          chrome: "#F8FAFC",
        }
      },
      fontFamily: {
        display: ['"Cinzel"', '"Syne"', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
      },
      backgroundImage: {
        'silver-gradient': 'linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 40%, #94A3B8 70%, #64748B 100%)',
        'chrome-shine': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
        'dark-glass': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
        'dark-radial': 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.06) 0%, rgba(5,5,5,1) 70%)',
      },
      animation: {
        'liquid-pulse': 'liquidPulse 8s ease-in-out infinite',
        'slow-spin': 'slowSpin 30s linear infinite',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        liquidPulse: {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)', opacity: '0.6' },
          '50%': { transform: 'scale(1.08) rotate(3deg)', opacity: '0.9' },
        },
        slowSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      }
    },
  },
  plugins: [],
}
