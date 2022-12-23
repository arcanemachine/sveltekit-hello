<script lang="ts">
  import { onMount } from "svelte";

  import { apiStore } from "$stores";
  import { csrfmiddlewaretokenCheck, csrfTokensGet } from "$helpers";

  onMount(async () => {
    console.log(`Before: ${$apiStore.csrfmiddlewaretoken}`);

    if (!$apiStore.csrfmiddlewaretoken) {
      // if token store is empty (aka. after page refresh), then fetch a new token
      $apiStore.csrfmiddlewaretoken = await csrfTokensGet();
      console.log(`L14: ${$apiStore.csrfmiddlewaretoken}`);
    } else {
      // check if saved token is valid
      const csrftokenIsValid = await csrfmiddlewaretokenCheck($apiStore.csrfmiddlewaretoken);

      if (!csrftokenIsValid) {
        // if token isn't valid, then fetch new tokens
        $apiStore.csrfmiddlewaretoken = await csrfTokensGet();
        console.log(`L23: ${$apiStore.csrfmiddlewaretoken}`);
      }
    }
    console.log(`After: ${$apiStore.csrfmiddlewaretoken}`);
  });
</script>
