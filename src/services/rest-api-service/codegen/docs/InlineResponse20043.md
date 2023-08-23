# TestSwagger.InlineResponse20043

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**_id** | **String** |  | [optional] 
**title** | **String** | Название идеи | [optional] 
**status** | **Number** | Статус идеи | [optional] 
**linksToMediaFiles** | **[String]** | Медиа идеи | [optional] 
**variation** | **Boolean** | Является ли продукт идеи вариацией существующего | [optional] 
**childProduct** | [**ApiV1IdeasByParentGuidChildProduct**](ApiV1IdeasByParentGuidChildProduct.md) |  | [optional] 
**requestsOnCheck** | [**[ApiV1IdeasByParentGuidRequestsOnCheck]**](ApiV1IdeasByParentGuidRequestsOnCheck.md) |  | [optional] 
**requestsOnFinished** | [**[ApiV1IdeasByParentGuidRequestsOnCheck]**](ApiV1IdeasByParentGuidRequestsOnCheck.md) |  | [optional] 
**comments** | **String** | Комментарии к идее | [optional] 
**buyerComment** | **String** | Комментарий байера | [optional] 
**intervalStatusNew** | **Number** | Кол-во секунд идеи в статусе new(5) | [optional] 
**intervalStatusOnCheck** | **Number** | Кол-во секунд идеи в статусе OnCheck(10) | [optional] 
**intervalStatusSupplierSearch** | **Number** | Кол-во секунд идеи в статусе supplierSearch(13) | [optional] 
**intervalStatusSupplierFound** | **Number** | Кол-во секунд идеи в статусе supplierFound(14) | [optional] 
**intervalStatusSupplierNotFound** | **Number** | Кол-во секунд идеи в статусе supplierNotFound(15) | [optional] 
**intervalStatusProductCreating** | **Number** | Кол-во секунд идеи в статусе productCreating(16) | [optional] 
**intervalStatusAddingAsin** | **Number** | Кол-во секунд идеи в статусе addingAsin(18) | [optional] 
**intervalStatusFinished** | **Number** | Кол-во секунд идеи в статусе finished(20) | [optional] 
**intervalStatusRejected** | **Number** | Кол-во секунд идеи в статусе rejected(25) | [optional] 
**intervalsSum** | **Number** | Кол-во секунд идеи во всех статусах | [optional] 
**createdAt** | **Date** | Дата создания. | [optional] 
**updatedAt** | **Date** | Дата обновления. | [optional] 


