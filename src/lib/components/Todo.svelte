<script lang="ts">
  let itemText: string = "";

  type TodoItem = { id: number; text: string };
  let todos: Array<TodoItem> = [];

  function inputHandleKeypress(evt: KeyboardEvent) {
    if (evt.key === "Enter") {
      itemCreate();
    }
  }

  function itemCreate() {
    // generate new item ID (return 1 or max + 1)
    const ids = todos.map((todo) => todo.id);
    const id = (!ids.length && 1) || ids.reduce((max = 0, num) => (num > max && num) || max) + 1;

    todos = [...todos, { id, text: itemText }]; // add item to the list

    itemText = ""; // clear the input field
  }
</script>

<!-- input -->
<div class="form-control">
  <div class="input-group">
    <input
      type="text"
      placeholder="To Do..."
      class="input-bordered input"
      bind:value={itemText}
      on:keypress={inputHandleKeypress}
    />
    <button class="btn-primary btn" on:click={itemCreate}>Create</button>
  </div>
</div>

<!-- todo list -->
<section>
  <ul class="mt-10 text-center">
    {#each todos as todo, index (todo.id)}
      <li>{index + 1}: {todo.text}</li>
    {:else}
      <li>No items created...</li>
    {/each}
  </ul>
</section>
