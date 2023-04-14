/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gradientColorStops: {
        pink: "#ff00a0",
        purple: "#9600ff",
      },
      colors: {
        pink: "#ff00a0",
        blur: "#989CAD",
        bg1: "#1A202D",
        bg2: "#171D28",
      },
      boxShadow: {
        neon: "0 0px 50px -6px",
      },
    },
  },
  plugins: [],
};
