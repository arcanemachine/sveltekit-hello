import { sveltekit } from "@sveltejs/kit/vite";
import fs from "fs";

/** @type {import('vite').UserConfig} */
const config = {
  server: {
    https: {
      key: fs.readFileSync("./.cert/key.pem"),
      cert: fs.readFileSync("./.cert/cert.pem"),
    },
    strictPort: true,
    port: 5173,
    hmr: {
      // use same port as server to avoid issues with reverse proxy
      clientPort: 5173,
    },
  },
  plugins: [sveltekit()],
};

export default config;
