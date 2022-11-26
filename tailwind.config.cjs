/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  daisyui: {
    logs: false,
    themes: ["light", "luxury"],
  },
  // mode: "jit",
  plugins: [require("daisyui")],
  theme: {
    extend: {},
  },
};
