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
import {
  EntityAttrUpdate,
  EntityAttrUpdateFromJSON,
  EntityAttrUpdateFromJSONTyped,
  EntityAttrUpdateToJSON,
} from "./EntityAttrUpdate";
import {
  WebhookUpdate,
  WebhookUpdateFromJSON,
  WebhookUpdateFromJSONTyped,
  WebhookUpdateToJSON,
} from "./WebhookUpdate";

/**
 *
 * @export
 * @interface EntityUpdate
 */
export interface EntityUpdate {
  /**
   *
   * @type {number}
   * @memberof EntityUpdate
   */
  readonly id: number;
  /**
   *
   * @type {string}
   * @memberof EntityUpdate
   */
  name?: string;
  /**
   *
   * @type {string}
   * @memberof EntityUpdate
   */
  note?: string;
  /**
   *
   * @type {boolean}
   * @memberof EntityUpdate
   */
  isToplevel?: boolean;
  /**
   *
   * @type {Array<EntityAttrUpdate>}
   * @memberof EntityUpdate
   */
  attrs?: Array<EntityAttrUpdate>;
  /**
   *
   * @type {Array<WebhookUpdate>}
   * @memberof EntityUpdate
   */
  webhooks?: Array<WebhookUpdate>;
}

export function EntityUpdateFromJSON(json: any): EntityUpdate {
  return EntityUpdateFromJSONTyped(json, false);
}

export function EntityUpdateFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): EntityUpdate {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: json["id"],
    name: !exists(json, "name") ? undefined : json["name"],
    note: !exists(json, "note") ? undefined : json["note"],
    isToplevel: !exists(json, "is_toplevel") ? undefined : json["is_toplevel"],
    attrs: !exists(json, "attrs")
      ? undefined
      : (json["attrs"] as Array<any>).map(EntityAttrUpdateFromJSON),
    webhooks: !exists(json, "webhooks")
      ? undefined
      : (json["webhooks"] as Array<any>).map(WebhookUpdateFromJSON),
  };
}

export function EntityUpdateToJSON(value?: EntityUpdate | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    name: value.name,
    note: value.note,
    is_toplevel: value.isToplevel,
    attrs:
      value.attrs === undefined
        ? undefined
        : (value.attrs as Array<any>).map(EntityAttrUpdateToJSON),
    webhooks:
      value.webhooks === undefined
        ? undefined
        : (value.webhooks as Array<any>).map(WebhookUpdateToJSON),
  };
}
