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
 * @interface InlineResponse20078Products
 */
export interface InlineResponse20078Products {
    /**
     * GUID данной записи в БД.
     * @type {string}
     * @memberof InlineResponse20078Products
     */
    _id?: string;
    /**
     * Заголовок на товар с сайта амазон.
     * @type {string}
     * @memberof InlineResponse20078Products
     */
    amazonTitle?: string;
    /**
     * ASIN продукта
     * @type {string}
     * @memberof InlineResponse20078Products
     */
    asin?: string;
    /**
     * SKU введенным клиентом.
     * @type {string}
     * @memberof InlineResponse20078Products
     */
    skuByClient?: string;
    /**
     * Массив картинок.
     * @type {Array<string>}
     * @memberof InlineResponse20078Products
     */
    images?: Array<string>;
    /**
     * Selected
     * @type {boolean}
     * @memberof InlineResponse20078Products
     */
    selected?: boolean;
}

