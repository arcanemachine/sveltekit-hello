import { toast } from "@zerodevx/svelte-toast";

import tippy from "tippy.js";
import "tippy.js/dist/tippy.css"; // optional for styling

import type { ResponseError } from "./openapi";
import { apiUrls } from "$stores";

// API
export async function csrfmiddlewaretokenCheck(
  csrfmiddlewaretoken: string,
  method: string = "POST"
) {
  return await fetch(`${apiUrls.utils}/csrf/check`, {
    method: method,
    headers: method === "POST" ? { "X-CSRFToken": csrfmiddlewaretoken } : {},
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => data.message);
}

export async function csrfmiddlewaretokenGet() {
  return await fetch(`${apiUrls.utils}/csrf/get`, {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => data.csrfmiddlewaretoken);
}

// toast
export function toastCreate(message: string, theme: string = "") {
  let toastTheme: object = {};

  if (theme === "error") {
    toastTheme = {
      theme: {
        "--toastColor": "white",
        "--toastBackground": "hsl(var(--er))",
        "--toastBarBackground": "hsl(var(--er))",
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
  }

  toast.push(message, toastTheme);
}

export function toastCreateOnError(err: ResponseError, message: string = "") {
  if (!message) {
    message = `Error ${err.response.status} (${err.response.statusText})`;
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
