# Amazonapi.InlineResponse20010

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**_id** | **String** | GUID задачи в DB | 
**taskId** | **Number** | ID задачи, для типовых. Что бы можно было вывести нужную надпись для исполнителя. | 
**operationType** | **String** | Тип операции | [optional] 
**boxesBefore** | [**[ApiV1BatchesBoxes]**](ApiV1BatchesBoxes.md) | Массив коробок которые были до переформирования коробок. | [optional] 
**boxes** | [**[ApiV1BatchesBoxes]**](ApiV1BatchesBoxes.md) | Массив коробок. | 
**status** | **Number** | Текущий статус задачи. 0 - новая, 10 - взята в работу, 20 - выполнено, 30 - не выполнено, 40 - отменено. | 
**storekeeperComment** | **String** | Комментарий работника склада. | [optional] 
**clientComment** | **String** | Комментарий клиента. | [optional] 
**images** | **[String]** | Массив картинок. | [optional] 
**createdAt** | **Date** | Дата создания. | [optional] 
**updateDate** | **Date** | Дата создания. | [optional] 



## Enum: OperationTypeEnum


* `merge` (value: `"merge"`)

* `split` (value: `"split"`)

* `receive` (value: `"receive"`)




