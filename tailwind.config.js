/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'elitestay': {
          white: '#FFFFFF',
          beige: '#F5F5DC',
          gold: '#D4AF37',
          teal: '#008080',
          'light-gold': '#E6D2B5'
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Roboto', 'ui-sans-serif', 'system-ui']
      }
    },
  },
  plugins: [],
} 