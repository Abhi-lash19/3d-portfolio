/* eslint-disable no-undef */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "white-100": "#f3f3f3",
        accent: "#915EFF",
        // page background — was hardcoded inline in App.jsx
        background: "#0F172A",
        // blue used by the hero heading/marker (also the gradient fallbacks)
        sapphire: "#3B82F6",
        // navbar active underline
        highlight: "#E11D48",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
        // matches the hover glow that was duplicated inline in Footer.jsx
        glow: "0 0 25px rgba(145,94,255,0.8)",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.webp')",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
