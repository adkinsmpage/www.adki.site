module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {
      theme: {
        extend: {
          maxWidth: {
            '7xl': '1280px',
          }
        }
      }
    },
    autoprefixer: {},
  },
};
