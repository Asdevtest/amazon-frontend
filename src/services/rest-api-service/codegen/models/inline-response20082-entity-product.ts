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



/**
 * 
 * @export
 * @interface InlineResponse20082EntityProduct
 */
export interface InlineResponse20082EntityProduct {
    /**
     * GUID продукта в базе данных
     * @type {string}
     * @memberof InlineResponse20082EntityProduct
     */
    _id?: string;
    /**
     * ASIN продукта
     * @type {string}
     * @memberof InlineResponse20082EntityProduct
     */
    asin?: string;
    /**
     * SKU введенным клиентом.
     * @type {string}
     * @memberof InlineResponse20082EntityProduct
     */
    skuByClient?: string;
    /**
     * Массив картинок.
     * @type {Array<string>}
     * @memberof InlineResponse20082EntityProduct
     */
    images?: Array<string>;
    /**
     * Описание amazon title
     * @type {string}
     * @memberof InlineResponse20082EntityProduct
     */
    amazonTitle?: string;
}

