/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
      colors: {
        vbase:   '#14131B', // Deep dark background
        vpanel:  '#1E1C27', // Slightly lighter panel/card
        vtext:   '#FAFAFF', // Ghost white/Lavender
        vaccent: '#E8A87C', // Peach/Orange
        vmuted:  '#757B8C', // Slate grey
        vpurple: '#8A2CFF', // Secondary tag highlight
        vpink:   '#FF3E6C',
        vborder: 'rgba(255, 255, 255, 0.12)',
        vturquoise: '#2ED4B5',
        vblue:   '#1DA1F2',
      },
    },
  },
  plugins: [],
}
