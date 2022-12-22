import type { Writable } from "svelte/store";
import { writable } from "svelte/store";
import Cookies from "js-cookie";

import { Configuration, type Todo, TodosApi, AuthApi } from "$lib/openapi";

// API
type ApiUrls = {
  root: string;
  utils: string;
};

const apiHost = `{location.protocol}//{location.host}`;

export const apiUrls: ApiUrls = {
  root: `${apiHost}/api`,
  utils: `${apiHost}/api/utils`,
};

const apiData = () => {
  type ApiApis = {
    todos: TodosApi;
    users: AuthApi;
  };

  type ApiOverrides = {
    headers: object;
  };

  type ApiData = {
    host: string;
    apis: ApiApis;
    overrides: ApiOverrides;
    urls: ApiUrls;
  };

  const apiData: ApiData = {
    host: apiHost,
    apis: {
      todos: new TodosApi(
        new Configuration({
          basePath: apiHost,
        })
      ),
      users: new AuthApi(
        new Configuration({
          basePath: apiHost,
        })
      ),
    },
    overrides: {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": () => Cookies.get("csrftoken"),
      },
    },
    urls: apiUrls,
  };

  return apiData;
};

export const api: Writable<object> = writable(apiData());

export const apiRequestHeaders = {
  "Content-Type": "application/json",
  "X-CSRFToken": document.cookie.split("=")[1],
};

export const csrfmiddlewaretoken: Writable<string> = (() => {
  const { subscribe, set, update } = writable("");

  return {
    subscribe,
    set,
    update,
    fetch: (csrfmiddlewaretoken: string) => {
      fetch(`${apiUrls.utils}/csrf/get`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          csrfmiddlewaretoken = data.csrfmiddlewaretoken;
        });

      return csrfmiddlewaretoken;
    },
  };
})();

// todos
export const todosApi: Writable<TodosApi> = writable();
export const todos: Writable<Array<Todo>> = writable([]);
export const todoIdSelected: Writable<number> = writable(0);
export const todoFormInputText: Writable<string> = writable("");

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
