const defaultTheme = require('tailwindcss/defaultTheme');
const { readBuilderProgram } = require('typescript');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "accent-1": "#7aba28",
        "accent-2": "#ef7726",
        "accent-3": "#455269",
        "accent-7": "#455269",
        success: "#0070f3",
        cyan: "#79FFE1",
        "upm-dark-grey": "#676362",
        "upm-dark-grey-25": "rgba(103, 99, 98, 0.25)",
        "upm-brown": "#998573"
      },
      spacing: {
        28: "7rem",
      },
      letterSpacing: {
        tighter: "-.04em",
      },
      lineHeight: {
        tight: 1.2,
      },
      fontFamily: {
        'sans': ['Futura', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        "5xl": "2.5rem",
        "6xl": "2.75rem",
        "7xl": "4.5rem",
        "8xl": "6.25rem",
      },
      boxShadow: {
        small: "0 5px 10px rgba(0, 0, 0, 0.12)",
        medium: "0 8px 30px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
