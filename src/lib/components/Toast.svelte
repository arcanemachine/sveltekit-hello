<script>
  import { SvelteToast } from "@zerodevx/svelte-toast";

  const options = {
    reversed: true,
    intro: { y: 125 },
    theme: {
      "--toastBarHeight": 0,
    },
  };
</script>

<SvelteToast {options} />

<style>
  :root {
    --toastContainerTop: auto;
    --toastContainerRight: 1rem;
    --toastContainerBottom: 1rem;
    --toastContainerLeft: auto;
  }
</style>
