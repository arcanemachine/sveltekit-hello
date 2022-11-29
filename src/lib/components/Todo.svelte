<script lang="ts">
  import { onMount } from "svelte";
  import { toast } from "@zerodevx/svelte-toast";

  export let category: string;

  type TodoItem = { id: number; text: string; category: string };

  // variables
  let itemText: string = "";
  let todos: Array<TodoItem> = [
    { id: 1, text: "Feed cat", category: "Misc" },
    { id: 2, text: "Work out", category: "Misc" },
    { id: 3, text: "Milk", category: "Shopping List" },
    { id: 4, text: "Eggs", category: "Shopping List" },
    { id: 5, text: "Make dinner", category: "Misc" },
    { id: 6, text: "Bacon", category: "Shopping List" },
  ];

  // computed
  $: disabled = !itemText;

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
    if (!itemText) return; // if text input field is blank, don't do anything

    // generate new item ID (return 1 or max + 1)
    const ids = todos.map((todo) => todo.id);
    const id = (!ids.length && 1) || ids.reduce((max = 0, num) => (num > max && num) || max) + 1;

    // add item to the list
    todos = [...todos, { id, text: itemText, category: category || "Misc" }];

    itemText = ""; // clear the input field
    toast.push("Item created"); // show successful toast message
  }
</script>

<section class="prose mb-6 text-center">
  <h1>
    {#if category}
      {category}
    {:else}
      All Items
    {/if}
  </h1>
</section>

<!-- text input -->
<div class="form-control">
  <div class="input-group">
    <input
      type="text"
      placeholder="To Do..."
      class="input-bordered input"
      bind:value={itemText}
      on:keypress={inputHandleKeypress}
    />
    <button class="btn-primary btn" {disabled} on:click={itemCreate}>Create</button>
  </div>
</div>

<!-- todo list -->
<section>
  <ul class="mt-10 text-center">
    {#each todos as todo, i (todo.id)}
      <li class="mt-4">{i + 1}: {todo.text}</li>
    {:else}
      <li>No items created...</li>
    {/each}
  </ul>
</section>
