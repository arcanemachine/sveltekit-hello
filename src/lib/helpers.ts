// toast
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css"; // optional for styling

// tooltip
export function tooltip(node: HTMLElement, text: string, options: object = {}) {
  const defaultOptions = {
    delay: [750, null],
  };

  options = {
    ...defaultOptions,
    content: text,
    ...options,
  };

  const tip = tippy(node, options);

  // hide when clicked
  tip.reference.addEventListener("click", () => {
    tip.hide(); // prefer this instead of 'hideOnClick' option because of better mobile UX
  });

  return {
    destroy() {
      tip.destroy();
    },
  };
}
