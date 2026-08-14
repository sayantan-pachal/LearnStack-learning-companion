/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'sm': 'clamp(0.8rem, 0.17vw + 0.76rem, 0.875rem)',
        'base': 'clamp(0.925rem, 0.25vw + 0.86rem, 1rem)',
        'lg': 'clamp(1rem, 0.35vw + 0.91rem, 1.125rem)',
        'xl': 'clamp(1.125rem, 0.5vw + 1rem, 1.25rem)',
        '2xl': 'clamp(1.25rem, 0.8vw + 1.05rem, 1.5rem)',
        '3xl': 'clamp(1.5rem, 1.2vw + 1.2rem, 1.875rem)',
        '4xl': 'clamp(1.75rem, 1.8vw + 1.3rem, 2.25rem)',
        '5xl': 'clamp(2rem, 2.5vw + 1.375rem, 3rem)',
        '6xl': 'clamp(2.25rem, 3.5vw + 1.375rem, 3.75rem)',
        '7xl': 'clamp(2.5rem, 4.5vw + 1.375rem, 4.5rem)',
      },
      colors: {
        // Custom green palette used in the buttons and icons
        'smart-green': {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
      },
      fontFamily: {
        // Custom fonts used in the layout
        dm: ['"DM Sans"', 'sans-serif'],
        fraunces: ['"Fraunces"', 'serif'],
      },
      backgroundImage: {
        'auth-bg1': ` linear-gradient(135deg, #F8FAFC 0%, #DBEAFE 35%, #EDE9FE 70%,  #ECFEFF 100%) `,
        'auth-bg2': ` linear-gradient(135deg, #020617 0%, #0F172A 30%, #1E1B4B 65%,  #111827 100%) `,
      },
      keyframes: {
        toastDrop: {
          '0%': { transform: 'translate(-50%, -50px)', opacity: '0' },
          '100%': { transform: 'translate(-50%, 0)', opacity: '1' },
        },
      },
      animation: {
        toastDrop: 'toastDrop 0.5s ease-out forwards',
      },
    },
  },
  plugins: [
    // Required for the "animate-in slide-in-from-right" classes used in the OTP form
    require("tailwindcss-animate"),
  ],
}