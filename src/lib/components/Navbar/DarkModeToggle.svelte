<script lang="ts">
  import { fly } from "svelte/transition";
  import Fa from "svelte-fa/src/fa.svelte";
  import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons/index.js";

  let lightModeEnabled = localStorage.getItem("darkModeEnabled") === "1" ? false : true;

  // set theme on initial load
  if (localStorage.getItem("darkModeEnabled") === "1") {
    document!.querySelector("html")!.dataset.theme = "luxury";
  }

  function handleClick(this: HTMLElement) {
    lightModeEnabled = !lightModeEnabled;

    if (window.localStorage.getItem("darkModeEnabled") !== "1") {
      // enable dark mode
      localStorage.setItem("darkModeEnabled", "1"); // save data to localStorage
      document!.querySelector("html")!.dataset.theme = "luxury"; // set the theme
    } else {
      // disable dark mode
      localStorage.removeItem("darkModeEnabled"); // save data to localStorage
      document!.querySelector("html")!.dataset.theme = "emerald"; // set the theme
    }
  }
</script>

<div class="flex">
  <div class="flex-center mr-2 flex grid">
    {#if lightModeEnabled}
      <div class="item" in:fly={{ x: 30 }}>
        <Fa icon={faSun} style="color: hsl(var(--wa))" />
      </div>
    {:else}
      <div class="item" in:fly={{ x: 30 }}>
        <Fa icon={faMoon} />
      </div>
    {/if}
  </div>
  <input
    type="checkbox"
    class="toggle-warning toggle inline-block"
    bind:checked={lightModeEnabled}
    on:click={handleClick}
  />
</div>

<style>
  .item {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 2;
  }
</style>
