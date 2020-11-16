import { RouteConfig } from "vue-router";
import LoginPage from "@/views/LoginPage.vue";
import StandardLayout from "@/layouts/StandardLayout.vue";
import Home from "@/views/Home.vue";

const accountRoutes: Array<RouteConfig> = [
  {
    path: "/",
    alias: "/login",
    name: "Login",
    component: LoginPage,
    meta: {
      nextRoute: "Home",
    },
  },

  {
    path: "",
    component: StandardLayout,
    children: [
      {
        path: "/home",
        name: "Home",
        component: Home,
      },
    ],
  },
];

export default accountRoutes;
