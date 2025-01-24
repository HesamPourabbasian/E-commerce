/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Quicksand: ["Quicksand"],
      },
      colors: {
        customBlue: "rgb(56, 82, 138)", // Custom RGB color
        customGray:"rgb(46,62,97)",
      },
    },
  },
  plugins: [require("daisyui")],
});
