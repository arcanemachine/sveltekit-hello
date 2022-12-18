<script>
  import TodoList from "$components/Todo/TodoList.svelte";
  import { user } from "$stores";

  console.log($user);
</script>

<section>
  <!-- @ts-ignore -->
  {#if $user.pk !== null}
    <TodoList />
  {:else}
    <section class="h-full">You must login or register before you can create any todos.</section>
  {/if}
</section>
