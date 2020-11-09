import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import accountRoutes from "@/router/AccountRoutes";
import editorRoutes from "@/router/EditorRoutes";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  ...accountRoutes,
  ...editorRoutes,
];

const router = new VueRouter({
  routes,
});

export default router;
