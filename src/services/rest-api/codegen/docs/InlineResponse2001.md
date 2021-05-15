# Amazonapi.InlineResponse2001

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**_id** | **String** | GUID данной записи в БД. | [optional] 
**buyerId** | **String** | GUID пользователя(байера) | 
**clientComment** | **String** | Комментарии клиента. | 
**buyerComment** | **String** | комментарии байера. | 
**warehouse** | **Number** | Номер склада. | 
**deliveryMethod** | **Number** | Вид доставки. | 
**itemList** | [**[ApiV1BuyersOrdersVacItemList]**](ApiV1BuyersOrdersVacItemList.md) | Список товаров. | 
**fba** | **Boolean** | Признак FBA это заказ или нет. | 
**status** | **Number** | tmp | [optional] [default to StatusEnum.1]
**deliveryCostToTheWarehouse** | **Number** | Стоимость доставки до склада. | 



## Enum: StatusEnum


* `0` (value: `0`)

* `1` (value: `1`)

* `10` (value: `10`)

* `15` (value: `15`)

* `20` (value: `20`)

* `25` (value: `25`)

* `30` (value: `30`)

* `35` (value: `35`)




