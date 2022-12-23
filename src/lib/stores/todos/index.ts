import type { Writable } from "svelte/store";
import { writable } from "svelte/store";

export const todoFormInputText: Writable<string> = writable("");
export const todoIdSelected: Writable<number> = writable(0);
export const todoDeleteModalVisible: Writable<boolean> = writable(false);
