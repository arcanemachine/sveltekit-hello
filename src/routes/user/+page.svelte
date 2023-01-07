<script lang="ts">
  import { onMount } from "svelte";

  import { user } from "$stores";
  import { loginRequired } from "$helpers/user";

  // lifecycle
  onMount(() => {
    loginRequired();
  });
</script>

{#if $user.isLoggedIn}
  <section>
    <h1 class="page-title">Your Profile</h1>

    <!-- personal info -->
    <ul class="mt-child-2 mx-auto max-w-md list-none rounded-lg border-4 p-4">
      <h2 class="mt-0 mb-8 text-center">Personal Info</h2>
      <li class="list-item">
        <div class="font-bold">Username:</div>
        <div>
          {$user.username}
        </div>
      </li>
      <!--
        <li class="list-item">
          <div class="font-bold">Email:</div>
          <div>
            {$user.email ?? "N/A"}
          </div>
        </li>
      -->
    </ul>

    <section class="action-links mt-10">
      <!--
      <div class="form-control mx-auto w-full max-w-xs">
        <button class="btn-primary btn">Change Email</button>
      </div>
      -->
      <!--
        <div class="form-control mx-auto w-full max-w-xs">
          <a href="/user/change-password" class="btn-primary btn">Change Password</a>
        </div>
      -->
      <div class="form-control mx-auto mt-6 w-full max-w-xs">
        <a href="/user/logout" class="btn-secondary btn">Logout</a>
      </div>
    </section>
  </section>

  <style>
    .list-item {
      @apply flex min-h-[2rem] items-center justify-between;
    }
  </style>
{/if}
