import VueRouter, {Route} from "vue-router";
import {AccountRoutes} from "@/router/routes/AccountRoutes";
import {EditorRoutes} from "@/router/routes/EditorRoutes";
import RoutingStore from "@/router/lib/RoutingStore";

export type NamedRoute = AccountRoutes | EditorRoutes;

export default class CustomRouter extends VueRouter {

  // navigate to the next logical route.
  public toNextRoute(): Promise<Route> {
    return this.push({ name: RoutingStore.nextRoute?.routeName });
  }

  // navigate to the last logical route.
  public toLastRoute(): Promise<Route> {
    return this.push({ name: RoutingStore.lastRoute?.routeName });
  }

  // go to named route
  public toRoute(route: NamedRoute): Promise<Route> {
    return RoutingStore.toRoute(route);
  }
}
