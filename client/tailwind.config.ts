import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        'custom-light': '0 0 10px #313131',
        'custom-dark': '5px 5px 10px #0a0c0e , -5px -5px 10px #14161c',
      },
      colors: {
        alert: '#EC2828',
        success: '#11B121',
        green: {
          DEFAULT: '#5B21B6',
        },
        dark: {
          DEFAULT: '#010101',
          100: '#0a0b0e',
          200: '#16181d',
          300: '#16181d',
          500: '#0f1115',
          700: '#202125',
        },
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%, 75%': { transform: 'translateX(-5px)' },
          '50%': { transform: 'translateX(5px)' },
        },
      },
      animation: {
        shake: 'shake 0.5s',
      },
    },
    fontFamily: {
      kaushan: ['Kaushan Script'],
    },
  },
  plugins: [],
}
export default config
