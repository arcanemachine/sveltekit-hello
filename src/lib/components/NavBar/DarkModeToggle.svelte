<script lang="ts">
  import { browser } from "$app/environment";
  import { fly } from "svelte/transition";
  import Fa from "svelte-fa/src/fa.svelte";
  import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons/index.js";

  let lightModeEnabled =
    Boolean(browser && window.localStorage.getItem("darkModeEnabled") === "1") ?? true;

  function handleClick(this: HTMLElement) {
    if (browser && window.localStorage.getItem("darkModeEnabled") === "1") {
      localStorage.removeItem("darkModeEnabled");
    } else {
      localStorage.setItem("darkModeEnabled", "1");
    }
  }
</script>

<div class="flex">
  <div class="flex-center mr-3 flex grid">
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
