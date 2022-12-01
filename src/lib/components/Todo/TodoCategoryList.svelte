<script lang="ts">
  import { TodoCategoryCreate } from ".";
  import { todoCategories } from "$stores";
  import type { TodoCategory } from "$types";

  let currentTodoCategory: TodoCategory | null = null;
</script>

<div class="flex w-full items-center justify-between">
  <select
    bind:value={currentTodoCategory}
    tabindex="0"
    class="flex-grow-1 select-ghost select text-center text-xl focus:outline-0"
  >
    <option value={null} selected>Uncategorized Items</option>
    {#each $todoCategories as todoCategory}
      <option value={todoCategory}>{todoCategory.name}</option>
    {:else}
      <option disabled>No categories created</option>
    {/each}
  </select>

  <TodoCategoryCreate label={true} />
</div>
