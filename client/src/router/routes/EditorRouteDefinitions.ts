import {RouteConfig} from "vue-router";
import StandardLayout from "@/layouts/StandardLayout.vue";
import Editor from "@/views/Editor.vue";
import {AccountRoutes} from "@/router/routes/AccountRoutes";
import {EditorRoutes} from "@/router/routes/EditorRoutes";

export const editorRouteDefinitions: Array<RouteConfig> = [
  {
    path: "",
    component: StandardLayout,
    children: [
      {
        path: "/editor/edit",
        name: EditorRoutes.EDITOR,
        component: Editor,
        props: true,
        meta: {
          lastRoute: AccountRoutes.HOME,
        },
      },
    ],
  },
];
