<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  import { CsrfEnsure } from "$components/base";
  import type { ResponseError } from "$lib/openapi";
  import { apiStore, todos, user } from "$stores";
  import { toastCreateOnError, toastCreate } from "$helpers";

  // lifecycle
  onMount(() => {
    if (!$user.isLoggedIn) {
      // if user is not logged in, show info message and redirect to home page
      toastCreate("You are already logged out.", "info");
      goto("/");
    }
  });

  // methods
  function logoutCancel() {
    toastCreate("Logout canceled", "info"); // show info message
    history.go(-1); // return to previous page
  }

  function logoutConfirm() {
    $apiStore.apis.auth
      .authLogoutCreate($apiStore.overrides as RequestInit)
      .then(() => {
        user.logout(user); // log the user out
        todos.reset(); // reset todos
        toastCreate("Logout successful", "success"); // success message

        goto("/"); // redirect to homepage
      })
      .catch((error: ResponseError) => {
        toastCreateOnError(error);
      });
  }
</script>

<CsrfEnsure />

<section class="text-center">
  <h1 class="page-title">Logout</h1>

  <h4>Are you sure to want to log out?</h4>

  <section class="action-links">
    <button class="btn-primary btn block w-full" on:click={logoutConfirm}>Yes</button>
    <button class="btn-secondary btn block w-full" on:click={logoutCancel}>No</button>
  </section>
</section>
