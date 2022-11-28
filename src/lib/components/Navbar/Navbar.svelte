<script type="ts">
  import { DarkModeToggle } from ".";
</script>

<!-- spacer -->
<div style="height: 1px;">&nbsp;</div>

<nav class="navbar border-b-2 transition-colors duration-300">
  <!-- drawer -->
  <div class="tooltip tooltip-bottom tooltip-right flex-none lg:hidden" data-tip="Show Categories">
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

  <!-- title -->
  <div class="flex-1">
    <a href="/" aria-current="page" aria-label="Homepage" class="flex-0 btn-ghost btn px-2">
      <div class="font-title inline-flex text-3xl normal-case text-primary">Todo List</div></a
    >
  </div>

  <div class="mr-1 flex-none">
    <!-- dark mode toggle -->
    <span class="pr-2">
      <DarkModeToggle />
    </span>

    <!-- action menu -->
    <div class="dropdown-end dropdown">
      <label tabindex="0" class="btn-ghost btn-square btn m-1">
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
      </label>
      <ul class="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow">
        <li><btn tabindex="0">Item 1</btn></li>
        <li><btn tabindex="0">Item 2</btn></li>
      </ul>
    </div>
  </div>
</nav>
