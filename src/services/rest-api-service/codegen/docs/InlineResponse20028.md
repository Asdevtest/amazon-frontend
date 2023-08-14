# TestSwagger.InlineResponse20028

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**_id** | **String** | GUID продукта в базе данных | [optional] 
**category** | **String** | Категория | [optional] 
**bsr** | **Number** |  | [optional] 
**asin** | **String** | ASIN продукта | [optional] 
**skusByClient** | **[String]** |  | [optional] 
**amazon** | **Number** |  | [optional] 
**weight** | **Number** | Вес | [optional] 
**fbaamount** | **Number** |  Общая сумма с фба. | [optional] 
**status** | **Number** | Код текущего статуса | [optional] 
**images** | **[String]** | Массив картинок. | [optional] 
**priceForClient** | **Number** | Цена для клиента | [optional] 
**currentSupplier** | [**ApiV1BatchesProductSuppliers**](ApiV1BatchesProductSuppliers.md) |  | [optional] 
**currentSupplierId** | **String** | GUID поставщика в базе данных | [optional] 
**createdBy** | [**ApiV1AnnouncementsMyCreatedBy**](ApiV1AnnouncementsMyCreatedBy.md) |  | [optional] 
**checkedBy** | [**ApiV1AnnouncementsMyCreatedBy**](ApiV1AnnouncementsMyCreatedBy.md) |  | [optional] 
**createdAt** | **Date** | Дата создания | [optional] 
**updatedAt** | **Date** | Дата изменения | [optional] 
**checkedAt** | **Date** | Дата проверки | [optional] 
**buyer** | [**ApiV1AnnouncementsMyCreatedBy**](ApiV1AnnouncementsMyCreatedBy.md) |  | [optional] 
**supervisorRate** | **Number** | Савка супервайзера. | [optional] 
**buyerRate** | **Number** | Савка байера. | [optional] 
**redFlags** | [**[ApiV1ClientsProductsVacRedFlags]**](ApiV1ClientsProductsVacRedFlags.md) |  | [optional] 
**tags** | [**[ApiV1BatchesProductTags]**](ApiV1BatchesProductTags.md) |  | [optional] 
**strategyStatus** | **Number** | У поля на данный момент будет 5 возможных значений: 0, 10, 20, 30, 40 | [optional] 
**avgRevenue** | **String** | Средний доход | [optional] 
**avgBSR** | **String** | Средний BSR | [optional] 
**avgPrice** | **String** | Средняя цена | [optional] 
**avgReviews** | **String** | Средний отзывы | [optional] 


