/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  daisyui: {
    logs: false,
    themes: ["light", "dark"],
  },
  mode: "jit",
  plugins: [require("daisyui")],
  theme: {
    extend: {},
  },
};
