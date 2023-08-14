# TestSwagger.InlineObject11

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**paymentType** | **String** | DEPOSIT - пополнение депозита(баланса), WITHDRAW - вывод средств с баланса, FINE - штраф. | 
**recipientId** | **String** | GUID пользователя. | 
**sum** | **Number** | Начисленная сумма выплаты. Может быть отрицательной. | 
**comment** | **String** | комментарий | 



## Enum: PaymentTypeEnum


* `TRANSFER` (value: `"TRANSFER"`)

* `DEPOSIT` (value: `"DEPOSIT"`)

* `WITHDRAW` (value: `"WITHDRAW"`)

* `FINE` (value: `"FINE"`)




