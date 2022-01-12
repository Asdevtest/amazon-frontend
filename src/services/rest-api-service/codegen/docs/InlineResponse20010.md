# TestSwagger.InlineResponse20010

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
<<<<<<< HEAD
**asin** | **String** | \&quot;ASIN\&quot; | [optional] 
**sku** | **String** | SKU | 
**title** | **String** | Title | [optional] 
**roi** | **Number** | ROI, % | [optional] 
**fbaFbmStock** | **Number** | FBA/FBM Stock | [optional] 
**stockValue** | **Number** | Stock value | [optional] 
**estimatedSalesVelocity** | **Number** | Estimated Sales Velocity | [optional] 
**daysOfStockLeft** | **Number** | Days  of stock  left | [optional] 
**recommendedQuantityForReordering** | **Number** | Recommended quantity for  reordering | [optional] 
**runningOutOfStock** | **String** | Running  out of stock | [optional] 
**reserved** | **Number** | Reserved | [optional] 
**sentToFba** | **Number** | Sent  to FBA | [optional] 
**fbaPrepStock** | **Number** | FBA  Prep. Stock | [optional] 
**ordered** | **String** | Ordered | [optional] 
**timeToReorder** | **String** | Time to  reorder | [optional] 
**comment** | **String** | Comment | [optional] 
**marketplace** | **String** | Marketplace | [optional] 
**targetStockRangeAfterNewOrderDays** | **Number** | Target stock range after new order days | [optional] 
**fbaBufferDays** | **Number** | FBA buffer days | [optional] 
**manufTimeDays** | **Number** | Manuf. time days | [optional] 
**useAPrepCenter** | **String** | Use a Prep Center | [optional] 
**shippingToPrepCenterDays** | **Number** | Shipping to Prep Center days | [optional] 
**shippingToFbaDays** | **Number** | Shipping to FBA days | [optional] 
=======
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


>>>>>>> 7f563425... 989, 1085, 1086, 1083, 1090, 1091, 1089, 1087, 1092, 1094, 1086, 1082, 1085, 1073, 1076, 1075, 1077, 1078, 1068 tasks


