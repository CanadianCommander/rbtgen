import { ResponseContext, RequestContext, HttpFile } from '../http/http';
import * as models from '../models/all';
import { Configuration} from '../configuration'

import { ApiError } from '../models/ApiError';
import { LoginCredentials } from '../models/LoginCredentials';
import { LoginInfo } from '../models/LoginInfo';
import { SignupInfo } from '../models/SignupInfo';

import { ObservablePublicApi } from "./ObservableAPI";
import { PublicApiRequestFactory, PublicApiResponseProcessor} from "../apis/PublicApi";

export interface PublicApiSignupRequest {
    /**
     * Signup Info
     * @type SignupInfo
     * @memberof PublicApisignup
     */
    signupInfo: SignupInfo
}

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
     * Signup for an RBTgen account
     * @param param the request object
     */
    public signup(param: PublicApiSignupRequest, options?: Configuration): Promise<void> {
        return this.api.signup(param.signupInfo,  options).toPromise();
    }
	
    /**
     * Login to the RBTgen
     * @param param the request object
     */
    public userLogin(param: PublicApiUserLoginRequest, options?: Configuration): Promise<LoginInfo> {
        return this.api.userLogin(param.loginCredentials,  options).toPromise();
    }
	

}



