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
 * @interface RoleImportExportChild
 */
export interface RoleImportExportChild {
  /**
   *
   * @type {number}
   * @memberof RoleImportExportChild
   */
  readonly id: number;
  /**
   *
   * @type {string}
   * @memberof RoleImportExportChild
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof RoleImportExportChild
   */
  description?: string;
  /**
   *
   * @type {Array<string>}
   * @memberof RoleImportExportChild
   */
  users: Array<string>;
  /**
   *
   * @type {Array<string>}
   * @memberof RoleImportExportChild
   */
  groups: Array<string>;
  /**
   *
   * @type {Array<string>}
   * @memberof RoleImportExportChild
   */
  adminUsers: Array<string>;
  /**
   *
   * @type {Array<string>}
   * @memberof RoleImportExportChild
   */
  adminGroups: Array<string>;
}

export function RoleImportExportChildFromJSON(
  json: any
): RoleImportExportChild {
  return RoleImportExportChildFromJSONTyped(json, false);
}

export function RoleImportExportChildFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): RoleImportExportChild {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: json["id"],
    name: json["name"],
    description: !exists(json, "description") ? undefined : json["description"],
    users: json["users"],
    groups: json["groups"],
    adminUsers: json["admin_users"],
    adminGroups: json["admin_groups"],
  };
}

export function RoleImportExportChildToJSON(
  value?: RoleImportExportChild | null
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    name: value.name,
    description: value.description,
    users: value.users,
    groups: value.groups,
    admin_users: value.adminUsers,
    admin_groups: value.adminGroups,
  };
}