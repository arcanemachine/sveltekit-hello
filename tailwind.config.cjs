/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  daisyui: {
    logs: false,
    themes: [
      {
        default: {
          primary: "#2563eb",
          secondary: "#d1d5db",
          accent: "#8b5cf6",
          neutral: "#34273A",
          "base-100": "#F6F6FF",
          info: "#bae6fd",
          success: "#25A762",
          warning: "#facc15",
          error: "#dc2626",
        },
      },
      "luxury",
    ],
  },
  mode: "jit",
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
