/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sapphire color scheme - primary brand color
        sapphire: {
          DEFAULT: '#0F52BA', // Main sapphire color
          hover: '#0B46A0',   // Darker hover state
          border: '#0D4AA8',  // Desaturated border variant
          light: '#1E5FCC',   // Lighter variant for gradients
        },
      },
      fontFamily: {
        // Modern sans-serif for body and headings
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        // Monospace for code snippets and tech badges
        mono: ['Fira Code', 'JetBrains Mono', 'Consolas', 'Monaco', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
