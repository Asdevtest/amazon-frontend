# TestSwagger.ApiV1RequestsCustomGuidRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**title** | **String** | Title заявки. | [optional] 
**price** | **Number** | Цена за каждое предложение. | [optional] 
**timeoutAt** | **Date** | Время закрытия заявки. | [optional] 
**timeLimitInMinutes** | **Number** | Время за которое должен отправить предложение после бронирования. В минутах, не менее 10. | [optional] 
**assignees** | **[String]** | Массив id пользователей. | [optional] 
**direction** | **String** | Направление заявки, исходящая или входящая. | [optional] 
**needCheckBySupervisor** | **Boolean** | Нуждается в проверке супервайзером. | [optional] 
**restrictMoreThanOneProposalFromOneAssignee** | **Boolean** | Запретить фрилансеру повторное отправление предложений. | [optional] 
**roles** | **[Number]** | Массив массив ролей. | [optional] 



## Enum: DirectionEnum


* `IN` (value: `"IN"`)

* `OUT` (value: `"OUT"`)




