/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#FF3B3B',
          blue: '#0080C4',
          yellow: '#FFED00',
          green: '#00B050',
        },
      },
    },
  },
  plugins: [],
}
