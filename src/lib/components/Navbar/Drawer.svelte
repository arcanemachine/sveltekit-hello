<script lang="ts">
  function handleClick(this: HTMLElement) {
    /* hide the drawer */
    const navbarDrawerToggleEl: HTMLInputElement | null =
      document.querySelector("input,.navbar-drawer");

    if (navbarDrawerToggleEl) {
      navbarDrawerToggleEl.checked = false;
    }
  }
</script>

<div class="drawer-side">
  <label for="navbar-drawer" class="drawer-overlay" />
  <ul class="menu w-80 bg-base-100 p-4 text-base-content lg:hidden">
    <li class="mb-4 text-3xl">Categories</li>
    <li><a href="/categories/misc/" on:click={handleClick}>Misc</a></li>
    <li><a href="/categories/shopping-list/" on:click={handleClick}>Shopping List</a></li>
  </ul>
</div>
