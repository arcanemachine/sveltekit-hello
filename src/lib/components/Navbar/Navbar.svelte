<script type="ts">
  import { DarkModeToggle } from ".";
</script>

<!-- spacer -->
<div style="height: 1px;">&nbsp;</div>

<nav class="navbar border-b-2 transition-colors duration-300">
  <div class="flex-none lg:hidden">
    <input id="navbar-drawer" type="checkbox" class="drawer-toggle" />
    <label for="navbar-drawer" class="btn-ghost btn-square btn">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="inline-block h-6 w-6 stroke-current"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        /></svg
      >
    </label>
  </div>
  <div class="flex-1">
    <span class="lg:hidden">
      <a href="/" aria-current="page" aria-label="Homepage" class="flex-0 btn-ghost btn px-2">
        <div
          class="font-title inline-flex normal-case text-primary transition-all duration-200 sm:text-3xl"
        >
          Todo List
        </div></a
      >
    </span>
  </div>
  <div class="mr-1 flex-none">
    <span class="pr-2">
      <DarkModeToggle />
    </span>
    <button class="btn-ghost btn-square btn">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="inline-block h-5 w-5 stroke-current"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
        /></svg
      >
    </button>
  </div>
</nav>
