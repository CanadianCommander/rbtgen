import { createConfiguration } from "@/lib/api/generated/configuration";
import {PublicApi, UserApi} from "@/lib/api/generated";

export const publicApi = new PublicApi(createConfiguration());

export const userApi = new UserApi(createConfiguration());
