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
      spacing: {
        18: "72px", // Añadir tamaño personalizado para el botón de añadir noticia a 72px
      },
    },
  },
  plugins: [],
};
