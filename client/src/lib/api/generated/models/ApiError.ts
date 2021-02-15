/**
 * RBTgen API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { HttpFile } from '../http/http';

export class ApiError {
    'errorMessage': string;
    'userMessage': string;
    'data': any;
    'errorCode': ApiErrorErrorCodeEnum;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "errorMessage",
            "baseName": "error_message",
            "type": "string",
            "format": ""
        },
        {
            "name": "userMessage",
            "baseName": "user_message",
            "type": "string",
            "format": ""
        },
        {
            "name": "data",
            "baseName": "data",
            "type": "any",
            "format": ""
        },
        {
            "name": "errorCode",
            "baseName": "error_code",
            "type": "ApiErrorErrorCodeEnum",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return ApiError.attributeTypeMap;
    }
    
    public constructor() {
    }
}


export type ApiErrorErrorCodeEnum = "generic" | "validation_error" ;

