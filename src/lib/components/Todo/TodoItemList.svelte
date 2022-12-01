<script lang="ts">
  import { onMount } from "svelte";

  import { TodoItemCreate } from ".";
  import { tooltip } from "$helpers";
  import { todoItems } from "$stores";
  import type { TodoCategory, TodoItem } from "$types";

  let currentTodoCategory: TodoCategory | null = null;

  // lifecycle
  onMount(() => {
    if (localStorage.getItem("todoItems")) {
      $todoItems = JSON.parse(localStorage.getItem("todoItems") || "[]");
    }
  });

  function todoCategoryIsCurrent(todoItem: TodoItem) {
    if (todoItem.category === null) {
      if (currentTodoCategory === null) return true;
      else return false;
    } else {
      if (currentTodoCategory === null) return false;
      else if (todoItem.category === currentTodoCategory.id) return true;
    }

    return false;
  }
</script>

<TodoItemCreate />
<ul class="w-100 mt-6">
  {#each $todoItems.filter((todoItem) => todoCategoryIsCurrent(todoItem)) as todoItem (todoItem.id)}
    <li class="form-control hover:opacity-75">
      <label
        class="label cursor-pointer"
        use:tooltip={{ content: "Mark this item as completed", placement: "end" }}
      >
        <span
          class="label-text font-bold
                 {(!todoItem.completed && 'text-primary') || 'text-secondary line-through'}"
        >
          {todoItem.content}
        </span>
        <input type="checkbox" bind:checked={todoItem.completed} class="checkbox" />
      </label>
    </li>
  {:else}
    <li class="text-center">
      No {(currentTodoCategory?.name && `'${currentTodoCategory.name}'`) || "uncategorized"} items created...
    </li>
  {/each}
</ul>
