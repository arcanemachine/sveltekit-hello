<script>
  import { onMount } from "svelte";

  import { csrfmiddlewaretoken } from "$stores";
  import { csrfmiddlewaretokenGet } from "$helpers";

  onMount(async () => {
    if (!$csrfmiddlewaretoken) {
      $csrfmiddlewaretoken = await csrfmiddlewaretokenGet();
    }
  });
</script>
