/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        green: {
          dark: "#284018",
          hover: "#486236",
          light: "#86A773",
          hr: "#223615",
          text: "#26400A"
        },
        'input': "rgba(255, 255, 255, 0.29)",
      },
      backgroundImage: {
        'hero': "url('/login.png')"
      },
      flex: {
        '2': '2 2 0%'
      },
      boxShadow: {
        'input': "0px 4px 13px 0px rgba(0, 0, 0, 0.25)"
      }
    },
  },
  plugins: [],
}