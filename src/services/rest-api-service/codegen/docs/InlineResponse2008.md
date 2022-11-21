# TestSwagger.InlineResponse2008

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**_id** | **String** | GUID партии. | [optional] 
**humanFriendlyId** | **Number** | Человекочитаемый id партии. | [optional] 
**status** | **String** | Статус партии. | [optional] 
**shipId** | **String** | id корабля. | [optional] 
**attachedDocuments** | **[String]** | Массив ссылок на файлов документации к партии. | [optional] 
**finalWeightAsOneBox** | **Number** | Финальный вес партии, если считать все коробки как одну большую коробу. | [optional] 
**finalWeightSumEachBoxAmount** | **Number** | Финальный вес партии, если сложить все веса коробок по отдельности. | [optional] 
**boxes** | [**[ApiV1BatchesBoxes]**](ApiV1BatchesBoxes.md) | Массив id коробок. | [optional] 
**storekeeper** | [**ApiV1BatchesStorekeeper**](ApiV1BatchesStorekeeper.md) |  | [optional] 
**createdBy** | [**ApiV1BatchesStorekeeper**](ApiV1BatchesStorekeeper.md) |  | [optional] 
**lastModifiedBy** | [**ApiV1BatchesStorekeeper**](ApiV1BatchesStorekeeper.md) |  | [optional] 
**createdAt** | **Date** | Дата создания. | [optional] 
**updatedAt** | **Date** | Дата создания. | [optional] 


