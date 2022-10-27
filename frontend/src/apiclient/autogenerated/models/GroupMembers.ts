/* tslint:disable */
/* eslint-disable */
/**
 *
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from "../runtime";
/**
 *
 * @export
 * @interface GroupMembers
 */
export interface GroupMembers {
  /**
   *
   * @type {number}
   * @memberof GroupMembers
   */
  id?: number;
  /**
   *
   * @type {string}
   * @memberof GroupMembers
   */
  username?: string;
}

export function GroupMembersFromJSON(json: any): GroupMembers {
  return GroupMembersFromJSONTyped(json, false);
}

export function GroupMembersFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): GroupMembers {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: !exists(json, "id") ? undefined : json["id"],
    username: !exists(json, "username") ? undefined : json["username"],
  };
}

export function GroupMembersToJSON(value?: GroupMembers | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    id: value.id,
    username: value.username,
  };
}