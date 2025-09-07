/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scan all JS/TS/React files in src for Tailwind classes
    "./public/index.html",         // Optionally include your HTML entry point
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

