/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", 'html[class~="dark"]'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './theme.config.tsx'
  ],
};
