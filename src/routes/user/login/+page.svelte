<script lang="ts">
  import { goto } from "$app/navigation";
  import reporter from "@felte/reporter-tippy";
  import { createForm } from "felte";
  import { onMount } from "svelte";

  import type { AuthLoginCreateRequest, ResponseError } from "$lib/openapi";
  import { Configuration, AuthApi } from "$lib/openapi";
  import { apiHost, userDetails } from "$stores";
  import { toastCatchError, toastCreate } from "$helpers";

  let authApi: AuthApi;

  // lifecycle
  onMount(async () => {
    authApi = new AuthApi(
      new Configuration({
        basePath: $apiHost,
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

      authApi
        .authLoginCreate(params)
        .then(() => {
          toastCreate("Login successful", "success");
          $userDetails.username = values.username; // save username as indication of auth status
          setTimeout(() => {
            goto("/todo");
          }, 1000);
        })
        .catch((err: ResponseError) => {
          if (err.response.status == 400) {
            toastCreate("Error: Incorrect username or password", "error");
          } else {
            toastCatchError(err);
          }
        });
    },
  });
</script>

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
