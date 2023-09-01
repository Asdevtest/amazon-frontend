# TestSwagger.InlineObject67

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**amount** | **Number** | Кол-во продукта по этой позиции. | [optional] 
**orderSupplierId** | **String** | Гуид сапплаера | [optional] 
**storekeeperId** | **String** | Склад для изменения | [optional] 
**destinationId** | **String** | Пункт назначения | [optional] 
**logicsTariffId** | **String** | Тариф для изменения | [optional] 
**images** | **[String]** | Массив картинок. | [optional] 
**totalPrice** | **Number** | Сумма оплаты $ за партию товара - это сумма в $ указывается закупщиком | [optional] 
**buyerComment** | **String** | Комментарий баера | [optional] 
**item** | **String** | Не настоящий ключ, используется только для нужд юзера | [optional] 
**needsResearch** | **Boolean** | Нуждается ли заказ в повторном поиске поставщика | [optional] 
**deadline** | **Date** | Дедлайн выкупа заказа | [optional] 
**priority** | **String** | Приоритет заказа: от 10 до 50 - от найменее значимого до найболее значимого соответственно | [optional] 
**expressChinaDelivery** | **Boolean** | Флаг , обозначающий оплату за экспресс доставку по китаю | [optional] 
**clientComment** | **String** | Комментарий клтента в заказе | [optional] 
**priceInYuan** | **Number** | Цена в юанях | [optional] 
**priceBatchDeliveryInYuan** | **Number** | Цена доставки партии в юанях | [optional] 



## Enum: PriorityEnum


* `10` (value: `"10"`)

* `20` (value: `"20"`)

* `30` (value: `"30"`)

* `40` (value: `"40"`)

* `50` (value: `"50"`)




