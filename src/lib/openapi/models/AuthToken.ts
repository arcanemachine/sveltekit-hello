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
 * @interface AuthToken
 */
export interface AuthToken {
    /**
     * 
     * @type {string}
     * @memberof AuthToken
     */
    readonly token?: string;
}

/**
 * Check if a given object implements the AuthToken interface.
 */
export function instanceOfAuthToken(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AuthTokenFromJSON(json: any): AuthToken {
    return AuthTokenFromJSONTyped(json, false);
}

export function AuthTokenFromJSONTyped(json: any, ignoreDiscriminator: boolean): AuthToken {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'token': !exists(json, 'token') ? undefined : json['token'],
    };
}

export function AuthTokenToJSON(value?: AuthToken | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
    };
}

