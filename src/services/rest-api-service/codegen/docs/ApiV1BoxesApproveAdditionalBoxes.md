# Amazonapi.ApiV1BoxesApproveAdditionalBoxes

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**amount** | **Number** | Сколько таких же коробок в одной коробке | [optional] 
**weighGrossKg** | **Number** | Общий вес кг коробки | [optional] 
**volumeWeightKg** | **Number** | Объемный вес (подсчет) | [optional] 
**weightFinalAccountingKg** | **Number** | Наибольший вес (подсчет) | [optional] 
**lengthCmSupplier** | **Number** | Размеры которые назвал поставщик при заказе ( могут отличаться с реальными). | [optional] 
**widthCmSupplier** | **Number** | Размеры которые назвал поставщик при заказе ( могут отличаться с реальными). | [optional] 
**heightCmSupplier** | **Number** | Размеры которые назвал поставщик при заказе ( могут отличаться с реальными). | [optional] 
**weighGrossKgSupplier** | **Number** | Общий вес кг коробки который назвал поставщик. | [optional] 
**volumeWeightKgSupplier** | **Number** | id склада - склады куда отправляют  | [optional] 
**warehouse** | **Number** | id склада - склады куда отправляют  | [optional] 
**deliveryMethod** | **Number** | Метод доставки - 1: Air , 2: Sea | [optional] 
**scheduledDispatchDate** | **Date** | Запланированная дата отправки. | [optional] 
**factDispatchDate** | **Date** | Запланированная дата доставки. | [optional] 
**isDraft** | **Boolean** | true - если создаем черновик заказа. | [optional] 
**items** | [**[ApiV1BoxesItems]**](ApiV1BoxesItems.md) | Массив коробок. | 
**clientId** | **String** | GUID клиента | 
**images** | **[String]** | Массив ссылок на фотографии. | [optional] 
**shippingLabel** | **String** | Шипингш лейбл | [optional] 
**lengthCmWarehouse** | **Number** | Что фактически пришло на склад. Кладовщик. | [optional] 
**widthCmWarehouse** | **Number** | Что фактически пришло на склад. Кладовщик. | [optional] 
**heightCmWarehouse** | **Number** | Что фактически пришло на склад. Кладовщик. | [optional] 
**weighGrossKgWarehouse** | **Number** | Что фактически пришло на склад. Кладовщик. | [optional] 
**volumeWeightKgWarehouse** | **Number** | Что фактически пришло на склад. Кладовщик. | [optional] 
**isShippingLabelAttachedByStorekeeper** | **Boolean** | Поле будет указывать на то что при решении задачи сторкипером на обновление коробок что он проклеил шиппинг лейбл. | [optional] 


