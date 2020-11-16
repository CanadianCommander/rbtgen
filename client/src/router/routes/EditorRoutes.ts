import { RouteConfig } from "vue-router";
import Editor from "@/views/Editor.vue";
import StandardLayout from "@/layouts/StandardLayout.vue";

const editorRoutes: Array<RouteConfig> = [
  {
    path: "",
    component: StandardLayout,
    children: [
      {
        path: "/editor/edit",
        name: "Editor",
        component: Editor,
        meta: {
          lastRoute: "Home",
        },
      },
    ],
  },
];

export default editorRoutes;
