# TestSwagger.InlineObject15

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**amount** | **Number** | Сколько таких же коробок в одной коробке | [optional] 
**isDraft** | **Boolean** | true - если создаем черновик заказа. | [optional] 
**lengthCmSupplier** | **Number** | Размеры которые назвал поставщик при заказе ( могут отличаться с реальными). | [optional] 
**trackNumberText** | **String** | Текст трек номера | [optional] 
**trackNumberFile** | **String** | Ссылка на фото трек номера | [optional] 
**widthCmSupplier** | **Number** | Размеры которые назвал поставщик при заказе ( могут отличаться с реальными). | [optional] 
**heightCmSupplier** | **Number** | Размеры которые назвал поставщик при заказе ( могут отличаться с реальными). | [optional] 
**weighGrossKgSupplier** | **Number** | Общий вес кг коробки который назвал поставщик. | [optional] 
**lengthCmWarehouse** | **Number** | Что фактически пришло на склад. Кладовщик. | [optional] 
**widthCmWarehouse** | **Number** | Что фактически пришло на склад. Кладовщик. | [optional] 
**heightCmWarehouse** | **Number** | Что фактически пришло на склад. Кладовщик. | [optional] 
**weighGrossKgWarehouse** | **Number** | Что фактически пришло на склад. Кладовщик. | [optional] 
**isShippingLabelAttachedByStorekeeper** | **Boolean** | Поле будет указывать на то что при решении задачи сторкипером на обновление коробок что он проклеил шиппинг лейбл. | [optional] 
**clientComment** | **String** | Комментарии к коробке | [optional] 
**referenceId** | **String** | Дополнительное поле shippingLabel для доставки грузовиками | [optional] 
**storekeeperComment** | **String** | Комментарии к коробке | [optional] 
**fbaShipment** | **String** | Это номер конкретной коробки при отправке в амазон. | [optional] 
**fbaNumber** | **String** | Это номер конкретной коробки при отправке в амазон. | [optional] 
**items** | [**[ApiV1BoxesItems]**](ApiV1BoxesItems.md) | Массив коробок. | 
**images** | **[String]** | Массив ссылок на фотографии. | [optional] 
**destinationId** | **String** | destination GUID  | [optional] 
**logicsTariffId** | **String** | GUID тарифа доставки  | [optional] 
**storekeeperId** | **String** | GUID сторкипера | [optional] 


