<script lang="ts">
  import { SvelteToast, type SvelteToastOptions } from "@zerodevx/svelte-toast";

  const options: SvelteToastOptions = {
    reversed: true,
    intro: { y: 125 },
    theme: {
      "--toastBarHeight": 0,
      "--toastWidth": "22rem",
    },
  };
</script>

<SvelteToast {options} />
