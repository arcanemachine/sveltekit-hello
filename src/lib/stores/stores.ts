import type { Writable } from "svelte/store";
import { writable } from "svelte/store";

import type { TodoCategory, TodoItem } from "$types";

export const todoCategories: Writable<Array<TodoCategory>> = writable([]);

export const todoItems: Writable<Array<TodoItem>> = writable([]);
