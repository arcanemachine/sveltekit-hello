<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  import { focusTrap, toastCreate, toastCreateOnError } from "$helpers";
  import type { Todo, TodosDestroyRequest } from "$lib/openapi";
  import {
    apiStore,
    todos,
    todoDeleteModalVisible,
    todoFormInputText,
    todoIdSelected,
  } from "$stores";

  let modalEl: HTMLElement;
  $: todosApi = $apiStore.apis.todos; // computed

  // lifecycle
  onMount(() => {
    document.body.addEventListener("keydown", handleKeydown);
    focusTrap(modalEl, { isActiveCallback: () => $todoDeleteModalVisible });
  });

  onDestroy(() => {
    document.body.removeEventListener("keydown", handleKeydown);
    focusTrap(modalEl, { remove: true });
  });

  // methods
  function handleClickOutside(evt: MouseEvent) {
    /** Click outside the modal to close it. */
    if (modalEl == evt.target || modalEl.contains(evt.target as Node)) return;
    else $todoDeleteModalVisible = false;
  }

  function handleKeydown(evt: KeyboardEvent) {
    if (!$todoDeleteModalVisible) return;

    if (evt.key === "Escape") {
      modalClose();
    }
  }

  function todoDelete() {
    const params: TodosDestroyRequest = {
      id: $todoIdSelected,
    };

    todosApi
      .todosDestroyRaw(params, $apiStore.overrides)
      .then((res) => {
        if (res.raw.ok && res.raw.status === 204) {
          // delete locally
          $todos = $todos.filter((todo: Todo) => todo.id !== $todoIdSelected);

          $todoFormInputText = ""; // reset form input text
          $todoIdSelected = 0; // reset selected item
          toastCreate("Todo deleted successfully", "success"); // success message
          modalClose();
        } else {
          // show error message
          toastCreate(`Error ${res.raw.status}: ${res.raw.statusText}`, "error");
        }
      })
      .catch((err) => {
        toastCreateOnError(err);
      });
  }

  function modalClose() {
    $todoDeleteModalVisible = false;
  }
</script>

<div
  class="modal"
  bind:this={modalEl}
  on:click={handleClickOutside}
  on:keydown={() => {
    /* work around unnecessary a11y linter warning */
  }}
  class:modal-open={$todoDeleteModalVisible}
>
  <div class="modal-box relative max-w-xs rounded-tr-none">
    <button class="modal-button-close btn-square" on:click={modalClose}>✕</button>

    <h2 class="mt-2 text-center font-bold">Delete this todo?</h2>

    <div class="form-control mt-6 w-full max-w-xs">
      <button class="btn-error btn" on:click={todoDelete}>Yes</button>
    </div>

    <div class="form-control mt-4 w-full max-w-xs">
      <button class="btn-secondary btn" on:click={modalClose}>No</button>
    </div>
  </div>
</div>
