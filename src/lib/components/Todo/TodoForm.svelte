<script lang="ts">
  import { toast } from "@zerodevx/svelte-toast";

  import type { TodosCreateRequest, TodosPartialUpdateRequest } from "$lib/api-client";
  import { todos, todoIdSelected, todoFormInputText, todosApi } from "$stores";

  // computed
  $: todoFormInputTextIsEmpty = !$todoFormInputText;

  // functions
  function inputHandleKeypress(evt: KeyboardEvent) {
    if (evt.key === "Enter") {
      if ($todoIdSelected) {
        todoUpdateContent();
      } else {
        todoCreate();
      }
    }
  }

  async function todoCreate() {
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
    $todos = [...$todos, todo];

    $todoFormInputText = ""; // clear the input field
    toast.push("Todo created", { classes: ["bg-success"] }); // show successful toast message
  }

  async function todoUpdateContent() {
    const params: TodosPartialUpdateRequest = {
      id: $todoIdSelected,
      patchedTodo: {
        content: $todoFormInputText,
      },
    };

    await $todosApi.todosPartialUpdate(params);

    const todoIndex = $todos.indexOf($todos.filter((todo) => todo.id === $todoIdSelected)[0]);
    $todos[todoIndex].content = $todoFormInputText; // update item
    $todos = $todos; // force re-render

    $todoFormInputText = ""; // clear the input field
    $todoIdSelected = 0; // reset current item
    toast.push("Todo updated", { classes: ["bg-success"] }); // show successful toast message
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
    {#if !$todoIdSelected}
      <button class="btn-primary btn" disabled={todoFormInputTextIsEmpty} on:click={todoCreate}
        >Create</button
      >
    {:else}
      <button
        class="btn-primary btn-accent btn"
        disabled={todoFormInputTextIsEmpty}
        on:click={todoUpdateContent}>Update</button
      >
    {/if}
  </div>
</div>
