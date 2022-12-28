<script lang="ts">
  import { onMount } from "svelte";

  import { csrfTokensGet } from "$helpers";
  import { api } from "$stores";

  onMount(async () => {
    if (!$api.csrfmiddlewaretoken) {
      // // if token store is empty (aka. after page refresh), then fetch a new token
      // console.log("Fetching new csrfmiddlewaretoken...");
      $api.csrfmiddlewaretoken = await csrfTokensGet();
    }
    // } else {
    //   // check if saved token is valid
    //   const csrftokenIsValid = await csrfTokenCheck($apiStore.csrfmiddlewaretoken);
    //   if (!csrftokenIsValid) {
    //     // if token isn't valid, then fetch new tokens
    //     $apiStore.csrfmiddlewaretoken = await csrfTokensGet();
    //   }
  });
</script>
