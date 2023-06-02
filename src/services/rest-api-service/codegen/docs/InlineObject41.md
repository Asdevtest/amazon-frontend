# TestSwagger.InlineObject41

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**taskId** | **Number** | ID задачи, для типовых. Что бы можно было вывести нужную надпись для исполнителя. | 
**boxesBefore** | **[String]** |  | [optional] 
**boxes** | **[String]** |  | 
**operationType** | **String** | Тип операции | 
**clientComment** | **String** | Комментарий клиента. | [optional] [default to &#39;&#39;]
**buyerComment** | **String** | Комментарий баера | [optional] 
**images** | **[String]** | Массив картинок. | [optional] 
**storekeeperComment** | **String** | Комментарий работника склада. | [optional] 
**priority** | **String** | Приоритет заказа: от 10 до 50 - от найменее значимого до найболее значимого соответственно | [optional] 
**reason** | **String** | Причина приоритета | [optional] 



## Enum: OperationTypeEnum


* `merge` (value: `"merge"`)

* `split` (value: `"split"`)

* `receive` (value: `"receive"`)

* `edit` (value: `"edit"`)





## Enum: PriorityEnum


* `10` (value: `"10"`)

* `20` (value: `"20"`)

* `30` (value: `"30"`)

* `40` (value: `"40"`)

* `50` (value: `"50"`)




