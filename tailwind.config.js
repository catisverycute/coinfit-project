/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1025px',
      xl: '1280px',
      xl2: '1360px',
    },
    extend: {
      colors: {},
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    themes: [
      'light',
      'dark',
      {
        mytheme: {
          primary: '#661AE6',
          secondary: '#A6ADBB',
          grayColor: '#364153',
          accent: '#14B8A6',
          neutral: '#3D4451',
          'base-100': '#FFFFFF',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
          input: '#D1D5DC',
          'input-dark': '#4A5565',
        },
      },
      'emerald',
      'dark',
      'forest',
      'synthwave',
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
};
