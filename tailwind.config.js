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
        "black-200": "#090325",
        "white-100": "#f3f3f3",
        accent: "#915EFF",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
        glow: "0 0 40px rgba(145,94,255,0.25)",
        glowSoft: "0 0 80px rgba(145,94,255,0.15)",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};