import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import accountRoutes from "@/router/routes/AccountRoutes";
import editorRoutes from "@/router/routes/EditorRoutes";
import RoutingStore from "@/router/lib/RoutingStore";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  ...accountRoutes,
  ...editorRoutes,
];

RoutingStore.buildRoutesFromRouterList(routes);

const router = new VueRouter({
  routes,
});

router.beforeEach(async(to, from, next) => {
  await RoutingStore.setCurrentRouteFromRoute(to);
  next();
});

export default router;
