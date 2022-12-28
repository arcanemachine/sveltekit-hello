import { goto } from "$app/navigation";

import { api, user } from "$stores";
import { toastCreate, toastCreateOnError, userAuthStatusCheck } from "$helpers";
import type { Api, User } from "$types";
import type { ResponseError } from "$lib/openapi";

export function loginRequired(callback?: Function): void {
  /** Check if user is logged in to their account. If not, then show a message and redirect. */

  user.subscribe((user: User) => {
    // subscribe to the store
    if (!user.isLoggedIn) {
      if (callback) callback();
      else {
        toastCreate("You must login to continue.");
        goto("/user/login", { replaceState: true }); // redirect to success url
      }
    }
  })(); // immediately unsubscribe from the store
}

export function logoutRequired(callback?: Function): void {
  /** Check if user is logged out of to their account. If not, then show a message and redirect. */

  api.subscribe((apiObj: Api) => {
    user.subscribe((userObj: User) => {
      if (userObj.isLoggedIn) {
        userAuthStatusCheck(apiObj.csrfmiddlewaretoken)
          .then((isLoggedIn) => {
            if (!isLoggedIn) {
              // login status could not be verified on the backend. perform client-side logout
              user.logout(user);
            } else {
              // user is logged in
              if (callback) callback();
              else {
                toastCreate("You cannot view this page while you are logged in.");
                goto("/user/logout");
              }
            }
          })
          .catch((err: ResponseError) => {
            toastCreateOnError(err); // show error message
            user.logout(user); // logout the user in the frontend
          });
      }
    })(); // immediately unsubscribe from the store
  })(); // immediately unsubscribe from the store
}
