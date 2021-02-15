import { ResponseContext, RequestContext, HttpFile } from '../http/http';
import * as models from '../models/all';
import { Configuration} from '../configuration'
import { Observable, of, from } from '../rxjsStub';
import {mergeMap, map} from  '../rxjsStub';

import { ApiError } from '../models/ApiError';
import { AuthToken } from '../models/AuthToken';
import { LoginCredentials } from '../models/LoginCredentials';

import { PublicApiRequestFactory, PublicApiResponseProcessor} from "../apis/PublicApi";
export class ObservablePublicApi {
    private requestFactory: PublicApiRequestFactory;
    private responseProcessor: PublicApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: PublicApiRequestFactory,
        responseProcessor?: PublicApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new PublicApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new PublicApiResponseProcessor();
    }

    /**
     * Login to the RBTgen
     * @param loginCredentials Login Credentials
     */
    public userLogin(loginCredentials: LoginCredentials, options?: Configuration): Observable<AuthToken> {
    	const requestContextPromise = this.requestFactory.userLogin(loginCredentials, options);

		// build promise chain
    let middlewarePreObservable = from<RequestContext>(requestContextPromise);
    	for (let middleware of this.configuration.middleware) {
    		middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
    	}

    	return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
	    	pipe(mergeMap((response: ResponseContext) => {
	    		let middlewarePostObservable = of(response);
	    		for (let middleware of this.configuration.middleware) {
	    			middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
	    		}
	    		return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.userLogin(rsp)));
	    	}));
    }
	

}



