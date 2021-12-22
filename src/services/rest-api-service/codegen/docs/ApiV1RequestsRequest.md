# TestSwagger.ApiV1RequestsRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**_id** | **String** | GUID заявки в базе данных. | 
**type** | **String** | Тип заявки. | 
**maxAmountOfProposals** | **Number** | Количество предложений. | 
**price** | **Number** | Цена за каждое предложение. | 
**status** | **String** | Статус заявки. | 
**timeoutAt** | **Date** | Время закрытия предложения. | [optional] 
**assignees** | **[String]** | Массив id пользователей. | [optional] 
**direction** | **String** | Направление заявки, исходящая или входящая. | 
**roles** | **[Number]** | Массив массив ролей. | [optional] 
**createdById** | **String** | GUID клиента, который создал запрос на поиск товара. | [optional] 
**lastModifiedById** | **String** | GUID клиента, который обновил запрос на поиск товара. | [optional] 
**createdAt** | **Date** | Дата создания | [optional] 
**updatedAt** | **Date** | Дата изменения | [optional] 



## Enum: StatusEnum


* `CREATED` (value: `"CREATED"`)

* `IN_PROCESS` (value: `"IN_PROCESS"`)

* `READY_TO_VERIFY` (value: `"READY_TO_VERIFY"`)

* `VERIFYING` (value: `"VERIFYING"`)

* `TO_CORRECT` (value: `"TO_CORRECT"`)

* `CANCELED` (value: `"CANCELED"`)

* `EXPIRED` (value: `"EXPIRED"`)





## Enum: DirectionEnum


* `IN` (value: `"IN"`)

* `OUT` (value: `"OUT"`)




