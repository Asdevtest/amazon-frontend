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
 * @interface ApiV1PermissionsShopsV2GuidProducts
 */
export interface ApiV1PermissionsShopsV2GuidProducts {
    /**
     * GUID данной записи в БД.
     * @type {string}
     * @memberof ApiV1PermissionsShopsV2GuidProducts
     */
    _id?: string;
    /**
     * Заголовок на товар с сайта амазон.
     * @type {string}
     * @memberof ApiV1PermissionsShopsV2GuidProducts
     */
    amazonTitle?: string;
    /**
     * ASIN продукта
     * @type {string}
     * @memberof ApiV1PermissionsShopsV2GuidProducts
     */
    asin?: string;
    /**
     * SKU введенным клиентом.
     * @type {string}
     * @memberof ApiV1PermissionsShopsV2GuidProducts
     */
    skuByClient?: string;
    /**
     * Массив картинок.
     * @type {Array<string>}
     * @memberof ApiV1PermissionsShopsV2GuidProducts
     */
    images?: Array<string>;
    /**
     * Selected
     * @type {boolean}
     * @memberof ApiV1PermissionsShopsV2GuidProducts
     */
    selected?: boolean;
}

