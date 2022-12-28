import { writable } from "svelte/store";

import { userInitial } from "$constants";
import type { User, UserStore } from "$types";

export const user: UserStore = (() => {
  const { subscribe, set, update } = writable(userInitial as User);

  return {
    subscribe,
    set,
    update,
    login: (user, username) => {
      user.update((obj) =>
        Object.assign(obj, {
          isLoggedIn: true,
          username,
          // email: undefined,
        })
      );
      localStorage.setItem("username", username);
    },
    logout: (user) => {
      user.update((obj) =>
        Object.assign(obj, {
          isLoggedIn: false,
          username: undefined,
          // email: undefined,
        })
      );
      localStorage.removeItem("username");
    },
  };
})();
