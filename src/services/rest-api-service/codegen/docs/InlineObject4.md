# Amazonapi.InlineObject4

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**lengthCm** | **Number** | Поле в которое наследуем данные размеров коробок | [optional] 
**widthCm** | **Number** | Поле в которое наследуем данные размеров коробок | [optional] 
**heightCm** | **Number** | Поле в которое наследуем данные размеров коробок | [optional] 
**weighGrossKg** | **Number** | Общий вес кг коробки | [optional] 
**volumeWeightKg** | **Number** | Объемный вес (подсчет) | [optional] 
**weightFinalAccountingKg** | **Number** | Наибольший вес (подсчет) | [optional] 
**lengthCmSupplier** | **Number** | Размеры которые назвал поставщик при заказе ( могут отличаться с реальными). | [optional] 
**widthCmSupplier** | **Number** | Размеры которые назвал поставщик при заказе ( могут отличаться с реальными). | [optional] 
**heightCmSupplier** | **Number** | Размеры которые назвал поставщик при заказе ( могут отличаться с реальными). | [optional] 
**weighGrossKgSupplier** | **Number** | Общий вес кг коробки который назвал поставщик. | [optional] 
**volumeWeightKgSupplier** | **Number** | id склада - склады куда отправляют  | [optional] 
**weightFinalAccountingKgSupplier** | **Number** | Наибольший вес (подсчет) (что большее объемный или обычный вес) у поставщика. | [optional] 
**warehouse** | **Number** | id склада - склады куда отправляют  | [optional] 
**deliveryMethod** | **Number** | Метод доставки - 1: Air , 2: Sea | [optional] 
**scheduledDispatchDate** | **Date** | Запланированная дата отправки. | [optional] 
**factDispatchDate** | **Date** | Запланированная дата доставки. | [optional] 
**isDraft** | **Boolean** | true - если создаем черновик заказа. | [optional] 
**items** | [**[ApiV1BoxesItems]**](ApiV1BoxesItems.md) | Массив коробок. | 
**clientId** | **String** | GUID клиента | 


