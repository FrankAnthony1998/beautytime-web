/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'beauty-green': '#003d33',
        'beauty-gold': '#b08d57',
        'beauty-cream': '#f9fbfb',
      },
    },
  },
  plugins: [],
}