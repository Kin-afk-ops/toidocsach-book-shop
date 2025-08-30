import lineClamp from "@tailwindcss/line-clamp";
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        container: "1230px",
      },
    },
  },
  plugins: [lineClamp],
  corePlugins: {
    // Tailwind >=3.2 đã có hỗ trợ scroll snap
    scrollSnapType: true,
    scrollSnapAlign: true,
  },
};
