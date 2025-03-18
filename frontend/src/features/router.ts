import { route } from "quasar/wrappers";
import { createMemoryHistory, createRouter, createWebHistory } from "vue-router";
import { RouteRecordRaw } from "vue-router";

const buildRoutes = async (): Promise<RouteRecordRaw[]> => {
  /**
   * Dynamically import all routes form features and return a flat list.
   * To add routes to your feature create a `routes.ts` file in your feature and `export default myRoutes;`.
   */
  const modules = import.meta.glob("../features/**/routes.ts");
  const featureRoutes: RouteRecordRaw[] = await Promise.all(
    Object.values(modules).map(async (mod) => (await mod()).default),
  );
  return [
    ...featureRoutes.flat(),
    // Fallback to 404 page. This should always be last.
    {
      path: "/:catchAll(.*)*",
      component: () => import("src/features/Global/components/ErrorNotFoundView.vue"),
    },
  ];
};

export default route(async (/* { store, ssrContext } */) => {
  /**
   * Create Router and register routes with Quasar.
   */
  const createHistory = process.env.SERVER ? createMemoryHistory : createWebHistory;

  const routes = await buildRoutes();
  return createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });
});
