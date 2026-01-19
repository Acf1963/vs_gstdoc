/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#000663",
        moss: "#4F7942",
        slateBg: "#57616B",
        "navy-light": "#0a1078",
      },
    },
  },
  plugins: [],
}
