# TestSwagger.InlineResponse20010

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**_id** | **String** | Guid продожения к заявке. | [optional] 
**requestId** | **String** | Guid заявки к которой относится данное предложение. | [optional] 
**type** | **String** | Тип предложения. | [optional] 
**status** | **String** | Статус предложения предложения. | [optional] 
**timeoutAt** | **Date** | Время закрытия предложения. | [optional] 
**clientId** | **String** | GUID клиента . | [optional] 
**supervisorId** | **String** | GUID супервизора. | [optional] 
**createdById** | **String** | GUID любого, кто создал предложение. | [optional] 
**lastModifiedById** | **String** | GUID любого, кто последний редактировал предложение. | [optional] 
**createdAt** | **Date** | Дата создания | [optional] 
**updatedAt** | **Date** | Дата изменения | [optional] 



## Enum: StatusEnum


* `EMPTY` (value: `"EMPTY"`)

* `CREATED` (value: `"CREATED"`)

* `READY_TO_VERIFY` (value: `"READY_TO_VERIFY"`)

* `VERIFYING_BY_SUPERVISOR` (value: `"VERIFYING_BY_SUPERVISOR"`)

* `TO_CORRECT` (value: `"TO_CORRECT"`)

* `CORRECTED` (value: `"CORRECTED"`)

* `CANCELED_BY_CLIENT` (value: `"CANCELED_BY_CLIENT"`)

* `CANCELED_BY_SUPERVISOR` (value: `"CANCELED_BY_SUPERVISOR"`)

* `CANCELED_BY_EXECUTOR` (value: `"CANCELED_BY_EXECUTOR"`)

* `ACCEPTED_BY_CLIENT` (value: `"ACCEPTED_BY_CLIENT"`)

* `ACCEPTED_BY_SUPERVISOR` (value: `"ACCEPTED_BY_SUPERVISOR"`)

* `EXPIRED` (value: `"EXPIRED"`)




