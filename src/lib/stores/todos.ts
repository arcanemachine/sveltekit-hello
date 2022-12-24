import type { Writable } from "svelte/store";
import { writable } from "svelte/store";

import type { Todo } from "$lib/openapi";

export const todoFormInputText: Writable<string> = writable("");
export const todoIdSelected: Writable<number> = writable(0);
export const todoDeleteModalVisible: Writable<boolean> = writable(false);

// todos
interface TodosStore extends Writable<Array<Todo>> {
  reset(this: void): void;
}

export const todos: TodosStore = (() => {
  const { subscribe, set, update } = writable([]);

  return {
    subscribe,
    set,
    update,
    reset: () => set([]),
  };
})();
