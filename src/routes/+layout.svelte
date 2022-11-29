<script type="ts">
  import "/src/css/app.css";
  import { Navbar, Drawer as NavbarDrawer } from "$lib/components/Navbar";
  import Toast from "$lib/components/Toast.svelte";

  let bottomNavbarEnabled = false;
</script>

<div class="drawer-mobile drawer">
  <input id="navbar-drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content flex flex-col items-center justify-center">
    {#if !bottomNavbarEnabled}
      <Navbar />
    {/if}
    <main class="mt-6 flex h-screen">
      <slot />
    </main>
    {#if bottomNavbarEnabled}
      <Navbar />
    {/if}
  </div>

  <NavbarDrawer />
  <Toast />
</div>
