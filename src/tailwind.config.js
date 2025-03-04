/* eslint-disable @typescript-eslint/no-require-imports */
// tailwind.config.js
module.exports = {
    content: [
      './src/**/*.{html,svelte,ts}',  // Adjust paths to match your project structure
    ],
    theme: {
      extend: {},
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
    ],
  };
  