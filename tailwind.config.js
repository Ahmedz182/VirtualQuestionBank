/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'black': '#000000',
      'text': '#0b2540',
      // 'purple': '#3f3cbb',
      'darkGreen': '#0b8f4d',
      'green': '#3CDA5F',
      'lightGreen': '#B1F9C6',
      'darkBlue': '#0A2640',
      'red': '#FD273B',
      'purple': '#A020F0',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#F5F7FA',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
    },
    screens: {
      'sm': { 'max': '640px' },
      // => @media (min-width: 576px) { ... }

      'md': { 'max': '834px' },
      // => @media (min-width: 960px) { ... }

      'lg': { 'max': '1440px' },
      // => @media (min-width: 1440px) { ... }
    },

    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
