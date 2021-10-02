# Amazonapi.InlineObject2

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**buyerComment** | **String** | комментарии байера. | [optional] 
**warehouse** | **Number** | Номер склада. | [optional] 
**deliveryMethod** | **Number** | Вид доставки. | [optional] 
**fba** | **Boolean** | Признак FBA это заказ или нет. | [optional] 
**status** | **Number** | tmp | [optional] [default to StatusEnum.1]
**deliveryCostToTheWarehouse** | **Number** | Стоимость доставки до склада. | [optional] 
**images** | **[String]** | Массив картинок. | [optional] 
**isBarCodeAlreadyAttachedByTheSupplier** | **Boolean** | Кнопка в заказе, сообщающая складу что штрихкод на товар поклеен у поставщика. | [optional] 
**trackingNumberChina** | **String** | Трек номер в ЗАКАЗЕ, по китаю отправленный заказ, до нашего склада. Вводиться баером, в заказ. | [optional] 
**amountPaymentPerConsignmentAtDollars** | **Number** | Сумма оплаты $ за партию товара - это сумма в $ указывается закупщиком | [optional] 
**barCode** | **String** | Баркод. | [optional] 
**totalPriceChanged** | **Number** | Если вдруг баер понял что стоимость заказа меняется в меньшую/большую сторону он напишет эту сумму в заказе в поле totalPriceChanged (нужно добавить это поле), далее корректировка стоимости решается через админа.  | [optional] 
**totalPrice** | **Number** | Сумма оплаты $ за партию товара - это сумма в $ указывается закупщиком | [optional] 



## Enum: StatusEnum


* `0` (value: `0`)

* `1` (value: `1`)

* `10` (value: `10`)

* `15` (value: `15`)

* `20` (value: `20`)

* `25` (value: `25`)

* `30` (value: `30`)

* `35` (value: `35`)




