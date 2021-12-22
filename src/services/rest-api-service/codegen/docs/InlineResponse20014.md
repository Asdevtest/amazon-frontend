# TestSwagger.InlineResponse20014

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**_id** | **String** | GUID продукта в базе данных. | [optional] 
**link** | **String** | GUID заявки к торой относится данное дополнение. | [optional] 
**keyword** | **String** | Ключевые слова ниши. | [optional] 
**monthlySales** | **Number** | Количество продаж за месяц. | [optional] 
**size** | **String** | Размерный ряд. | [optional] 
**searchVolume** | **Number** | Объём продаж данной категории. | [optional] 
**minAmazonPrice** | **Number** | Мин стоимость товара на Амазоне | [optional] 
**maxAmazonPrice** | **Number** | Макс стоимость товара на Амазоне | [optional] 
**minBSR** | **Number** | Мин рейтинг BSR на Амазоне | [optional] 
**maxBSR** | **Number** | Макс рейтинг BSR на Амазоне | [optional] 
**minReviews** | **Number** | Мин просмотры на Амазоне | [optional] 
**maxReviews** | **Number** | Макс просмотры на Амазоне | [optional] 
**minRevenue** | **Number** | Мин  доход по продукту на Амазоне | [optional] 
**maxRevenue** | **Number** | Макс доход по продукту на Амазоне | [optional] 
**notes** | **String** | Комментарий к заявке | [optional] 
**denyNichesBoughtByMe** | **Boolean** | Запретить ниши которые когда либо куплены клиентом. | [optional] 
**createdById** | **String** | GUID клиента, который создал запрос на поиск товара. | [optional] 
**lastModifiedById** | **String** | GUID клиента, который обновил запрос на поиск товара. | [optional] 
**createdAt** | **Date** | Дата создания | [optional] 
**updatedAt** | **Date** | Дата изменения | [optional] 



## Enum: SizeEnum


* `SMALL` (value: `"SMALL"`)

* `MEDIUM` (value: `"MEDIUM"`)

* `LARGE` (value: `"LARGE"`)




