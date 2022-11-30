<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import type { TodoCategory } from "$types";
  import { toastCreate } from "$helpers";

  export let categories: Array<TodoCategory>;
  let modalActive: boolean = false;

  let textInputValue: string = "";

  function handleKeyEscape(evt: KeyboardEvent) {
    if (!modalActive) return;

    if (evt.key === "Escape") {
      modalClose();
    }
  }

  onMount(() => {
    document.body.addEventListener("keydown", handleKeyEscape);
  });

  onDestroy(() => {
    document.body.removeEventListener("keydown", handleKeyEscape);
  });

  function inputHandleKeypress(evt: KeyboardEvent) {
    if (evt.key === "Enter") {
      categoryCreate();
    }
  }

  function categoryCreate() {
    if (!textInputValue) {
      // if input field is empty, show warning toast and abort
      toastCreate("Category name cannot be blank!", "error");
      return;
    }

    // generate new item ID (return 1 or max + 1)
    const ids = categories.map((category) => category.id);
    const id = (!ids.length && 1) || ids.reduce((max = 0, num) => (num > max && num) || max) + 1;

    const category = {
      id,
      name: textInputValue,
    } as TodoCategory;

    // add item to the list
    categories = [...categories, category];

    textInputValue = ""; // clear the input field
    toastCreate(`Category created: '${category.name}'`, "success");
    modalClose();
  }

  function modalClose() {
    modalActive = false;
  }
</script>

<input type="checkbox" id="category-create-modal" class="modal-toggle" bind:checked={modalActive} />
<div class="modal">
  <div class="modal-box relative">
    <label
      for="category-create-modal"
      class="btn-secondary btn-sm btn-circle btn absolute right-3 top-3">✕</label
    >
    <h3 class="text-center text-lg font-bold">Create new category</h3>
    <div class="form-control mx-auto mt-4 max-w-xs">
      <input
        type="text"
        placeholder="Category name"
        class="input-bordered input focus:outline-0"
        bind:value={textInputValue}
        on:keypress={inputHandleKeypress}
      />
    </div>
    <div class="flex-center mx-auto mt-6 flex w-full">
      <button class="btn-secondary btn mx-2" on:click={modalClose}>Cancel</button>
      <button class="btn-primary btn mx-2" on:click={categoryCreate}>Create</button>
    </div>
  </div>
</div>
