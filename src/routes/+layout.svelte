<script type="ts">
  import "../app.css";
  import { Navbar, Sidebar } from "$lib/components";

  let bottomNavbarEnabled = false;
</script>

<div class="drawer-mobile drawer">
  <input id="sidebar" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content flex flex-col items-center justify-center">
    <!-- Page content here -->

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

  <Sidebar />
</div>
