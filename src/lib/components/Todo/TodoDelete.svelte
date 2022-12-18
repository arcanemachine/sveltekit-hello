<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { toast } from "@zerodevx/svelte-toast";

  import type { Todo, TodosDestroyRequest } from "$lib/api-client";
  import { todos, todoIdSelected, todosApi } from "$stores";

  // props
  export let modalVisible: boolean = false;

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
      id: $todoIdSelected,
    };
    $todosApi
      .todosDestroyRaw(params)
      .then((res) => {
        if (res.raw.ok && res.raw.status === 204) {
          // delete locally
          $todos = $todos.filter((todo: Todo) => todo.id !== $todoIdSelected);

          $todoIdSelected = 0; // reset current item
          toast.push("Todo deleted", { classes: ["bg-success"] }); // show successful toast message
          modalClose();
        } else {
          toast.push(`Error ${res.raw.status}: ${res.raw.statusText}`, { classes: ["bg-error"] });
        }
      })
      .catch((err) => {
        toast.push(`${err}`, { classes: ["bg-error"] });
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
      <h3 class="text-center text-lg font-bold">Delete This Todo?</h3>
      <div class="flex-center mx-auto mt-6 flex">
        <button class="btn-secondary btn mx-2" on:click={modalClose}>No</button>
        <button class="btn-primary btn mx-2" on:click={todoDelete}>Yes</button>
      </div>
    </div>
  </div>
{/if}
