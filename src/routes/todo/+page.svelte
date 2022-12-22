<script>
  import { TodoList } from "$components/todo";
  import { user } from "$stores";
</script>

{#if !$user.username}
  <section class="flex-center prose flex h-full flex-col">
    <h4>You must login or register before you can create any todos.</h4>
    <div class="action-links">
      <a href="/user/login">Login</a>
      <a href="/user/register">Register</a>
    </div>
  </section>
{:else}
  <TodoList />
{/if}
