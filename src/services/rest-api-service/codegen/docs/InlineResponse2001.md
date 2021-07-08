# Amazonapi.InlineResponse2001

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**_id** | **String** | GUID данной записи в БД. | [optional] 
**buyerId** | **String** | GUID пользователя(байера) | [optional] 
**clientComment** | **String** | Комментарии клиента. | 
**buyerComment** | **String** | комментарии байера. | [optional] 
**warehouse** | **Number** | Номер склада. | 
**deliveryMethod** | **Number** | Вид доставки. | 
**fba** | **Boolean** | Признак FBA это заказ или нет. | [optional] 
**status** | **Number** | tmp | [optional] [default to StatusEnum.1]
**deliveryCostToTheWarehouse** | **Number** | Стоимость доставки до склада. | 
**isBarCodeAlreadyAttachedByTheSupplier** | **Boolean** | Кнопка в заказе, сообщающая складу что штрихкод на товар поклеен у поставщика. | [optional] 
**trackingNumberChina** | **String** | Трек номер в ЗАКАЗЕ, по китаю отправленный заказ, до нашего склада. Вводиться баером, в заказ. | [optional] 
**amountPaymentPerConsignmentAtDollars** | **Number** | Сумма оплаты $ за партию товара - это сумма в $ указывается закупщиком | [optional] 
**barCode** | **String** | ссылка на баркод. | [optional] 
**images** | **[String]** | Массив картинок. | [optional] 
**createDate** | **Date** |  | [optional] 
**amount** | **Number** | кол-во | [optional] 
**product** | [**InlineResponse200**](InlineResponse200.md) |  | 
**createdBy** | [**ApiV1AdminsOrdersCreatedBy**](ApiV1AdminsOrdersCreatedBy.md) |  | [optional] 



## Enum: StatusEnum


* `0` (value: `0`)

* `1` (value: `1`)

* `10` (value: `10`)

* `15` (value: `15`)

* `20` (value: `20`)

* `25` (value: `25`)

* `30` (value: `30`)

* `35` (value: `35`)




