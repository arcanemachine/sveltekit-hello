<script lang="ts">
  import { goto } from "$app/navigation";

  import { apiStore, user } from "$stores";
  import { toastCreate, userAuthStatusCheck } from "$helpers";

  export async function ensureUserLoggedOut() {
    /** Ensure that user is logged out of their account. */
    if ($user.isLoggedIn) {
      if (!(await userAuthStatusCheck($apiStore.csrfmiddlewaretoken))) {
        // if authentication cookies are expired, remove frontend auth status
        user.logout(user);
      } else {
        toastCreate("You are already logged in.");
        goto("/todos");
      }
    }
  }
</script>
