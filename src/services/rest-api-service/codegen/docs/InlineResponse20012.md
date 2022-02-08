# TestSwagger.InlineResponse20012

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**_id** | **String** | GUID заявки в базе данных. | 
**type** | **String** | Тип заявки. | 
**title** | **String** | Title заявки. | [optional] 
**maxAmountOfProposals** | **Number** | Количество предложений. | 
**price** | **Number** | Цена за каждое предложение. | 
**status** | **String** | Статус заявки. | 
**timeoutAt** | **Date** | Время закрытия заявки. | [optional] 
**timeLimitInMinutes** | **Number** | Время за которое должен отправить предложение после бронирования. В минутах. | [optional] 
**assignees** | **[String]** | Массив id пользователей. | [optional] 
**direction** | **String** | Направление заявки, исходящая или входящая. | 
**roles** | **[Number]** | Массив массив ролей. | [optional] 
**needCheckBySupervisor** | **Boolean** | Если требуется проверка супервайзером. | [optional] 
**restrictMoreThanOneProposalFromOneAssignee** | **Boolean** | Запретить фрилансеру повторное отправление предложений. | [optional] 
**createdById** | **String** | GUID клиента, который создал заявку. | [optional] 
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




