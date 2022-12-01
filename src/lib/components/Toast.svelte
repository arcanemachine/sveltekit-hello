<script>
  import { SvelteToast, toast } from "@zerodevx/svelte-toast";

  const options = {
    reversed: true,
    intro: { y: 125 },
    theme: {
      "--toastBarHeight": 0,
      "--toastWidth": "20rem",
    },
  };
</script>

<SvelteToast {options} />
