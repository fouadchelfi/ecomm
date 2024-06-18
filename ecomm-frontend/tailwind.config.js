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
        'primary': '#0a259c',
        'primary-light': '#e6feff',
        'accent': '#FFD700',
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