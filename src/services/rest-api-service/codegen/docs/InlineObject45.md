# TestSwagger.InlineObject45

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**_id** | **String** | GUID | [optional] 
**link** | **String** | GUID заявки к торой относится данное дополнение. | [optional] 
**strategy** | **Number** | Стратегия. | [optional] 
**monthlySales** | **Number** | Продажи за месяц. | [optional] 
**size** | **String** | Размер. | [optional] 
**searchVolume** | **Number** | Объём продаж данной категории. | [optional] 
**minAmazonPrice** | **Number** | Мин стоимость товара на Амазоне. | [optional] 
**maxAmazonPrice** | **Number** | Макс стоимость товара на Амазоне. | [optional] 
**minBSR** | **Number** | Мин рейтинг BSR на амазоне. | [optional] 
**maxBSR** | **Number** | Макс рейтинг BSR на амазоне | [optional] 
**minReviews** | **Number** | Мин просмотры на амазоне | [optional] 
**maxReviews** | **Number** | Макс просмотры на амазоне | [optional] 
**minRevenue** | **Number** | Мин доход по продукту на Амазоне | [optional] 
**maxRevenue** | **Number** | Макс доход по продукту на Амазоне | [optional] 
**notes** | **String** | Коментарий. | [optional] 
**denyProductsBoughtByMe** | **Boolean** | Запретить товары ранее купленные. | [optional] 
**denyProductsExistInServiceByCurStrategy** | **Boolean** | Запретить товары которые есть в системе под данную статегию. | [optional] 
**findSupplier** | **Boolean** | Найти поставщика. | [optional] 
**checkedByService** | **Boolean** | Проверить сепервайзером. | [optional] 
**createdById** | **String** | ID создателя заявки. | [optional] 
**lastModifiedById** | **String** | ID кто последний изменял заявку. | [optional] 



## Enum: SizeEnum


* `SMALL` (value: `"SMALL"`)

* `MEDIUM` (value: `"MEDIUM"`)

* `LARGE` (value: `"LARGE"`)




