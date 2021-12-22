# TestSwagger.InlineResponse20012Request

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**_id** | **String** | GUID заявки в базе данных. | [optional] 
**type** | **String** | Тип заявки. | [optional] 
**maxAmountOfProposals** | **Number** | Количество предложений. | [optional] 
**price** | **Number** | Цена за каждое предложение. | [optional] 
**status** | **Number** | Статус заявки. | [optional] 
**timeoutAt** | **Date** | Время закрытия предложения. | [optional] 
**assignees** | **[String]** | Массив id пользователей. | [optional] 
**direction** | **String** | Направление заявки, исходящая или входящая. | [optional] 
**roles** | **[Number]** | Массив массив ролей. | [optional] 
**createdById** | **String** | GUID клиента, который создал запрос на поиск товара. | [optional] 
**lastModifiedById** | **String** | GUID клиента, который обновил запрос на поиск товара. | [optional] 
**createdAt** | **Date** | Дата создания | [optional] 
**updatedAt** | **Date** | Дата изменения | [optional] 



## Enum: DirectionEnum


* `IN` (value: `"IN"`)

* `OUT` (value: `"OUT"`)




