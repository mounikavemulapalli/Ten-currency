/**
 * @format
 * @type {import('tailwindcss').Config}
 */

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        floatingCoin: "floatCoin linear infinite",
        rotateSlow: "spinSlow 20s linear infinite",
      },
      keyframes: {
        floatCoin: {
          "0%": { transform: "translateY(0px)", opacity: "1" },
          "100%": { transform: "translateY(100vh)", opacity: "0" },
        },
        spinSlow: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};
