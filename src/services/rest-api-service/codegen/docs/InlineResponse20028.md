# TestSwagger.InlineResponse20028

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**_id** | **String** | GUID | [optional] 
**taskId** | **Number** | ID задачи, для типовых. Что бы можно было вывести нужную надпись для исполнителя. | [optional] 
**operationType** | **String** | Тип операции | [optional] 
**boxesBefore** | [**[ApiV1BatchesBoxes]**](ApiV1BatchesBoxes.md) | Массив коробок которые были до переформирования коробок. | [optional] 
**boxes** | [**[ApiV1BatchesBoxes]**](ApiV1BatchesBoxes.md) | Массив коробок. | [optional] 
**status** | **Number** | Текущий статус задачи. 0 - новая, 10 - взята в работу, 20 - выполнено, 30 - не выполнено. | [optional] 
**priority** | **Number** | Приоритет задачи | [optional] 
**storekeeperComment** | **String** | Комментарий работника склада. | [optional] 
**clientComment** | **String** | Комментарий клиента. | [optional] 
**buyerComment** | **String** | Комментарий баера. | [optional] 
**images** | **[String]** | Массив картинок. | [optional] 
**storekeeperId** | **String** | GUID сотрудника склада, который выполняет задачу. | [optional] 
**storekeeper** | [**ApiV1AdminsGetProductsByStatusCreatedBy**](ApiV1AdminsGetProductsByStatusCreatedBy.md) |  | [optional] 
**createdAt** | **Date** | Дата создания. | [optional] 
**updateDate** | **Date** | Дата обновления. | [optional] 



## Enum: OperationTypeEnum


* `merge` (value: `"merge"`)

* `split` (value: `"split"`)

* `receive` (value: `"receive"`)




