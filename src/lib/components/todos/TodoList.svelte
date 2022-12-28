<script lang="ts">
  import Fa from "svelte-fa/src/fa.svelte";
  import { faTrash } from "@fortawesome/free-solid-svg-icons";
  import { onMount } from "svelte";

  import { toastCreate, toastCreateOnError, tooltip } from "$helpers";
  import type { TodosPartialUpdateRequest } from "$lib/openapi";
  import {
    api,
    isLoading,
    todoDeleteModalVisible,
    todos,
    todoFormInputText,
    todoIdSelected,
  } from "$stores";

  $: todosApi = $api.apis.todos; // computed

  // lifecycle
  onMount(async () => {
    $isLoading = true;

    try {
      $todos = await todosApi.todosList(); // get todos from server
      $isLoading = false;
    } catch (err) {
      toastCreate("Could not fetch todos from the server.", "error"); // show error message
    }
  });

  // methods
  function todoHandleClick(todoId: number) {
    if ($todoIdSelected !== todoId) {
      // enable item update form
      $todoIdSelected = todoId;
      $todoFormInputText = $todos.filter((todo) => todo.id === todoId)[0].content;
    } else {
      // reset item form
      $todoIdSelected = 0;
      $todoFormInputText = "";
    }
  }

  async function todoUpdateIsCompleted(todoId: number) {
    const todo = $todos.filter((todo) => todo.id === todoId)[0];
    const todoIndex = $todos.indexOf(todo);

    const params: TodosPartialUpdateRequest = {
      id: todoId,
      patchedTodo: {
        isCompleted: !todo.isCompleted,
      },
    };

    todosApi
      .todosPartialUpdate(params, $api.overrides)
      .then((res: any) => {
        $todos[todoIndex] = res;
      })
      .catch((err: any) => {
        toastCreateOnError(err);
      });
  }
</script>

{#if !$isLoading}
  <ul class="w-100 mt-6 list-none pl-0">
    {#each $todos as todo (todo.id)}
      <li
        class="flex-center form-control flex cursor-pointer flex-row hover:opacity-75
               {todo.id === $todoIdSelected && 'rounded-75 rounded bg-base-200 text-info'}"
      >
        <div class="flex-start mr-2 grow" use:tooltip={"Modify todo"}>
          <button
            class="btn-link btn-sm btn w-full text-left normal-case no-underline
                   {(!todo.isCompleted && 'text-primary') || 'text-secondary line-through'}"
            on:click={() => todoHandleClick(todo.id)}
          >
            {todo.content}
          </button>
        </div>
        <div>
          {#if $todoIdSelected === todo.id}
            <button
              class="p-2"
              aria-label="Delete todo"
              on:click={() => {
                $todoDeleteModalVisible = true;
              }}
            >
              <label for="todo-delete-modal" use:tooltip={"Delete todo"}>
                <Fa
                  icon={faTrash}
                  style="width: 24px; height: 24px"
                  class="todo-delete-icon cursor-pointer py-[2px] text-red-500"
                />
              </label>
            </button>
          {:else}
            <label class="label" use:tooltip={"Mark completed"}>
              <input
                type="checkbox"
                bind:checked={todo.isCompleted}
                class="checkbox"
                on:click={() => {
                  todoUpdateIsCompleted(todo.id);
                }}
              />
            </label>
          {/if}
        </div>
      </li>
    {:else}
      <li class="text-center">No todos created...</li>
    {/each}
  </ul>
{/if}

<style>
  .todo-delete-icon {
    padding-right: 0.4rem;
  }
</style>
