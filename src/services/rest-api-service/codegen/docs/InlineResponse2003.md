# TestSwagger.InlineResponse2003

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**_id** | **String** | GUID платежа | [optional] 
**createdAt** | **Date** | Дата создания. | [optional] 
**createdBy** | [**ApiV1AdminsPaymentsCreatedBy**](ApiV1AdminsPaymentsCreatedBy.md) |  | [optional] 
**role** | **Number** | Роль пользователя на момент инициации платежа. | [optional] 
**subUser** | [**ApiV1AdminsPaymentsCreatedBy**](ApiV1AdminsPaymentsCreatedBy.md) |  | [optional] 
**entityId** | **String** | GUID товара или услуги. | [optional] 
**paymentType** | **String** | Тип платежа | [optional] 
**recipient** | [**ApiV1AdminsPaymentsCreatedBy**](ApiV1AdminsPaymentsCreatedBy.md) |  | [optional] 
**sum** | **Number** | Начисленная сумма выплаты. Равна рейту сотрудника в момент начисления. | [optional] 
**comment** | **String** | комментарий | [optional] 



## Enum: PaymentTypeEnum


* `PRODUCT` (value: `"PRODUCT"`)

* `ORDER` (value: `"ORDER"`)

* `BOX` (value: `"BOX"`)

* `BATCH` (value: `"BATCH"`)

* `USER` (value: `"USER"`)

* `REQUEST-CUSTOM` (value: `"REQUEST-CUSTOM"`)

* `REQUEST-SEARCH_PRODUCT` (value: `"REQUEST-SEARCH_PRODUCT"`)

* `REQUEST-SEARCH_NICHE` (value: `"REQUEST-SEARCH_NICHE"`)

* `REQUEST-PROPOSAL-CUSTOM` (value: `"REQUEST-PROPOSAL-CUSTOM"`)

* `REQUEST-PROPOSAL-SEARCH_PRODUCT` (value: `"REQUEST-PROPOSAL-SEARCH_PRODUCT"`)

* `REQUEST-PROPOSAL-SEARCH_NICHE` (value: `"REQUEST-PROPOSAL-SEARCH_NICHE"`)

* `OTHER` (value: `"OTHER"`)




