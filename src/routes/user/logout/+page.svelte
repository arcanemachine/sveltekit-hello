<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  import { createForm } from "felte";
  import reporter from "@felte/reporter-tippy";

  import { CsrfEnsure } from "$components/base";
  import type { ResponseError } from "$lib/openapi";
  import { Configuration, AuthApi } from "$lib/openapi";
  import { apiHost, user } from "$stores";
  import { toastCreateOnError, toastCreate } from "$helpers";

  let authApi: AuthApi;

  // lifecycle
  onMount(async () => {
    if (!$user.username) {
      toastCreate("You are already logged out.", "error");
      goto("/");
    }

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
      authApi
        .authLogoutCreate()
        .then(() => {
          $user.username = values.username; // reset username in user store
          localStorage.removeItem("username"); // remove username from localStorage
          toastCreate("Logout successful", "success"); // success message

          goto("/"); // redirect to homepage
        })
        .catch((err: ResponseError) => {
          toastCreateOnError(err);
        });
    },
  });
</script>

<CsrfEnsure />

<section class="prose text-center">
  <h1>Logout</h1>

  <h4>Are you sure to want to log out?</h4>

  <form use:form>
    <div class="form-control mt-6 w-full max-w-xs">
      <input class="btn-primary btn" type="submit" value="Yes" />
    </div>
    <div class="form-control mt-4 w-full max-w-xs">
      <button
        class="btn-secondary btn"
        type="button"
        on:click={() => {
          history.go(-1);
        }}>No</button
      >
    </div>
  </form>
</section>
