import { RouteConfig } from "vue-router";
import Editor from "@/views/Editor.vue";

const editorRoutes: Array<RouteConfig> = [
  {
    path: "/editor/edit",
    name: "SYSTEM",
    component: Editor,
  },
];

export default editorRoutes;
