# TestSwagger.InlineResponse2004

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**_id** | **String** | GUID элемента | [optional] 
**createdAt** | **Number** | Дата создания. | [optional] 
**updatedAt** | **Number** | Дата обновления. | [optional] 
**operationType** | **String** | Тип операции | [optional] 
**status** | **Number** | Текущий статус задачи. 0 - новая, 10 - взята в работу, 20 - выполнено, 30 - не выполнено, 40 - отменено. | [optional] 
**isBarCodeAttached** | **Boolean** | Проклеены ли все баркоды в задаче | [optional] 
**priority** | **Number** | Приоритет задачи | [optional] 
**reason** | **String** | reason of priority | [optional] 
**storekeeper** | [**ApiV1AdminsTasksLightStorekeeper**](ApiV1AdminsTasksLightStorekeeper.md) |  | [optional] 
**boxes** | [**[ApiV1AdminsTasksLightBoxes]**](ApiV1AdminsTasksLightBoxes.md) | Массив коробок которые были до переформирования коробок. | [optional] 
**boxesBefore** | [**[ApiV1AdminsTasksLightBoxes]**](ApiV1AdminsTasksLightBoxes.md) | Массив коробок которые были до переформирования коробок. | [optional] 


