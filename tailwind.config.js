/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#54b9ff',
        secondary: '#4bf3c8',
        accent: '#acafff',
        background: '#eef0f9',
      },
    },
  },
  plugins: [],
};