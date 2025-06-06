/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#FF4000',
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
      },
    },
  },
  plugins: [],
};