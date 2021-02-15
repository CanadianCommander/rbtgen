import { createConfiguration } from "@/lib/api/generated/configuration";
import {PublicApi} from "@/lib/api/generated";

export const publicApi = new PublicApi(createConfiguration());
