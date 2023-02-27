# TestSwagger.InlineResponse20051

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**_id** | **String** | GUID заявки в базе данных. | 
**type** | **String** | Тип заявки. | 
**title** | **String** | Title заявки. | [optional] 
**maxAmountOfProposals** | **Number** | Количество предложений. | 
**price** | **Number** | Цена за каждое предложение. | 
**status** | **String** |  DRAFT - черновик, заявка создана, но не опубликована  PUBLISHED - заявка опубликована, изменять такую заявку можно! Для того чтобы не произошло неожиданных изменений при  установке этого статуса рассчитываем чек сумму на основе данных самой заявки и деталей при создании и каждом изменении. После этого при публикации предложения будем отправлять этот хеш. Если хеш был изменен то предложение не публикуется и  сервер отдает соответствующую ошибку. Так же из этого статуса можно перевести обратно в статус CREATED (черновик) IN_PROGRESS - по заявке уже есть хотябы одно предложение, изменять такую заявку нельзя, можно только закрыть или снять  с публикации, остановить прием предложений по этой заявке. После этого статуса можно закрыть заявку или она может быть  закрыта автоматически FORBID_NEW_PROPOSALS - снять с публикации, остановить прием предложений по этой заявке, этот статус разрешает закрыть  заявку или перевести ее обратно в статус PUBLISHED/IN_PROGRESS в зависимости от того есть ли по этой заявке уже предложения.  Так же после этого статуса можно закрыть заявку или она может быть автоматически закрыта. Финальные статусы, после них нельзя менять ни заявку ни статус: COMPLETE_PROPOSALS_AMOUNT_ACHIEVED - заявка закрылась автоматически при достижении кол-ва выполненных предложений CANCELED_BY_CREATOR - заявка закрыта пользователем EXPIRED - истек срок заявки, автоматически закрылась Технические статусы: VERIFYING_BY_ADMIN - проверяется адином, такая заявка не отображается в общей выдаче, этот статус выставляет сам админ TO_CORRECT_BY_ADMIN - статус выставляет админ после проверки заявки, после этого статуса можно выставить только статус  READY_TO_VERIFY_BY_ADMIN и эта заявка должна попасть обратно на проверку админу. Если админ проверил все и все ок, то он  выставляет статус CREATED. READY_TO_VERIFY_BY_ADMIN - статус устанавливается клиентом для того чтобы админ проверил изменения по заявке CANCELED_BY_ADMIN - закрыто админом  Статусы для проверки заявки у супервизера (пока вроде не нужно, но статусы можно создать): READY_TO_VERIFY_BY_SUPERVISOR - клиент отправляет заявку на проверку спервизеру, в этом статусе заявка не опубликована  на бирже и подавать предложения нельзя, изменять заявку так же нельзя. Заявки с таким статусом доступны всем супервизерам.  (пока этот функционал вроде не нужен) VERIFYING_BY_SUPERVISOR - в процессе проверки заявки супервизером, в этом статусе заявка не опубликована на бирже и  подавать предложения нельзя, изменять заявку так же нельзя (пока этот функционал вроде не нужен) TO_CORRECT_BY_SUPERVISOR - статус выставляет супервизор после проверки заявки, после этого статуса можно выставить только  статус READY_TO_VERIFY и эта заявка должна попасть обратно на проверку ТОМУ ЖЕ супервизеру что и проверял ее ранее.  (поле supervisorId). Если супервизор проверил все и все ок, то он выставляет статус PUBLISHED. (опять же пока можно заложить  статус но логику не реализовывать)  | 
**timeoutAt** | **Date** | Время закрытия заявки. | [optional] 
**timeLimitInMinutes** | **Number** | Время за которое должен отправить предложение после бронирования. В минутах. | [optional] 
**assignees** | **[String]** | Массив id пользователей. | [optional] 
**direction** | **String** | Направление заявки, исходящая или входящая. | 
**roles** | **[Number]** | Массив массив ролей. | [optional] 
**needCheckBySupervisor** | **Boolean** | Если требуется проверка супервайзером. | [optional] 
**restrictMoreThanOneProposalFromOneAssignee** | **Boolean** | Запретить фрилансеру повторное отправление предложений. | [optional] 
**createdById** | **String** | GUID клиента, который создал заявку. | [optional] 
**lastModifiedById** | **String** | GUID клиента, который обновил запрос на поиск товара. | [optional] 
**typeTask** | **Number** | Код специализации фрилансера | [optional] 
**productId** | **String** | Гуид продукта | [optional] 
**asin** | **String** | Привязанный асин | [optional] 
**priceAmazon** | **Number** | Цена на амазоне | [optional] 
**cashBackInPercent** | **Number** | Возврат средств с покупки в процентах | [optional] 
**announcementId** | **String** | Гуид анонса | [optional] 
**createdAt** | **Date** | Дата создания | [optional] 
**updatedAt** | **Date** | Дата изменения | [optional] 
**createdBy** | [**ApiV1AdminsGetProductsByStatusCreatedBy**](ApiV1AdminsGetProductsByStatusCreatedBy.md) |  | [optional] 
**countProposalsByStatuses** | [**ApiV1RequestsCountProposalsByStatuses**](ApiV1RequestsCountProposalsByStatuses.md) |  | [optional] 



## Enum: StatusEnum


* `DRAFT` (value: `"DRAFT"`)

* `PUBLISHED` (value: `"PUBLISHED"`)

* `IN_PROCESS` (value: `"IN_PROCESS"`)

* `FORBID_NEW_PROPOSALS` (value: `"FORBID_NEW_PROPOSALS"`)

* `COMPLETE_PROPOSALS_AMOUNT_ACHIEVED` (value: `"COMPLETE_PROPOSALS_AMOUNT_ACHIEVED"`)

* `CANCELED_BY_CREATOR` (value: `"CANCELED_BY_CREATOR"`)

* `EXPIRED` (value: `"EXPIRED"`)

* `READY_TO_VERIFY_BY_ADMIN` (value: `"READY_TO_VERIFY_BY_ADMIN"`)

* `VERIFYING_BY_ADMIN` (value: `"VERIFYING_BY_ADMIN"`)

* `TO_CORRECT_BY_ADMIN` (value: `"TO_CORRECT_BY_ADMIN"`)

* `CANCELED_BY_ADMIN` (value: `"CANCELED_BY_ADMIN"`)

* `READY_TO_VERIFY_BY_SUPERVISOR` (value: `"READY_TO_VERIFY_BY_SUPERVISOR"`)

* `VERIFYING_BY_SUPERVISOR` (value: `"VERIFYING_BY_SUPERVISOR"`)

* `TO_CORRECT_BY_SUPERVISOR` (value: `"TO_CORRECT_BY_SUPERVISOR"`)





## Enum: DirectionEnum


* `IN` (value: `"IN"`)

* `OUT` (value: `"OUT"`)




