import type { Writable } from "svelte/store";
import { writable } from "svelte/store";
import { parse as yamlParse } from "yaml";

import { apiHost, apiUrls } from "$constants";
import { apiRequestParamsBuild } from "$helpers";
import { AuthApi, Configuration, TodosApi } from "$lib/openapi";
import type { Api } from "$types";

export const api: Writable<Api> = writable({
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
