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


import { InlineResponse20049MetaActiveLaunches } from './inline-response20049-meta-active-launches';
import { InlineResponse20049MetaProduct } from './inline-response20049-meta-product';

/**
 * 
 * @export
 * @interface InlineResponse20049Meta
 */
export interface InlineResponse20049Meta {
    /**
     * 
     * @type {InlineResponse20049MetaProduct}
     * @memberof InlineResponse20049Meta
     */
    product?: InlineResponse20049MetaProduct;
    /**
     * 
     * @type {Array<InlineResponse20049MetaActiveLaunches>}
     * @memberof InlineResponse20049Meta
     */
    activeLaunches?: Array<InlineResponse20049MetaActiveLaunches>;
}

