import CustomRouter from "@/router/lib/CustomRouter";
import {AccountRoutes} from "@/router/routes/AccountRoutes";
import {EditorRoutes} from "@/router/routes/EditorRoutes";
import Vue from "vue";

export const appRouter = new CustomRouter({});

// add routes to vue prototype
Vue.prototype.$routes = {
  AccountRoutes,
  EditorRoutes,
};
