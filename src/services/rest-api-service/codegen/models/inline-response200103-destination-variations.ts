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


import { InlineResponse200103Destination } from './inline-response200103-destination';

/**
 * 
 * @export
 * @interface InlineResponse200103DestinationVariations
 */
export interface InlineResponse200103DestinationVariations {
    /**
     * Гуид вариации
     * @type {string}
     * @memberof InlineResponse200103DestinationVariations
     */
    _id?: string;
    /**
     * 
     * @type {InlineResponse200103Destination}
     * @memberof InlineResponse200103DestinationVariations
     */
    destination?: InlineResponse200103Destination;
    /**
     * Минимальный вес, в кг диапазоны вариаций не могут пересекаться
     * @type {number}
     * @memberof InlineResponse200103DestinationVariations
     */
    minWeight?: number;
    /**
     * Максимальный вес, в кг диапазоны вариаций не могут пересекаться
     * @type {number}
     * @memberof InlineResponse200103DestinationVariations
     */
    maxWeight?: number;
    /**
     * Цена в юанях
     * @type {number}
     * @memberof InlineResponse200103DestinationVariations
     */
    pricePerKgRmb?: number;
    /**
     * Цена в долларах
     * @type {number}
     * @memberof InlineResponse200103DestinationVariations
     */
    pricePerKgUsd?: number;
    /**
     * Минимальный вес коробки
     * @type {number}
     * @memberof InlineResponse200103DestinationVariations
     */
    minBoxWeight?: number;
    /**
     * logicsTariffId
     * @type {string}
     * @memberof InlineResponse200103DestinationVariations
     */
    storekeeperTariffLogisticsId?: string;
}

