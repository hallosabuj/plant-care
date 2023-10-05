/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    maxHeight:{
      '1/2':'50%',
      '1':'100%',
    },
    maxWidth:{
      '1/2':'50%',
      '1':'100%',
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}