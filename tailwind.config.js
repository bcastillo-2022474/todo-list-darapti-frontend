/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#646ff0',
        secondary: {
          100: '#ecedf6',
          200: '#cccdde',
          300: '#dbdcde',
        }
      },
    },
  },
  plugins: [],
}
