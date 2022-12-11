<script lang="ts">
  import { toast } from "@zerodevx/svelte-toast";

  import { todoItems, todoItemIdSelected, todoFormInputText } from "$stores";
  import type { TodoItem } from "$types";

  // computed
  $: todoFormInputTextIsEmpty = !$todoFormInputText;

  // functions
  function inputHandleKeypress(evt: KeyboardEvent) {
    if (evt.key === "Enter") {
      if ($todoItemIdSelected) {
        itemUpdate();
      } else {
        itemCreate();
      }
    }
  }

  function itemCreate() {
    if (!$todoFormInputText) return; // if text input field is blank, don't do anything

    // generate new item ID (return 1 or max + 1)
    const ids = $todoItems.map((todoItem: TodoItem) => todoItem.id);
    const id =
      (!ids.length && 1) || ids.reduce((max = 0, num: number) => (num > max && num) || max) + 1;

    // add item to the list
    todoItems.update((todoItems) => [
      ...todoItems,
      {
        id,
        content: $todoFormInputText,
        isCompleted: false,
      },
    ]);

    $todoFormInputText = ""; // clear the input field
    toast.push("Item created", { classes: ["bg-success"] }); // show successful toast message
  }

  function itemUpdate() {
    const todo = $todoItems.filter((todoItem) => todoItem.id === $todoItemIdSelected)[0];
    todo.content = $todoFormInputText; // update item
    $todoItems = $todoItems; // force re-render

    $todoFormInputText = ""; // clear the input field
    $todoItemIdSelected = 0; // reset current item
    toast.push("Item updated", { classes: ["bg-success"] }); // show successful toast message
  }
</script>

<div class="form-control mt-2">
  <div class="input-group">
    <input
      type="text"
      placeholder="To Do..."
      class="input-bordered input focus:outline-0"
      bind:value={$todoFormInputText}
      on:keypress={inputHandleKeypress}
    />
    {#if !$todoItemIdSelected}
      <button class="btn-primary btn" disabled={todoFormInputTextIsEmpty} on:click={itemCreate}
        >Create</button
      >
    {:else}
      <button
        class="btn-primary btn-accent btn"
        disabled={todoFormInputTextIsEmpty}
        on:click={itemUpdate}>Update</button
      >
    {/if}
  </div>
</div>
