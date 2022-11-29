import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    alias: {
      $components: "src/lib/components",
    },
  },
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],
  onwarn: (warning, handler) => {
    if (warning.code === "a11y-label-has-associated-control") return;
    if (warning.code === "a11y-no-noninteractive-tabindex") return;
    handler(warning);
  },
};

export default config;
