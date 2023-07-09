//Puedes customizar TODO antes del preprocesamiento del CSS final, spacing, font-family, typografia etc
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      minWidth: {
        half: '50%'
      },

      fontFamily: {
        'hanken-grotesk': ['var(--font-hanken-grotesk)'],
      },

      colors: {
        'light-red': {
          DEFAULT: 'hsl(0, 100%, 67%)',
          transparent: 'hsla(0, 100%, 67%, .075)',
        },
        'orangey-yellow': {
          DEFAULT: 'hsl(39, 100%, 56%)',
          transparent: 'hsla(39, 100%, 56%, .075)',
        },
        'green-teal': {
          DEFAULT: 'hsl(166, 100%, 37%)',
          transparent: 'hsla(166, 100%, 37%, .075)',
        },
        'cobalt-blue': {
          DEFAULT: 'hsl(234, 85%, 45%)',
          transparent: 'hsla(234, 85%, 45%, .075)',
        },
        'light-slate-blue': 'hsl(252, 100%, 67%)',
        'light-royal-blue': 'hsl(241, 81%, 54%)',
        'violet-blue': 'hsla(256, 72%, 46%, 1)',
        'persian-blue': 'hsla(241, 72%, 46%, 0)',
        'dark-gray-blue': 'hsl(224, 30%, 27%)'
      },
    },
    screens: {
      sm: { 'min': '640px', 'max': '1024px' },
      lg: '1024px'
    }
  },
  plugins: [],
}
