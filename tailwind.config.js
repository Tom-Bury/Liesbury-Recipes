const colors = require('tailwindcss/colors')

// https://coolors.co/005259-005a62-00636c-006d77-83c5be-d5eceb-edf6f9-e8c6b9-e29578

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './layouts/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      white: colors.white,
      lightest: '#EDF6F9',
      light: '#D5ECEB',
      dark: '#006D77',
      darkest: '#005259',
      primary: '#83C5BE',
      error: '#E29578',
      'error-light': '#E8C6B9'
    },
    fontFamily: {
      title: ['Pacifico']
    },
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
}
