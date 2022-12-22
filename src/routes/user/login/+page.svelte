<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  import { createForm } from "felte";
  import reporter from "@felte/reporter-tippy";

  import { CsrfEnsure } from "$components/base";
  import type { AuthLoginCreateRequest, ResponseError } from "$lib/openapi";
  import { Configuration, AuthApi } from "$lib/openapi";
  import { apiHost, user } from "$stores";
  import { toastCreateOnError, toastCreate } from "$helpers";

  let authApi: AuthApi;

  // lifecycle
  onMount(async () => {
    authApi = new AuthApi(
      new Configuration({
        basePath: apiHost,
      })
    );
  });

  // form
  const { form } = createForm({
    extend: reporter(),
    onSubmit: async (values) => {
      const params: AuthLoginCreateRequest = {
        login: {
          username: values.username,
          password: values.password,
        },
      };

      const deleteme = {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": document.cookie.split("=")[1],
        },
        // body: `csrfmiddlewaretoken=${$csrfmiddlewaretoken}`,
      };

      authApi
        .authLoginCreate(params, deleteme)
        .then(() => {
          $user.username = values.username; // save username to user store
          localStorage.setItem("username", values.username); // save username to localStorage
          toastCreate("Login successful", "success"); // success message
          goto("/todo"); // redirect to todos
        })
        .catch((err: ResponseError) => {
          if (err.response.status == 400) {
            toastCreate("Error: Incorrect username or password", "error");
          } else {
            toastCreateOnError(err);
          }
        });
    },
  });
</script>

<CsrfEnsure />

<section class="prose">
  <h1 class="text-center">Login</h1>

  <form use:form>
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">Username</span>
      </label>
      <input
        type="text"
        name="username"
        placeholder="Your username"
        class="input-bordered input w-full max-w-xs"
        required
      />
    </div>

    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">Password</span>
      </label>
      <input
        type="password"
        name="password"
        placeholder="Your password"
        class="input-bordered input w-full max-w-xs"
        required
      />
    </div>

    <div class="form-control mt-6 w-full max-w-xs">
      <input class="btn-primary btn" type="submit" value="Submit" />
    </div>
  </form>
</section>
