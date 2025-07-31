module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all JavaScript/TypeScript files in the src folder
    "./public/index.html",        // Include your HTML file if needed
  ],
  theme: {
    extend: {
      fontSize: {
        '4x1': '2.5rem',
        'x1': '1.25rem',
      },
      fontFamily: {
        caveat: ['Caveat', 'cursive'],
        Kaushan: ['Kaushan Script', 'cursive'],
      },
    },
  },
  plugins: [],
};
