# TestSwagger.InlineObject53

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**asin** | **String** | ASIN продукта | 
**skusByClient** | **[String]** |  | [optional] 
**currentSupplierId** | **String** | GUID поставщика, если передать строку \&quot;clear\&quot; то поставщику будет сброшен (у байера и ресечера). | [optional] 
**category** | **String** | Категория | [optional] 
**lamazon** | **String** | Ссылка на этот продукт на амазоне. | [optional] 
**bsr** | **Number** |  | [optional] 
**fba** | **Boolean** | Признак fba | [optional] 
**amazon** | **Number** |  | [optional] 
**height** | **Number** |  | [optional] 
**width** | **Number** |  | [optional] 
**length** | **Number** |  | [optional] 
**weight** | **Number** |  | [optional] 
**reffee** | **Number** | комиссия которую берет амазон за любой заказ - 15% | [optional] 
**fbafee** | **Number** | ФБА комиссия | [optional] 
**fbaamount** | **Number** |  Общая сумма с фба. | [optional] 
**icomment** | **String** | Комментарии к товару. | [optional] 
**clientComment** | **String** | Комментарии к товару, от клиента. | [optional] 
**images** | **[String]** | Массив изображений. | 
**amazonDescription** | **String** |  | [optional] 
**amazonDetail** | **String** |  | [optional] 
**amazonTitle** | **String** |  | [optional] 
**material** | **String** | Материл продукта | [optional] 
**productUsage** | **String** | Применение продукта | [optional] 
**chinaTitle** | **String** | chinese title? | [optional] 
**barCode** | **String** |  | [optional] 
**minpurchase** | **Number** |  | [optional] 
**profit** | **Number** | Прибыль | [optional] 
**margin** | **Number** | Маржа | [optional] 
**strategyStatus** | **Number** | У поля на данный момент будет 5 возможных значений: 0, 10, 20, 30, 40 | [optional] 
**needCheckBySupervisor** | **Boolean** | Признак needCheckBySupervisor | [optional] 
**hsCode** | **String** | hsCode продукта. | [optional] 
**buyerId** | **String** | Гуид баера, Байер создал идею для продукта. Клиенту понравилась идея, он создал на основе ее карточку. | [optional] 
**niche** | **String** | Ниша | [optional] 
**asins** | **String** | Асины | [optional] 
**totalRevenue** | **String** | Общий доход | [optional] 
**coefficient** | **String** | Коэффициент прибыли | [optional] 
**avgRevenue** | **String** | Средний доход | [optional] 
**avgBSR** | **String** | Средний BSR | [optional] 
**avgPrice** | **String** | Средняя цена | [optional] 
**avgReviews** | **String** | Средний отзывы | [optional] 
**fourMonthesStock** | **Number** | Поле для калькуляции дозакупок | [optional] 
**suppliersIds** | **[String]** | GUIDы поставщиков продукта | [optional] 
**tags** | [**[ApiV1BuyersProductsGuidTags]**](ApiV1BuyersProductsGuidTags.md) |  | [optional] 


