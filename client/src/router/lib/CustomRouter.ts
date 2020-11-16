import VueRouter, {Route} from "vue-router";
import RoutingStore from "@/router/lib/RoutingStore";

export default class CustomRouter extends VueRouter {

  // navigate to the next logical route.
  public toNextRoute(): Promise<Route> {
    return this.push({ name: RoutingStore.nextRoute?.routeName });
  }

  // navigate to the last logical route.
  public toLastRoute(): Promise<Route> {
    return this.push({ name: RoutingStore.lastRoute?.routeName });
  }

}
