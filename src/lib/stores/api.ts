import type { Writable } from "svelte/store";
import { writable } from "svelte/store";
import { parse as yamlParse } from "yaml";

import { Configuration, TodosApi, AuthApi } from "$lib/openapi";

const apiHost = `${location.protocol}//${location.host}`;

type ApiUrls = {
  root: string;
  auth: string;
  utils: string;
};

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
      mode: "same-origin",
    },
  } as RequestInit;
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
  schema?: any;
  schemaGet: Function;
  urls: ApiUrls;
  // isLoading: boolean;
  // dispatchApiRequest: Function;
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
  schema: undefined,
  schemaGet: async (schema: any) => {
    if (schema) return schema;

    try {
      return await fetch("/schema.yml")
        .then((res) => res.text())
        .then((text) => yamlParse(text));
    } catch (err) {
      console.error("Could not load schema.yml. Returning empty object...");
      return {};
    }
  },
  urls: apiUrls,
  // isLoading: false,
  // async dispatchApiRequest(callback) {
  //   this.isLoading = true;
  //   await callback();
  //   this.isLoading = false;
  // }
});
