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
 * @interface EntityAttrUpdate
 */
export interface EntityAttrUpdate {
  /**
   *
   * @type {number}
   * @memberof EntityAttrUpdate
   */
  id?: number;
  /**
   *
   * @type {string}
   * @memberof EntityAttrUpdate
   */
  name?: string;
  /**
   *
   * @type {number}
   * @memberof EntityAttrUpdate
   */
  type?: number;
  /**
   *
   * @type {boolean}
   * @memberof EntityAttrUpdate
   */
  isMandatory?: boolean;
  /**
   *
   * @type {Array<number>}
   * @memberof EntityAttrUpdate
   */
  referral?: Array<number>;
  /**
   *
   * @type {number}
   * @memberof EntityAttrUpdate
   */
  index?: number;
  /**
   *
   * @type {boolean}
   * @memberof EntityAttrUpdate
   */
  isSummarized?: boolean;
  /**
   *
   * @type {boolean}
   * @memberof EntityAttrUpdate
   */
  isDeleteInChain?: boolean;
  /**
   *
   * @type {boolean}
   * @memberof EntityAttrUpdate
   */
  isDeleted?: boolean;
}

export function EntityAttrUpdateFromJSON(json: any): EntityAttrUpdate {
  return EntityAttrUpdateFromJSONTyped(json, false);
}

export function EntityAttrUpdateFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): EntityAttrUpdate {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: !exists(json, "id") ? undefined : json["id"],
    name: !exists(json, "name") ? undefined : json["name"],
    type: !exists(json, "type") ? undefined : json["type"],
    isMandatory: !exists(json, "is_mandatory")
      ? undefined
      : json["is_mandatory"],
    referral: !exists(json, "referral") ? undefined : json["referral"],
    index: !exists(json, "index") ? undefined : json["index"],
    isSummarized: !exists(json, "is_summarized")
      ? undefined
      : json["is_summarized"],
    isDeleteInChain: !exists(json, "is_delete_in_chain")
      ? undefined
      : json["is_delete_in_chain"],
    isDeleted: !exists(json, "is_deleted") ? undefined : json["is_deleted"],
  };
}

export function EntityAttrUpdateToJSON(value?: EntityAttrUpdate | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    id: value.id,
    name: value.name,
    type: value.type,
    is_mandatory: value.isMandatory,
    referral: value.referral,
    index: value.index,
    is_summarized: value.isSummarized,
    is_delete_in_chain: value.isDeleteInChain,
    is_deleted: value.isDeleted,
  };
}
