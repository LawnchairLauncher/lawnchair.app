module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "header-bg": "#1E81DF",
      },
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      "sans-alt": ["Graphik", "sans-serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar-hide")],
}
