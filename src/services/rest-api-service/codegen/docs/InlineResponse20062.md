# TestSwagger.InlineResponse20062

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**_id** | **String** | Guid продожения к заявке. | [optional] 
**requestId** | **String** | Guid заявки к которой относится данное предложение. | [optional] 
**type** | **String** | Тип предложения. | [optional] 
**status** | **String** |  CREATED - предложение по заявке создано, с ценой и временем выполнения от исполнителя OFFER_CONDITIONS_ACCEPTED - условия предложения были приняты клиентом, после этого начиначется отсчет времени на выполнение заявки, с этого статуса можно перейти только на READY_TO_VERIFY, с этого момента начинаем учитывать этого исполнителя в счетчике людей работающих по заявке OFFER_CONDITIONS_REJECTED - условия предложения были отклонены клиентом. После изменения условий клиентом выставляется статус OFFER_CONDITIONS_CORRECTED OFFER_CONDITIONS_CORRECTED - исполнитель отредактировал свои условия по предложению чтобы клиент опять их посмотрел и решил принимает или нет, после этого статуса можно опять перейти на OFFER_CONDITIONS_ACCEPTED или OFFER_CONDITIONS_REJECTED READY_TO_VERIFY - статус выставляет исполнитель, статус говорит о том что исполнитель выполнил работу и клиент/супервизор может ее проверять, после этого статуса можно выставить VERIFYING_BY_SUPERVISOR или TO_CORRECT, а так же закрывающие статусы VERIFYING_BY_SUPERVISOR - работа проверяется супервизором TO_CORRECT - отправляется на доработку от клиента/супервизора CORRECTED - исполнитель отмечает работу как исправленная CANCELED_BY_CREATOR_OF_REQUEST - предложение закрывается клиентом, обязательно с комментарием, финальный статус, может быть выставлено только при статусе OFFER_CONDITIONS_REJECTED. Думаю что тут будет еще условия но нужно это обсудить. Этот статус не очень безопасный или может привести к перегрузу админа для решения конфликтных ситуаций CANCELED_BY_SUPERVISOR - предложение закрывается супервизором, обязательно с комментарием, финальный статус, может быть выставлен в любой момент. Тут должна появиться возможность создать запрос в поддержку для решения конфликтных ситуаций, это позже обсудим. CANCELED_BY_EXECUTOR - закрыто исполнителем, обязательно с комментарием, финальный статус, может быть выставлен в любой момент ACCEPTED_BY_CLIENT - принято клиентом, происходи оплата ACCEPTED_BY_SUPERVISOR - принято супервизором, происходи оплата EXPIRED - проставляется автоматически, если время указанное в предложении от исполнителя истекло а предложение не было уже в одном из финальных статусов  | [optional] 
**timeoutAt** | **Date** | Время закрытия предложения. | [optional] 
**execution_time** | **Number** | Время на выполнение, в часах. | [optional] 
**attempts** | **Number** | Количество попыток, подать предложение или исправить результат работы. | [optional] 
**price** | **Number** | Цена предложения. | [optional] 
**comment** | **String** | Комментарий к предложению. | [optional] 
**linksToMediaFiles** | **[String]** | Ссылки на медиафайлы. | [optional] 
**clientId** | **String** | GUID клиента . | [optional] 
**supervisorId** | **String** | GUID супервизора. | [optional] 
**chatId** | **String** | GUID чата. | [optional] 
**lastModifiedById** | **String** | GUID любого, кто последний редактировал предложение. | [optional] 
**sub** | [**ApiV1AdminsGetProductsByStatusCreatedBy**](ApiV1AdminsGetProductsByStatusCreatedBy.md) |  | [optional] 
**sourceFiles** | [**[ApiV1RequestProposalsSourceFiles]**](ApiV1RequestProposalsSourceFiles.md) |  | [optional] 
**media** | [**[ApiV1RequestProposalsMedia]**](ApiV1RequestProposalsMedia.md) |  | [optional] 
**createdAt** | **Date** | Дата создания | [optional] 
**updatedAt** | **Date** | Дата изменения | [optional] 
**title** | **String** | Название предложения | [optional] 
**createdBy** | [**ApiV1RequestProposalsCreatedBy**](ApiV1RequestProposalsCreatedBy.md) |  | [optional] 
**detailsCustom** | [**ApiV1RequestProposalsDetailsCustom**](ApiV1RequestProposalsDetailsCustom.md) |  | [optional] 
**request** | [**ApiV1RequestProposalsRequest**](ApiV1RequestProposalsRequest.md) |  | [optional] 



## Enum: StatusEnum


* `CREATED` (value: `"CREATED"`)

* `OFFER_CONDITIONS_ACCEPTED` (value: `"OFFER_CONDITIONS_ACCEPTED"`)

* `READY_TO_VERIFY` (value: `"READY_TO_VERIFY"`)

* `OFFER_CONDITIONS_REJECTED` (value: `"OFFER_CONDITIONS_REJECTED"`)

* `OFFER_CONDITIONS_CORRECTED` (value: `"OFFER_CONDITIONS_CORRECTED"`)

* `VERIFYING_BY_SUPERVISOR` (value: `"VERIFYING_BY_SUPERVISOR"`)

* `TO_CORRECT` (value: `"TO_CORRECT"`)

* `CORRECTED` (value: `"CORRECTED"`)

* `CANCELED_BY_CREATOR_OF_REQUEST` (value: `"CANCELED_BY_CREATOR_OF_REQUEST"`)

* `CANCELED_BY_SUPERVISOR` (value: `"CANCELED_BY_SUPERVISOR"`)

* `CANCELED_BY_EXECUTOR` (value: `"CANCELED_BY_EXECUTOR"`)

* `ACCEPTED_BY_CLIENT` (value: `"ACCEPTED_BY_CLIENT"`)

* `ACCEPTED_BY_SUPERVISOR` (value: `"ACCEPTED_BY_SUPERVISOR"`)

* `EXPIRED` (value: `"EXPIRED"`)

* `COMPLETE_PROPOSALS_AMOUNT_ACHIEVED` (value: `"COMPLETE_PROPOSALS_AMOUNT_ACHIEVED"`)




