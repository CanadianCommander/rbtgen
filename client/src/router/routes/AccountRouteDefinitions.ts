import {RouteConfig} from "vue-router";
import LoginPage from "@/views/LoginPage.vue";
import StandardLayout from "@/layouts/StandardLayout.vue";
import Home from "@/views/Home.vue";
import {AccountRoutes} from "@/router/routes/AccountRoutes";

export const accountRouteDefinitions: Array<RouteConfig> = [
  {
    path: "/",
    alias: "/login",
    name: AccountRoutes.LOGIN,
    component: LoginPage,
    meta: {
      nextRoute: AccountRoutes.HOME,
    },
  },

  {
    path: "",
    component: StandardLayout,
    children: [
      {
        path: "/home",
        name: AccountRoutes.HOME,
        component: Home,
      },
    ],
  },
];
