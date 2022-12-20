<script type="ts">
  import "/src/css/app.css";
  import { Navbar, NavbarDrawer } from "$components/base/navbar";
  import { Toast } from "$components/base/toast";
  import { userPrefs } from "$stores";
</script>

<div class="drawer-mobile drawer">
  <input id="navbar-drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content flex flex-col items-center justify-center">
    {#if !$userPrefs.bottomNavbarEnabled}
      <Navbar />
    {/if}
    <main class="mt-6 h-full">
      <slot />
    </main>
    {#if $userPrefs.bottomNavbarEnabled}
      <Navbar />
    {/if}
  </div>

  <NavbarDrawer />
  <Toast />
</div>

<style global>
  /** third-party dependencies **/
  /* svelte-fa */
  .svelte-fa {
    min-width: 16px;
  }

  /* daisyUI */
  .checkbox {
    border-width: 2px !important;
  }

  /* svelte-toast */
  :root {
    --toastContainerTop: auto;
    --toastContainerRight: 1rem;
    --toastContainerBottom: 1rem;
    --toastContainerLeft: auto;
  }

  /** custom styles **/
  a {
    @apply text-blue-600 visited:text-purple-600 hover:text-blue-800;
  }

  .action-links {
    margin-top: 1rem;
  }

  .action-links a {
    display: block;
    margin-top: 0.5rem;
    font-size: 1.2rem;
    text-align: center;
  }

  .flex-center {
    justify-content: center;
    align-items: center;
  }
</style>
