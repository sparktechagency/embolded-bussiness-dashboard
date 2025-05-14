/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        barlow: ['Lato'],
      },
      colors: {
        // Updated color scheme with gradient-friendly options
        "primary": {
          DEFAULT: '#336C79',
          light: '#6DB1BE',
          dark: '#336C79',
          gradient: 'linear-gradient(90deg, #4E9DAB 0%, #336C79 100%);'
        },
        "SurfacePrimary": "#23335F", // Kept your existing surface color
        "textPrimary": "#191820", // Fixed double hash
        "textSecondary": "#FFFFFF",
        "stokePrimary": "#336C79", // Updated to match primary
        "stokeSecondary": "#336C79", // Updated to dark variant
        "unActive": "#C1C7D0",
        "success": "#02BC7D",
        "error": "#D30000",
        
        // Additional gradient colors if needed
        "gradient": {
          "primary-start": "##336C79",
          "primary-end": "#336C79"
        }
      },
      // Optional: Add gradient background utilities
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #4E9DAB, #336C79)',
        'primary-gradient-hover': 'linear-gradient(135deg, #3D8795, #2A5B66)',
      },
    },
  },
  plugins: [],
}