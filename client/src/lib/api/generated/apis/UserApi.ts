// TODO: better import syntax?
import { BaseAPIRequestFactory, RequiredError } from './baseapi';
import {Configuration} from '../configuration';
import { RequestContext, HttpMethod, ResponseContext, HttpFile} from '../http/http';
import {ObjectSerializer} from '../models/ObjectSerializer';
import {ApiException} from './exception';
import {isCodeInRange} from '../util';

import { ApiError } from '../models/ApiError';
import { Document } from '../models/Document';

/**
 * no description
 */
export class UserApiRequestFactory extends BaseAPIRequestFactory {
	
    /**
     * Add schema document
     * @param document schema document upload
     */
    public async addSchemaDocument(document: Document, options?: Configuration): Promise<RequestContext> {
		let config = options || this.configuration;
		
        // verify required parameter 'document' is not null or undefined
        if (document === null || document === undefined) {
            throw new RequiredError('Required parameter document was null or undefined when calling addSchemaDocument.');
        }

		
		// Path Params
    	const localVarPath = '/authenticated/user/document/schema/';

		// Make Request Context
    	const requestContext = config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
	
		// Header Params
	
		// Form Params


		// Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(document, "Document", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        // Apply auth methods

        return requestContext;
    }

}



export class UserApiResponseProcessor {

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to addSchemaDocument
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async addSchemaDocument(response: ResponseContext): Promise<Document > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: Document = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Document", ""
            ) as Document;
            return body;
        }
        if (isCodeInRange("400", response.httpStatusCode)) {
            const body: ApiError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ApiError", ""
            ) as ApiError;
            throw new ApiException<ApiError>(400, body);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: Document = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Document", ""
            ) as Document;
            return body;
        }

        let body = response.body || "";
    	throw new ApiException<string>(response.httpStatusCode, "Unknown API Status Code!\nBody: \"" + body + "\"");
    }
			
}
