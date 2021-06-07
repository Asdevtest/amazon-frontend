# Amazonapi.InlineObject4

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**lengthCm** | **Number** | Поле в которое наследуем данные размеров коробок | 
**widthCm** | **Number** | Поле в которое наследуем данные размеров коробок | 
**heightCm** | **Number** | Поле в которое наследуем данные размеров коробок | 
**weighGrossKg** | **Number** | Общий вес кг коробки | 
**volumeWeightKg** | **Number** | Объемный вес (подсчет) | 
**weightFinalAccountingKg** | **Number** | Наибольший вес (подсчет) | 
**lengthCmSupplier** | **Number** | Размеры которые назвал поставщик при заказе ( могут отличаться с реальными). | 
**widthCmSupplier** | **Number** | Размеры которые назвал поставщик при заказе ( могут отличаться с реальными). | 
**heightCmSupplier** | **Number** | Размеры которые назвал поставщик при заказе ( могут отличаться с реальными). | 
**weighGrossKgSupplier** | **Number** | Общий вес кг коробки который назвал поставщик. | 
**volumeWeightKgSupplier** | **Number** | id склада - склады куда отправляют  | 
**weightFinalAccountingKgSupplier** | **Number** | Наибольший вес (подсчет) (что большее объемный или обычный вес) у поставщика. | 
**warehouse** | **Number** | id склада - склады куда отправляют  | 
**deliveryMethod** | **Number** | Метод доставки - 1: Air , 2: Sea | 
**orderIds** | **Object** | Массив GUID ордеров из которых формируется данная коробка. | 
**scheduledDispatchDate** | **Date** | Запланированная дата отправки. | [optional] 
**factDispatchDate** | **Date** | Запланированная дата доставки. | [optional] 


