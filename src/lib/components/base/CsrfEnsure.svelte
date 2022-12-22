<script>
  import { onMount } from "svelte";

  import { csrfToken } from "$stores";
  import { csrfTokenGet } from "$helpers";

  onMount(async () => {
    if (!$csrfToken) {
      $csrfToken = await csrfTokenGet();
    }
  });
</script>
