import type { Writable } from "svelte/store";
import { writable } from "svelte/store";

type User = {
  username?: string;
  // email?: string;
  isLoggedIn: boolean;
  prefs: {
    bottomNavbarEnabled: boolean;
  };
};

const userInitial: User = {
  username: localStorage.getItem("username") ?? "",
  isLoggedIn: localStorage.getItem("username") ? true : false,
  prefs: {
    bottomNavbarEnabled: Boolean(localStorage.getItem("bottomNavbarEnabled")),
  },
};

interface UserStore extends Writable<User> {
  login(this: void, user: UserStore, username: string): void;
  logout(this: void, user: UserStore): void;
}

export const user: UserStore = (() => {
  const { subscribe, set, update } = writable(userInitial);

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
