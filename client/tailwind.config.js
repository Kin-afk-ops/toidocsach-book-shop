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
};
