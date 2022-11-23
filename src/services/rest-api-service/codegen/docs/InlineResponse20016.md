# TestSwagger.InlineResponse20016

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
**trackNumberText** | **String** | Текст трек номера | [optional] 
**trackNumberFile** | **String** | Ссылка на фото трек номера | [optional] 
**createdById** | **String** |  | [optional] 
**storekeeper** | [**ApiV1AdminsGetProductsByStatusCreatedBy**](ApiV1AdminsGetProductsByStatusCreatedBy.md) |  | [optional] 
**product** | [**ApiV1BuyersOrdersMyProduct**](ApiV1BuyersOrdersMyProduct.md) |  | [optional] 
**status** | **Number** |    formed: 0,  Корзина - статус \&quot;Формируется\&quot;      new: 1,  Клиент создал заказ - статус \&quot;Новый\&quot;      readyToProcess: 10,  Заказ доступен к обработке закупщиком (через 15минут после того как он был сделан, приобрёл статус Новый ) - статус \&quot;доступен для обработки\&quot;      atProcess: 15,  Закупщик взял заказ в обработку - статус \&quot;в обработке\&quot;        Варианты обработки - \&quot;Что-то не так - требуется уточнение у клиента\&quot; - уведомить клиента. - закупщику контрольное         уведомление (т.к. будет суброль)        Необходим поиск нового поставщика. - уведомить клиента. - закупщику контрольное уведомление (т.к. будет суброль)      needConfirmingToPriceChange: 19,  \&quot;требуется подтверждение для изменения цены \&quot;        paid: 20, закупщик оплатил заказ - статус \&quot;оплачен\&quot;       trackNumberIssued: 25, выдан и принят трек номер - статус \&quot;выдан трек номер\&quot;      inStock: 30, Товар пришёл на склад - \&quot;Пришёл на склад\&quot;      canceledByBuyer: 35, // Отменен байером      canceledByClient: 40 // Отменен байером отменем клиентом, можно выстаить только для вакантных или тех котрорые ожидают доплаты. (10, 19)    | [optional] 
**createdAt** | **String** |  | [optional] 
**updatedAt** | **String** |  | [optional] 


