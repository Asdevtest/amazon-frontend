# Amazonapi.InlineResponse2002

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**_id** | **String** | GUID данной записи в БД. | [optional] 
**buyerId** | **String** | GUID пользователя(байера) | [optional] 
**clientComment** | **String** | Комментарии клиента. | 
**buyerComment** | **String** | комментарии байера. | [optional] 
**warehouse** | **Number** | Номер склада. | 
**deliveryMethod** | **Number** | Вид доставки. | 
**itemList** | [**[ApiV1BuyersOrdersVacItemList]**](ApiV1BuyersOrdersVacItemList.md) | Список товаров. | [optional] 
**fba** | **Boolean** | Признак FBA это заказ или нет. | [optional] 
**status** | **Number** | tmp | [optional] [default to StatusEnum.1]
**deliveryCostToTheWarehouse** | **Number** | Стоимость доставки до склада. | 
**product** | **String** | GUID продукта | 



## Enum: StatusEnum


* `0` (value: `0`)

* `1` (value: `1`)

* `10` (value: `10`)

* `15` (value: `15`)

* `20` (value: `20`)

* `25` (value: `25`)

* `30` (value: `30`)

* `35` (value: `35`)




