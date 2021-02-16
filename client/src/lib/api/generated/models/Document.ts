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

export class Document {
    'id'?: string;
    'fileName': string;
    'fileData'?: string;
    'fileType': DocumentFileTypeEnum;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "id",
            "baseName": "id",
            "type": "string",
            "format": "uuid"
        },
        {
            "name": "fileName",
            "baseName": "file_name",
            "type": "string",
            "format": ""
        },
        {
            "name": "fileData",
            "baseName": "file_data",
            "type": "string",
            "format": "byte"
        },
        {
            "name": "fileType",
            "baseName": "file_type",
            "type": "DocumentFileTypeEnum",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return Document.attributeTypeMap;
    }
    
    public constructor() {
    }
}


export type DocumentFileTypeEnum = "db_schema" | "rbt" ;

