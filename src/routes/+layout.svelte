<script type="ts">
  import "../app.css";
  import DarkModeToggle from "$lib/components/NavBar/DarkModeToggle.svelte";
</script>

<main class="flex-center flex h-screen">
  <header>
    <DarkModeToggle />
  </header>

  <slot />
</main>
