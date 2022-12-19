import type { Writable } from "svelte/store";
import { writable } from "svelte/store";

import type { Todo, TodosApi } from "$lib/openapi";

// auth
type User = {
  username: string;
};

export const userDetails: Writable<User> = writable({
  pk: 0,
  username: "",
  email: "",
});

// preferences
type UserPrefs = {
  bottomNavbarEnabled: boolean;
};

export const userPrefs: Writable<UserPrefs> = writable({
  bottomNavbarEnabled: false,
});

// todos
export const todosApi: Writable<TodosApi> = writable();
export const todos: Writable<Array<Todo>> = writable([]);
export const todoIdSelected: Writable<number> = writable(0);
export const todoFormInputText: Writable<string> = writable("");
