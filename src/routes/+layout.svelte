<script type="ts">
  import "/src/css/app.css";
  import { Navbar, NavbarDrawer } from "$components/base/navbar";
  import { Toast } from "$components/base";
  import { user } from "$stores";
</script>

<div class="drawer-mobile drawer">
  <input id="navbar-drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content flex flex-col items-center justify-center">
    {#if !$user.prefs.bottomNavbarEnabled}
      <Navbar />
    {/if}
    <main class="prose mt-6 h-full">
      <slot />
    </main>
    {#if $user.prefs.bottomNavbarEnabled}
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

  /** tags **/
  a {
    @apply text-blue-600 hover:text-blue-800;
  }

  /** components **/
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

  .modal-button-close {
    @apply btn-secondary btn-sm btn absolute right-0 top-0 rounded-tr-none rounded-br-none rounded-tl-none;
  }

  .page-title {
    text-align: center;
  }
</style>
