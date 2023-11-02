# TestSwagger.InlineResponse20013

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**_id** | **String** | GUID партии. | [optional] 
**humanFriendlyId** | **Number** | Человекочитаемый id партии. | [optional] 
**status** | **String** | Статус партии. | [optional] 
**shipId** | **String** | id корабля. | [optional] 
**title** | **String** | Название партии | [optional] 
**calculatedShippingCost** | **Number** | Стоимость доставки при расчете из коробок | [optional] 
**actualShippingCost** | **Number** | Настоящая стоимость доставки | [optional] 
**trackingNumber** | **String** | Трек номер партии | [optional] 
**attachedDocuments** | **[String]** | Массив ссылок на файлов документации к партии. | [optional] 
**finalWeightAsOneBox** | **Number** | Финальный вес партии, если считать все коробки как одну большую коробу. | [optional] 
**finalWeightSumEachBoxAmount** | **Number** | Финальный вес партии, если сложить все веса коробок по отдельности. | [optional] 
**archive** | **Boolean** | Заархивирована ли партия | [optional] 
**boxes** | [**[ApiV1BatchesBoxes]**](ApiV1BatchesBoxes.md) | Массив id коробок. | [optional] 
**calculationMethod** | **Number** | Метод подсчта массы партии | [optional] 
**volumeWeightDivide** | **Number** | Делитель объема партии | [optional] 
**finalWeight** | **Number** | Масса партии | [optional] 
**storekeeper** | [**ApiV1BatchesStorekeeper**](ApiV1BatchesStorekeeper.md) |  | [optional] 
**createdBy** | [**ApiV1BatchesStorekeeper**](ApiV1BatchesStorekeeper.md) |  | [optional] 
**lastModifiedBy** | [**ApiV1BatchesStorekeeper**](ApiV1BatchesStorekeeper.md) |  | [optional] 
**arrivalDate** | **Date** |  | [optional] 
**createdAt** | **Date** | Дата создания. | [optional] 
**updatedAt** | **Date** | Дата создания. | [optional] 


