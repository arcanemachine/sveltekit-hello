import { toast } from "@zerodevx/svelte-toast";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css"; // optional for styling

import type { Todo } from "$lib/api-client";

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

export function toastSuccess() {
  toast.push("hello", {
    theme: {
      "--toastColor": "mintcream",
    },
  });
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
