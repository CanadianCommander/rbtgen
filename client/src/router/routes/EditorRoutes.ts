import { RouteConfig } from "vue-router";
import Editor from "@/views/Editor.vue";

const editorRoutes: Array<RouteConfig> = [
  {
    path: "/editor/edit",
    name: "editor",
    component: Editor,
  },
];

export default editorRoutes;
