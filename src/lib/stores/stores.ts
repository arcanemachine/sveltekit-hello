import type { Writable } from "svelte/store";
import { writable } from "svelte/store";

import type { Todo, TodosApi } from "$lib/api-client";

export const todosApi: Writable<TodosApi> = writable();

export const todoItems: Writable<Array<Todo>> = writable([]);

export const todoItemIdSelected: Writable<number> = writable(0);
export const todoFormInputText: Writable<string> = writable("");
