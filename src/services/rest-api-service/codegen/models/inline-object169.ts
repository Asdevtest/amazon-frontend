/* tslint:disable */
/* eslint-disable */
/**
 * Test swagger
 * testing the fastify swagger api
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import { ApiV1RequestProposalsCustomGuidResultEditMedia } from './api-v1-request-proposals-custom-guid-result-edit-media';
import { ApiV1RequestProposalsCustomGuidResultEditSourceFiles } from './api-v1-request-proposals-custom-guid-result-edit-source-files';

/**
 * 
 * @export
 * @interface InlineObject169
 */
export interface InlineObject169 {
    /**
     * Результат работы исполнителя.
     * @type {string}
     * @memberof InlineObject169
     */
    result?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof InlineObject169
     */
    linksToMediaFiles?: Array<string>;
    /**
     * 
     * @type {Array<ApiV1RequestProposalsCustomGuidResultEditMedia>}
     * @memberof InlineObject169
     */
    media?: Array<ApiV1RequestProposalsCustomGuidResultEditMedia>;
    /**
     * ключ с Амазона
     * @type {string}
     * @memberof InlineObject169
     */
    amazonOrderId?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof InlineObject169
     */
    publicationLinks?: Array<string>;
    /**
     * 
     * @type {Array<ApiV1RequestProposalsCustomGuidResultEditSourceFiles>}
     * @memberof InlineObject169
     */
    sourceFiles?: Array<ApiV1RequestProposalsCustomGuidResultEditSourceFiles>;
}

