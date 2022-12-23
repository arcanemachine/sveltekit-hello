<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  import { createForm } from "felte";
  import reporter from "@felte/reporter-tippy";

  import { CsrfEnsure } from "$components/base";
  import type { AuthLoginCreateRequest, ResponseError } from "$lib/openapi";
  import { apiStore, user } from "$stores";
  import { csrfTokensGet, toastCreateOnError, toastCreate, userAuthStatusCheck } from "$helpers";

  // lifecycle
  onMount(async () => {
    if ($user.isLoggedIn) {
      if (!(await userAuthStatusCheck($apiStore.csrfmiddlewaretoken))) {
        // if authentication cookies are expired, remove the username from localStorage
        localStorage.removeItem("username");
      } else {
        toastCreate("You are already logged in.");
        goto("/todos");
      }
    }
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

      $apiStore.apis.auth
        .authLoginCreate(params, $apiStore.overrides as RequestInit)
        .then(async () => {
          $apiStore.csrfmiddlewaretoken = await csrfTokensGet(); // get new CSRF middleware token
          $user.username = values.username; // save username to user store
          localStorage.setItem("username", values.username); // save username to localStorage
          toastCreate("Login successful", "success"); // success message
          goto("/todos"); // redirect to todos
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
  <h1 class="page-title">Login</h1>

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
