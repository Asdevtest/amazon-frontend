# TestSwagger.ApiV1BoxesMergeBoxBody

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**shippingLabel** | **String** | Ссылка на наклейку для коробки | [optional] 
**destinationId** | **String** | id склада - склады куда отправляют. | [optional] 
**logicsTariffId** | **String** | id тарифа доставки. | 
**variationTariffId** | **String** | Гуид вариации | [optional] 
**fbaShipment** | **String** | Это номер конкретной коробки при отправке в амазон. | [optional] 
**fbaNumber** | **String** | Это номер конкретной коробки при отправке в амазон. | [optional] 
**lengthCmWarehouse** | **Number** | Что фактически пришло на склад. Кладовщик. | [optional] 
**widthCmWarehouse** | **Number** | Что фактически пришло на склад. Кладовщик. | [optional] 
**heightCmWarehouse** | **Number** | Что фактически пришло на склад. Кладовщик. | [optional] 
**weighGrossKgWarehouse** | **Number** | Что фактически пришло на склад. Кладовщик. | [optional] 
**isShippingLabelAttachedByStorekeeper** | **Boolean** | Поле будет указывать на то что при решении задачи сторкипером на обновление коробок что он проклеил шиппинг лейбл. | [optional] 
**images** | **[String]** | Массив картинок. | [optional] 


