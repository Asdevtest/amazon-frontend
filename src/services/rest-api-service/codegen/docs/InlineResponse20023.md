# TestSwagger.InlineResponse20023

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
**lengthCmWarehouse** | **Number** | Что фактически пришло на склад. Кладовщик. | [optional] 
**widthCmWarehouse** | **Number** | Что фактически пришло на склад. Кладовщик. | [optional] 
**heightCmWarehouse** | **Number** | Что фактически пришло на склад. Кладовщик. | [optional] 
**weighGrossKgWarehouse** | **Number** | Что фактически пришло на склад. Кладовщик. | [optional] 
**deliveryTotalPrice** | **Number** | Итого за доставку. | [optional] 
**deliveryTotalPriceChanged** | **Number** | Обновление итога за доставку. | [optional] 
**destinationId** | **String** | id склада - склады куда отправляют  | [optional] 
**logicsTariffId** | **String** | GUID тарифа доставки  | [optional] 
**batchId** | **String** | Сторкипер взявший коробку в работу. | [optional] 
**storekeeperId** | **String** | Сторкипер взявший коробку в работу. | [optional] 
**clientId** | **String** | Клиент владелец товара в коробке в работу. | [optional] 
**createdById** | **String** | Клиент создавший заказ и коробку. | [optional] 
**lastModifiedById** | **String** | GUID любого, кто последний редактировал коробку. | [optional] 
**variationTariff** | [**ApiV1AdminsTasksLightVariationTariff**](ApiV1AdminsTasksLightVariationTariff.md) |  | [optional] 
**createdAt** | **Date** |  | [optional] 
**updatedAt** | **Date** |  | [optional] 
**items** | [**[ApiV1BoxesStorekeepersSentToBatchItems]**](ApiV1BoxesStorekeepersSentToBatchItems.md) | Массив коробок. | [optional] 
**storekeeper** | [**ApiV1AdminsGetProductsByStatusCreatedBy**](ApiV1AdminsGetProductsByStatusCreatedBy.md) |  | [optional] 
**client** | [**ApiV1AdminsGetProductsByStatusCreatedBy**](ApiV1AdminsGetProductsByStatusCreatedBy.md) |  | [optional] 
**createdBy** | [**ApiV1AdminsGetProductsByStatusCreatedBy**](ApiV1AdminsGetProductsByStatusCreatedBy.md) |  | [optional] 
**lastModifiedBy** | [**ApiV1AdminsGetProductsByStatusCreatedBy**](ApiV1AdminsGetProductsByStatusCreatedBy.md) |  | [optional] 
**destination** | [**ApiV1AdminsOrdersDestination**](ApiV1AdminsOrdersDestination.md) |  | [optional] 
**logicsTariff** | [**ApiV1AdminsOrdersLogicsTariff**](ApiV1AdminsOrdersLogicsTariff.md) |  | [optional] 
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




