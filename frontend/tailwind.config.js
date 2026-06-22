/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          900: '#0d0f12',
          800: '#13161b',
          700: '#1a1d24',
          600: '#22262f',
          500: '#2a2f3a',
        },
        accent: {
          DEFAULT: '#3b82f6',
          light: '#60a5fa',
          dim: '#2563eb',
        },
        muted: '#6b7280',
        'text-primary': '#e5e7eb',
        'text-secondary': '#9ca3af',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
