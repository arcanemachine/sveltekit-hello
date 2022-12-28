<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  import { CsrfEnsure } from "$components/base";
  import { toastCreateOnError, toastCreate } from "$helpers";
  import { loginRequired } from "$helpers/user";
  import type { ResponseError } from "$lib/openapi";
  import { api, todos, user } from "$stores";

  // lifecycle
  onMount(() => {
    loginRequired();
  });

  // methods
  function logoutCancel() {
    toastCreate("Logout canceled", "info"); // show info message
    history.go(-1); // return to previous page
  }

  function logoutConfirm() {
    $api.apis.auth
      .authLogoutCreate($api.overrides as RequestInit)
      .then(() => {
        user.logout(user); // log the user out
        todos.reset(); // reset todos

        toastCreate("Logout successful", "success"); // success message
        goto("/", { replaceState: true }); // success url
      })
      .catch((err: ResponseError) => {
        toastCreateOnError(err);
      });
  }
</script>

{#if $user.isLoggedIn}
  <CsrfEnsure />

  <section class="text-center">
    <h1 class="page-title">Logout</h1>

    <h4>Are you sure to want to log out?</h4>

    <section class="action-links">
      <button class="btn-primary btn block w-full" on:click={logoutConfirm}>Yes</button>
      <button class="btn-secondary btn block w-full" on:click={logoutCancel}>No</button>
    </section>
  </section>
{/if}
