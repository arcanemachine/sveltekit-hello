<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  import { createForm } from "felte";
  import reporter from "@felte/reporter-tippy";

  import { CsrfEnsure } from "$components/base";
  import { csrfTokensGet, formHelpers, toastCreate } from "$helpers";
  import { logoutRequired } from "$helpers/user";
  import type { AuthLoginCreateRequest } from "$lib/openapi";
  import { api, user } from "$stores";

  // lifecycle
  onMount(async () => {
    const loggedInCallback = () => {
      toastCreate("You are already logged in.");
      goto("/todos");
    };

    logoutRequired(loggedInCallback);
  });

  // form
  const { form } = createForm({
    extend: reporter(),
    validate: (values: any) => {
      const errors: any = {};

      // check for common passwords
      if (values.password && values.password.length < 8) {
        errors.password = "This password is too short. It must contain at least 8 characters.";
      }

      return errors;
    },
    onSubmit: async (values: any) => {
      // build params
      const params: AuthLoginCreateRequest = {
        login: {
          username: values.username,
          password: values.password,
        },
      };

      // get response
      let response;
      try {
        response = await $api.apis.auth.authLoginCreate(params, $api.overrides as RequestInit);
      } catch (errors: any) {
        throw JSON.parse(await errors.response.text()); // throw parsed errors
      }

      return {
        response,
        values,
      };
    },
    onSuccess: async (res: any) => {
      // deconstruct response object
      const values = res.values;
      res = res.response;

      $api.csrfmiddlewaretoken = await csrfTokensGet(); // get new CSRF middleware token
      user.login(user, values.username); // update frontend auth status
      toastCreate("Login successful", "success"); // success message
      goto("/todos"); // success URL
    },
    onError: (errors: any) => {
      return formHelpers.onError(errors);
    },
  });
</script>

{#if !$user.isLoggedIn}
  <CsrfEnsure />

  <section>
    <h1 class="page-title">Login</h1>

    <form use:form>
      <div class="form-control mx-auto w-full max-w-xs">
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

      <div class="form-control mx-auto w-full max-w-xs">
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

      <div class="form-control mx-auto mt-6 w-full max-w-xs">
        <input class="btn-primary btn" type="submit" value="Submit" />
      </div>
    </form>

    <div class="action-links">
      <a class="block" href="/user/register">Register new account</a>
    </div>
  </section>
{/if}
