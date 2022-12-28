<script type="ts">
  import "/src/css/app.css";

  import { onMount, tick } from "svelte";

  import { Navbar, NavbarDrawer } from "$components/base/navbar";
  import { Toast } from "$components/base";
  import { api, isLoading, user } from "$stores";

  // data
  let appInitialized = false;
  let mainEl: HTMLElement;

  // lifecycle
  onMount(async () => {
    $isLoading = true;

    // fade in content on initial render
    await tick();
    mainEl.classList.remove("opacity-0");

    try {
      await init();
      appInitialized = true;
      $isLoading = false;
    } catch (err) {
      console.log(err);
    }
  });

  // methods
  async function init() {
    $api.schema = await $api.schemaGet();
  }
</script>

<div class="drawer-mobile drawer">
  <input id="navbar-drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content flex w-full flex-col items-center justify-center">
    {#if !$user.prefs.bottomNavbarEnabled}
      <Navbar />
    {/if}
    <main
      class="prose mx-auto mx-auto mt-6 h-full w-full opacity-0 transition-opacity duration-500"
      bind:this={mainEl}
    >
      {#if appInitialized}
        <slot />
      {/if}
    </main>
    {#if $user.prefs.bottomNavbarEnabled}
      <Navbar />
    {/if}
  </div>

  <NavbarDrawer />
  <Toast />
</div>
