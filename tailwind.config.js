/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line no-unused-vars
// const colors = require('tailwindcss/colors')

// https://coolors.co/005259-005a62-00636c-006d77-83c5be-d5eceb-edf6f9-e8c6b9-e29578

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './layouts/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      white: '#ffffff',
      lightest: '#EDF6F9',
      light: '#D5ECEB',
      dark: '#006D77',
      darkest: '#005259',
      primary: '#83C5BE',
      'error-dark': '#D35D31',
      error: '#E29578',
      'error-light': '#E8C6B9',
      link: '#0b69b2'
    },
    fontFamily: {
      title: ['Pacifico']
    },
    extend: {
      boxShadow: {
        bottom: '0 2px 2px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);'
      }
    }
  },
  plugins: []
}
