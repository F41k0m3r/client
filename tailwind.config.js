/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,module.sass,sass,module}",
  ],
  theme: {
    extend: {
      maxWidth: {
        xxs: '10rem'
      }
    },
  },
  plugins: [],
}