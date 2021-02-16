import { ResponseContext, RequestContext, HttpFile } from '../http/http';
import * as models from '../models/all';
import { Configuration} from '../configuration'

import { ApiError } from '../models/ApiError';
import { Document } from '../models/Document';
import { LoginCredentials } from '../models/LoginCredentials';
import { LoginInfo } from '../models/LoginInfo';
import { SignupInfo } from '../models/SignupInfo';
import { ObservablePublicApi } from './ObservableAPI';


import { PublicApiRequestFactory, PublicApiResponseProcessor} from "../apis/PublicApi";
export class PromisePublicApi {
    private api: ObservablePublicApi

    public constructor(
        configuration: Configuration,
        requestFactory?: PublicApiRequestFactory,
        responseProcessor?: PublicApiResponseProcessor
    ) {
        this.api = new ObservablePublicApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Signup for an RBTgen account
     * @param signupInfo Signup Info
     */
    public signup(signupInfo: SignupInfo, options?: Configuration): Promise<void> {
    	const result = this.api.signup(signupInfo, options);
        return result.toPromise();
    }
	
    /**
     * Login to the RBTgen
     * @param loginCredentials Login Credentials
     */
    public userLogin(loginCredentials: LoginCredentials, options?: Configuration): Promise<LoginInfo> {
    	const result = this.api.userLogin(loginCredentials, options);
        return result.toPromise();
    }
	

}



import { ObservableUserApi } from './ObservableAPI';


import { UserApiRequestFactory, UserApiResponseProcessor} from "../apis/UserApi";
export class PromiseUserApi {
    private api: ObservableUserApi

    public constructor(
        configuration: Configuration,
        requestFactory?: UserApiRequestFactory,
        responseProcessor?: UserApiResponseProcessor
    ) {
        this.api = new ObservableUserApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Add schema document
     * @param document schema document upload
     */
    public addSchemaDocument(document: Document, options?: Configuration): Promise<Document> {
    	const result = this.api.addSchemaDocument(document, options);
        return result.toPromise();
    }
	

}


