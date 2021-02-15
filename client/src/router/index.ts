import Vue from "vue";
import { RouteConfig } from "vue-router";
import { accountRouteDefinitions } from "@/router/routes/AccountRouteDefinitions";
import {editorRouteDefinitions} from "@/router/routes/EditorRouteDefinitions";
import RoutingStore from "@/router/lib/RoutingStore";
import {appRouter} from "@/router/appRouter";
import CustomRouter from "@/router/lib/CustomRouter";

Vue.use(CustomRouter);

const routes: Array<RouteConfig> = [
  ...accountRouteDefinitions,
  ...editorRouteDefinitions,
];

appRouter.addRoutes(routes);

appRouter.beforeEach(async(to, from, next) =>
{
  // If routes not loaded load them.
  if (!RoutingStore.hasRoutes)
  {
    await RoutingStore.buildRoutesFromRouterList(routes);
  }

  await RoutingStore.setCurrentRouteFromRoute(to);
  next();
});

export default {};
