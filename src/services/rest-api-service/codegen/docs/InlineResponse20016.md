# TestSwagger.InlineResponse20016

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**_id** | **String** | GUID задачи в DB | 
**taskId** | **Number** | ID задачи, для типовых. Что бы можно было вывести нужную надпись для исполнителя. | 
**operationType** | **String** | Тип операции | [optional] 
**boxesBefore** | [**[ApiV1AdminsBatchesBoxes]**](ApiV1AdminsBatchesBoxes.md) | Массив коробок которые были до переформирования коробок. | [optional] 
**boxes** | [**[ApiV1AdminsBatchesBoxes]**](ApiV1AdminsBatchesBoxes.md) | Массив коробок. | 
**status** | **Number** | Текущий статус задачи. 0 - новая, 10 - взята в работу, 20 - выполнено, 30 - не выполнено, 40 - отменено. | 
**storekeeper** | [**ApiV1AdminsGetProductsByStatusClient**](ApiV1AdminsGetProductsByStatusClient.md) |  | [optional] 
**storekeeperComment** | **String** | Комментарий работника склада. | [optional] 
**clientComment** | **String** | Комментарий клиента. | [optional] 
**images** | **[String]** | Массив картинок. | [optional] 
**createdAt** | **Date** | Дата создания. | [optional] 
**updatedAt** | **Date** | Дата создания. | [optional] 



## Enum: OperationTypeEnum


* `merge` (value: `"merge"`)

* `split` (value: `"split"`)

* `receive` (value: `"receive"`)




