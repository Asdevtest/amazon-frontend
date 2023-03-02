# TestSwagger.InlineResponse20015

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**_id** | **String** | GUID коробки. | [optional] 
**humanFriendlyId** | **Number** | Номер коробки. | [optional] 
**amount** | **Number** | ККоличества в коробке. | [optional] 
**status** | **String** | Статус коробки | [optional] 
**isActual** | **Boolean** | Если false - значит коробку расформировали. Удалить совсем нельзя, для того что бы можно было восстановить по кодам. | [optional] 
**isDraft** | **Boolean** | Если true - значит коробку черновик. | [optional] 
**isFormed** | **Boolean** | Сформирована ли коробка | [optional] 
**shippingLabel** | **String** | Ссылка на наклейку для коробки | [optional] 
**trackNumberText** | **String** | Текст трек номера | [optional] 
**trackNumberFile** | **String** | Ссылка на фото трек номера | [optional] 
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
**deliveryTotalPrice** | **Number** | Итого за доставку. | [optional] 
**deliveryTotalPriceChanged** | **Number** | Обновление итога за доставку. | [optional] 
**images** | **[String]** | Массив картинок. | [optional] 
**createdAt** | **Date** |  | [optional] 
**updatedAt** | **Date** |  | [optional] 
**items** | [**[ApiV1BoxesClientsLightItems]**](ApiV1BoxesClientsLightItems.md) | Массив коробок. | [optional] 
**storekeeper** | [**ApiV1AdminsGetProductsByStatusCreatedBy**](ApiV1AdminsGetProductsByStatusCreatedBy.md) |  | [optional] 
**client** | [**ApiV1AdminsGetProductsByStatusCreatedBy**](ApiV1AdminsGetProductsByStatusCreatedBy.md) |  | [optional] 
**createdBy** | [**ApiV1AdminsGetProductsByStatusCreatedBy**](ApiV1AdminsGetProductsByStatusCreatedBy.md) |  | [optional] 
**destination** | [**ApiV1BoxesClientsLightDestination**](ApiV1BoxesClientsLightDestination.md) |  | [optional] 
**logicsTariff** | [**ApiV1BoxesClientsInTransferGuidLogicsTariff**](ApiV1BoxesClientsInTransferGuidLogicsTariff.md) |  | [optional] 
**batch** | [**ApiV1BoxesClientsInTransferGuidBatch**](ApiV1BoxesClientsInTransferGuidBatch.md) |  | [optional] 


