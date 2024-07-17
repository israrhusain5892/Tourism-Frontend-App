/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", 
  "./src/**/*.{js,ts,jsx,tsx}",
  "./node_modules/tw-elements-react/dist/js/**/*.js"
],
  theme: {
    extend: {
      scale: {
        '120': '1.2',
      },
      colors: {
        'dark-navy': '#2c3e50', // Adjust the hex code to your preferred shade of dark navy
      },
    },
  },
  variants: {
    extend: {
      transform: ['hover'],
      scale: ['hover'],
    },
  },
  plugins: [],
};
