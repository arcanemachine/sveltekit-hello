<script lang="ts">
  import { TodoCategoryCreate, TodoCategoryList, TodoItemList } from ".";
  import { todoCategories } from "$stores";
  import type { TodoCategory } from "$types";

  let currentTodoCategory: TodoCategory | null = null;
</script>

<section>
  <TodoCategoryList />
  <TodoItemList />
</section>

<!-- modals -->
<TodoCategoryCreate modal={true} />

<section class="flex-center prose mt-20 flex flex-col">
  <h3>Debug Info</h3>
  <div>Categories: {$todoCategories.map((category) => category.name).join(", ")}</div>
  <div>Current Category: {currentTodoCategory?.name || "N/A"}</div>
</section>
