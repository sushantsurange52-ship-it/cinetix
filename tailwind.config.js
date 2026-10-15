/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0a0a0f',
          surface: '#11121a',
          card: '#13141f',
          cardHover: '#181a27',
          border: 'rgba(255, 255, 255, 0.1)',
          borderActive: '#C8FF00',
        },
        lime: {
          DEFAULT: '#C8FF00',
          hover: '#b5e600',
          dark: '#93bd00',
          glow: 'rgba(200, 255, 0, 0.4)',
          subtle: 'rgba(200, 255, 0, 0.12)',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-lime': '0 0 25px -3px rgba(200, 255, 0, 0.45)',
        'glow-lime-lg': '0 0 40px -5px rgba(200, 255, 0, 0.65)',
        'glow-subtle': '0 0 20px -3px rgba(200, 255, 0, 0.2)',
        'solid': '4px 4px 0px 0px rgba(200, 255, 0, 1)',
      },
    },
  },
  plugins: [],
}
