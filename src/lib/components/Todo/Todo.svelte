<script lang="ts">
  import { onMount } from "svelte";
  import { toast } from "@zerodevx/svelte-toast";

  import Fa from "svelte-fa/src/fa.svelte";
  import { faPlus } from "@fortawesome/free-solid-svg-icons";

  import { tooltip } from "$lib/helpers";
  import type { TodoCategory, TodoItem } from "$types";
  import CategoryCreate from "$components/Todo/CategoryCreate.svelte";

  // variables
  // let categories: Array<TodoCategory> = [];
  let categories: Array<TodoCategory> = [
    { id: 1, name: "Misc" },
    { id: 2, name: "Shopping List" },
  ];
  let todos: Array<TodoItem> = [
    { id: 1, content: "Feed cat", category: 1, completed: true },
    { id: 2, content: "Milk", category: 2, completed: true },
    { id: 3, content: "Work out", category: null, completed: false },
    { id: 4, content: "Eggs", category: null, completed: false },
    { id: 5, content: "Make dinner", category: null, completed: false },
    { id: 6, content: "Bacon", category: null, completed: false },
  ];

  // // @ts-ignore
  // window.initializeCategories = () => {
  //   localStorage.removeItem("categories");
  //   localStorage.removeItem("todos");
  // };

  let currentCategory: TodoCategory | null = null;
  let todoInputValue: string = "";

  // computed
  $: todoInputValueIsEmpty = !todoInputValue;

  // lifecycle
  onMount(() => {
    if (localStorage.getItem("todos")) {
      todos = JSON.parse(localStorage.getItem("todos") || "[]");
    }
  });

  // functions
  function inputHandleKeypress(evt: KeyboardEvent) {
    if (evt.key === "Enter") {
      itemCreate();
    }
  }

  function itemCreate() {
    if (!todoInputValue) return; // if text input field is blank, don't do anything

    // generate new item ID (return 1 or max + 1)
    const ids = todos.map((todo) => todo.id);
    const id = (!ids.length && 1) || ids.reduce((max = 0, num) => (num > max && num) || max) + 1;

    // add item to the list
    todos = [
      ...todos,
      {
        id,
        content: todoInputValue,
        category: (currentCategory && currentCategory.id) || null,
        completed: false,
      },
    ];

    todoInputValue = ""; // clear the input field
    toast.push("Item created", { classes: ["bg-success"] }); // show successful toast message
  }

  function todoCategoryIsCurrent(todo: TodoItem) {
    if (todo.category === null) {
      if (currentCategory === null) return true;
      else return false;
    } else {
      if (currentCategory === null) return false;
      else if (todo.category === currentCategory.id) return true;
    }

    return false;
  }
</script>

<section>
  <div class="flex w-full items-center justify-between">
    <!-- category list -->
    <select
      bind:value={currentCategory}
      tabindex="0"
      class="flex-grow-1 select-ghost select text-center text-xl focus:outline-0"
    >
      <option value={null} selected>Uncategorized Items</option>
      {#each categories as category}
        <option value={category}>{category.name}</option>
      {:else}
        <option disabled>No categories created</option>
      {/each}
    </select>

    <!-- category create button -->
    <label
      for="category-create-modal"
      class="btn-primary btn-sm btn-circle btn"
      use:tooltip={"Create new category"}
      tabindex="0"
    >
      <Fa icon={faPlus} />
    </label>
  </div>

  <!-- todo create form -->
  <div class="form-control mt-2">
    <div class="input-group">
      <input
        type="text"
        placeholder="To Do..."
        class="input-bordered input focus:outline-0"
        bind:value={todoInputValue}
        on:keypress={inputHandleKeypress}
      />
      <button class="btn-primary btn" disabled={todoInputValueIsEmpty} on:click={itemCreate}
        >Create</button
      >
    </div>
  </div>

  <!-- todo list -->
  <ul class="w-100 mt-6">
    {#each todos.filter((todo) => todoCategoryIsCurrent(todo)) as todo (todo.id)}
      <li class="form-control hover:opacity-50">
        <label
          class="label cursor-pointer"
          use:tooltip={{ content: "Mark this item as completed", placement: "end" }}
        >
          <span
            class="label-text font-bold
                   {(!todo.completed && 'text-primary') || 'text-secondary line-through'}"
          >
            {todo.content}
          </span>
          <input type="checkbox" bind:checked={todo.completed} class="checkbox" />
        </label>
      </li>
    {:else}
      <li class="text-center">
        No {(currentCategory?.name && `'${currentCategory.name}'`) || "uncategorized"} items created...
      </li>
    {/each}
  </ul>
</section>

<!-- modals -->
<CategoryCreate {categories} />

<section class="flex-center prose mt-20 flex flex-col">
  <h3>Debug Info</h3>
  <div>Current Category: {currentCategory?.name || "N/A"}</div>
</section>
