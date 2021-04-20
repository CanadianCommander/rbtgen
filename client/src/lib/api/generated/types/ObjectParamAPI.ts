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

export interface UserApiAddDocumentRequest {
    /**
     * schema document upload
     * @type Document
     * @memberof UserApiaddDocument
     */
    document: Document
}

export interface UserApiDeleteDocumentRequest {
    /**
     * The id of the document to delete
     * @type string
     * @memberof UserApideleteDocument
     */
    documentId: string
}

export interface UserApiGetDocumentRequest {
    /**
     * The id of the document to get
     * @type string
     * @memberof UserApigetDocument
     */
    documentId: string
    /**
     * if true returned file will contain data.
     * @type boolean
     * @memberof UserApigetDocument
     */
    includeData?: boolean
}

export interface UserApiGetDocumentsRequest {
    /**
     * the document type to fetch
     * @type string
     * @memberof UserApigetDocuments
     */
    fileType: string
    /**
     * If provided only files matching this name will be returned
     * @type string
     * @memberof UserApigetDocuments
     */
    fileName?: string
    /**
     * if true returned files will contain data.
     * @type boolean
     * @memberof UserApigetDocuments
     */
    includeData?: boolean
}

export interface UserApiUpdateDocumentRequest {
    /**
     * The id of the document to get
     * @type string
     * @memberof UserApiupdateDocument
     */
    documentId: string
    /**
     * document data to update with
     * @type Document
     * @memberof UserApiupdateDocument
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
    public addDocument(param: UserApiAddDocumentRequest, options?: Configuration): Promise<Document> {
        return this.api.addDocument(param.document,  options).toPromise();
    }

    /**
     * Delete the specified document
     * @param param the request object
     */
    public deleteDocument(param: UserApiDeleteDocumentRequest, options?: Configuration): Promise<void> {
        return this.api.deleteDocument(param.documentId,  options).toPromise();
    }

    /**
     * Get the specified document
     * @param param the request object
     */
    public getDocument(param: UserApiGetDocumentRequest, options?: Configuration): Promise<Document> {
        return this.api.getDocument(param.documentId, param.includeData,  options).toPromise();
    }

    /**
     * Get all the schema documents for a user.
     * @param param the request object
     */
    public getDocuments(param: UserApiGetDocumentsRequest, options?: Configuration): Promise<Array<Document>> {
        return this.api.getDocuments(param.fileType, param.fileName, param.includeData,  options).toPromise();
    }

    /**
     * update a document
     * @param param the request object
     */
    public updateDocument(param: UserApiUpdateDocumentRequest, options?: Configuration): Promise<Document> {
        return this.api.updateDocument(param.documentId, param.document,  options).toPromise();
    }

}
