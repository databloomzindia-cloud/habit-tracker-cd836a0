/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eefdf5',
          100: '#d6fae4',
          200: '#b0f3cd',
          300: '#7ce7b0',
          400: '#43d590',
          500: '#1fbb75',
          600: '#14975e',
          700: '#13784d',
          800: '#135f40',
          900: '#124e37',
        },
      },
    },
  },
  plugins: [],
}
