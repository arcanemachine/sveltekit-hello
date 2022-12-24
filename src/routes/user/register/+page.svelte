<script lang="ts">
  import { goto } from "$app/navigation";
  import { validator } from "@felte/validator-zod";
  import { onMount } from "svelte";
  import { z } from "zod";

  import { createForm } from "felte";
  import reporter from "@felte/reporter-tippy";

  import { CsrfEnsure } from "$components/base";
  import type { AuthRegistrationCreateRequest } from "$lib/openapi";
  import { apiStore, user } from "$stores";
  import { csrfTokensGet, formHelpers, toastCreate, userAuthStatusCheck } from "$helpers";

  // data
  const registerSchema = $apiStore.schema.components.schemas.Register; // data
  const sProps = {
    username: registerSchema.properties.username,
    email: registerSchema.properties.email,
    password1: registerSchema.properties.password1,
    password2: registerSchema.properties.password2,
  };
  const sRequired = $apiStore.schema.components.schemas.Register.required;
  console.log(sProps);

  // lifecycle
  onMount(async () => {
    // check if user is already logged in
    if ($user.isLoggedIn) {
      if (!(await userAuthStatusCheck($apiStore.csrfmiddlewaretoken))) {
        // if authentication cookies are expired, remove frontend auth status
        user.logout(user);
      } else {
        toastCreate("You are already logged in.");
        goto("/todos");
      }
    }
  });

  // form
  const formSchema = z.object({
    username: z.string().min(sProps.username.minLength).max(sProps.username.maxLength),
    email: z.string().email(),
    password1: z.string(),
    password2: z.string(),
  });

  const passwordWarnSchema = z.string().refine((value) => value.length > 8 && true, {
    message: "Password must contain 8 or more characters",
  });
  const warnSchema = z.object({
    password1: passwordWarnSchema,
    password2: passwordWarnSchema,
  });

  const { form } = createForm<z.infer<typeof formSchema>>({
    extend: reporter(),
    // extend: [validator({ formSchema }), reporter()],
    // extend: [reporter(), validator({ warnSchema, level: "warning" })],
    onSubmit: async (values) => {
      const params: AuthRegistrationCreateRequest = {
        register: {
          username: values.username,
          email: values.email,
          password1: values.password1,
          password2: values.password2,
        },
      };

      // get response
      let response;
      try {
        response = await $apiStore.apis.auth.authRegistrationCreate(
          params,
          $apiStore.overrides as RequestInit
        );
      } catch (errors: any) {
        throw JSON.parse(await errors.response.text()); // throw parsed errors
      }

      return {
        response,
        values,
      };
    },
    onSuccess: async (response: any) => {
      // deconstruct response object
      const values = response.values;
      response = response.response;

      $apiStore.csrfmiddlewaretoken = await csrfTokensGet(); // get new CSRF middleware token
      user.login(user, values.username); // update frontend login status
      toastCreate("Registration successful. You are now logged in.", "success"); // success message
      goto("/todos"); // success URL
    },
    onError: (errors: any) => {
      return formHelpers.onError(errors);
    },
  });
</script>

<section>
  <h1 class="page-title">Register New Account</h1>

  <CsrfEnsure />

  <form use:form>
    <div class="form-control mx-auto w-full max-w-xs">
      <label class="label">
        <span class="label-text">Username</span>
      </label>
      <input
        name="username"
        type="text"
        class="input-bordered input w-full max-w-xs"
        minlength={sProps.username.minLength}
        maxlength={sProps.username.maxLength}
        required={sRequired.includes("username") || null}
      />
    </div>

    <div class="form-control mx-auto w-full max-w-xs">
      <label class="label">
        <span class="label-text">Email</span>
      </label>
      <input
        name="email"
        type="email"
        class="input-bordered input w-full max-w-xs"
        required={sRequired.includes("email") || null}
      />
    </div>

    <div class="form-control mx-auto w-full max-w-xs">
      <label class="label">
        <span class="label-text">Password</span>
      </label>
      <input
        name="password1"
        type="password"
        class="input-bordered input w-full max-w-xs"
        required={sRequired.includes("password1") || null}
      />
    </div>

    <div class="form-control mx-auto w-full max-w-xs">
      <label class="label">
        <span class="label-text">Confirm Password</span>
      </label>
      <input
        name="password2"
        type="password"
        class="input-bordered input w-full max-w-xs"
        required={sRequired.includes("password2") || null}
      />
    </div>

    <div class="form-control mx-auto mt-8 w-full max-w-xs">
      <input class="btn-primary btn" type="submit" value="Submit" />
    </div>

    <!-- form errors -->
  </form>

  <div class="action-links">
    <a class="block" href="/user/login">Login to an existing account</a>
  </div>
</section>
