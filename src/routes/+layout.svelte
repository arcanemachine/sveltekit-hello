<script type="ts">
  import "../app.css";
  import { Navbar, Drawer as NavbarDrawer } from "$lib/components/Navbar";

  let bottomNavbarEnabled = false;
</script>

<div class="drawer-mobile drawer">
  <input id="navbar-drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content flex flex-col items-center justify-center">
    {#if !bottomNavbarEnabled}
      <Navbar />
    {/if}
    <main class="flex-grow-1 flex-center flex h-screen w-max">
      <slot />
    </main>
    {#if bottomNavbarEnabled}
      <Navbar />
    {/if}
  </div>

  <NavbarDrawer />
</div>
