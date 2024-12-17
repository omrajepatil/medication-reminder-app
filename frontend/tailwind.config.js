/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Include all React component files
    "./node_modules/@ionic/react/**/*.js", // Include Ionic React components
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--ion-color-primary)", // Map to Ionic's CSS variables
        secondary: "var(--ion-color-secondary)",
        light: "var(--ion-color-light)",
        dark: "var(--ion-color-dark)",
      },
    },
  },
  plugins: [],
};
