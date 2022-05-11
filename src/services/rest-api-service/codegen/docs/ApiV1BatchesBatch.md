# TestSwagger.ApiV1BatchesBatch

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
**storekeeperId** | **String** | Сторкипер взявший коробку в работу. | [optional] 
**createdById** | **String** | Клиент создавший заказ и коробку. | [optional] 
**createdAt** | **Date** | Дата создания. | [optional] 
**updatedAt** | **Date** | Дата создания. | [optional] 


