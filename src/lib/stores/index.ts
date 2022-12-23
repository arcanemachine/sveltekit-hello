import type { Writable } from "svelte/store";
import { writable } from "svelte/store";

import { Configuration, type Todo, TodosApi, AuthApi } from "$lib/openapi";
// import { csrftokenCheck, csrftokenGet } from "$helpers";

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
  csrfmiddlewaretoken: string;
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

export const apiRequestParamsBuild = (csrfmiddlewaretoken: string) => {
  return {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfmiddlewaretoken,
      // mode: "same-origin", // TODO: add this line
    },
  } as RequestInit;
};

export const apiStore: Writable<ApiData> = writable({
  host: apiHost,
  csrfmiddlewaretoken: "",
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
    return apiRequestParamsBuild(this.csrfmiddlewaretoken);
  },
  urls: apiUrls,
});

export const todos: Writable<Array<Todo>> = writable([]); // todos

// user
type User = {
  username: string;
  isLoggedIn: Boolean;
  prefs: {
    bottomNavbarEnabled: boolean;
  };
};

export const user: Writable<User> = writable({
  username: localStorage.getItem("username") ?? "",
  get isLoggedIn() {
    return Boolean(this.username);
  },
  prefs: {
    bottomNavbarEnabled: false,
  },
});
