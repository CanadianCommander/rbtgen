import { ResponseContext, RequestContext, HttpFile } from '../http/http';
import * as models from '../models/all';
import { Configuration} from '../configuration'

import { ApiError } from '../models/ApiError';
import { AuthToken } from '../models/AuthToken';
import { LoginCredentials } from '../models/LoginCredentials';
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
     * Login to the RBTgen
     * @param loginCredentials Login Credentials
     */
    public userLogin(loginCredentials: LoginCredentials, options?: Configuration): Promise<AuthToken> {
    	const result = this.api.userLogin(loginCredentials, options);
        return result.toPromise();
    }
	

}



