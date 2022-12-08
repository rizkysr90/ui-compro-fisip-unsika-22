/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        // added new 4 column grid as new4
        'new3-lg': 'repeat(3,350px)',
        'new3': 'repeat(auto-fit,minmax(350px,1fr))',
        'new4': 'repeat(auto-fit,minmax(250px,1fr))'
      },
    },
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
          // primary: "#8F2492",
          primary: "#5d00a9",
          secondary: "#f79d33",
          accent: "#2d2c2c",
          neutral: "#383A47",
          "base-100": "#fafafa",
          "base-200" : "#FCFDF2",
          "base-300" : "#141414",
          "info" : "#420175"
          
        }
      }
    ]
  }
}