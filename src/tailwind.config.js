/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "ponto-if-green": "#1C5E27",
        "ponto-if-gray": "#D9D9D9",
      },
    },
  },
  plugins: [],
};
