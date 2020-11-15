import RouteNode from "@/router/lib/RouteNode";

export default class VariableRouteNode extends RouteNode {

  private readonly _routeNameCallback: Function;

  public constructor(routeNameCallback: Function, lastRoutes: RouteNode[] = [], nextRoutes: RouteNode[] = []) {
    super("", lastRoutes, nextRoutes);
    this._routeNameCallback = routeNameCallback;
  }

  get routeName(): string {
    return this._routeNameCallback();
  }
}
