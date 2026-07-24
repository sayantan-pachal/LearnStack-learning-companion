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