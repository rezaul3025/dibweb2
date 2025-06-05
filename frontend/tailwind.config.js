/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,mjs}",
  ],
  theme: {
    colors: {
        primary: {
          100: "#b2d8d8",
          200: "#66b2b2",
          // 300: '#66b2b2', you can skip some colors like this or not even commnet them
          // 400: '',
          500: "#008080",
          700: "#66b2b2",
          900: "#004c4c",
        },
        secondary: {
          100: "##ff9c3c",
          200: "#ff9022",
          300: "#ff8308",
          400: "#ee7600",
          500: "#d56900",
          600: "#bb5d00",
          700: "#a25000",
          800: "#5f2f00",
          900: "#472300",
        },
      },
    plugins: [],
  }
}
