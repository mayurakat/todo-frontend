

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7c3aed', // purple
        accent: '#06b6d4',  // cyan
        neon: '#ff6bcb'
      },
      backgroundImage: {
        'mesh': "radial-gradient(circle at 10% 20%, rgba(124,58,237,0.12), transparent 20%), radial-gradient(circle at 90% 80%, rgba(6,182,212,0.08), transparent 20%)"
      }
    }
  },
  plugins: []
}
