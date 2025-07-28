/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'elitestay-white': 'var(--elitestay-white)',
        'elitestay-beige': 'var(--elitestay-beige)',
        'elitestay-gold': 'var(--elitestay-gold)',
        'elitestay-teal': 'var(--elitestay-teal)',
        'elitestay-light-gold': 'var(--elitestay-light-gold)',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Roboto', 'ui-sans-serif', 'system-ui'],
        display: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}
