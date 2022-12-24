import type { Writable } from "svelte/store";
import { writable } from "svelte/store";

export { apiStore, apiUrls, apiRequestParamsBuild } from "./api.js";
export { todos, todoFormInputText, todoIdSelected, todoDeleteModalVisible } from "./todos.js";
export { user } from "./user.js";

export const isLoading: Writable<boolean> = writable(false);
