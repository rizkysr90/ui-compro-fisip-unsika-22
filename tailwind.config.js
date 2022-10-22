/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {

      'heading' : ['Racing Sans One', 'cursive', 'sans-serif'],
      'para' : ['DM Sans','sans-serif']
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#8F2492",
          secondary: "#f79d33",
          accent: "#37cdbe",
          neutral: "#383A47",
          "base-100": "#fafafa",
        }
      }
    ]
  }
}