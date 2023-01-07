<script lang="ts">
  import { goto } from "$app/navigation";
  import { reporter as reporterSvelte, ValidationMessage } from "@felte/reporter-svelte";
  import { default as reporterTippy } from "@felte/reporter-tippy";
  import { validator } from "@felte/validator-zod";
  import { createForm } from "felte";
  import { onMount } from "svelte";
  import { z } from "zod";

  import { CsrfEnsure } from "$components/base";
  import { csrfTokensGet, formHelpers, toastCreate } from "$helpers";
  import { logoutRequired } from "$helpers/user";
  import type { AuthRegistrationCreateRequest } from "$lib/openapi";
  import { api, user } from "$stores";

  // data
  const registerSchema = $api.schema.components.schemas.RegisterRequest;
  const sProps = {
    username: registerSchema.properties.username,
    email: registerSchema.properties.email,
    password1: registerSchema.properties.password1,
    password2: registerSchema.properties.password2,
  };
  const sRequired = $api.schema.components.schemas.RegisterRequest.required;

  // lifecycle
  onMount(() => {
    logoutRequired();
  });

  // form
  const passwordTooShortMessage =
    "This password is too short. It must contain at least 8 characters.";

  const formSchema = z
    .object({
      username: z.string().min(sProps.username.minLength).max(sProps.username.maxLength),
      email: z.string().email(),
      password1: z.string().min(8, passwordTooShortMessage),
      password2: z.string().min(8, passwordTooShortMessage),
    })
    .refine((data) => data.password1 === data.password2, {
      message: "The two password fields didn't match.",
      path: ["password1"],
    });

  const { form } = createForm<z.infer<typeof formSchema>>({
    extend: [validator({ schema: formSchema }), reporterTippy(), reporterSvelte],
    warn: (values) => {
      const warnings: any = {};

      // check for common passwords
      if (values.password1 && ["1234578", "password"].includes(values.password1)) {
        warnings.password1 = "This password is too common.";
      }

      return warnings;
    },
    onSubmit: async (values) => {
      const params: AuthRegistrationCreateRequest = {
        registerRequest: {
          username: values.username,
          email: values.email,
          password1: values.password1,
          password2: values.password2,
        },
      };

      // get response
      let response;
      try {
        response = await $api.apis.auth.authRegistrationCreate(
          params,
          $api.overrides as RequestInit
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

      $api.csrfmiddlewaretoken = await csrfTokensGet(); // get new CSRF middleware token
      user.login(user, values.username); // update frontend login status
      toastCreate("Registration successful. You are now logged in.", "success"); // success message
      goto("/todos"); // success URL
    },
    onError: (errors: any) => {
      return formHelpers.onError(errors);
    },
  });
</script>

{#if !$user.isLoggedIn}
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
          placeholder="Your username"
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
          placeholder="Your email"
          class="input-bordered input w-full max-w-xs"
          required={sRequired.includes("email") || null}
        />
      </div>

      <div class="form-control mx-auto w-full max-w-xs">
        <label class="label">
          <span class="label-text">Password</span>
          <ValidationMessage for="password1" let:messages={message} level="warning">
            <small class="text-red-500">{message}</small>
            <small slot="placeholder">&nbsp;</small>
          </ValidationMessage>
        </label>
        <input
          name="password1"
          type="password"
          placeholder="Your password"
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
          placeholder="Re-enter your password"
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
{/if}
