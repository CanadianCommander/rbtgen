import "vue"
import CustomRouter from "@/router/lib/CustomRouter";

declare module "vue/types/vue"
{
  interface Vue
  {
    $appRouter: CustomRouter
  }
}
