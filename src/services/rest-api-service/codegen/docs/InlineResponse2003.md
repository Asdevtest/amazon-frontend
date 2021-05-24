# Amazonapi.InlineResponse2003

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**lengthCm** | **Number** | Поле в которое наследуем данные размеров коробок | [optional] 
**widthCm** | **Number** | Поле в которое наследуем данные размеров коробок | [optional] 
**heightCm** | **Number** | Поле в которое наследуем данные размеров коробок | [optional] 
**weighGrossKg** | **Number** | Общий вес кг коробки | [optional] 
**volumeWeightKg** | **Number** | Объемный вес (подсчет) | [optional] 
**weightFinalAccountingKg** | **Number** | Наибольший вес (подсчет) | [optional] 
**shippingLabel** | **String** | Ссылка на наклейку для коробки | [optional] 
**shipmentPlanId** | **String** | Ид шипмент плана ( не обязательное поле) | [optional] 
**warehouse** | **Number** | id склада - склады куда отправляют  | [optional] 
**clientComment** | **String** | Комментарий к коробке | [optional] 
**deliveryMethod** | **Number** | Метод доставки - 1: Air , 2: Sea | [optional] 
**lengthCmSupplier** | **Number** | Размеры которые назвал поставщик при заказе ( могут отличаться с реальными). | [optional] 
**widthCmSupplier** | **Number** | Размеры которые назвал поставщик при заказе ( могут отличаться с реальными). | [optional] 
**heightCmSupplier** | **Number** | Размеры которые назвал поставщик при заказе ( могут отличаться с реальными). | [optional] 
**weighGrossKgSupplier** | **Number** | Общий вес кг коробки который назвал поставщик. | [optional] 
**volumeWeightKgSupplier** | **Number** | id склада - склады куда отправляют  | [optional] 
**weightFinalAccountingKgSupplier** | **Number** | Наибольший вес (подсчет) (что большее объемный или обычный вес) у поставщика. | [optional] 
**buyerComment** | **String** | Объемный вес (подсчет) на размерах от поставщика (формула) | [optional] 
**status** | **Number** | Текущий статус коробки. | [optional] 
**lengthCmWarehouse** | **Number** | Что фактически пришло на склад. Кладовщик. | [optional] 
**widthCmWarehouse** | **Number** | Что фактически пришло на склад. Кладовщик. | [optional] 
**heightCmWarehouse** | **Number** | Что фактически пришло на склад. Кладовщик. | [optional] 
**weighGrossKgWarehouse** | **Number** | Что фактически пришло на склад. Кладовщик. | [optional] 
**volumeWeightKgWarehouse** | **Number** | Что фактически пришло на склад. Кладовщик. | [optional] 
**weightFinalAccountingKgWarehouse** | **Number** | Что фактически пришло на склад. Кладовщик. | [optional] 
**createdBy** | **String** | Клиент создавший заказ и коробку. | [optional] 
**buyerId** | **String** | Байер взявший коробку в работу. | [optional] 
**lastModifiedBy** | **String** | GUID любого, кто последний редактировал коробку. | [optional] 
**ordersId** | **[Object]** | Массив GUID ордеров из которых формируется данная коробка. | [optional] 


