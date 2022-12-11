<script lang="ts">
  import { toast } from "@zerodevx/svelte-toast";

  import type { TodosCreateRequest } from "$lib/api-client";
  import { todoItems, todoItemIdSelected, todoFormInputText, todosApi } from "$stores";

  // computed
  $: todoFormInputTextIsEmpty = !$todoFormInputText;

  // functions
  function inputHandleKeypress(evt: KeyboardEvent) {
    if (evt.key === "Enter") {
      if ($todoItemIdSelected) {
        itemUpdateContent();
      } else {
        itemCreate();
      }
    }
  }

  async function itemCreate() {
    if (!$todoFormInputText) return; // if text input field is blank, don't do anything

    const params: TodosCreateRequest = {
      todo: {
        id: 0,
        content: $todoFormInputText,
        isCompleted: false,
      },
    };

    const todo = await $todosApi.todosCreate(params);

    // add item to the list
    $todoItems = [...$todoItems, todo];

    $todoFormInputText = ""; // clear the input field
    toast.push("Item created", { classes: ["bg-success"] }); // show successful toast message
  }

  function itemUpdateContent() {
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
        on:click={itemUpdateContent}>Update</button
      >
    {/if}
  </div>
</div>
