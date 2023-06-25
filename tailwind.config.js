/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./src/**/*.{vue,js,ts,jsx,tsx}"],
  safelist: [
    'bg-purple-400',
    'bg-orange-400',
    'bg-blue-400',
    'bg-green-400',
  ],  
  theme: {
    extend: {
      colors: {
        primary: '#86A6DB',
        secondary: '#7A838F',
        header1: '#9EA7FC',
        header2: '#65B6F7',
        logo: '#32325D',
        main: '#EEF2F9',
        board: '#E9EBF0',
      },

    },
  },
  fontFamily: {
    Roboto: ["Roboto, sans-serif"],
  },
  container: {

  },
  screens: {
    'sm': { min: '320px', max: '480px' },
    'md': { min: '481px', max: '768px' },
    'lg': { min: '769px', max: '1024px' },
    'xl': { min: '1025px', max: '1200px' },
    '2xl': { min: '1201px' },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}

