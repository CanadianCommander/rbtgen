export default class RouteNode
{
  protected _routeName: string;
  protected _lastRoutes: RouteNode[];
  protected _nextRoutes: RouteNode[];

  public constructor(routeName: string, lastRoutes: RouteNode[] = [], nextRoutes: RouteNode[] = [])
  {
    this._routeName = routeName;
    this._lastRoutes = lastRoutes;
    this._nextRoutes = nextRoutes;
  }

  public addNextRoute(nextRoute: RouteNode): void
  {
    this.nextRoutes.push(nextRoute);
  }

  public addLastRoute(lastRoute: RouteNode): void
  {
    this.lastRoutes.push(lastRoute);
  }

  get nextRoutes(): RouteNode[]
  {
    return this._nextRoutes;
  }

  get lastRoutes(): RouteNode[]
  {
    return this._lastRoutes;
  }

  get routeName(): string
  {
    return this._routeName;
  }
}
