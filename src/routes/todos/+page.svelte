<script>
  import { CsrfEnsure } from "$components/base";
  import { TodoDelete, TodoForm, TodoList } from "$components/todos";
  import { user } from "$stores";
  import { todoDeleteModalVisible } from "$stores/todos";
</script>

<section class="flex h-full flex-col">
  <h1 class="page-title">Your Todos</h1>
  {#if !$user.username}
    <section class="flex-center prose flex h-full flex-col">
      <h4>You must login or register before you can create any todos.</h4>
      <div class="action-links">
        <a href="/user/login">Login</a>
        <a href="/user/register">Register</a>
      </div>
    </section>
  {:else}
    <CsrfEnsure />
    <TodoForm />
    <TodoList />

    <!-- modals -->
    <TodoDelete modalVisible={$todoDeleteModalVisible} />
  {/if}
</section>
