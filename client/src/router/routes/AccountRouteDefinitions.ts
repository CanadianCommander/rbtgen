import {RouteConfig} from "vue-router";
import LoginPage from "@/views/LoginPage.vue";
import StandardLayout from "@/layouts/StandardLayout.vue";
import {AccountRoutes} from "@/router/routes/AccountRoutes";
import Signup from "@/views/Signup.vue";
import Library from "@/views/Library.vue";

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
    path: "/signup",
    name: AccountRoutes.SIGNUP,
    component: Signup,
    meta: {
      nextRoute: AccountRoutes.HOME,
      lastRoute: AccountRoutes.LOGIN,
    },
  },

  {
    path: "",
    component: StandardLayout,
    children: [
      {
        path: "/home",
        name: AccountRoutes.HOME,
        component: Library,
      },
    ],
  },
];
