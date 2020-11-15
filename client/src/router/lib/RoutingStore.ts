import { getModule, Module, Mutation, Action, VuexModule } from "vuex-module-decorators";
import RouteNode from "@/router/lib/RouteNode";
import { Route, RouteConfig } from "vue-router";
import store from "@/store";

@Module({ dynamic: true, store, name: "RoutingStore", namespaced: true })
class RoutingStore extends VuexModule {
  private _routes: RouteNode[] = [];
  private _currentRoute: RouteNode = null;

  @Action({ rawError: true })
  public async buildRoutesFromRouterList(routerList: RouteConfig[]): Promise<void> {
    const routeNodes: RouteNode[] = [];

    // add all routes
    for (const route of routerList) {
      routeNodes.push(new RouteNode(route.name));
    }
    this.setRoutes(routeNodes);

    // connect the routes
    for (const route of routerList) {
      const routeNode = await this.getRoute(route.name);

      if (route.meta) {
        if (route.meta.lastRoute) {
          routeNode.addLastRoute(await this.getRoute(route.meta.lastRoute));
        }

        if (route.meta.nextRoute) {
          routeNode.addNextRoute(await this.getRoute(route.meta.nextRoute));
        }
      }
    }
  }

  @Action
  public async setCurrentRouteFromRoute(route: Route): Promise<void> {
    this.setCurrentRoute(await this.getRoute(route.name));
  }

  @Mutation
  public setCurrentRoute(route: RouteNode) {
    this._currentRoute = route;
  }

  @Mutation
  public setRoutes(routes: RouteNode[]): void {
    this._routes = routes;
  }

  // get route by name
  @Action
  public getRoute(name: string): RouteNode {
    return this.routes.find((route) => route.routeName === name);
  }

  get routes(): RouteNode[] {
    return this._routes;
  }

  get currentRoute(): RouteNode {
    return this._currentRoute;
  }

  get nextRoute(): RouteNode {
    if (this.currentRoute.nextRoutes) {
      return this.currentRoute.nextRoutes[0];
    }
    return null;
  }

  get lastRoute(): RouteNode {
    if (this.currentRoute.lastRoutes) {
      return this.currentRoute.lastRoutes[0];
    }
    return null;
  }
}

export default getModule(RoutingStore);
