<script lang="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";

  import Fa from "svelte-fa/src/fa.svelte";
  import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

  import { tooltip } from "$lib/helpers";

  let lightModeToggled: boolean;
  let darkModePreference = window.matchMedia("(prefers-color-scheme: dark)");

  onMount(() => {
    const savedDarkModePreferenceExists = localStorage.getItem("darkMode") !== null;

    // get initial dark mode setting in order: saved setting, browser settings
    if (savedDarkModePreferenceExists)
      lightModeToggled = !Boolean(JSON.parse(localStorage.getItem("darkMode") || ""));
    else lightModeToggled = !darkModePreference.matches; // use browser preference

    lightModeToggled ? darkModeDisable(false) : darkModeEnable(false); // set initial theme

    // watch for changes to dark mode preference
    darkModePreference.addEventListener("change", (evt) => {
      // only change if no preference has been assigned manually
      if (!savedDarkModePreferenceExists) {
        evt.matches ? darkModeEnable(false) : darkModeDisable(false);
      }
    });
  });

  function darkModeEnable(updateLocalStorage: boolean) {
    lightModeToggled = false;
    updateLocalStorage && localStorage.setItem("darkMode", "1"); // save data to localStorage
    document!.querySelector("html")!.dataset.theme = "luxury"; // set the theme
  }

  function darkModeDisable(updateLocalStorage: boolean) {
    lightModeToggled = true;
    updateLocalStorage && localStorage.setItem("darkMode", "0"); // save data to localStorage
    document!.querySelector("html")!.removeAttribute("data-theme"); // remove theme data attribute
  }

  function darkModeToggle() {
    if (lightModeToggled) darkModeEnable(true);
    else darkModeDisable(true);
  }
</script>

<div class="flex">
  <div class="flex-center mr-2 flex grid">
    {#if lightModeToggled}
      <div class="item" in:fly={{ x: 30 }}>
        <span aria-label="Light Mode Icon">
          <Fa icon={faSun} style="color: hsl(var(--wa))" />
        </span>
      </div>
    {:else}
      <div class="item" in:fly={{ x: 30 }}>
        <span aria-label="Dark Mode Icon">
          <Fa icon={faMoon} />
        </span>
      </div>
    {/if}
  </div>
  <input
    type="checkbox"
    class="toggle-warning toggle inline-block"
    use:tooltip={"Toggle Dark Mode"}
    bind:checked={lightModeToggled}
    on:click={darkModeToggle}
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
