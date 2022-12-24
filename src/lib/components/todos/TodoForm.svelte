<script lang="ts">
  import { toastCreate } from "$helpers";
  import type { TodosCreateRequest, TodosPartialUpdateRequest } from "$lib/openapi";
  import { apiStore, todos, todoFormInputText, todoIdSelected } from "$stores";

  $: todosApi = $apiStore.apis.todos; // computed

  // methods
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

    const todo = await $apiStore.apis.todos.todosCreate(params, $apiStore.overrides);

    // add item to the list
    $todos = [...$todos, todo];

    $todoFormInputText = ""; // clear the input field
    toastCreate("Todo created successfully", "success"); // show successful toast message
  }

  async function todoUpdateContent() {
    const params: TodosPartialUpdateRequest = {
      id: $todoIdSelected,
      patchedTodo: {
        content: $todoFormInputText,
      },
    };

    await todosApi.todosPartialUpdate(params, $apiStore.overrides);

    const todoIndex = $todos.indexOf($todos.filter((todo) => todo.id === $todoIdSelected)[0]);
    $todos[todoIndex].content = $todoFormInputText; // update item
    $todos = $todos; // force re-render

    $todoFormInputText = ""; // clear the input field
    $todoIdSelected = 0; // reset current item
    toastCreate("Todo updated successfully", "success"); // show successful toast message
  }
</script>

<div class="mx-auto">
  <div class="input-group">
    <input
      type="text"
      placeholder="To Do..."
      class="input-bordered input focus:outline-0"
      bind:value={$todoFormInputText}
      on:keypress={inputHandleKeypress}
    />
    {#if !$todoIdSelected}
      <button class="btn-primary btn" disabled={!$todoFormInputText} on:click={todoCreate}
        >Create</button
      >
    {:else}
      <button
        class="btn-primary btn-accent btn"
        disabled={!$todoFormInputText}
        on:click={todoUpdateContent}>Update</button
      >
    {/if}
  </div>
</div>
