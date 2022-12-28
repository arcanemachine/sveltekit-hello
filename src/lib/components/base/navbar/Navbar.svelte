<script type="ts">
  import Fa from "svelte-fa/src/fa.svelte";
  import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

  import { DarkModeToggle } from ".";
  import { isLoading, user } from "$stores";
</script>

<div style="height: 1px;" data-name="spacer">&nbsp;</div>

<nav class="navbar border-y-2 transition-colors duration-300">
  <!-- drawer
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
   -->

  <!-- title -->
  <div class="flex-1">
    <a
      href={!$user.isLoggedIn ? "/" : "/todos"}
      aria-current="page"
      aria-label="Homepage"
      class="flex-0 btn-ghost btn px-2"
    >
      <div class="font-title inline-flex text-2xl normal-case text-primary">Todo List</div></a
    >
  </div>

  <div class="mr-1 flex-none">
    <!-- loading spinner -->
    <span class="pr-2"
      ><button
        class="loading btn-ghost btn transition-opacity duration-500 {!$isLoading && 'opacity-0'}"
      /></span
    >

    <!-- dark mode toggle -->
    <span class="pr-2">
      <DarkModeToggle />
    </span>

    <!-- action menu -->
    <div class="dropdown-end dropdown {$user.prefs.bottomNavbarEnabled && 'dropdown-top'}">
      <label tabindex="0" class="btn-ghost btn-square btn m-1">
        <Fa icon={faCircleUser} size="lg" />
      </label>
      <ul class="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow">
        {#if !$user.isLoggedIn}
          <li><a href="/user/login">Login</a></li>
          <li><a href="/user/register">Register</a></li>
        {:else}
          <li><a href="/user">Your profile</a></li>
          <li><a href="/user/logout">Logout</a></li>
        {/if}
      </ul>
    </div>
  </div>
</nav>
