export const content = [
  "./src/**/*.{js,jsx,ts,tsx}", // Include all JavaScript/TypeScript files in the src folder
  "./public/index.html", // Include your HTML file if needed
];
export const theme = {
  extend: {
    fontSize: {
      '4x1': '2.5rem',
      'x1': '1.25rem',
    },
    fontFamily: {
      caveat: ['Caveat', 'cursive'],
      Kaushan: ['Kaushan Script', 'cursive'],
      Eater: ['Eater', 'cursive'],
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
  },
};
export const plugins = [];
