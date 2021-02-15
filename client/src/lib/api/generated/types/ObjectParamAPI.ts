import { ResponseContext, RequestContext, HttpFile } from '../http/http';
import * as models from '../models/all';
import { Configuration} from '../configuration'

import { ApiError } from '../models/ApiError';
import { AuthToken } from '../models/AuthToken';
import { LoginCredentials } from '../models/LoginCredentials';

import { ObservablePublicApi } from "./ObservableAPI";
import { PublicApiRequestFactory, PublicApiResponseProcessor} from "../apis/PublicApi";

export interface PublicApiUserLoginRequest {
    /**
     * Login Credentials
     * @type LoginCredentials
     * @memberof PublicApiuserLogin
     */
    loginCredentials: LoginCredentials
}


export class ObjectPublicApi {
    private api: ObservablePublicApi

    public constructor(configuration: Configuration, requestFactory?: PublicApiRequestFactory, responseProcessor?: PublicApiResponseProcessor) {
        this.api = new ObservablePublicApi(configuration, requestFactory, responseProcessor);
	}

    /**
     * Login to the RBTgen
     * @param param the request object
     */
    public userLogin(param: PublicApiUserLoginRequest, options?: Configuration): Promise<AuthToken> {
        return this.api.userLogin(param.loginCredentials,  options).toPromise();
    }
	

}



