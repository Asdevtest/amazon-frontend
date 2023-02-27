# TestSwagger.ApiV1RequestsCustomRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**title** | **String** | Title заявки. | 
**price** | **Number** | Цена за каждое предложение. | 
**timeoutAt** | **Date** | Время закрытия заявки. | 
**timeLimitInMinutes** | **Number** | Время за которое должен отправить предложение после бронирования. В минутах, не менее 10. | [optional] 
**assignees** | **[String]** | Массив id пользователей. | [optional] 
**direction** | **String** | Направление заявки, исходящая или входящая. | 
**needCheckBySupervisor** | **Boolean** | Нуждается в проверке супервайзером. | [optional] 
**restrictMoreThanOneProposalFromOneAssignee** | **Boolean** | Запретить фрилансеру повторное отправление предложений. | [optional] 
**roles** | **[Number]** | Массив массив ролей. | 
**typeTask** | **Number** | Код специализации фрилансера | [optional] 
**productId** | **String** | Гуид продукта | [optional] 
**asin** | **String** | Привязанный асин | [optional] 
**priceAmazon** | **Number** | Цена на амазоне | [optional] 
**cashBackInPercent** | **Number** | Возврат средств с покупки в процентах | [optional] 
**announcementId** | **String** | Гуид анонса | [optional] 



## Enum: DirectionEnum


* `IN` (value: `"IN"`)

* `OUT` (value: `"OUT"`)




