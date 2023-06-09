/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundImage: {
        main: "url('./assets/background.svg')",
      },
      borderColor: {
        selected: "#F6F8FD",
      },
      colors: {
        primary: "#F6F8FD",
      },
      gridTemplateRows: {
        10: "repeat(10, minmax(0, 1fr))",
        12: "repeat(12, minmax(0, 1fr))",
      },
      gridRow: {
        "span-8": "span 8 / span 8",
        "span-9": "span 9 / span 9",
        "span-10": "span 10 / span 10",
      },
      height: {
        "50v": "50vh",
        "54v": "54vh",
        "60v": "60vh",
      }
    },
  },
  plugins: [],
};

