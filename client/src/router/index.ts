import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import accountRoutes from "@/router/routes/AccountRoutes";
import editorRoutes from "@/router/routes/EditorRoutes";
import RoutingStore from "@/router/lib/RoutingStore";
import CustomRouter from "@/router/lib/CustomRouter";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  ...accountRoutes,
  ...editorRoutes,
];

const router = new CustomRouter({
  routes,
});

router.beforeEach(async(to, from, next) => {
  // If routes not loaded load them.
  if (!RoutingStore.hasRoutes) {
    await RoutingStore.buildRoutesFromRouterList(routes);
  }

  await RoutingStore.setCurrentRouteFromRoute(to);
  next();
});

export default router;
