/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        coolGrey: "#f2f5f7",
        darkBlueGrey: "#282d39",
        white: "#ffffff",
        darkBlue: "#005397",
        midBlue: "#0079c7",
      },
      boxShadow: {
        leaveContainer: "0 0.125rem 0.125rem rgba(191, 204, 214, 0.5)",
      },
    },
  },
  plugins: [],
};
