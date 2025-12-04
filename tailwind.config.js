/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#5B5FFF',
        dark: '#0F1419',
        'dark-secondary': '#1A1F2E',
        'dark-tertiary': '#252B3B',
      },
    },
  },
  plugins: [],
}
