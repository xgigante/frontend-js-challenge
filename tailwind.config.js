/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#F15F41",
          dark: "#e14e31",
        },
        transparent: "transparent",
      },
    },
  },
  plugins: [],
};
