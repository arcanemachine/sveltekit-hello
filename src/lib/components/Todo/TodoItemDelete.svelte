<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { toast } from "@zerodevx/svelte-toast";

  import { todoItems, todoItemIdSelected } from "$stores";

  // props
  export let modalVisible: boolean = false;

  // functions
  function handleKeydown(evt: KeyboardEvent) {
    if (!modalVisible) return;

    if (evt.key === "Escape") {
      modalClose();
    } else if (evt.key === "Enter") {
      todoItemDelete();
    }
  }

  onMount(() => {
    document.body.addEventListener("keydown", handleKeydown);
  });

  onDestroy(() => {
    document.body.removeEventListener("keydown", handleKeydown);
  });

  function todoItemDelete() {
    $todoItems = $todoItems.filter((todoItem) => todoItem.id !== $todoItemIdSelected);

    $todoItemIdSelected = 0; // reset current item
    toast.push("Item deleted", { classes: ["bg-success"] }); // show successful toast message
    modalClose();
  }

  function modalClose() {
    modalVisible = false;
  }
</script>

<input type="checkbox" id="item-delete-modal" class="modal-toggle" bind:checked={modalVisible} />

{#if modalVisible}
  <div class="modal">
    <div class="modal-box relative max-w-xs">
      <label
        for="item-delete-modal"
        class="btn-secondary btn-sm btn-circle btn absolute right-3 top-3">✕</label
      >
      <h3 class="text-center text-lg font-bold">Delete This Item?</h3>
      <div class="flex-center mx-auto mt-6 flex">
        <button class="btn-secondary btn mx-2" on:click={modalClose}>No</button>
        <button class="btn-primary btn mx-2" on:click={todoItemDelete}>Yes</button>
      </div>
    </div>
  </div>
{/if}
