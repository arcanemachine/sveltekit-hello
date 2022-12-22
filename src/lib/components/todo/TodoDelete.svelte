<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  import { toastCreate, toastCreateOnError } from "$helpers";
  import type { Todo, TodosDestroyRequest } from "$lib/openapi";
  import { apiStore, todos } from "$stores";

  // props
  export let modalVisible: boolean;
  export let todoFormInputText: string;
  export let todoIdSelected: number;

  $: todosApi = $apiStore.apis.todos; // computed

  // functions
  function handleKeydown(evt: KeyboardEvent) {
    if (!modalVisible) return;

    if (evt.key === "Escape") {
      modalClose();
    } else if (evt.key === "Enter") {
      todoDelete();
    }
  }

  onMount(() => {
    document.body.addEventListener("keydown", handleKeydown);
  });

  onDestroy(() => {
    document.body.removeEventListener("keydown", handleKeydown);
  });

  function todoDelete() {
    const params: TodosDestroyRequest = {
      id: todoIdSelected,
    };

    todosApi
      .todosDestroyRaw(params, $apiStore.overrides)
      .then((res) => {
        if (res.raw.ok && res.raw.status === 204) {
          // delete locally
          $todos = $todos.filter((todo: Todo) => todo.id !== todoIdSelected);

          todoFormInputText = ""; // reset form input text
          todoIdSelected = 0; // reset selected item
          toastCreate("Todo deleted successfully", "success"); // success message
          modalClose();
        } else {
          toastCreate(`Error ${res.raw.status}: ${res.raw.statusText}`, "error"); // error message
        }
      })
      .catch((err) => {
        toastCreateOnError(err);
      });
  }

  function modalClose() {
    modalVisible = false;
  }
</script>

<input type="checkbox" id="todo-delete-modal" class="modal-toggle" bind:checked={modalVisible} />

{#if modalVisible}
  <div class="modal">
    <div class="modal-box relative max-w-xs">
      <label
        for="todo-delete-modal"
        class="btn-secondary btn-sm btn-circle btn absolute right-3 top-3">✕</label
      >
      <h3 class="text-center text-lg font-bold">Delete this Todo?</h3>
      <div class="flex-center mx-auto mt-6 flex">
        <button class="btn-secondary btn mx-2" on:click={modalClose}>No</button>
        <button class="btn-primary btn mx-2" on:click={todoDelete}>Yes</button>
      </div>
    </div>
  </div>
{/if}
