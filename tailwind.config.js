/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        MainBackgroundColor: "#1e1e1e",
        SecondaryBackgroundColor: "",
        PrimaryTextColor: "",
        SecondaryTextColor: "",
        BorderColor: "",
      }
    },
  },
  plugins: [],
}
