# TestSwagger.InlineObject42

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**storekeeperId** | **String** | GUID storekeeper-a | [optional] 
**buyerId** | **String** | GUID баера | [optional] 
**item** | **String** |  | [optional] 
**logicsTariffId** | **String** | GUID тарифа доставки | [optional] 
**priority** | **String** | Приоритет заказа: от 10 до 50 - от найменее значимого до найболее значимого соответственно | [optional] 
**destinationId** | **String** | GUID пункта назначения. | [optional] 
**amount** | **Number** | Кол-во продукта по этой позиции. | [optional] 
**deliveryCostToTheWarehouse** | **Number** | Стоимость доставки до склада. | [optional] 
**clientComment** | **String** | Комментарии клиента. | [optional] 
**images** | **[String]** | Массив изображений. | [optional] 
**expressChinaDelivery** | **Boolean** | Флаг , обозначающий оплату за экспресс доставку по китаю | [optional] 
**needsResearch** | **Boolean** | Нуждается ли заказ в повторном поиске поставщика | [optional] 
**deadline** | **Date** | Дедлайн выкупа заказа | [optional] 
**totalPrice** | **Number** | Сумма оплаты $ за партию товара - это сумма в $ указывается закупщиком | [optional] 



## Enum: PriorityEnum


* `10` (value: `"10"`)

* `20` (value: `"20"`)

* `30` (value: `"30"`)

* `40` (value: `"40"`)

* `50` (value: `"50"`)




