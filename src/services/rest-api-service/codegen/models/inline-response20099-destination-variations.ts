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


import { InlineResponse20099Destination } from './inline-response20099-destination';

/**
 * 
 * @export
 * @interface InlineResponse20099DestinationVariations
 */
export interface InlineResponse20099DestinationVariations {
    /**
     * Гуид вариации
     * @type {string}
     * @memberof InlineResponse20099DestinationVariations
     */
    _id?: string;
    /**
     * 
     * @type {InlineResponse20099Destination}
     * @memberof InlineResponse20099DestinationVariations
     */
    destination?: InlineResponse20099Destination;
    /**
     * Минимальный вес, в кг диапазоны вариаций не могут пересекаться
     * @type {number}
     * @memberof InlineResponse20099DestinationVariations
     */
    minWeight?: number;
    /**
     * Максимальный вес, в кг диапазоны вариаций не могут пересекаться
     * @type {number}
     * @memberof InlineResponse20099DestinationVariations
     */
    maxWeight?: number;
    /**
     * Цена в юанях
     * @type {number}
     * @memberof InlineResponse20099DestinationVariations
     */
    pricePerKgRmb?: number;
    /**
     * Цена в долларах
     * @type {number}
     * @memberof InlineResponse20099DestinationVariations
     */
    pricePerKgUsd?: number;
    /**
     * Минимальный вес коробки
     * @type {number}
     * @memberof InlineResponse20099DestinationVariations
     */
    minBoxWeight?: number;
    /**
     * logicsTariffId
     * @type {string}
     * @memberof InlineResponse20099DestinationVariations
     */
    storekeeperTariffLogisticsId?: string;
}

