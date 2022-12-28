import type { Writable } from "svelte/store";
import { writable } from "svelte/store";

export * from "$stores/api";
export * from "$stores/todos";
export * from "./user.js";

export const isLoading: Writable<boolean> = writable(false);
