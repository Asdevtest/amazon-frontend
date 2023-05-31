# TestSwagger.ApiV1RequestsCustomGuidRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**priority** | **Number** | Приоритет заявки | [optional] 
**title** | **String** | Title заявки. | [optional] 
**withoutConfirmation** | **Boolean** | Если у заявки стоит withoutConfirmation: true - статус предложения автоматически становится OFFER_CONDITIONS_ACCEPTED при pickup&#39;е | [optional] 
**price** | **Number** | Цена за каждое предложение. | [optional] 
**timeoutAt** | **Date** | Время закрытия заявки. | [optional] 
**timeLimitInMinutes** | **Number** | Время за которое должен отправить предложение после бронирования. В минутах, не менее 10. | [optional] 
**assignees** | **[String]** | Массив id пользователей. | [optional] 
**direction** | **String** | Направление заявки, исходящая или входящая. | [optional] 
**needCheckBySupervisor** | **Boolean** | Нуждается в проверке супервайзером. | [optional] 
**restrictMoreThanOneProposalFromOneAssignee** | **Boolean** | Запретить фрилансеру повторное отправление предложений. | [optional] 
**roles** | **[Number]** | Массив массив ролей. | [optional] 
**typeTask** | **Number** | Код специализации фрилансера | [optional] 
**asin** | **String** | Привязанный асин | [optional] 
**priceAmazon** | **Number** | Цена на амазоне | [optional] 
**cashBackInPercent** | **Number** | Возврат средств с покупки в процентах | [optional] 
**announcementId** | **String** | Гуид анонса | [optional] 
**linksToMediaFiles** | [**[ApiV1RequestsCustomRequestLinksToMediaFiles]**](ApiV1RequestsCustomRequestLinksToMediaFiles.md) |  | [optional] 



## Enum: DirectionEnum


* `IN` (value: `"IN"`)

* `OUT` (value: `"OUT"`)




