<script lang="ts">
  import { onMount } from "svelte";

  import Fa from "svelte-fa/src/fa.svelte";
  import { faX } from "@fortawesome/free-solid-svg-icons";

  import { TodoItemDelete, TodoItemForm } from ".";
  import { tooltip } from "$helpers";
  import { todoItems, todoFormInputText, todoItemIdSelected } from "$stores";

  let todoItemDeleteModalVisible = false;

  // lifecycle
  onMount(() => {
    if (localStorage.getItem("todoItems")) {
      $todoItems = JSON.parse(localStorage.getItem("todoItems") || "[]");
    }
  });

  function todoItemHandleClick(todoItemId: number) {
    if ($todoItemIdSelected !== todoItemId) {
      // enable item update form
      $todoItemIdSelected = todoItemId;
      $todoFormInputText = $todoItems.filter((todoItem) => todoItem.id === todoItemId)[0].content;
    } else {
      // reset item update form
      $todoItemIdSelected = 0;
      $todoFormInputText = "";
    }
  }
</script>

<TodoItemForm />
<ul class="w-100 mt-6">
  {#each $todoItems as todoItem (todoItem.id)}
    <li
      class="flex-center form-control flex cursor-pointer flex-row hover:opacity-75
             {todoItem.id === $todoItemIdSelected && 'rounded-75 rounded bg-base-200 text-info'}"
    >
      <div class="flex-start mr-2 grow" use:tooltip={"Modify item"}>
        <button
          class="btn-link btn-sm btn w-full text-left normal-case no-underline
                 {(!todoItem.isCompleted && 'text-primary') || 'text-secondary line-through'}"
          on:click={() => todoItemHandleClick(todoItem.id)}
        >
          {todoItem.content}
        </button>
      </div>
      <div>
        {#if $todoItemIdSelected === todoItem.id}
          <label class="label">
            <span aria-label="Light Mode Icon">
              <label for="item-delete-modal" use:tooltip={"Delete item"} tabindex="0">
                <Fa
                  icon={faX}
                  style="width: 24px; height: 24px"
                  class="item-delete-icon cursor-pointer py-[2px] text-red-500"
                />
              </label>
            </span>
          </label>
        {:else}
          <label class="label" use:tooltip={"Mark completed"}>
            <input type="checkbox" bind:checked={todoItem.isCompleted} class="checkbox" />
          </label>
        {/if}
      </div>
    </li>
  {:else}
    <li class="text-center">No items created...</li>
  {/each}
</ul>

<!-- modals -->
<TodoItemDelete modalVisible={todoItemDeleteModalVisible} />

<style>
  .item-delete-icon {
    padding-right: 0.4rem;
  }
</style>
