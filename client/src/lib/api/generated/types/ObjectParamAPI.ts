import { ResponseContext, RequestContext, HttpFile } from '../http/http';
import * as models from '../models/all';
import { Configuration} from '../configuration'

import { ApiError } from '../models/ApiError';
import { Document } from '../models/Document';
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




import { ObservableUserApi } from "./ObservableAPI";
import { UserApiRequestFactory, UserApiResponseProcessor} from "../apis/UserApi";

export interface UserApiAddSchemaDocumentRequest {
    /**
     * schema document upload
     * @type Document
     * @memberof UserApiaddSchemaDocument
     */
    document: Document
}


export class ObjectUserApi {
    private api: ObservableUserApi

    public constructor(configuration: Configuration, requestFactory?: UserApiRequestFactory, responseProcessor?: UserApiResponseProcessor) {
        this.api = new ObservableUserApi(configuration, requestFactory, responseProcessor);
	}

    /**
     * Add schema document
     * @param param the request object
     */
    public addSchemaDocument(param: UserApiAddSchemaDocumentRequest, options?: Configuration): Promise<Document> {
        return this.api.addSchemaDocument(param.document,  options).toPromise();
    }
	

}



