# Amazonapi.InlineResponse2005

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**_id** | **String** | GUID | 
**taskId** | **Number** | ID задачи, для типовых. Что бы можно было вывести нужную надпись для исполнителя. | 
**boxesBefore** | [**[ApiV1BatchesBoxes]**](ApiV1BatchesBoxes.md) | Массив коробок которые были до переформирования коробок. | [optional] 
**boxes** | [**[ApiV1BatchesBoxes]**](ApiV1BatchesBoxes.md) | Массив коробок. | 
**operationType** | **String** | Тип операции | [optional] 
**storekeeperId** | **String** | GUID сотрудника склада, который выполняет задачу. | [optional] 
**status** | **Number** | Текущий статус задачи. 0 - новая, 10 - взята в работу, 20 - выполнено, 30 - не выполнено. | 
**storekeeperComment** | **String** | Комментарий работника склада. | [optional] 
**clientComment** | **String** | Комментарий клиента. | [optional] 
**images** | **[String]** | Массив картинок. | [optional] 
**createDate** | **Date** | Дата создания. | [optional] 
**updateDate** | **Date** | Дата обновления. | [optional] 



## Enum: OperationTypeEnum


* `merge` (value: `"merge"`)

* `split` (value: `"split"`)

* `receive` (value: `"receive"`)




