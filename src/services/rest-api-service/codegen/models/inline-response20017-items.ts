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


import { InlineResponse20017Order } from './inline-response20017-order';
import { InlineResponse20017Product } from './inline-response20017-product';

/**
 * 
 * @export
 * @interface InlineResponse20017Items
 */
export interface InlineResponse20017Items {
    /**
     * GUID айтема.
     * @type {string}
     * @memberof InlineResponse20017Items
     */
    _id?: string;
    /**
     * Кол-во продукта
     * @type {number}
     * @memberof InlineResponse20017Items
     */
    amount?: number;
    /**
     * Штрихкод продукта
     * @type {string}
     * @memberof InlineResponse20017Items
     */
    barCode?: string;
    /**
     * Прикреплен ли баркод к коробке сотрудником склада.
     * @type {boolean}
     * @memberof InlineResponse20017Items
     */
    isBarCodeAttachedByTheStorekeeper?: boolean;
    /**
     * Кнопка в заказе, сообщающая складу что штрихкод на товар поклеен у поставщика.
     * @type {boolean}
     * @memberof InlineResponse20017Items
     */
    isBarCodeAlreadyAttachedByTheSupplier?: boolean;
    /**
     * Защита листинга
     * @type {string}
     * @memberof InlineResponse20017Items
     */
    transparencyFile?: string;
    /**
     * Прикреплена ли защита листинга файлов к коробке сотрудником склада.
     * @type {boolean}
     * @memberof InlineResponse20017Items
     */
    isTransparencyFileAttachedByTheStorekeeper?: boolean;
    /**
     * Кнопка в заказе, сообщающая складу что защита листинга на товар поклеен у поставщика
     * @type {boolean}
     * @memberof InlineResponse20017Items
     */
    isTransparencyFileAlreadyAttachedByTheSupplier?: boolean;
    /**
     * 
     * @type {InlineResponse20017Product}
     * @memberof InlineResponse20017Items
     */
    product?: InlineResponse20017Product;
    /**
     * 
     * @type {InlineResponse20017Order}
     * @memberof InlineResponse20017Items
     */
    order?: InlineResponse20017Order;
}

