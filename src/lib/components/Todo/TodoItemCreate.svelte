<script lang="ts">
  import { toast } from "@zerodevx/svelte-toast";

  import { todoItems } from "$stores";
  import type { TodoCategory, TodoItem } from "$types";

  let currentTodoCategory: TodoCategory | null = null;
  let todoItemInputValue: string = "";

  // computed
  $: todoItemInputValueIsEmpty = !todoItemInputValue;

  // functions
  function inputHandleKeypress(evt: KeyboardEvent) {
    if (evt.key === "Enter") {
      itemCreate();
    }
  }

  function itemCreate() {
    if (!todoItemInputValue) return; // if text input field is blank, don't do anything

    // generate new item ID (return 1 or max + 1)
    const ids = $todoItems.map((todoItem: TodoItem) => todoItem.id);
    const id =
      (!ids.length && 1) || ids.reduce((max = 0, num: number) => (num > max && num) || max) + 1;

    // add item to the list
    todoItems.update((todoItems) => [
      ...todoItems,
      {
        id,
        content: todoItemInputValue,
        category: (currentTodoCategory && currentTodoCategory.id) || null,
        completed: false,
      },
    ]);

    todoItemInputValue = ""; // clear the input field
    toast.push("Item created", { classes: ["bg-success"] }); // show successful toast message
  }
</script>

<div class="form-control mt-2">
  <div class="input-group">
    <input
      type="text"
      placeholder="To Do..."
      class="input-bordered input focus:outline-0"
      bind:value={todoItemInputValue}
      on:keypress={inputHandleKeypress}
    />
    <button class="btn-primary btn" disabled={todoItemInputValueIsEmpty} on:click={itemCreate}
      >Create</button
    >
  </div>
</div>
