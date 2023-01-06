/* tslint:disable */
/* eslint-disable */
/**
 * Todo List API
 * A basic todo list API.
 *
 * The version of the OpenAPI document: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface CsrfmiddlewaretokenRequest
 */
export interface CsrfmiddlewaretokenRequest {
    /**
     * 
     * @type {string}
     * @memberof CsrfmiddlewaretokenRequest
     */
    csrfmiddlewaretoken: string;
}

/**
 * Check if a given object implements the CsrfmiddlewaretokenRequest interface.
 */
export function instanceOfCsrfmiddlewaretokenRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "csrfmiddlewaretoken" in value;

    return isInstance;
}

export function CsrfmiddlewaretokenRequestFromJSON(json: any): CsrfmiddlewaretokenRequest {
    return CsrfmiddlewaretokenRequestFromJSONTyped(json, false);
}

export function CsrfmiddlewaretokenRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): CsrfmiddlewaretokenRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'csrfmiddlewaretoken': json['csrfmiddlewaretoken'],
    };
}

export function CsrfmiddlewaretokenRequestToJSON(value?: CsrfmiddlewaretokenRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'csrfmiddlewaretoken': value.csrfmiddlewaretoken,
    };
}

