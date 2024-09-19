/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*/*.{js,jsx,ts,tsx}", // Include all JS/JSX files in the src folder
  ],
  theme: {
    extend: {
      colors: {
        'secondaryColor': "#FFA52F",
      },
    },
  },
  plugins: [],
};
