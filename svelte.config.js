import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    alias: {
      $components: "src/lib/components",
      $helpers: "src/lib/helpers",
      $types: "src/lib/types",
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
  // vitePlugin: {
  //   experimental: {
  //     inspector: {
  //       // toggleKeyCombo: "meta-shift",
  //     },
  //   },
  // },
};

export default config;
