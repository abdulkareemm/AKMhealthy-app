/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        card: "0 0 2px gray",
      },
      colors:{
        backgroundC:"#005555",
        item:"rgba(255,255,255,0.72)"
      }
    },
  },
  plugins: [],
};
