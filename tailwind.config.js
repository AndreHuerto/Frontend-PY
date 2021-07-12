const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors:{ 
      'upeu-1': '#9f0030',
      'upeu-2':'#be0940',
      'upeu-3': '#703F3F',
      'upeu-3-100': '#8A5B5B',
      'linea-rojo': '#B15D5D',
      'blue-1': '#D1E9FF',
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      lime: colors.lime,
    }
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}