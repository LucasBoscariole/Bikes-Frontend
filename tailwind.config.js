module.exports = {
  content: [
    "./pages/**/*.{html,js,ts,tsx}",
    "./components/**/*.{html,js,tsx,ts}",
  ],
  theme: {
    extend: {},
    colors: {
      primary: "#0021db",
      secondary: "#008bdb",
      thrid: "#00c5db",
      white: "#fff",
      black: "#000",
      greymedium: '#3d3d3d',
      greybackground: '#f2f2f2'
    },
    fontFamily: {
      'Primary': ['Inter', 'sans-serif'],
      'Secondary': ['Caveat', 'cursive'],
    },
    screens: {
      tablet: "640px",
      laptop: "1024px",
      desktop: "1440px",
    },
  },
  plugins: [],
};