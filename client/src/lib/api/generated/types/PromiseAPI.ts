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
    public addDocument(document: Document, options?: Configuration): Promise<Document> {
    	const result = this.api.addDocument(document, options);
        return result.toPromise();
    }
	
    /**
     * Delete the specified document
     * @param documentId The id of the document to delete
     */
    public deleteDocument(documentId: string, options?: Configuration): Promise<void> {
    	const result = this.api.deleteDocument(documentId, options);
        return result.toPromise();
    }
	
    /**
     * Get the specified document
     * @param documentId The id of the document to get
     * @param includeData if true returned file will contain data.
     */
    public getDocument(documentId: string, includeData?: boolean, options?: Configuration): Promise<Document> {
    	const result = this.api.getDocument(documentId, includeData, options);
        return result.toPromise();
    }
	
    /**
     * Get all the schema documents for a user.
     * @param fileType the document type to fetch
     * @param includeData if true returned files will contain data.
     */
    public getDocuments(fileType: string, includeData?: boolean, options?: Configuration): Promise<Array<Document>> {
    	const result = this.api.getDocuments(fileType, includeData, options);
        return result.toPromise();
    }
	

}



