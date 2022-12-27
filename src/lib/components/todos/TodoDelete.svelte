<script lang="ts">
  import { toastCreate, toastCreateOnError } from "$helpers";
  import type { Todo, TodosDestroyRequest } from "$lib/openapi";
  import {
    apiStore,
    todos,
    todoDeleteModalVisible,
    todoFormInputText,
    todoIdSelected,
  } from "$stores";

  let modalEl: HTMLElement;
  let firstFocusableEl: HTMLElement;
  $: todosApi = $apiStore.apis.todos; // computed

  // methods
  function focusTrap(evt: KeyboardEvent, isActiveCallback?: Function) {
    if (!isActiveCallback || !isActiveCallback()) return; // halt if the callback returns false
    if (!modalEl.contains(evt.target as Node)) {
      // if the modal is not focused, focus it on the first Tab keydown event
      firstFocusableEl.focus();
      return;
    }

    const focusableSelectors = [
      "a[href]" + ":not([disabled])",
      "button" + ":not([disabled])",
      "textarea" + ":not([disabled])",
      'input[type="text"]' + ":not([disabled])",
      'input[type="radio"]' + ":not([disabled])",
      'input[type="checkbox"]' + ":not([disabled])",
      "select" + ":not([disabled])",
    ];
    const focusableEls = modalEl.querySelectorAll(focusableSelectors.join(", "));
    const lastFocusableEl = focusableEls[focusableEls.length - 1] as HTMLElement;

    if (evt.key === "Tab") {
      if (!evt.shiftKey) {
        if (document.activeElement === lastFocusableEl) {
          evt.preventDefault();
          firstFocusableEl.focus();
        }
      } else {
        if (document.activeElement === firstFocusableEl) {
          evt.preventDefault();
          lastFocusableEl.focus();
        }
      }
    }
  }

  function handleClickOutside(evt: MouseEvent) {
    /** Click outside the modal to close it. */
    if (modalEl == evt.target) modalClose();
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

<svelte:window
  on:keydown={handleKeydown}
  on:keydown={(evt) => focusTrap(evt, () => $todoDeleteModalVisible)}
/>

<div
  class="modal"
  bind:this={modalEl}
  class:modal-open={$todoDeleteModalVisible}
  on:click={handleClickOutside}
  on:keydown={() => {}}
>
  <div class="modal-box relative max-w-xs rounded-tr-none">
    <button class="modal-button-close btn-square" on:click={modalClose} bind:this={firstFocusableEl}
      >✕</button
    >

    <h2 class="mt-2 text-center font-bold">Delete this todo?</h2>

    <div class="form-control mt-6 w-full max-w-xs">
      <button class="btn-error btn" on:click={todoDelete}>Yes</button>
    </div>

    <div class="form-control mt-4 w-full max-w-xs">
      <button class="btn-secondary btn" on:click={modalClose}>No</button>
    </div>
  </div>
</div>
