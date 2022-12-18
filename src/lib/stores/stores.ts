import type { Writable } from "svelte/store";
import { writable } from "svelte/store";

import type { Todo, TodosApi, UserDetails } from "$lib/openapi";

export const user: Writable<UserDetails> = writable({
  pk: 0,
  username: "",
  email: "",
});
export const todosApi: Writable<TodosApi> = writable();
export const todos: Writable<Array<Todo>> = writable([]);
export const todoIdSelected: Writable<number> = writable(0);
export const todoFormInputText: Writable<string> = writable("");
