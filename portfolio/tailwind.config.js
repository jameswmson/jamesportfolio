/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Public Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Libre Bodoni', 'Libre Bodoni Fallback', 'Georgia', 'serif'],
      },
      colors: {
        paper: '#F7F4EF',
        ink: '#1C1917',
        muted: '#57534E',
        folio: '#78716C',
        rule: '#D6D3D1',
      },
    },
  },
}
