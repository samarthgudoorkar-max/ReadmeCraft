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
        darkBg: '#0F172A',
        surfaceDark: '#1E293B',
        surfaceDarkLighter: '#273549',
        borderDark: '#334155',
        borderLight: '#E2E8F0',
        lightBg: '#F8FAFC',
        surfaceLight: '#FFFFFF',
        surfaceLightAlt: '#F1F5F9',
        mutedText: '#94A3B8',
        lightText: '#F1F5F9',
        darkText: '#0F172A',
        accent: {
          DEFAULT: '#6366F1',
          hover: '#4F46E5',
          light: '#EEF2FF',
          dark: '#4338CA',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
