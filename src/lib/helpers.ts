import { toast } from "@zerodevx/svelte-toast";

import tippy from "tippy.js";
import "tippy.js/dist/tippy.css"; // optional for styling

import { apiRequestParamsBuild, apiUrls } from "$stores";
import type { ResponseError } from "./openapi";

/* API */
// auth
export async function csrfTokensGet() {
  /** Get a 'csrftoken' cookie, and return a 'csrfmiddlewaretoken' string. */
  return await fetch(`${apiUrls.utils}/csrftoken/`, {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => data.csrfmiddlewaretoken)
    .catch((error) => {
      toastCreateOnError(error); // show error message
      // throw error; // raise exception
    });
}

// export async function csrfTokenCheck(csrfToken: string) {
//   /** Check the validity of a CSRF token. The function will accept an masked
//    *  token (as in a 'csrfmiddlewaretoken' string) -OR- an unmasked one (as in
//    *  a 'csrftoken' cookie).
//    *  To protect against BREACH attacks, the masked token should be used.
//    */
//   console.log(`Using token: ${csrfToken}`);
//   return await fetch(`${apiUrls.utils}/csrftoken/`, {
//     method: "POST",
//     headers: { "X-CSRFToken": csrfToken },
//     credentials: "include",
//   })
//     .then((response) => {
//       if (response.status === 403) {
//         toastCreate(
//           "We were unable to verify the authenticity of your request. " +
//             "You may need to refresh the page.",
//           "error"
//         );
//         return false;
//       }
//       return response.json();
//     })
//     .then((data) => data.message)
//     .catch((err) => {
//       toastCreateOnError(err); // show error message
//     });
// }

export async function userAuthStatusCheck(csrfmiddlewaretoken: string, method: string = "GET") {
  const defaultParams = apiRequestParamsBuild(csrfmiddlewaretoken);
  const params: RequestInit = Object.assign(defaultParams, {
    method,
  });
  return await fetch(`${apiUrls.auth}/check/`, params).then((response) => response.json());
}

// form
export const formHelpers = {
  onError: (errors: any) => {
    if (Object.keys(errors).filter((fieldName) => fieldName === "non_field_errors").length) {
      // show error message for *first* non-field error and delete the 'non_field_errors' key
      toastCreate(errors.non_field_errors[0], "error");
      delete errors.non_field_errors;
    } else {
      toastCreate("An error was detected in the form.", "error");
    }
    return errors;
  },
};

// toast
export function toastCreate(message: string, theme: string = "") {
  let toastTheme: object = {};

  if (theme === "info") {
    toastTheme = {
      theme: {
        "--toastColor": "black",
        "--toastBackground": "hsl(var(--in))",
        "--toastBarBackground": "hsl(var(--in))",
      },
    };
  } else if (theme === "success") {
    toastTheme = {
      theme: {
        "--toastColor": "white",
        "--toastBackground": "hsl(var(--su))",
        "--toastBarBackground": "hsl(var(--su))",
      },
    };
  } else if (theme === "warning") {
    toastTheme = {
      theme: {
        "--toastColor": "black",
        "--toastBackground": "hsl(var(--wa))",
        "--toastBarBackground": "hsl(var(--wa))",
      },
    };
  } else if (theme === "error") {
    toastTheme = {
      theme: {
        "--toastColor": "white",
        "--toastBackground": "hsl(var(--er))",
        "--toastBarBackground": "hsl(var(--er))",
      },
    };
  }

  toast.push(message, toastTheme);
}

export function toastCreateOnError(err: ResponseError, message: string = "") {
  if (!message) {
    if (err.response) {
      message = `Error ${err.response.status} (${err.response.statusText})`;
    } else {
      message = "Error: Could not connect to API server";
    }
  }

  toastCreate(message, "error");
}

// tooltip
export function tooltip(node: HTMLElement, options: Record<string, any> | string = "") {
  const defaultOptions = {
    delay: [750, null],
    hideOnClick: true,
    // interactiveDebounce: 150,
    touch: "hold",
  };

  if (typeof options === "string") {
    options = { content: options }; // convert to object
  }

  options = {
    ...defaultOptions,
    ...options,
  };

  const tip = tippy(node, options);

  return {
    destroy() {
      tip.destroy();
    },
  };
}
