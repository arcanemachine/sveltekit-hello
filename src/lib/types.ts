import type { Writable } from "svelte/store";
import type { AuthApi, Todo, TodosApi } from "$lib/openapi";

export type Api = {
  host: string;
  csrfmiddlewaretoken: string;
  apis: Apis;
  overrides: RequestInit;
  schema?: any;
  schemaGet(): Function;
  urls: ApiUrls;
  // isLoading: boolean;
  // dispatchApiRequest: Function;
};

export type Apis = {
  todos: TodosApi;
  auth: AuthApi;
};

export type ApiUrls = {
  root: string;
  auth: string;
  utils: string;
};

export type User = {
  username?: string;
  // email?: string;
  isLoggedIn: boolean;
  prefs: {
    bottomNavbarEnabled: boolean;
  };
};

export interface TodosStore extends Writable<Array<Todo>> {
  reset(this: void): void;
}

export interface UserStore extends Writable<User> {
  login(this: void, user: UserStore, username: string): void;
  logout(this: void, user: UserStore): void;
}
