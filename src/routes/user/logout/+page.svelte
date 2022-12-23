<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  import { createForm } from "felte";
  import reporter from "@felte/reporter-tippy";

  import { CsrfEnsure } from "$components/base";
  import type { ResponseError } from "$lib/openapi";
  import { apiStore, user } from "$stores";
  import { toastCreateOnError, toastCreate } from "$helpers";

  // lifecycle
  onMount(() => {
    if (!$user.isLoggedIn) {
      // if user is not logged in, show info message and redirect to home page
      toastCreate("You are already logged out.", "info");
      goto("/");
    }
  });

  // form
  const { form } = createForm({
    extend: reporter(),
    onSubmit: (values) => {
      $apiStore.apis.auth
        .authLogoutCreate($apiStore.overrides as RequestInit)
        .then(() => {
          $user.username = values.username; // clear username in user store
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
  <h1 class="page-title">Logout</h1>

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
          toastCreate("Logout canceled", "info"); // show info message
          history.go(-1); // return to previous page
        }}>No</button
      >
    </div>
  </form>
</section>
