# TestSwagger.InlineObject2

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**buyerComment** | **String** | комментарии байера. | [optional] 
**warehouse** | **Number** | Номер склада. | [optional] 
**deliveryMethod** | **Number** | Вид доставки. | [optional] 
**fba** | **Boolean** | Признак FBA это заказ или нет. | [optional] 
**status** | **Number** |    formed: 0,  Корзина - статус \&quot;Формируется\&quot;      new: 1,  Клиент создал заказ - статус \&quot;Новый\&quot;      readyToProcess: 10,  Заказ доступен к обработке закупщиком (через 15минут после того как он был сделан, приобрёл статус Новый ) - статус \&quot;доступен для обработки\&quot;      atProcess: 15,  Закупщик взял заказ в обработку - статус \&quot;в обработке\&quot;        Варианты обработки - \&quot;Что-то не так - требуется уточнение у клиента\&quot; - уведомить клиента. - закупщику контрольное         уведомление (т.к. будет суброль)        Необходим поиск нового поставщика. - уведомить клиента. - закупщику контрольное уведомление (т.к. будет суброль)      needConfirmingToPriceChange: 19,  \&quot;требуется подтверждение для изменения цены \&quot;        paid: 20, закупщик оплатил заказ - статус \&quot;оплачен\&quot;       trackNumberIssued: 25, выдан и принят трек номер - статус \&quot;выдан трек номер\&quot;      inStock: 30, Товар пришёл на склад - \&quot;Пришёл на склад\&quot;      returnOrder: 35 Если Заказ пришёл не кондиционный - \&quot;возврат заказа\&quot;     | [optional] 
**deliveryCostToTheWarehouse** | **Number** | Стоимость доставки до склада. | [optional] 
**images** | **[String]** | Массив картинок. | [optional] 
**yuanToDollarRate** | **Number** | Курс юань доллар. | [optional] 
**isBarCodeAlreadyAttachedByTheSupplier** | **Boolean** | Кнопка в заказе, сообщающая складу что штрихкод на товар поклеен у поставщика. | [optional] 
**trackingNumberChina** | **String** | Трек номер в ЗАКАЗЕ, по китаю отправленный заказ, до нашего склада. Вводиться баером, в заказ. | [optional] 
**amountPaymentPerConsignmentAtDollars** | **Number** | Сумма оплаты $ за партию товара - это сумма в $ указывается закупщиком | [optional] 
**totalPriceChanged** | **Number** | Если вдруг байер понял что стоимость заказа меняется в меньшую/большую сторону он напишет эту сумму в заказе в поле totalPriceChanged (нужно добавить это поле), далее корректировка стоимости решается через админа.  | [optional] 
**totalPrice** | **Number** | Сумма оплаты $ за партию товара - это сумма в $ указывается закупщиком | [optional] 


