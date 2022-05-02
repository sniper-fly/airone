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

import * as runtime from "../runtime";

export interface RoleApiV1DestroyRequest {
  roleId: number;
}

/**
 *
 */
export class RoleApi extends runtime.BaseAPI {
  /**
   */
  async roleApiV1DestroyRaw(
    requestParameters: RoleApiV1DestroyRequest,
    initOverrides?: RequestInit
  ): Promise<runtime.ApiResponse<void>> {
    if (
      requestParameters.roleId === null ||
      requestParameters.roleId === undefined
    ) {
      throw new runtime.RequiredError(
        "roleId",
        "Required parameter requestParameters.roleId was null or undefined when calling roleApiV1Destroy."
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    if (
      this.configuration &&
      (this.configuration.username !== undefined ||
        this.configuration.password !== undefined)
    ) {
      headerParameters["Authorization"] =
        "Basic " +
        btoa(this.configuration.username + ":" + this.configuration.password);
    }
    if (this.configuration && this.configuration.apiKey) {
      headerParameters["Authorization"] =
        this.configuration.apiKey("Authorization"); // tokenAuth authentication
    }

    const response = await this.request(
      {
        path: `/role/api/v1/{role_id}/`.replace(
          `{${"role_id"}}`,
          encodeURIComponent(String(requestParameters.roleId))
        ),
        method: "DELETE",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   */
  async roleApiV1Destroy(
    requestParameters: RoleApiV1DestroyRequest,
    initOverrides?: RequestInit
  ): Promise<void> {
    await this.roleApiV1DestroyRaw(requestParameters, initOverrides);
  }
}