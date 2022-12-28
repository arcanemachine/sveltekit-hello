<script>
  import { onMount } from "svelte";

  import { CsrfEnsure } from "$components/base";
  import { TodoDelete, TodoForm, TodoList } from "$components/todos";
  import { user } from "$stores";
  import { loginRequired } from "$helpers/user";

  onMount(() => {
    loginRequired();
  });
</script>

{#if $user.isLoggedIn}
  <CsrfEnsure />

  <section class="flex h-full flex-col">
    <h1 class="page-title">Your Todos</h1>

    <section class="mx-auto flex max-w-md flex-col justify-center">
      <TodoForm />
      <TodoList />
    </section>

    <!-- modals -->
    <TodoDelete />
  </section>
{/if}
