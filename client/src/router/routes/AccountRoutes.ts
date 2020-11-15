import { RouteConfig } from "vue-router";
import LoginPage from "@/views/LoginPage.vue";

const accountRoutes: Array<RouteConfig> = [
  {
    path: "/",
    alias: "/login",
    name: "login",
    component: LoginPage,
    meta: {
      nextRoute: "editor",
    },
  },
];

export default accountRoutes;
