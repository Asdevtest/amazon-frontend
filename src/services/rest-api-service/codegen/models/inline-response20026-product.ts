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
 * @interface InlineResponse20026Product
 */
export interface InlineResponse20026Product {
    /**
     * 
     * @type {string}
     * @memberof InlineResponse20026Product
     */
    _id?: string;
    /**
     * ASIN продукта
     * @type {string}
     * @memberof InlineResponse20026Product
     */
    asin?: string;
    /**
     * SKU введенным клиентом.
     * @type {string}
     * @memberof InlineResponse20026Product
     */
    skuByClient?: string;
    /**
     * ID магазина продукта
     * @type {string}
     * @memberof InlineResponse20026Product
     */
    shopId?: string;
    /**
     * Массив картинок.
     * @type {Array<string>}
     * @memberof InlineResponse20026Product
     */
    images?: Array<string>;
    /**
     * Заголовок на товар с сайта амазон.
     * @type {string}
     * @memberof InlineResponse20026Product
     */
    amazonTitle?: string;
    /**
     * Баркод
     * @type {string}
     * @memberof InlineResponse20026Product
     */
    barCode?: string;
    /**
     * hsCode продукта.
     * @type {string}
     * @memberof InlineResponse20026Product
     */
    hsCode?: string;
}

