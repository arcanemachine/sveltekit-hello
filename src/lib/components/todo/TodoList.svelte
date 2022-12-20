<script lang="ts">
  import Fa from "svelte-fa/src/fa.svelte";
  import { faX } from "@fortawesome/free-solid-svg-icons";
  import { onMount } from "svelte";
  import { toast } from "@zerodevx/svelte-toast";

  import { TodoDelete, TodoForm } from "$components/todo";
  import { toastCreate, tooltip } from "$helpers";
  import type { TodosPartialUpdateRequest } from "$lib/openapi";
  import { Configuration, TodosApi } from "$lib/openapi";
  import { apiHost, todos, todoFormInputText, todoIdSelected, todosApi } from "$stores";

  let todoDeleteModalVisible = false;

  // lifecycle
  onMount(async () => {
    $todosApi = new TodosApi(
      new Configuration({
        basePath: $apiHost,
      })
    );

    try {
      $todos = await $todosApi.todosList();
    } catch {
      toastCreate("Could not fetch todos from server.", "error");
    }
  });

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

  function todoUpdateIsCompleted(todoId: number) {
    const todo = $todos.filter((todo) => todo.id === todoId)[0];
    const todoIndex = $todos.indexOf(todo);

    const params: TodosPartialUpdateRequest = {
      id: todoId,
      patchedTodo: {
        isCompleted: !todo.isCompleted,
      },
    };
    $todosApi
      .todosPartialUpdate(params)
      .then((res) => {
        $todos[todoIndex] = res;
      })
      .catch((err) => {
        toast.push(`${err}`, { classes: ["bg-error"] });
      });
  }
</script>

<TodoForm />
<ul class="w-100 mt-6">
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
          <label class="label">
            <span aria-label="Light Mode Icon">
              <label for="todo-delete-modal" use:tooltip={"Delete todo"} tabindex="0">
                <Fa
                  icon={faX}
                  style="width: 24px; height: 24px"
                  class="todo-delete-icon cursor-pointer py-[2px] text-red-500"
                />
              </label>
            </span>
          </label>
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

<!-- modals -->
<TodoDelete modalVisible={todoDeleteModalVisible} />

<style>
  .todo-delete-icon {
    padding-right: 0.4rem;
  }
</style>
