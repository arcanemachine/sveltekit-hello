<script lang="ts">
  // import { browser } from "$app/environment";
  // import Fa from "svelte-fa/src/fa.svelte";
  // import { faFlag } from "@fortawesome/free-solid-svg-icons/index.js";

  // let darkModeEnabled = browser ?? false;

  function handleClick(this: HTMLElement) {
    console.log(this);
  }
</script>

<h1>Welcome to SvelteKit!</h1>

<div class="form-control w-52">
  <input type="checkbox" class="toggle-warning toggle" on:click={handleClick} />
</div>

<style lang="postcss">
  h1 {
    @apply bg-red-500;
  }
</style>
