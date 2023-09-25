# TestSwagger.ClientApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1ClientsBoxesConfirmDeliveryPriceChangePost**](ClientApi.md#apiV1ClientsBoxesConfirmDeliveryPriceChangePost) | **POST** /api/v1/clients/boxes/confirm_delivery_price_change | # Подтвердить измение цены доставки за коробки.
[**apiV1ClientsBoxesGuidEditShippingLabelFirstTimePatch**](ClientApi.md#apiV1ClientsBoxesGuidEditShippingLabelFirstTimePatch) | **PATCH** /api/v1/clients/boxes/{guid}/edit_shippingLabel_first_time | Редактировать shippingLabel в первый раз.
[**apiV1ClientsBoxesReturnBoxesToStockPost**](ClientApi.md#apiV1ClientsBoxesReturnBoxesToStockPost) | **POST** /api/v1/clients/boxes/return_boxes_to_stock | Вернуть коробки обратно на склад.
[**apiV1ClientsBoxesUpdateTariffIfTariffWasDeletedPost**](ClientApi.md#apiV1ClientsBoxesUpdateTariffIfTariffWasDeletedPost) | **POST** /api/v1/clients/boxes/update_tariff_if_tariff_was_deleted | Обновить тариф если тариф был удален.
[**apiV1ClientsDestinationGet**](ClientApi.md#apiV1ClientsDestinationGet) | **GET** /api/v1/clients/destination | #  Получить все склады назначения.
[**apiV1ClientsDestinationsGet**](ClientApi.md#apiV1ClientsDestinationsGet) | **GET** /api/v1/clients/destinations | Отдает дестинейшны со статусом коробки указаным в квери
[**apiV1ClientsGetOrdersByProductIdGuidGet**](ClientApi.md#apiV1ClientsGetOrdersByProductIdGuidGet) | **GET** /api/v1/clients/get_orders_by_product_id/{guid} | # Получить заказы текущего клиента через id товара.
[**apiV1ClientsMakePaymentsPost**](ClientApi.md#apiV1ClientsMakePaymentsPost) | **POST** /api/v1/clients/make_payments | # Оплатить товары.
[**apiV1ClientsOrdersFormedPost**](ClientApi.md#apiV1ClientsOrdersFormedPost) | **POST** /api/v1/clients/orders/formed | # Создать заказ в статусе formed.
[**apiV1ClientsOrdersGet**](ClientApi.md#apiV1ClientsOrdersGet) | **GET** /api/v1/clients/orders | # Получить заказы текущего клиента.
[**apiV1ClientsOrdersGuidCancelPost**](ClientApi.md#apiV1ClientsOrdersGuidCancelPost) | **POST** /api/v1/clients/orders/{guid}/cancel | Отменить заказ.
[**apiV1ClientsOrdersGuidConfirmPriceChangePost**](ClientApi.md#apiV1ClientsOrdersGuidConfirmPriceChangePost) | **POST** /api/v1/clients/orders/{guid}/confirm_price_change | # Подтвердить измение цены.
[**apiV1ClientsOrdersGuidGet**](ClientApi.md#apiV1ClientsOrdersGuidGet) | **GET** /api/v1/clients/orders/{guid} | # Получить заказ по его GUID.
[**apiV1ClientsOrdersGuidPatch**](ClientApi.md#apiV1ClientsOrdersGuidPatch) | **PATCH** /api/v1/clients/orders/{guid} | # Внести изменения в заказ.
[**apiV1ClientsOrdersPost**](ClientApi.md#apiV1ClientsOrdersPost) | **POST** /api/v1/clients/orders | # Создать заказ.
[**apiV1ClientsOrdersToReadyToProcessGuidPatch**](ClientApi.md#apiV1ClientsOrdersToReadyToProcessGuidPatch) | **PATCH** /api/v1/clients/orders/to_ready_to_process/{guid} | # Перенести заказ из статусов formed(0), pending(2) или readyForBuyout(3) в статус readyToProcess(10)
[**apiV1ClientsPagOrdersGet**](ClientApi.md#apiV1ClientsPagOrdersGet) | **GET** /api/v1/clients/pag/orders | # Получить заказы текущего клиента.
[**apiV1ClientsProductsFromClientReadyToBeCheckedBySupervisorPatch**](ClientApi.md#apiV1ClientsProductsFromClientReadyToBeCheckedBySupervisorPatch) | **PATCH** /api/v1/clients/products/from_client_ready_to_be_checked_by_supervisor | # Отправить  созданные клиентом товары на проверку супервайзеру.
[**apiV1ClientsProductsGetPriceForClientPost**](ClientApi.md#apiV1ClientsProductsGetPriceForClientPost) | **POST** /api/v1/clients/products/get_price_for_client | # Получить цену для клиента на поиск поставщика множества товаров
[**apiV1ClientsProductsGuidChangeBarCodePatch**](ClientApi.md#apiV1ClientsProductsGuidChangeBarCodePatch) | **PATCH** /api/v1/clients/products/{guid}/change_barCode | # Внести изменения в баркод товара.
[**apiV1ClientsProductsGuidFourMonthesStockPatch**](ClientApi.md#apiV1ClientsProductsGuidFourMonthesStockPatch) | **PATCH** /api/v1/clients/products/{guid}/fourMonthesStock | # Внести изменения в fourMonthesStock товара.
[**apiV1ClientsProductsGuidFromClientReadyToBeCheckedBySupervisorPatch**](ClientApi.md#apiV1ClientsProductsGuidFromClientReadyToBeCheckedBySupervisorPatch) | **PATCH** /api/v1/clients/products/{guid}/from_client_ready_to_be_checked_by_supervisor | # Отправить  созданный клиентом товар на проверку супервайзеру.
[**apiV1ClientsProductsGuidGetPriceForClientGet**](ClientApi.md#apiV1ClientsProductsGuidGetPriceForClientGet) | **GET** /api/v1/clients/products/{guid}/get_price_for_client | # Получить цену для клиента на поиск поставщика
[**apiV1ClientsProductsGuidPatch**](ClientApi.md#apiV1ClientsProductsGuidPatch) | **PATCH** /api/v1/clients/products/{guid} | # Внести изменения в товар.
[**apiV1ClientsProductsGuidStockUSAPatch**](ClientApi.md#apiV1ClientsProductsGuidStockUSAPatch) | **PATCH** /api/v1/clients/products/{guid}/stockUSA | # Внести изменения в stockUSA товара.
[**apiV1ClientsProductsLightGet**](ClientApi.md#apiV1ClientsProductsLightGet) | **GET** /api/v1/clients/products/light | # Получить облегченный список товаров
[**apiV1ClientsProductsMyGet**](ClientApi.md#apiV1ClientsProductsMyGet) | **GET** /api/v1/clients/products/my | # Получить список товаров данного клиента используя фильтр
[**apiV1ClientsProductsMyWithPagGet**](ClientApi.md#apiV1ClientsProductsMyWithPagGet) | **GET** /api/v1/clients/products/my_with_pag | # Получить список товаров данного клиента используя фильтр
[**apiV1ClientsProductsPost**](ClientApi.md#apiV1ClientsProductsPost) | **POST** /api/v1/clients/products | # Добавить новый продукт клиентом.
[**apiV1ClientsProductsVacGet**](ClientApi.md#apiV1ClientsProductsVacGet) | **GET** /api/v1/clients/products/vac | # Получить список вакантных товаров.
[**apiV1ClientsTasksByBoxesGet**](ClientApi.md#apiV1ClientsTasksByBoxesGet) | **GET** /api/v1/clients/tasks/by_boxes | # Показать все задачи с коробками данного юзера
[**apiV1ClientsTasksCancelGuidPost**](ClientApi.md#apiV1ClientsTasksCancelGuidPost) | **POST** /api/v1/clients/tasks/cancel/{guid} | # Отменить задачу.
[**apiV1ClientsTasksGet**](ClientApi.md#apiV1ClientsTasksGet) | **GET** /api/v1/clients/tasks | # Показать все задачи данного пользователя в данном складе.
[**apiV1ClientsTasksPost**](ClientApi.md#apiV1ClientsTasksPost) | **POST** /api/v1/clients/tasks | # Создать задачу.
[**apiV1ClientsUpdateStoreDataPatch**](ClientApi.md#apiV1ClientsUpdateStoreDataPatch) | **PATCH** /api/v1/clients/update_store_data | Обновить данные по магазинам, не дожидаясь обновления в 7 утра



## apiV1ClientsBoxesConfirmDeliveryPriceChangePost

> String apiV1ClientsBoxesConfirmDeliveryPriceChangePost(opts)

# Подтвердить измение цены доставки за коробки.

## Метод должен вычислять разницу между deliveryTotalPriceChanged и deliveryTotalPrice - (deliveryTotalPriceChanged-deliveryTotalPrice).   ## Если разница больше 0 то нужно у клиента, который привязан к этой коробке из поля balance вычесть эту разницу,  а в поле balanceFreeze прибавить  ## Если разница меньше 0 то нужно у клиента, который привязан к этому ордеру из поля balanceFreeze вычесть эту   разницу, а в поле balance прибавить   ## Далее нужно сделать у заказа deliveryTotalPrice &#x3D; deliveryTotalPriceChanged   ## Проверки:Только для коробок со статусом: NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ClientApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': [new TestSwagger.InlineObject1()] // [InlineObject1] | 
};
apiInstance.apiV1ClientsBoxesConfirmDeliveryPriceChangePost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**[InlineObject1]**](InlineObject1.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1ClientsBoxesGuidEditShippingLabelFirstTimePatch

> String apiV1ClientsBoxesGuidEditShippingLabelFirstTimePatch(guid, opts)

Редактировать shippingLabel в первый раз.

## Редактировать shippingLabel в первый раз  Данный метод нужен чтобы отредактировать в первый раз shippingLabel коробки.         Проверки:         Доступен только для коробок ранее shippingLabel &#x3D;&#x3D;&#x3D; null,         Доступен только для коробок со статусами IN_STOCK

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ClientApi();
let guid = null; // String | GUID коробки
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject59() // InlineObject59 | 
};
apiInstance.apiV1ClientsBoxesGuidEditShippingLabelFirstTimePatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID коробки | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject59**](InlineObject59.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1ClientsBoxesReturnBoxesToStockPost

> String apiV1ClientsBoxesReturnBoxesToStockPost(opts)

Вернуть коробки обратно на склад.

## Вернуть коробки обратно на склад  Данный метод нужен чтобы отменить запрос на отправку в партию или при отказе клиентом изменения цены         У клиента будут разморожены средства на доставку.         У коробок статус вернется на статус IN_STOCK         затирается партия (batchId &#x3D; null)         Проверки:         Доступен только для коробок со статусами REQUESTED_SEND_TO_BATCH, NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE, NEED_TO_UPDATE_THE_TARIFF

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ClientApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': [new TestSwagger.InlineObject2()] // [InlineObject2] | 
};
apiInstance.apiV1ClientsBoxesReturnBoxesToStockPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**[InlineObject2]**](InlineObject2.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1ClientsBoxesUpdateTariffIfTariffWasDeletedPost

> String apiV1ClientsBoxesUpdateTariffIfTariffWasDeletedPost(opts)

Обновить тариф если тариф был удален.

## Обновить тариф если тариф был удален.  У коробок статус вернется на статус IN_BATCH или REQUESTED_SEND_TO_BATCH, в зависимости от того есть у коробки batchId         У клиента будут разморожены/разморожены средства на доставку в зависимости разницы стоимости.         Проверки:         Доступен только для коробок со статусами NEED_TO_UPDATE_THE_TARIFF

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ClientApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject58() // InlineObject58 | 
};
apiInstance.apiV1ClientsBoxesUpdateTariffIfTariffWasDeletedPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject58**](InlineObject58.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1ClientsDestinationGet

> [ApiV1AdminsOrdersDestination] apiV1ClientsDestinationGet(opts)

#  Получить все склады назначения.

## Получить все склады назначения.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ClientApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1ClientsDestinationGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[ApiV1AdminsOrdersDestination]**](ApiV1AdminsOrdersDestination.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1ClientsDestinationsGet

> [ApiV1AdminsOrdersDestination] apiV1ClientsDestinationsGet(opts)

Отдает дестинейшны со статусом коробки указаным в квери

Отдает дестинейшны со статусом коробки указаным в квери

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ClientApi();
let opts = {
  'status': "status_example", // String | Статус коробки, по которому будут отфильтрованы дестинейшны
  'storekeeperId': null, // String | Гуид сторкипера дестинейшна
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1ClientsDestinationsGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **status** | **String**| Статус коробки, по которому будут отфильтрованы дестинейшны | [optional] 
 **storekeeperId** | [**String**](.md)| Гуид сторкипера дестинейшна | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[ApiV1AdminsOrdersDestination]**](ApiV1AdminsOrdersDestination.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1ClientsGetOrdersByProductIdGuidGet

> [InlineResponse2001] apiV1ClientsGetOrdersByProductIdGuidGet(guid, opts)

# Получить заказы текущего клиента через id товара.

## Получить заказы текущего клиента через id товара.   ## описание поля status:       formed: 0,  Корзина - статус \&quot;Формируется\&quot;      new: 1,  Клиент создал заказ - статус \&quot;Новый\&quot;      readyToProcess: 10,  Заказ доступен к обработке закупщиком (через 15минут после того как он был сделан, приобрёл статус Новый ) - статус \&quot;доступен для обработки\&quot;      atProcess: 15,  Закупщик взял заказ в обработку - статус \&quot;в обработке\&quot;        Варианты обработки - \&quot;Что-то не так - требуется уточнение у клиента\&quot; - уведомить клиента. - закупщику контрольное         уведомление (т.к. будет суброль)        Необходим поиск нового поставщика. - уведомить клиента. - закупщику контрольное уведомление (т.к. будет суброль)      needConfirmingToPriceChange: 19,  \&quot;требуется подтверждение для изменения цены \&quot;        paid: 20, закупщик оплатил заказ - статус \&quot;оплачен\&quot;       trackNumberIssued: 25, выдан и принят трек номер - статус \&quot;выдан трек номер\&quot;      needConfirmingReceiving: 27 - Этот статус промежуточный между 25 и 30     С этого статуса заказ можно переводить в статусы 25,30,35     inStock: 30, Товар пришёл на склад - \&quot;Пришёл на склад\&quot;      canceledByBuyer: 35, // Отменен байером      canceledByClient: 40 // Отменен байером отменем клиентом, можно выстаить только для вакантных или тех котрорые ожидают доплаты. (10, 19)   вернет все незавершенные заказы клиента, гед есть указанный товар.

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ClientApi();
let guid = null; // String | GUID товара
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1ClientsGetOrdersByProductIdGuidGet(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID товара | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse2001]**](InlineResponse2001.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1ClientsMakePaymentsPost

> String apiV1ClientsMakePaymentsPost(opts)

# Оплатить товары.

## Оплатить товары.   ## Данный эндпоинт выбросит ошибку если хотябы один из продуктов не будет валидным   ## Прижимаются товары со статусами [70, 110]  ## Товары со статусом 70 (созданные фрилансером) получают статус 275, товар полностью переходит к клиенту: createdById меняется на id клиента, isCreatedByClient меняется на true, needCheckBySupervisor меняется на true,  ## Проверка продуктов(валидация): Нельзя повторно покупать товар который был оплачен (product.status &#x3D;&#x3D;&#x3D; 70 &amp;&amp; product.paidById !&#x3D;&#x3D; null)  ## Товары со статусом 110 (бесплатные от платформы) получают статус 76, клиент получает копию продукта без данных о ресерчере, баере и супервайзере.

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ClientApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject48() // InlineObject48 | 
};
apiInstance.apiV1ClientsMakePaymentsPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject48**](InlineObject48.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1ClientsOrdersFormedPost

> InlineResponse2016 apiV1ClientsOrdersFormedPost(opts)

# Создать заказ в статусе formed.

## Создать заказ в статусе formed.   ## Статус автоматом ставиться formed: 0  Стоимость заказа &#x3D; 0  Проверки:  Наличие продукта по guid,  Наличие у продукта поставщика тариф доставки должен принадлежать данному сторкиперу

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ClientApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject50() // InlineObject50 | 
};
apiInstance.apiV1ClientsOrdersFormedPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject50**](InlineObject50.md)|  | [optional] 

### Return type

[**InlineResponse2016**](InlineResponse2016.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1ClientsOrdersGet

> [InlineResponse2001] apiV1ClientsOrdersGet(opts)

# Получить заказы текущего клиента.

## Получить заказы текущего клиента.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ClientApi();
let opts = {
  'status': "status_example", // String | GUID сторкипера
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1ClientsOrdersGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **status** | **String**| GUID сторкипера | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse2001]**](InlineResponse2001.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1ClientsOrdersGuidCancelPost

> String apiV1ClientsOrdersGuidCancelPost(guid, opts)

Отменить заказ.

## Этот метод должен устанавливать статус ордеру 40(отменен клиентом), а так же брать из заказа поле totalPrice и  вычитать эту сумму у привязанного к заказу, клиента из поля balanceFreeze и прибавлять в поле balance  ## Проверки:  Данный метод возможно вызвать только при статусах readyToProcess: 10  и needConfirmingToPriceChange: 19, // требуется подтверждение для изменения цены)

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ClientApi();
let guid = null; // String | Guid ордера
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': null // Object | 
};
apiInstance.apiV1ClientsOrdersGuidCancelPost(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| Guid ордера | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | **Object**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1ClientsOrdersGuidConfirmPriceChangePost

> String apiV1ClientsOrdersGuidConfirmPriceChangePost(guid, opts)

# Подтвердить измение цены.

## Метод должен вычислять разницу между totalPriceChanged и totalPrice - (totalPriceChanged-totalPrice).   ## Если разница больше 0 то нужно у клиента, который привязан к этому ордеру из поля balance вычесть эту разницу,  а в поле balanceFreeze прибавить  ## Если разница меньше 0 то нужно у клиента, который привязан к этому ордеру из поля balanceFreeze вычесть эту   разницу, а в поле balance прибавить   ## Далее нужно сделать у заказа totalPrice &#x3D; totalPriceChanged   ## Проверки:Только для заказов со статусом needConfirmingToPriceChange: 19

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ClientApi();
let guid = null; // String | Guid ордера
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': null // Object | 
};
apiInstance.apiV1ClientsOrdersGuidConfirmPriceChangePost(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| Guid ордера | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | **Object**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1ClientsOrdersGuidGet

> {String: Object} apiV1ClientsOrdersGuidGet(guid, opts)

# Получить заказ по его GUID.

## Получить заказ по его GUID.   ## описание поля status:       formed: 0,  Корзина - статус \&quot;Формируется\&quot;      new: 1,  Клиент создал заказ - статус \&quot;Новый\&quot;      readyToProcess: 10,  Заказ доступен к обработке закупщиком (через 15минут после того как он был сделан, приобрёл статус Новый ) - статус \&quot;доступен для обработки\&quot;      atProcess: 15,  Закупщик взял заказ в обработку - статус \&quot;в обработке\&quot;        Варианты обработки - \&quot;Что-то не так - требуется уточнение у клиента\&quot; - уведомить клиента. - закупщику контрольное         уведомление (т.к. будет суброль)        Необходим поиск нового поставщика. - уведомить клиента. - закупщику контрольное уведомление (т.к. будет суброль)      needConfirmingToPriceChange: 19,  \&quot;требуется подтверждение для изменения цены \&quot;        paid: 20, закупщик оплатил заказ - статус \&quot;оплачен\&quot;       trackNumberIssued: 25, выдан и принят трек номер - статус \&quot;выдан трек номер\&quot;      needConfirmingReceiving: 27 - Этот статус промежуточный между 25 и 30     С этого статуса заказ можно переводить в статусы 25,30,35     inStock: 30, Товар пришёл на склад - \&quot;Пришёл на склад\&quot;      canceledByBuyer: 35, // Отменен байером      canceledByClient: 40 // Отменен байером отменем клиентом, можно выстаить только для вакантных или тех котрорые ожидают доплаты. (10, 19)   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ClientApi();
let guid = null; // String | GUID в сущности в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1ClientsOrdersGuidGet(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID в сущности в БД | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**{String: Object}**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1ClientsOrdersGuidPatch

> String apiV1ClientsOrdersGuidPatch(guid, opts)

# Внести изменения в заказ.

## Внести изменения в заказ.   ## Обратить внимание - внутри заказа нельзя отдельно редактировать атрибуты товара.   ## Если изменился какой-то они товар, все равно нужно передать полностью новый массив с .   ## с товарами.   ## Данный метод возможно вызывать до выплат поставщику (пока paidAt &#x3D;&#x3D;&#x3D; null)Проверки: тариф доставки должен принадлежать данному сторкиперу

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ClientApi();
let guid = null; // String | GUID заказа, который будет изменен
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject51() // InlineObject51 | 
};
apiInstance.apiV1ClientsOrdersGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID заказа, который будет изменен | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject51**](InlineObject51.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1ClientsOrdersPost

> InlineResponse2015 apiV1ClientsOrdersPost(opts)

# Создать заказ.

## Создать заказ.   ## Статус автоматом ставиться readyToProcess: 10  Стоимость заказа &#x3D; количество * (цена товара + (цена доставки паритии / количество товара в партии)):  Эта сумма будет заморожена у клиента. Курс записывается из админки Проверки:  Наличие продукта по guid,  Наличие у продукта поставщика тариф доставки должен принадлежать данному сторкиперу

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ClientApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject49() // InlineObject49 | 
};
apiInstance.apiV1ClientsOrdersPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject49**](InlineObject49.md)|  | [optional] 

### Return type

[**InlineResponse2015**](InlineResponse2015.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1ClientsOrdersToReadyToProcessGuidPatch

> String apiV1ClientsOrdersToReadyToProcessGuidPatch(guid, opts)

# Перенести заказ из статусов formed(0), pending(2) или readyForBuyout(3) в статус readyToProcess(10)

# Перенести заказ из статусов formed(0), pending(2) или readyForBuyout(3) в статус readyToProcess(10)

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ClientApi();
let guid = null; // String | GUID заказа, который будет изменен
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1ClientsOrdersToReadyToProcessGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID заказа, который будет изменен | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1ClientsPagOrdersGet

> InlineResponse20034 apiV1ClientsPagOrdersGet(opts)

# Получить заказы текущего клиента.

## Получить заказы текущего клиента.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ClientApi();
let opts = {
  'status': "status_example", // String | Статусы заказов, по которым идет фильтрация, разделенные запятыми
  'filters': "filters_example", // String |                Возможные поля:               asin, amazonTitle, skusByClient, id, item               2 варианта использования:                 1. Фильтр по одному полю:                   [amazonTitle][$eq]=some_title                 2. Фильтр по нескольким полям:                   or[0][amazonTitle][$eq]=some_title;or[1][asin][$eq]=some_asin                     Возвращает партии с коробками с продуктами, в которых amazonTitle равен some_title или asin равен some_asin               2 оператора совпадения:                 $eq - полное совпадение, нечувствителен к регистру                 $contains - наличие данной подстроки в поле, нечувствителен к регистру, предназначен только для строк             
  'limit': 10.0, // Number | Лимит записей для пагинации
  'offset': 0.0, // Number | Смещение для пагинации
  'sortField': "sortField_example", // String | Название поля
  'sortType': "sortType_example", // String | Тип сортировки
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1ClientsPagOrdersGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **status** | **String**| Статусы заказов, по которым идет фильтрация, разделенные запятыми | [optional] 
 **filters** | **String**|                Возможные поля:               asin, amazonTitle, skusByClient, id, item               2 варианта использования:                 1. Фильтр по одному полю:                   [amazonTitle][$eq]&#x3D;some_title                 2. Фильтр по нескольким полям:                   or[0][amazonTitle][$eq]&#x3D;some_title;or[1][asin][$eq]&#x3D;some_asin                     Возвращает партии с коробками с продуктами, в которых amazonTitle равен some_title или asin равен some_asin               2 оператора совпадения:                 $eq - полное совпадение, нечувствителен к регистру                 $contains - наличие данной подстроки в поле, нечувствителен к регистру, предназначен только для строк              | [optional] 
 **limit** | **Number**| Лимит записей для пагинации | [optional] [default to 10.0]
 **offset** | **Number**| Смещение для пагинации | [optional] [default to 0.0]
 **sortField** | **String**| Название поля | [optional] 
 **sortType** | **String**| Тип сортировки | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**InlineResponse20034**](InlineResponse20034.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1ClientsProductsFromClientReadyToBeCheckedBySupervisorPatch

> String apiV1ClientsProductsFromClientReadyToBeCheckedBySupervisorPatch(opts)

# Отправить  созданные клиентом товары на проверку супервайзеру.

## Отправить  созданные клиентом товары на проверку супервайзеру.   Данный метод ставит статус FROM_CLIENT_READY_TO_BE_CHECKED_BY_SUPERVISOR (205).   Замораживает средства у клиента,( услуги баер + услуги супервайзера(если он требуется)) * 2    Затирает id баера и супервайзера  Записывает комментарий от клиента   ## Проверки  Вы можете ставить продукту статус FROM_CLIENT_READY_TO_BE_CHECKED_BY_SUPERVISOR (205), если ранее товар имел статусы 200, 270, 275, 280, 290

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ClientApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject56() // InlineObject56 | 
};
apiInstance.apiV1ClientsProductsFromClientReadyToBeCheckedBySupervisorPatch(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject56**](InlineObject56.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1ClientsProductsGetPriceForClientPost

> InlineResponse20036 apiV1ClientsProductsGetPriceForClientPost(opts)

# Получить цену для клиента на поиск поставщика множества товаров

## Получить цену для клиента на поиск поставщика   ## Проверки  только продуты созданные клиентом и принадлежавшие данному пользователю.

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ClientApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject55() // InlineObject55 | 
};
apiInstance.apiV1ClientsProductsGetPriceForClientPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject55**](InlineObject55.md)|  | [optional] 

### Return type

[**InlineResponse20036**](InlineResponse20036.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1ClientsProductsGuidChangeBarCodePatch

> String apiV1ClientsProductsGuidChangeBarCodePatch(guid, opts)

# Внести изменения в баркод товара.

## Внести изменения в баркод товара.   Проверки:  Данный товар не принадлежит вам.

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ClientApi();
let guid = null; // String | GUID продукта, который будет изменен
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': null // Object | 
};
apiInstance.apiV1ClientsProductsGuidChangeBarCodePatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID продукта, который будет изменен | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | **Object**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1ClientsProductsGuidFourMonthesStockPatch

> String apiV1ClientsProductsGuidFourMonthesStockPatch(guid, opts)

# Внести изменения в fourMonthesStock товара.

## Внести изменения в fourMonthesStock товара.   Проверки:  Данный товар не принадлежит вам.

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ClientApi();
let guid = null; // String | GUID продукта, который будет изменен
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': null // Object | 
};
apiInstance.apiV1ClientsProductsGuidFourMonthesStockPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID продукта, который будет изменен | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | **Object**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1ClientsProductsGuidFromClientReadyToBeCheckedBySupervisorPatch

> String apiV1ClientsProductsGuidFromClientReadyToBeCheckedBySupervisorPatch(guid, opts)

# Отправить  созданный клиентом товар на проверку супервайзеру.

## Отправить  созданный клиентом товар на проверку супервайзеру.   Данный метод ставит статус FROM_CLIENT_READY_TO_BE_CHECKED_BY_SUPERVISOR (205).   Замораживает средства у клиента,( услуги баер + услуги супервайзера(если он требуется)) * 2    Затирает id баера и супервайзера  Записывает комментарий от клиента   ## Проверки  Вы можете ставить продукту статус FROM_CLIENT_READY_TO_BE_CHECKED_BY_SUPERVISOR (205), если ранее товар имел статусы 200, 270, 275, 280, 290

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ClientApi();
let guid = null; // String | GUID продукта, который будет изменен
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject57() // InlineObject57 | 
};
apiInstance.apiV1ClientsProductsGuidFromClientReadyToBeCheckedBySupervisorPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID продукта, который будет изменен | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject57**](InlineObject57.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1ClientsProductsGuidGetPriceForClientGet

> InlineResponse20036 apiV1ClientsProductsGuidGetPriceForClientGet(guid, opts)

# Получить цену для клиента на поиск поставщика

## Получить цену для клиента на поиск поставщика   ## Проверки  только продуты созданные клиентом и принадлежавшие данному пользователю.

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ClientApi();
let guid = null; // String | GUID продукта, который будет изменен
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1ClientsProductsGuidGetPriceForClientGet(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID продукта, который будет изменен | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**InlineResponse20036**](InlineResponse20036.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1ClientsProductsGuidPatch

> String apiV1ClientsProductsGuidPatch(guid, opts)

# Внести изменения в товар.

## Внести изменения в товар.   Если товар был создан ресерчером (статус до 100) менять можно только баркод (нет проверки).   ## Если товар был создан клиентом (статус от 200):  Вам разрешено редактировать свой товар или добавлять поставщика только если ранее товар имел статусы 200, 270, 275, 280, 290  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ClientApi();
let guid = null; // String | GUID продукта, который будет изменен
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject47() // InlineObject47 | 
};
apiInstance.apiV1ClientsProductsGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID продукта, который будет изменен | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject47**](InlineObject47.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1ClientsProductsGuidStockUSAPatch

> String apiV1ClientsProductsGuidStockUSAPatch(guid, opts)

# Внести изменения в stockUSA товара.

## Внести изменения в stockUSA товара.   Проверки:  Данный товар не принадлежит вам.

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ClientApi();
let guid = null; // String | GUID продукта, который будет изменен
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': null // Object | 
};
apiInstance.apiV1ClientsProductsGuidStockUSAPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID продукта, который будет изменен | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | **Object**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1ClientsProductsLightGet

> [InlineResponse20031] apiV1ClientsProductsLightGet(opts)

# Получить облегченный список товаров

## Получить облегченный список товаров(archive &#x3D; false)

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ClientApi();
let opts = {
  'isChild': true, // Boolean | Существуют ли у продукта родитель
  'isParent': true, // Boolean | Является ли продукт родителем
  'shopId': "shopId_example", // String | ID магазина для фильтрации по нему
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1ClientsProductsLightGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **isChild** | **Boolean**| Существуют ли у продукта родитель | [optional] 
 **isParent** | **Boolean**| Является ли продукт родителем | [optional] 
 **shopId** | **String**| ID магазина для фильтрации по нему | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse20031]**](InlineResponse20031.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1ClientsProductsMyGet

> [InlineResponse20033] apiV1ClientsProductsMyGet(opts)

# Получить список товаров данного клиента используя фильтр

## Получить список товаров данного клиента используя фильтр.   Выдача только продуктов которые не были оплачены paidAt &#x3D; null.

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ClientApi();
let opts = {
  'filters': "filters_example", // String |                Возможные поля - любые поля продукта               2 варианта использования:                 1. Фильтр по одному полю:                   [amazonTitle][$eq]=some_title                 2. Фильтр по нескольким полям:                   or[0][amazonTitle][$eq]=some_title;or[1][asin][$eq]=some_asin                     Возвращает партии с коробками с продуктами, в которых amazonTitle равен some_title или asin равен some_asin               2 оператора совпадения:                 $eq - полное совпадение, нечувствителен к регистру                 $contains - наличие данной подстроки в поле, нечувствителен к регистру, предназначен только для строк             
  'shopId': null, // String | ID магазина для фильтрации по нему
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1ClientsProductsMyGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **filters** | **String**|                Возможные поля - любые поля продукта               2 варианта использования:                 1. Фильтр по одному полю:                   [amazonTitle][$eq]&#x3D;some_title                 2. Фильтр по нескольким полям:                   or[0][amazonTitle][$eq]&#x3D;some_title;or[1][asin][$eq]&#x3D;some_asin                     Возвращает партии с коробками с продуктами, в которых amazonTitle равен some_title или asin равен some_asin               2 оператора совпадения:                 $eq - полное совпадение, нечувствителен к регистру                 $contains - наличие данной подстроки в поле, нечувствителен к регистру, предназначен только для строк              | [optional] 
 **shopId** | [**String**](.md)| ID магазина для фильтрации по нему | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse20033]**](InlineResponse20033.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1ClientsProductsMyWithPagGet

> InlineResponse20032 apiV1ClientsProductsMyWithPagGet(opts)

# Получить список товаров данного клиента используя фильтр

## Получить список товаров данного клиента используя фильтр.   Выдача только продуктов которые не были оплачены paidAt &#x3D; null.

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ClientApi();
let opts = {
  'filters': "filters_example", // String |                Возможные поля - любые поля продукта               2 варианта использования:                 1. Фильтр по одному полю:                   [amazonTitle][$eq]=some_title                 2. Фильтр по нескольким полям:                   or[0][amazonTitle][$eq]=some_title;or[1][asin][$eq]=some_asin                     Возвращает партии с коробками с продуктами, в которых amazonTitle равен some_title или asin равен some_asin               2 оператора совпадения:                 $eq - полное совпадение, нечувствителен к регистру                 $contains - наличие данной подстроки в поле, нечувствителен к регистру, предназначен только для строк             
  'shopIds': "shopIds_example", // String | Гуиды магазинов
  'purchaseQuantityAboveZero': true, // Boolean | purchaseQuantity > 0 булевое выражение
  'limit': 10.0, // Number | Лимит записей для пагинации
  'offset': 0.0, // Number | Смещение для пагинации
  'sortField': "sortField_example", // String | Название поля
  'sortType': "sortType_example", // String | Тип сортировки
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1ClientsProductsMyWithPagGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **filters** | **String**|                Возможные поля - любые поля продукта               2 варианта использования:                 1. Фильтр по одному полю:                   [amazonTitle][$eq]&#x3D;some_title                 2. Фильтр по нескольким полям:                   or[0][amazonTitle][$eq]&#x3D;some_title;or[1][asin][$eq]&#x3D;some_asin                     Возвращает партии с коробками с продуктами, в которых amazonTitle равен some_title или asin равен some_asin               2 оператора совпадения:                 $eq - полное совпадение, нечувствителен к регистру                 $contains - наличие данной подстроки в поле, нечувствителен к регистру, предназначен только для строк              | [optional] 
 **shopIds** | **String**| Гуиды магазинов | [optional] 
 **purchaseQuantityAboveZero** | **Boolean**| purchaseQuantity &gt; 0 булевое выражение | [optional] 
 **limit** | **Number**| Лимит записей для пагинации | [optional] [default to 10.0]
 **offset** | **Number**| Смещение для пагинации | [optional] [default to 0.0]
 **sortField** | **String**| Название поля | [optional] 
 **sortType** | **String**| Тип сортировки | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**InlineResponse20032**](InlineResponse20032.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1ClientsProductsPost

> InlineResponse2017 apiV1ClientsProductsPost(opts)

# Добавить новый продукт клиентом.

# Добавить новый продукт клиентом.  ## В отличии от метода ресерчера, статус продукта ставиться автоматом  CREATED_BY_CLIENT 

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ClientApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject54() // InlineObject54 | 
};
apiInstance.apiV1ClientsProductsPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject54**](InlineObject54.md)|  | [optional] 

### Return type

[**InlineResponse2017**](InlineResponse2017.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1ClientsProductsVacGet

> [InlineResponse20030] apiV1ClientsProductsVacGet(opts)

# Получить список вакантных товаров.

## Получить список  вакантных товаров. статусы 70 и 110(скрыты данные о поставщике, байере, супервайзере, создателе и skusByClient)  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ClientApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1ClientsProductsVacGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse20030]**](InlineResponse20030.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1ClientsTasksByBoxesGet

> InlineResponse20035 apiV1ClientsTasksByBoxesGet(opts)

# Показать все задачи с коробками данного юзера

## Показать все задачи с коробками данного юзера.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ClientApi();
let opts = {
  'filters': "filters_example", // String |                Возможные поля: isBarCodeAttached, asin, amazonTitle, skusByClient, id, item, trackNumberText, humanFriendlyId               Поиск для полей продукта идет через схему Задача -> Коробка -> Айтем коробки -> Продукт               Под humanFriendlyId имеется ввиду humanFriendlyId коробки               2 варианта использования:                 1. Фильтр по одному полю:                   [amazonTitle][$eq]=some_title                 2. Фильтр по нескольким полям:                   or[0][amazonTitle][$eq]=some_title;or[1][asin][$eq]=some_asin                     Возвращает партии с коробками с продуктами, в которых amazonTitle равен some_title или asin равен some_asin               2 оператора совпадения:                 $eq - полное совпадение, нечувствителен к регистру                 $contains - наличие данной подстроки в поле, нечувствителен к регистру, предназначен только для строк             
  'limit': 10.0, // Number | Лимит записей для пагинации
  'offset': 0.0, // Number | Смещение для пагинации
  'sortField': "sortField_example", // String | Название поля
  'sortType': "sortType_example", // String | Тип сортировки
  'storekeeperId': "storekeeperId_example", // String | GUID сторкипера
  'operationType': "operationType_example", // String | Тип операции
  'priority': "priority_example", // String | Приоритет задачи
  'status': "status_example", // String | Статус задачи
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1ClientsTasksByBoxesGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **filters** | **String**|                Возможные поля: isBarCodeAttached, asin, amazonTitle, skusByClient, id, item, trackNumberText, humanFriendlyId               Поиск для полей продукта идет через схему Задача -&gt; Коробка -&gt; Айтем коробки -&gt; Продукт               Под humanFriendlyId имеется ввиду humanFriendlyId коробки               2 варианта использования:                 1. Фильтр по одному полю:                   [amazonTitle][$eq]&#x3D;some_title                 2. Фильтр по нескольким полям:                   or[0][amazonTitle][$eq]&#x3D;some_title;or[1][asin][$eq]&#x3D;some_asin                     Возвращает партии с коробками с продуктами, в которых amazonTitle равен some_title или asin равен some_asin               2 оператора совпадения:                 $eq - полное совпадение, нечувствителен к регистру                 $contains - наличие данной подстроки в поле, нечувствителен к регистру, предназначен только для строк              | [optional] 
 **limit** | **Number**| Лимит записей для пагинации | [optional] [default to 10.0]
 **offset** | **Number**| Смещение для пагинации | [optional] [default to 0.0]
 **sortField** | **String**| Название поля | [optional] 
 **sortType** | **String**| Тип сортировки | [optional] 
 **storekeeperId** | **String**| GUID сторкипера | [optional] 
 **operationType** | **String**| Тип операции | [optional] 
 **priority** | **String**| Приоритет задачи | [optional] 
 **status** | **String**| Статус задачи | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**InlineResponse20035**](InlineResponse20035.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1ClientsTasksCancelGuidPost

> String apiV1ClientsTasksCancelGuidPost(guid, opts)

# Отменить задачу.

## Отменить задачу. Выставляет задаче статус 30.  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ClientApi();
let guid = null; // String | guid отменяемой задачи
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject53() // InlineObject53 | 
};
apiInstance.apiV1ClientsTasksCancelGuidPost(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| guid отменяемой задачи | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject53**](InlineObject53.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1ClientsTasksGet

> [InlineResponse2004] apiV1ClientsTasksGet(opts)

# Показать все задачи данного пользователя в данном складе.

## Показать все задачи данного пользователя в данном складе.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ClientApi();
let opts = {
  'storekeeperId': null, // String | GUID сторкипера
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1ClientsTasksGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **storekeeperId** | [**String**](.md)| GUID сторкипера | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse2004]**](InlineResponse2004.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1ClientsTasksPost

> InlineResponse2015 apiV1ClientsTasksPost(opts)

# Создать задачу.

## Создать задачу.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ClientApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject52() // InlineObject52 | 
};
apiInstance.apiV1ClientsTasksPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject52**](InlineObject52.md)|  | [optional] 

### Return type

[**InlineResponse2015**](InlineResponse2015.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1ClientsUpdateStoreDataPatch

> String apiV1ClientsUpdateStoreDataPatch(opts)

Обновить данные по магазинам, не дожидаясь обновления в 7 утра

Обновить данные по магазинам, не дожидаясь обновления в 7 утра

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ClientApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': ["98fbe049-b856-4d15-9d77-1bbcf1cfe027"] // [String] | 
};
apiInstance.apiV1ClientsUpdateStoreDataPatch(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**[String]**](String.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

