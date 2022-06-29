/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "meta-gallery": {
          100: "#ebedec",
          200: "#a2a9af",
          300: "#4c5870",
          400: "#3d3d3b",
        },
      },
      backgroundImage: {
        "main-bg": "url('@/assets/bg_image.jpg')",
      },
    },
  },
  plugins: [],
};
