import { getModule, Module, Mutation, Action, VuexModule } from "vuex-module-decorators";
import RouteNode from "@/router/lib/RouteNode";
import { Route, RouteConfig } from "vue-router";
import store from "@/store";
import {NamedRoute} from "@/router/lib/CustomRouter";
import {appRouter} from "@/router/appRouter";

@Module({ dynamic: true, store, name: "RoutingStore", namespaced: true })
class RoutingStore extends VuexModule
{
  private _routes: RouteNode[] = [];
  private _currentRoute: RouteNode = null;

  /**
   * build routing nodes from RouteConfig list
   * @param routerList route configuration list.
    */
  @Action({ rawError: true })
  public async buildRoutesFromRouterList(routerList: RouteConfig[]): Promise<void>
  {
    const routeNodes: RouteNode[] = [];
    routerList = await this.collectRoutes(routerList);

    // add all routes
    for (const route of routerList)
    {
      routeNodes.push(new RouteNode(route.name));
    }
    this.setRoutes(routeNodes);

    // connect the routes
    for (const route of routerList)
    {
      const routeNode = await this.getRoute(route.name);

      if (route.meta)
      {
        if (route.meta.lastRoute)
        {
          routeNode.addLastRoute(await this.getRoute(route.meta.lastRoute));
        }

        if (route.meta.nextRoute)
        {
          routeNode.addNextRoute(await this.getRoute(route.meta.nextRoute));
        }
      }
    }
  }

  /**
   * set the current RouteNode from the provided Route
   * @param route - the current vue Route
   */
  @Action
  public async setCurrentRouteFromRoute(route: Route): Promise<void>
  {
    this.setCurrentRoute(await this.getRoute(route.name));
  }

  // get route by name
  @Action
  public getRoute(name: string): RouteNode
  {
    return this.routes.find((route) => route.routeName === name);
  }

  /**
   * go to named route
   * @param name - the named route to go to.
   */
  @Action({rawError: true})
  public toRoute(name: NamedRoute): Promise<Route>
  {
    return appRouter.push({name});
  }

  @Mutation
  public setCurrentRoute(route: RouteNode)
  {
    this._currentRoute = route;
  }

  @Mutation
  public setRoutes(routes: RouteNode[]): void
  {
    this._routes = routes;
  }

  get routes(): RouteNode[]
  {
    return this._routes;
  }

  get hasRoutes(): boolean
  {
    return this._routes.length > 0;
  }

  get currentRoute(): RouteNode
  {
    return this._currentRoute;
  }

  get nextRoute(): RouteNode
  {
    if (this.currentRoute.nextRoutes)
    {
      return this.currentRoute.nextRoutes[0];
    }
    return null;
  }

  get lastRoute(): RouteNode
  {
    if (this.currentRoute.lastRoutes)
    {
      return this.currentRoute.lastRoutes[0];
    }
    return null;
  }

  // collect routes to a single list. moving all nested
  // routes out to the top level.
  @Action
  private async collectRoutes(routeList: RouteConfig[]): Promise<RouteConfig[]>
  {
    let routes: RouteConfig[] = [];

    for (const route of routeList)
    {
      routes.push(route);

      if (route.children)
      {
        routes = routes.concat(await this.collectRoutes(route.children));
      }
    }
    return routes;
  }
}

export default getModule(RoutingStore);
