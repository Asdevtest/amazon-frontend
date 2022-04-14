# TestSwagger.ApiV1BatchesBoxes

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**_id** | **String** | GUID коробки. | [optional] 
**humanFriendlyId** | **Number** | Номер коробки. | [optional] 
**amount** | **Number** | ККоличества в коробке. | [optional] 
**status** | **String** | Статус коробки | [optional] 
**isActual** | **Boolean** | Если false - значит коробку расформировали. Удалить совсем нельзя, для того что бы можно было восстановить по кодам. | [optional] 
**isDraft** | **Boolean** | Если true - значит коробку черновик. | [optional] 
**fbaShipment** | **String** | Это номер конкретной коробки при отправке в амазон. | [optional] 
**isBarCodeAlreadyAttachedByTheSupplier** | **Boolean** | Кнопка в заказе, сообщающая складу что штрихкод на товар поклеен у поставщика. | [optional] 
**isBarCodeAttachedByTheStorekeeper** | **Boolean** | Прикреплен ли баркод к коробке сотрудником склада. | [optional] 
**shippingLabel** | **String** | Ссылка на наклейку для коробки | [optional] 
**lengthCmSupplier** | **Number** | Размеры которые назвал поставщик при заказе ( могут отличаться с реальными). | [optional] 
**widthCmSupplier** | **Number** | Размеры которые назвал поставщик при заказе ( могут отличаться с реальными). | [optional] 
**heightCmSupplier** | **Number** | Размеры которые назвал поставщик при заказе ( могут отличаться с реальными). | [optional] 
**weighGrossKgSupplier** | **Number** | Общий вес кг коробки который назвал поставщик. | [optional] 
**lengthCmWarehouse** | **Number** | Что фактически пришло на склад. Кладовщик. | [optional] 
**widthCmWarehouse** | **Number** | Что фактически пришло на склад. Кладовщик. | [optional] 
**heightCmWarehouse** | **Number** | Что фактически пришло на склад. Кладовщик. | [optional] 
**weighGrossKgWarehouse** | **Number** | Что фактически пришло на склад. Кладовщик. | [optional] 
**isShippingLabelAttachedByStorekeeper** | **Boolean** | Поле будет указывать на то что при решении задачи сторкипером на обновление коробок что он проклеил шиппинг лейбл. | [optional] 
**images** | **[String]** | Массив картинок. | [optional] 
**totalPrice** | **Number** | Итого за доставку. | [optional] 
**totalPriceChanged** | **Number** | Обновление итога за доставку. | [optional] 
**destinationId** | **String** | id склада - склады куда отправляют  | [optional] 
**logicsTariffId** | **String** | GUID тарифа доставки  | [optional] 
**batchId** | **String** | Сторкипер взявший коробку в работу. | [optional] 
**storekeeperId** | **String** | Сторкипер взявший коробку в работу. | [optional] 
**clientId** | **String** | Клиент владелец товара в коробке в работу. | [optional] 
**createdById** | **String** | Клиент создавший заказ и коробку. | [optional] 
**lastModifiedById** | **String** | GUID любого, кто последний редактировал коробку. | [optional] 
**createdAt** | **Date** |  | [optional] 
**updatedAt** | **Date** |  | [optional] 
**items** | [**[ApiV1BatchesItems]**](ApiV1BatchesItems.md) | Массив коробок. | [optional] 
**storekeeper** | [**ApiV1AdminsGetProductsByStatusClient**](ApiV1AdminsGetProductsByStatusClient.md) |  | [optional] 
**client** | [**ApiV1AdminsGetProductsByStatusClient**](ApiV1AdminsGetProductsByStatusClient.md) |  | [optional] 
**createdBy** | [**ApiV1AdminsGetProductsByStatusClient**](ApiV1AdminsGetProductsByStatusClient.md) |  | [optional] 
**lastModifiedBy** | [**ApiV1AdminsGetProductsByStatusClient**](ApiV1AdminsGetProductsByStatusClient.md) |  | [optional] 
**destination** | [**ApiV1BatchesDestination**](ApiV1BatchesDestination.md) |  | [optional] 
**logicsTariff** | [**ApiV1BatchesLogicsTariff**](ApiV1BatchesLogicsTariff.md) |  | [optional] 



## Enum: StatusEnum


* `IN_STOCK` (value: `"IN_STOCK"`)

* `REQUESTED_SEND_TO_BATCH` (value: `"REQUESTED_SEND_TO_BATCH"`)

* `NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE` (value: `"NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE"`)

* `IN_BATCH` (value: `"IN_BATCH"`)




