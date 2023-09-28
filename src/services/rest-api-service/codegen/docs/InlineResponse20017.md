# TestSwagger.InlineResponse20017

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**_id** | **String** | GUID коробки. | [optional] 
**humanFriendlyId** | **Number** | Номер коробки. | [optional] 
**amount** | **Number** | Количества в коробке. | [optional] 
**status** | **String** | Статус коробки | [optional] 
**isActual** | **Boolean** | Если false - значит коробку расформировали. Удалить совсем нельзя, для того что бы можно было восстановить по кодам. | [optional] 
**isDraft** | **Boolean** | Если true - значит коробку черновик. | [optional] 
**isFormed** | **Boolean** | Сформирована ли коробка | [optional] 
**shippingLabel** | **String** | Ссылка на наклейку для коробки | [optional] 
**trackNumberText** | **String** | Текст трек номера | [optional] 
**trackNumberFile** | **[String]** |  | [optional] 
**prepId** | **String** | Значение информационного ключа | [optional] 
**upsTrackNumber** | **String** | Идентификатор UPS | [optional] 
**referenceId** | **String** | Дополнительное поле shippingLabel для доставки грузовиками | [optional] 
**clientComment** | **String** | Комментарии к коробке | [optional] 
**storekeeperComment** | **String** | Комментарии к коробке | [optional] 
**lengthCmWarehouse** | **Number** | Что фактически пришло на склад. Кладовщик. | [optional] 
**widthCmWarehouse** | **Number** | Что фактически пришло на склад. Кладовщик. | [optional] 
**heightCmWarehouse** | **Number** | Что фактически пришло на склад. Кладовщик. | [optional] 
**weighGrossKgWarehouse** | **Number** | Что фактически пришло на склад. Кладовщик. | [optional] 
**isShippingLabelAttachedByStorekeeper** | **Boolean** | Поле будет указывать на то что при решении задачи сторкипером на обновление коробок что он проклеил шиппинг лейбл. | [optional] 
**fbaShipment** | **String** | Это номер конкретной коробки при отправке в амазон. | [optional] 
**fbaNumber** | **String** | Это номер конкретной коробки при отправке в амазон. | [optional] 
**images** | **[String]** | Массив картинок. | [optional] 
**updatedAt** | **Date** |  | [optional] 
**variationTariff** | [**ApiV1AdminsTasksLightVariationTariff**](ApiV1AdminsTasksLightVariationTariff.md) |  | [optional] 
**items** | [**[InlineResponse20017Items]**](InlineResponse20017Items.md) | Массив коробок. | [optional] 
**sub** | [**ApiV1AdminsGetProductsByStatusCreatedBy**](ApiV1AdminsGetProductsByStatusCreatedBy.md) |  | [optional] 
**storekeeper** | [**ApiV1AdminsGetProductsByStatusCreatedBy**](ApiV1AdminsGetProductsByStatusCreatedBy.md) |  | [optional] 
**client** | [**ApiV1AdminsGetProductsByStatusCreatedBy**](ApiV1AdminsGetProductsByStatusCreatedBy.md) |  | [optional] 
**destination** | [**InlineResponse20017Destination**](InlineResponse20017Destination.md) |  | [optional] 
**logicsTariff** | [**InlineResponse20017LogicsTariff**](InlineResponse20017LogicsTariff.md) |  | [optional] 
**batch** | [**ApiV1BatchesBatch**](ApiV1BatchesBatch.md) |  | [optional] 



## Enum: StatusEnum


* `NEW` (value: `"NEW"`)

* `IN_STOCK` (value: `"IN_STOCK"`)

* `REQUESTED_SEND_TO_BATCH` (value: `"REQUESTED_SEND_TO_BATCH"`)

* `NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE` (value: `"NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE"`)

* `IN_BATCH` (value: `"IN_BATCH"`)

* `NEED_TO_UPDATE_THE_TARIFF` (value: `"NEED_TO_UPDATE_THE_TARIFF"`)

* `IN_BATCH_ON_THE_WAY` (value: `"IN_BATCH_ON_THE_WAY"`)

* `FINISH_PREP_CENTR_USA` (value: `"FINISH_PREP_CENTR_USA"`)

* `ACCEPTED_IN_PROCESSING` (value: `"ACCEPTED_IN_PROCESSING"`)




