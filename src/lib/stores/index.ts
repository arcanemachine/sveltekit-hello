import type { Writable } from "svelte/store";
import { writable } from "svelte/store";
import Cookies from "js-cookie";

import { Configuration, type Todo, TodosApi, AuthApi } from "$lib/openapi";

// API
type ApiUrls = {
  root: string;
  auth: string;
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
  auth: `${apiHost}/api/auth`,
  utils: `${apiHost}/api/utils`,
};

export const apiRequestParamsGet = () => {
  const csrfToken = Cookies.get("csrftoken");

  return {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    },
  } as RequestInit;
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
    return apiRequestParamsGet();
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
