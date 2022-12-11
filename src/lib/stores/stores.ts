import type { Writable } from "svelte/store";
import { writable } from "svelte/store";

import type { TodoItem } from "$types";

export const todoItems: Writable<Array<TodoItem>> = writable(
  JSON.parse(localStorage.getItem("todoItems") || "[]")
);

export const todoItemIdSelected: Writable<number> = writable(0);
export const todoFormInputText: Writable<string> = writable("");
