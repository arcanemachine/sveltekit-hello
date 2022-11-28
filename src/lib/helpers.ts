import tippy from "tippy.js";
import "tippy.js/dist/tippy.css"; // optional for styling

// tippy
export function tooltip(node: HTMLElement, content: string, options: object = {}) {
  options = {
    content,
    ...{
      // default options
      delay: [750, null],
    },
    ...options,
  };

  const tip = tippy(node, options);

  // hide when clicked
  tip.reference.addEventListener("click", () => {
    tip.hide(); // this method is preferred over hideOnClick option because of better mobile support
  });

  return {
    destroy() {
      tip.destroy();
    },
  };
}
