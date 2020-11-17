import "./stylesheets/global.scss";
import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "@/router";
import {appRouter} from "@/router/appRouter";

Vue.config.productionTip = false;

new Vue({
  router: appRouter,
  store,
  render: h => h(App),
}).$mount("#app");
