import type { Writable } from "svelte/store";
import { writable } from "svelte/store";
import Cookies from "js-cookie";

import { Configuration, type Todo, TodosApi, AuthApi } from "$lib/openapi";
// import { csrfTokenGet } from "$helpers";

// API
type ApiUrls = {
  root: string;
  utils: string;
};

type ApiApis = {
  todos: TodosApi;
  auth: AuthApi;
};

type ApiData = {
  host: string;
  apis: ApiApis;
  overrides: RequestInit;
  urls: ApiUrls;
};

const apiHost = `${location.protocol}//${location.host}`;

export const apiUrls: ApiUrls = {
  root: `${apiHost}/api`,
  utils: `${apiHost}/api/utils`,
};

export const apiStore: Writable<ApiData> = writable({
  host: apiHost,
  apis: {
    todos: new TodosApi(
      new Configuration({
        basePath: apiHost,
      })
    ),
    auth: new AuthApi(
      new Configuration({
        basePath: apiHost,
      })
    ),
  },
  get overrides() {
    const csrfToken = Cookies.get("csrftoken");

    return {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
    } as RequestInit;
  },
  urls: apiUrls,
});

// TODO: rewrite with fetch-based get and set methods
// export const csrfToken: Writable<string> = (() => {
//   const { subscribe, set, update } = writable("");
//
//   return {
//     subscribe,
//     set,
//     update,
//     // fetch: async () => {
//     //   return await fetch(`${apiUrls.utils}/csrf/get`, {
//     //     credentials: "include",
//     //   })
//     //     .then((res) => res.json())
//     //     .then((data) => data.csrfToken);
//     // },
//   };
// })();

export const csrfToken: Writable<string> = writable("");

// todos
// export const todosApi: Writable<TodosApi> = writable();
export const todos: Writable<Array<Todo>> = writable([]);
// export const todoIdSelected: Writable<number> = writable(0);
// export const todoFormInputText: Writable<string> = writable("");

// user
type User = {
  username: string;
  prefs: {
    bottomNavbarEnabled: boolean;
  };
};

export const user: Writable<User> = writable({
  username: localStorage.getItem("username") ?? "",
  prefs: {
    bottomNavbarEnabled: false,
  },
});
