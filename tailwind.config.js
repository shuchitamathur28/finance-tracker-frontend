/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        'themeColor': {
          '100': '#1b1b1b',
          '200': '#66b2b2',
          '300': '#008080', // Or skip some levels
          '400': '#0b0b0b', // No modifier
          'DEFAULT': '#0b0b0b'  // Default value, can be skipped
        }
      },
    },
  },
  plugins: [],
}

