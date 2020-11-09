import { RouteConfig } from "vue-router";
import LoginPage from "@/views/LoginPage.vue";

const accountRoutes: Array<RouteConfig> = [
  {
    path: "/",
    alias: "/login",
    name: "FIGURE_OUT_SYSTEM",
    component: LoginPage
  }
];

export default accountRoutes;
