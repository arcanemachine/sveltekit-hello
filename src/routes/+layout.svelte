<script type="ts">
  import "/src/css/app.css";

  import { onMount } from "svelte";

  import { Navbar, NavbarDrawer } from "$components/base/navbar";
  import { Toast } from "$components/base";
  import { apiStore, isLoading, user } from "$stores";

  let appInitialized = false;

  async function init() {
    $apiStore.schema = await $apiStore.schemaGet();
  }

  onMount(async () => {
    $isLoading = true;

    try {
      await init();
      appInitialized = true;
      $isLoading = false;
    } catch (err) {
      console.log(err);
    }
  });
</script>

<div class="drawer-mobile drawer">
  <input id="navbar-drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content flex w-full flex-col items-center justify-center">
    {#if !$user.prefs.bottomNavbarEnabled}
      <Navbar />
    {/if}
    <main class="prose mx-auto mx-auto mt-6 h-full w-full">
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
