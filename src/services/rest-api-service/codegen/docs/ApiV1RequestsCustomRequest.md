# TestSwagger.ApiV1RequestsCustomRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**title** | **String** | Title заявки. | 
**maxAmountOfProposals** | **Number** | Количество предложений, не менее. | 
**price** | **Number** | Цена за каждое предложение. | 
**timeoutAt** | **Date** | Время закрытия заявки. | 
**timeLimitInMinutes** | **Number** | Время за которое должен отправить предложение после бронирования. В минутах, не менее 10. | [optional] 
**assignees** | **[String]** | Массив id пользователей. | [optional] 
**direction** | **String** | Направление заявки, исходящая или входящая. | 
**needCheckBySupervisor** | **Boolean** | Нуждается в проверке супервайзером. | [optional] 
**restrictMoreThanOneProposalFromOneAssignee** | **Boolean** | Запретить фрилансеру повторное отправление предложений. | [optional] 
**roles** | **[Number]** | Массив массив ролей. | [optional] 



## Enum: DirectionEnum


* `IN` (value: `"IN"`)

* `OUT` (value: `"OUT"`)




