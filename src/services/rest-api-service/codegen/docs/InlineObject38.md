# TestSwagger.InlineObject38

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**storekeeperId** | **String** | GUID storekeeper-a | [optional] 
**item** | **String** |  | [optional] 
**logicsTariffId** | **String** | GUID тарифа доставки | [optional] 
**trackNumberText** | **String** | Текст трек номера | [optional] 
**trackNumberFile** | **String** | Ссылка на фото трек номера | [optional] 
**priority** | **String** | Приоритет заказа: от 10 до 50 - от найменее значимого до найболее значимого соответственно | [optional] 
**destinationId** | **String** | GUID пункта назначения. | [optional] 
**amount** | **Number** | Кол-во продукта по этой позиции. | [optional] 
**deliveryCostToTheWarehouse** | **Number** | Стоимость доставки до склада. | [optional] 
**clientComment** | **String** | Комментарии клиента. | [optional] 
**images** | **[String]** | Массив изображений. | [optional] 



## Enum: PriorityEnum


* `10` (value: `"10"`)

* `20` (value: `"20"`)

* `30` (value: `"30"`)

* `40` (value: `"40"`)

* `50` (value: `"50"`)




