/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ["'Outfit'", 'sans-serif'],
      },
      colors: {
        'white': '#ffffff',
        'black': '#1E1F20',
        'primary': '#4CAF50',
        'primary-light': '#f64606',
        'accent': '#f64606',
        'warn': '#D6341F',       
        'light-bg': '#F7F7F7',       
        'dark-txt': '#0e2238',       
        'color-txt': '#737373',       
      },
    }
  },
  plugins: [
    plugin(function ({
      addBase,
      addComponents,
      addUtilities,
    }) {
      addBase({})
      addComponents({})
      addUtilities({})
    })
  ],
}