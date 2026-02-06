/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'codeleap-blue': '#7695EC',
        'codeleap-grey': '#CCCCCC',
        'dark-bg': '#1a1a1a',
        'dark-card': '#2a2a2a',
        'dark-yellow': '#d4a574',
      },
    },
  },
  plugins: [],
}
