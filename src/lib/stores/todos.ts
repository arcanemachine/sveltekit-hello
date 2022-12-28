import { type Writable, writable } from "svelte/store";

import type { Todo } from "$lib/openapi";
import type { TodosStore } from "$types";

export const todoFormInputText: Writable<string> = writable("");
export const todoIdSelected: Writable<number> = writable(0);
export const todoDeleteModalVisible: Writable<boolean> = writable(false);

export const todos: TodosStore = (() => {
  const { subscribe, set, update } = writable([] as Array<Todo>);

  return {
    subscribe,
    set,
    update,
    reset: () => set([] as Array<Todo>),
  };
})();
