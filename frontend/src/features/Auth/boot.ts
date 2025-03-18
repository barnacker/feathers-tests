import { boot } from "quasar/wrappers";

import { useAuthStore } from "./store";

// const publicRoutes = ["index", "auth-login", "auth-signup"];

export default boot(async ({ router }) => {
  /**
   * Check for authentication before each route.
   */
  router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();

    // always resolves. no need to catch
    await authStore.getPromise();

    // check auth and apply login redirect
    // if (!authStore.user && !publicRoutes.includes(to.name as string)) {
    //   authStore.loginRedirect = to;
    //   return next({ name: "auth-login" });
    // }
    return next();
  });
});
