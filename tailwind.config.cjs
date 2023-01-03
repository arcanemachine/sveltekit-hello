/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  daisyui: {
    logs: false,
    themes: [
      {
        default: {
          primary: "#2563EB",
          secondary: "#D1D5DB",
          accent: "#8B5CF6",
          neutral: "#312E81",
          "base-100": "#F6F6FF",
          info: "#7DD3FC",
          success: "#25A762",
          warning: "#FACC15",
          error: "#DC2626",
        },
      },
      "luxury",
    ],
  },
  mode: "jit",
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
