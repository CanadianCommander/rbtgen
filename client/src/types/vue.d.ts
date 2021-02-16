import "vue"
import CustomRouter from "@/router/lib/CustomRouter";
import {AccountRoutes} from "@/router/routes/AccountRoutes";
import {EditorRoutes} from "@/router/routes/EditorRoutes";

declare module "vue/types/vue"
{
  interface Vue
  {
    $appRouter: CustomRouter
    AccountRoutes: AccountRoutes
    EditorRoutes: EditorRoutes
  }
}
