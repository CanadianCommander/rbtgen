import {appRouter} from "@/router/appRouter";
import {Route} from "vue-router";
import AuthStore from "@/store/AuthStore";
import {AccountRoutes} from "@/router/routes/AccountRoutes";

const PUBLIC_ROUTES: string[] = [
  AccountRoutes.SIGNUP,
  AccountRoutes.LOGIN,
];

appRouter.beforeEach((to: Route, from: Route, next) =>
{
  if (!AuthStore.isInitialized)
  {
    AuthStore.loadFromAuthCookies();
  }

  if (!AuthStore.isLoggedIn && !PUBLIC_ROUTES.includes(to.name))
  {
    // logged out! go to login page.
    next({ name: AccountRoutes.LOGIN});
  }
  next();
});
