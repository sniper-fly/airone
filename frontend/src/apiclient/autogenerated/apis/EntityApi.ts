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
import {
  EntityWithAttr,
  EntityWithAttrFromJSON,
  EntityWithAttrToJSON,
  EntryCreate,
  EntryCreateFromJSON,
  EntryCreateToJSON,
  PaginatedEntityWithAttrList,
  PaginatedEntityWithAttrListFromJSON,
  PaginatedEntityWithAttrListToJSON,
  PaginatedEntryBaseList,
  PaginatedEntryBaseListFromJSON,
  PaginatedEntryBaseListToJSON,
} from "../models";

export interface EntityApiV2EntitiesListRequest {
  isTopLevel?: boolean;
  limit?: number;
  offset?: number;
  query?: string;
}

export interface EntityApiV2EntitiesRetrieveRequest {
  id: number;
  isTopLevel?: boolean;
  query?: string;
}

export interface EntityApiV2EntriesCreateRequest {
  entityId: number;
  entryCreate: EntryCreate;
}

export interface EntityApiV2EntriesListRequest {
  entityId: number;
  isActive?: boolean;
  ordering?: string;
  page?: number;
  search?: string;
}

/**
 *
 */
export class EntityApi extends runtime.BaseAPI {
  /**
   */
  async entityApiV2EntitiesListRaw(
    requestParameters: EntityApiV2EntitiesListRequest,
    initOverrides?: RequestInit
  ): Promise<runtime.ApiResponse<PaginatedEntityWithAttrList>> {
    const queryParameters: any = {};

    if (requestParameters.isTopLevel !== undefined) {
      queryParameters["is_top_level"] = requestParameters.isTopLevel;
    }

    if (requestParameters.limit !== undefined) {
      queryParameters["limit"] = requestParameters.limit;
    }

    if (requestParameters.offset !== undefined) {
      queryParameters["offset"] = requestParameters.offset;
    }

    if (requestParameters.query !== undefined) {
      queryParameters["query"] = requestParameters.query;
    }

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
        path: `/entity/api/v2/entities`,
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      PaginatedEntityWithAttrListFromJSON(jsonValue)
    );
  }

  /**
   */
  async entityApiV2EntitiesList(
    requestParameters: EntityApiV2EntitiesListRequest = {},
    initOverrides?: RequestInit
  ): Promise<PaginatedEntityWithAttrList> {
    const response = await this.entityApiV2EntitiesListRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   */
  async entityApiV2EntitiesRetrieveRaw(
    requestParameters: EntityApiV2EntitiesRetrieveRequest,
    initOverrides?: RequestInit
  ): Promise<runtime.ApiResponse<EntityWithAttr>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling entityApiV2EntitiesRetrieve."
      );
    }

    const queryParameters: any = {};

    if (requestParameters.isTopLevel !== undefined) {
      queryParameters["is_top_level"] = requestParameters.isTopLevel;
    }

    if (requestParameters.query !== undefined) {
      queryParameters["query"] = requestParameters.query;
    }

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
        path: `/entity/api/v2/entities/{id}`.replace(
          `{${"id"}}`,
          encodeURIComponent(String(requestParameters.id))
        ),
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      EntityWithAttrFromJSON(jsonValue)
    );
  }

  /**
   */
  async entityApiV2EntitiesRetrieve(
    requestParameters: EntityApiV2EntitiesRetrieveRequest,
    initOverrides?: RequestInit
  ): Promise<EntityWithAttr> {
    const response = await this.entityApiV2EntitiesRetrieveRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   */
  async entityApiV2EntriesCreateRaw(
    requestParameters: EntityApiV2EntriesCreateRequest,
    initOverrides?: RequestInit
  ): Promise<runtime.ApiResponse<EntryCreate>> {
    if (
      requestParameters.entityId === null ||
      requestParameters.entityId === undefined
    ) {
      throw new runtime.RequiredError(
        "entityId",
        "Required parameter requestParameters.entityId was null or undefined when calling entityApiV2EntriesCreate."
      );
    }

    if (
      requestParameters.entryCreate === null ||
      requestParameters.entryCreate === undefined
    ) {
      throw new runtime.RequiredError(
        "entryCreate",
        "Required parameter requestParameters.entryCreate was null or undefined when calling entityApiV2EntriesCreate."
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

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
        path: `/entity/api/v2/{entity_id}/entries/`.replace(
          `{${"entity_id"}}`,
          encodeURIComponent(String(requestParameters.entityId))
        ),
        method: "POST",
        headers: headerParameters,
        query: queryParameters,
        body: EntryCreateToJSON(requestParameters.entryCreate),
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      EntryCreateFromJSON(jsonValue)
    );
  }

  /**
   */
  async entityApiV2EntriesCreate(
    requestParameters: EntityApiV2EntriesCreateRequest,
    initOverrides?: RequestInit
  ): Promise<EntryCreate> {
    const response = await this.entityApiV2EntriesCreateRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   */
  async entityApiV2EntriesListRaw(
    requestParameters: EntityApiV2EntriesListRequest,
    initOverrides?: RequestInit
  ): Promise<runtime.ApiResponse<PaginatedEntryBaseList>> {
    if (
      requestParameters.entityId === null ||
      requestParameters.entityId === undefined
    ) {
      throw new runtime.RequiredError(
        "entityId",
        "Required parameter requestParameters.entityId was null or undefined when calling entityApiV2EntriesList."
      );
    }

    const queryParameters: any = {};

    if (requestParameters.isActive !== undefined) {
      queryParameters["is_active"] = requestParameters.isActive;
    }

    if (requestParameters.ordering !== undefined) {
      queryParameters["ordering"] = requestParameters.ordering;
    }

    if (requestParameters.page !== undefined) {
      queryParameters["page"] = requestParameters.page;
    }

    if (requestParameters.search !== undefined) {
      queryParameters["search"] = requestParameters.search;
    }

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
        path: `/entity/api/v2/{entity_id}/entries/`.replace(
          `{${"entity_id"}}`,
          encodeURIComponent(String(requestParameters.entityId))
        ),
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      PaginatedEntryBaseListFromJSON(jsonValue)
    );
  }

  /**
   */
  async entityApiV2EntriesList(
    requestParameters: EntityApiV2EntriesListRequest,
    initOverrides?: RequestInit
  ): Promise<PaginatedEntryBaseList> {
    const response = await this.entityApiV2EntriesListRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }
}