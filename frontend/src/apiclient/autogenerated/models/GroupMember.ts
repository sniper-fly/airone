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
 * @interface GroupMember
 */
export interface GroupMember {
  /**
   *
   * @type {number}
   * @memberof GroupMember
   */
  id: number;
  /**
   *
   * @type {string}
   * @memberof GroupMember
   */
  username: string;
}

export function GroupMemberFromJSON(json: any): GroupMember {
  return GroupMemberFromJSONTyped(json, false);
}

export function GroupMemberFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): GroupMember {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: json["id"],
    username: json["username"],
  };
}

export function GroupMemberToJSON(value?: GroupMember | null): any {
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