/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    screens: {
      sm: '375px',
      // => @media (min-width: 640px) { ... }

      md: '768px'
      // => @media (min-width: 768px) { ... }
    },
    extend: {
      colors: {
        'light-red': 'hsl(0, 100%, 67%)',
        'off-white': 'hsl(0, 0%, 94%)',
        'light-grey': 'hsl(0, 0%, 86%)',
        'smokey-grey': 'hsl(0, 1%, 44%)',
        'off-black': 'hsl(0, 0%, 8%)',
        'purple-unique': 'hsl(259, 100%, 65%)'
      }
    }
  },
  plugins: []
}
