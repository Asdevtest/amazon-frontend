# TestSwagger.InlineResponse2001

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | id заказ. | [optional] 
**_id** | **String** | GUID данной записи в БД. | [optional] 
**clientComment** | **String** | Комментарии клиента. | [optional] 
**trackingNumberChina** | **String** | Трек номер в ЗАКАЗЕ, по китаю отправленный заказ, до нашего склада. Вводиться баером, в заказ. | [optional] 
**buyerComment** | **String** | комментарии байера. | [optional] 
**status** | **Number** |    formed: 0,  Корзина - статус \&quot;Формируется\&quot;      new: 1,  Клиент создал заказ - статус \&quot;Новый\&quot;      readyToProcess: 10,  Заказ доступен к обработке закупщиком (через 15минут после того как он был сделан, приобрёл статус Новый ) - статус \&quot;доступен для обработки\&quot;      atProcess: 15,  Закупщик взял заказ в обработку - статус \&quot;в обработке\&quot;        Варианты обработки - \&quot;Что-то не так - требуется уточнение у клиента\&quot; - уведомить клиента. - закупщику контрольное         уведомление (т.к. будет суброль)        Необходим поиск нового поставщика. - уведомить клиента. - закупщику контрольное уведомление (т.к. будет суброль)      needConfirmingToPriceChange: 19,  \&quot;требуется подтверждение для изменения цены \&quot;        paid: 20, закупщик оплатил заказ - статус \&quot;оплачен\&quot;       trackNumberIssued: 25, выдан и принят трек номер - статус \&quot;выдан трек номер\&quot;      inStock: 30, Товар пришёл на склад - \&quot;Пришёл на склад\&quot;      canceledByBuyer: 35, // Отменен байером      canceledByClient: 40 // Отменен байером отменем клиентом, можно выстаить только для вакантных или тех котрорые ожидают доплаты. (10, 19)    | [optional] 
**images** | **[String]** | Массив картинок. | [optional] 
**totalPrice** | **Number** | Сумма оплаты $ за партию товара - это сумма в $ указывается закупщиком | [optional] 
**totalPriceChanged** | **Number** | Если вдруг байер понял что стоимость заказа меняется в меньшую/большую сторону он напишет эту сумму в заказе в поле totalPriceChanged (нужно добавить это поле), далее корректировка стоимости решается через админа.  | [optional] 
**paidAt** | **String** |  | [optional] 
**yuanToDollarRate** | **Number** | Курс юань доллар. | [optional] 
**deliveryCostToTheWarehouse** | **Number** | Стоимость доставки до склада. | [optional] 
**productId** | **String** | GUID продукта | [optional] 
**logicsTariffId** | **String** | GUID тарифа доставки | [optional] 
**buyerId** | **String** | GUID пользователя(байера) | [optional] 
**amount** | **Number** | кол-во | [optional] 
**createdAt** | **String** |  | [optional] 
**updatedAt** | **String** |  | [optional] 
**destination** | [**ApiV1AdminsOrdersDestination**](ApiV1AdminsOrdersDestination.md) |  | [optional] 
**logicsTariff** | [**ApiV1AdminsOrdersLogicsTariff**](ApiV1AdminsOrdersLogicsTariff.md) |  | [optional] 
**product** | [**InlineResponse200**](InlineResponse200.md) |  | [optional] 
**storekeeper** | [**ApiV1AdminsGetProductsByStatusClient**](ApiV1AdminsGetProductsByStatusClient.md) |  | [optional] 
**buyer** | [**ApiV1AdminsGetProductsByStatusClient**](ApiV1AdminsGetProductsByStatusClient.md) |  | [optional] 
**orderSupplier** | [**ApiV1AdminsOrdersOrderSupplier**](ApiV1AdminsOrdersOrderSupplier.md) |  | [optional] 
**createdBy** | [**ApiV1AdminsGetProductsByStatusClient**](ApiV1AdminsGetProductsByStatusClient.md) |  | [optional] 


