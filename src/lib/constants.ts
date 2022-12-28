import type { ApiUrls, User } from "$types";

export const apiHost = `${location.protocol}//${location.host}`;

export const apiUrls: ApiUrls = {
  root: `${apiHost}/api`,
  auth: `${apiHost}/api/auth`,
  utils: `${apiHost}/api/utils`,
};

export const userInitial: User = {
  username: localStorage.getItem("username") ?? "",
  isLoggedIn: localStorage.getItem("username") ? true : false,
  prefs: {
    bottomNavbarEnabled: Boolean(localStorage.getItem("bottomNavbarEnabled")),
  },
};
