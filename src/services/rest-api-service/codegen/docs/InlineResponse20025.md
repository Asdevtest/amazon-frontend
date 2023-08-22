# TestSwagger.InlineResponse20025

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | id заказ. | [optional] 
**_id** | **String** | GUID данной записи в БД. | [optional] 
**amount** | **Number** | кол-во | [optional] 
**clientComment** | **String** | Комментарии клиента. | [optional] 
**buyerComment** | **String** | комментарии байера. | [optional] 
**destination** | [**ApiV1AdminsOrdersDestination**](ApiV1AdminsOrdersDestination.md) |  | [optional] 
**item** | **String** |  | [optional] 
**priceInYuan** | **Number** | Цена в юанях | [optional] 
**partialPaymentAmountRmb** | **Number** | Сумма частичной оплаты | [optional] 
**partialPayment** | **Boolean** | Используется ли частичная оплата | [optional] 
**paymentDetailsAttached** | **Boolean** | Есть ли реквизиты в ордере | [optional] 
**partiallyPaid** | **Number** | Cумма частичной оплаты | [optional] 
**payments** | [**[ApiV1BuyersOrdersMyPayments]**](ApiV1BuyersOrdersMyPayments.md) |  | [optional] 
**orderSupplier** | [**ApiV1BuyersOrdersMyOrderSupplier**](ApiV1BuyersOrdersMyOrderSupplier.md) |  | [optional] 
**priority** | **String** | Приоритет заказа: от 10 до 50 - от найменее значимого до найболее значимого соответственно | [optional] 
**expressChinaDelivery** | **Boolean** | Флаг , обозначающий оплату за экспресс доставку по китаю | [optional] 
**needsResearch** | **Boolean** | Нуждается ли заказ в повторном поиске поставщика | [optional] 
**deadline** | **Date** | Дедлайн выкупа заказа | [optional] 
**paymentDateToSupplier** | **String** | Дата оплаты поставщтку | [optional] 
**totalPrice** | **Number** | Сумма оплаты $ за партию товара - это сумма в $ указывается закупщиком | [optional] 
**totalPriceChanged** | **Number** | Если вдруг байер понял что стоимость заказа меняется в меньшую/большую сторону он напишет эту сумму в заказе в поле totalPriceChanged (нужно добавить это поле), далее корректировка стоимости решается через админа.  | [optional] 
**createdById** | **String** |  | [optional] 
**storekeeper** | [**ApiV1AnnouncementsMyCreatedBy**](ApiV1AnnouncementsMyCreatedBy.md) |  | [optional] 
**product** | [**ApiV1BuyersOrdersMyProduct**](ApiV1BuyersOrdersMyProduct.md) |  | [optional] 
**status** | **Number** |    formed: 0,  Корзина - статус \&quot;Формируется\&quot;      new: 1,  Клиент создал заказ - статус \&quot;Новый\&quot;      readyToProcess: 10,  Заказ доступен к обработке закупщиком (через 15минут после того как он был сделан, приобрёл статус Новый ) - статус \&quot;доступен для обработки\&quot;      atProcess: 15,  Закупщик взял заказ в обработку - статус \&quot;в обработке\&quot;        Варианты обработки - \&quot;Что-то не так - требуется уточнение у клиента\&quot; - уведомить клиента. - закупщику контрольное         уведомление (т.к. будет суброль)        Необходим поиск нового поставщика. - уведомить клиента. - закупщику контрольное уведомление (т.к. будет суброль)      needConfirmingToPriceChange: 19,  \&quot;требуется подтверждение для изменения цены \&quot;        paid: 20, закупщик оплатил заказ - статус \&quot;оплачен\&quot;       trackNumberIssued: 25, выдан и принят трек номер - статус \&quot;выдан трек номер\&quot;      needConfirmingReceiving: 27 - Этот статус промежуточный между 25 и 30     С этого статуса заказ можно переводить в статусы 25,30,35     inStock: 30, Товар пришёл на склад - \&quot;Пришёл на склад\&quot;      canceledByBuyer: 35, // Отменен байером      canceledByClient: 40 // Отменен байером отменем клиентом, можно выстаить только для вакантных или тех котрорые ожидают доплаты. (10, 19)    | [optional] 
**createdAt** | **Date** |  | [optional] 
**updatedAt** | **Date** |  | [optional] 



## Enum: PriorityEnum


* `10` (value: `"10"`)

* `20` (value: `"20"`)

* `30` (value: `"30"`)

* `40` (value: `"40"`)

* `50` (value: `"50"`)




