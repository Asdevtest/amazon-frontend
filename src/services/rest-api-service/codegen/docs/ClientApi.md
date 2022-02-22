# TestSwagger.ClientApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1ClientsBatchesGet**](ClientApi.md#apiV1ClientsBatchesGet) | **GET** /api/v1/clients/batches | # Получить партии.
[**apiV1ClientsGetOrdersByProductIdGuidGet**](ClientApi.md#apiV1ClientsGetOrdersByProductIdGuidGet) | **GET** /api/v1/clients/get_orders_by_product_id/{guid} | # Получить заказы текущего клиента через id товара.
[**apiV1ClientsMakePaymentsPost**](ClientApi.md#apiV1ClientsMakePaymentsPost) | **POST** /api/v1/clients/make_payments | # Оплатить товары.
[**apiV1ClientsOrdersGet**](ClientApi.md#apiV1ClientsOrdersGet) | **GET** /api/v1/clients/orders | # Получить заказы текущего клиента.
[**apiV1ClientsOrdersGuidCancelPost**](ClientApi.md#apiV1ClientsOrdersGuidCancelPost) | **POST** /api/v1/clients/orders/{guid}/cancel | Отменить заказ.
[**apiV1ClientsOrdersGuidConfirmPriceChangePost**](ClientApi.md#apiV1ClientsOrdersGuidConfirmPriceChangePost) | **POST** /api/v1/clients/orders/{guid}/confirm_price_change | # Подтвердить измение цены.
[**apiV1ClientsOrdersGuidDelete**](ClientApi.md#apiV1ClientsOrdersGuidDelete) | **DELETE** /api/v1/clients/orders/{guid} | # Удалить заказ по его GUID.
[**apiV1ClientsOrdersGuidGet**](ClientApi.md#apiV1ClientsOrdersGuidGet) | **GET** /api/v1/clients/orders/{guid} | # Получить заказ по его GUID.
[**apiV1ClientsOrdersGuidPatch**](ClientApi.md#apiV1ClientsOrdersGuidPatch) | **PATCH** /api/v1/clients/orders/{guid} | # Внести изменения в заказ.
[**apiV1ClientsOrdersPost**](ClientApi.md#apiV1ClientsOrdersPost) | **POST** /api/v1/clients/orders | # Создать заказ.
[**apiV1ClientsProductsGuidFromClientReadyToBeCheckedBySupervisorPatch**](ClientApi.md#apiV1ClientsProductsGuidFromClientReadyToBeCheckedBySupervisorPatch) | **PATCH** /api/v1/clients/products/{guid}/from_client_ready_to_be_checked_by_supervisor | # Отправить  созданный клиентом товар на проверку супервайзеру.
[**apiV1ClientsProductsGuidGetPriceForClientGet**](ClientApi.md#apiV1ClientsProductsGuidGetPriceForClientGet) | **GET** /api/v1/clients/products/{guid}/get_price_for_client | # Получить цену для клиента на поиск поставщика
[**apiV1ClientsProductsGuidPatch**](ClientApi.md#apiV1ClientsProductsGuidPatch) | **PATCH** /api/v1/clients/products/{guid} | # Внести изменения в товар.
[**apiV1ClientsProductsMyGet**](ClientApi.md#apiV1ClientsProductsMyGet) | **GET** /api/v1/clients/products/my | # Получить список товаров данного клиента используя фильтр
[**apiV1ClientsProductsPaidGet**](ClientApi.md#apiV1ClientsProductsPaidGet) | **GET** /api/v1/clients/products/paid | # Получить список товаров оплаченных данного клиента.
[**apiV1ClientsProductsPost**](ClientApi.md#apiV1ClientsProductsPost) | **POST** /api/v1/clients/products | # Добавить новый продукт клиентом(копия эндпоинта как у ресерчера.).
[**apiV1ClientsProductsVacGet**](ClientApi.md#apiV1ClientsProductsVacGet) | **GET** /api/v1/clients/products/vac | # Получить список вакантных товаров.
[**apiV1ClientsTasksCancelGuidPost**](ClientApi.md#apiV1ClientsTasksCancelGuidPost) | **POST** /api/v1/clients/tasks/cancel/{guid} | # Отменить задачу.
[**apiV1ClientsTasksGet**](ClientApi.md#apiV1ClientsTasksGet) | **GET** /api/v1/clients/tasks | # Показать все задачи данного пользователя.
[**apiV1ClientsTasksGuidDelete**](ClientApi.md#apiV1ClientsTasksGuidDelete) | **DELETE** /api/v1/clients/tasks/{guid} | # Удалить задачу.
[**apiV1ClientsTasksLightGet**](ClientApi.md#apiV1ClientsTasksLightGet) | **GET** /api/v1/clients/tasks_light | # Облегченная версия. Показать все задачи данного пользователя.
[**apiV1ClientsTasksPost**](ClientApi.md#apiV1ClientsTasksPost) | **POST** /api/v1/clients/tasks | # Создать задачу.



## apiV1ClientsBatchesGet

> [InlineResponse2005] apiV1ClientsBatchesGet(opts)

# Получить партии.

## Получить партии.  

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
apiInstance.apiV1ClientsBatchesGet(opts).then((data) => {
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

[**[InlineResponse2005]**](InlineResponse2005.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1ClientsGetOrdersByProductIdGuidGet

> [InlineResponse2001] apiV1ClientsGetOrdersByProductIdGuidGet(guid, opts)

# Получить заказы текущего клиента через id товара.

## Получить заказы текущего клиента через id товара.   ## описание поля status:       formed: 0,  Корзина - статус \&quot;Формируется\&quot;      new: 1,  Клиент создал заказ - статус \&quot;Новый\&quot;      readyToProcess: 10,  Заказ доступен к обработке закупщиком (через 15минут после того как он был сделан, приобрёл статус Новый ) - статус \&quot;доступен для обработки\&quot;      atProcess: 15,  Закупщик взял заказ в обработку - статус \&quot;в обработке\&quot;        Варианты обработки - \&quot;Что-то не так - требуется уточнение у клиента\&quot; - уведомить клиента. - закупщику контрольное         уведомление (т.к. будет суброль)        Необходим поиск нового поставщика. - уведомить клиента. - закупщику контрольное уведомление (т.к. будет суброль)      needConfirmingToPriceChange: 19,  \&quot;требуется подтверждение для изменения цены \&quot;        paid: 20, закупщик оплатил заказ - статус \&quot;оплачен\&quot;       trackNumberIssued: 25, выдан и принят трек номер - статус \&quot;выдан трек номер\&quot;      inStock: 30, Товар пришёл на склад - \&quot;Пришёл на склад\&quot;      returnOrder: 35 Если Заказ пришёл не кондиционный - \&quot;возврат заказа\&quot;    вернет все незавершенные заказы клиента, гед есть указанный товар.

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
let guid = "guid_example"; // String | GUID товара
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
 **guid** | **String**| GUID товара | 
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

## Оплатить товары.   ## ВНИМАНИЕ: Данный эндпоинт не выбросит ошибку если один из GUID будет валидным но товара с таким GUID    ## ВНИМАНИЕ: не будет найден в базе.    ## ВНИМАНИЕ: Эта оплата товара не имеет ничего общего с оплатой в блоке байер.    ## ВНИМАНИЕ: Здесь оплата заполняет значения полей paidById, paidAt в Продукте.  

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
  'body': new TestSwagger.InlineObject22() // InlineObject22 | 
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
 **body** | [**InlineObject22**](InlineObject22.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1ClientsOrdersGet

> [InlineResponse2001] apiV1ClientsOrdersGet(opts)

# Получить заказы текущего клиента.

## Получить заказы текущего клиента.   ## Отдает все ордеры кроме статусов returnOrder: 35, orderIsClosed: 40 

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
apiInstance.apiV1ClientsOrdersGet(opts).then((data) => {
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

[**[InlineResponse2001]**](InlineResponse2001.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1ClientsOrdersGuidCancelPost

> String apiV1ClientsOrdersGuidCancelPost(guid, opts)

Отменить заказ.

## Этот метод должен устанавливать статус ордеру 40, а так же брать из заказа поле totalPrice и  вычитать эту сумму у привязанного к заказу, клиента из поля balanceFreeze и прибавлять в поле balance  ## Проверки:  Данный метод возможно вызывать до выплат поставщику (пока paidAt &#x3D;&#x3D;&#x3D; null)

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
let guid = "guid_example"; // String | Guid ордера
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
 **guid** | **String**| Guid ордера | 
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
let guid = "guid_example"; // String | Guid ордера
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
 **guid** | **String**| Guid ордера | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | **Object**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1ClientsOrdersGuidDelete

> String apiV1ClientsOrdersGuidDelete(guid, opts)

# Удалить заказ по его GUID.

## Удалить заказ по его GUID.   ## удалиь можно пока не взята байером (buyerId &#x3D;&#x3D;&#x3D; null)

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
let guid = "guid_example"; // String | GUID в сущности в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1ClientsOrdersGuidDelete(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| GUID в сущности в БД | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1ClientsOrdersGuidGet

> {String: Object} apiV1ClientsOrdersGuidGet(guid, opts)

# Получить заказ по его GUID.

## Получить заказ по его GUID.   ## описание поля status:       formed: 0,  Корзина - статус \&quot;Формируется\&quot;      new: 1,  Клиент создал заказ - статус \&quot;Новый\&quot;      readyToProcess: 10,  Заказ доступен к обработке закупщиком (через 15минут после того как он был сделан, приобрёл статус Новый ) - статус \&quot;доступен для обработки\&quot;      atProcess: 15,  Закупщик взял заказ в обработку - статус \&quot;в обработке\&quot;        Варианты обработки - \&quot;Что-то не так - требуется уточнение у клиента\&quot; - уведомить клиента. - закупщику контрольное         уведомление (т.к. будет суброль)        Необходим поиск нового поставщика. - уведомить клиента. - закупщику контрольное уведомление (т.к. будет суброль)      needConfirmingToPriceChange: 19,  \&quot;требуется подтверждение для изменения цены \&quot;        paid: 20, закупщик оплатил заказ - статус \&quot;оплачен\&quot;       trackNumberIssued: 25, выдан и принят трек номер - статус \&quot;выдан трек номер\&quot;      inStock: 30, Товар пришёл на склад - \&quot;Пришёл на склад\&quot;      returnOrder: 35 Если Заказ пришёл не кондиционный - \&quot;возврат заказа\&quot;    

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
let guid = "guid_example"; // String | GUID в сущности в БД
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
 **guid** | **String**| GUID в сущности в БД | 
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

## Внести изменения в заказ.   ## Обратить внимание - внутри заказа нельзя отдельно редактировать атрибуты товара.   ## Если изменился какой-то они товар, все равно нужно передать полностью новый массив с .   ## с товарами.   ## Данный метод возможно вызывать до выплат поставщику (пока paidAt &#x3D;&#x3D;&#x3D; null)

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
let guid = "guid_example"; // String | GUID заказа, который будет изменен
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject24() // InlineObject24 | 
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
 **guid** | **String**| GUID заказа, который будет изменен | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject24**](InlineObject24.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1ClientsOrdersPost

> InlineResponse2013 apiV1ClientsOrdersPost(opts)

# Создать заказ.

## Создать заказ.   ## Статус автоматом ставиться readyToProcess: 10  Стоимость заказа &#x3D; количество * (цена товара + цена доставки от поставщика):  Эта сумма будет заморожена у клиента.Курс записывается из админки Проверки:  Наличие продукта по guid,  Наличие у продукта поставщика 

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
  'body': new TestSwagger.InlineObject23() // InlineObject23 | 
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
 **body** | [**InlineObject23**](InlineObject23.md)|  | [optional] 

### Return type

[**InlineResponse2013**](InlineResponse2013.md)

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
let guid = "guid_example"; // String | GUID продукта, который будет изменен
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject27() // InlineObject27 | 
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
 **guid** | **String**| GUID продукта, который будет изменен | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject27**](InlineObject27.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1ClientsProductsGuidGetPriceForClientGet

> InlineResponse2008 apiV1ClientsProductsGuidGetPriceForClientGet(guid, opts)

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
let guid = "guid_example"; // String | GUID продукта, который будет изменен
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
 **guid** | **String**| GUID продукта, который будет изменен | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**InlineResponse2008**](InlineResponse2008.md)

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
let guid = "guid_example"; // String | GUID продукта, который будет изменен
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject21() // InlineObject21 | 
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
 **guid** | **String**| GUID продукта, который будет изменен | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject21**](InlineObject21.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1ClientsProductsMyGet

> [InlineResponse2006] apiV1ClientsProductsMyGet(opts)

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
  'filters': "filters_example", // String | Примеры: /products?filters=or[0][id][$eq]=B08F5VCNCY;or[1][amazonTitle][$contains]=drive отдает все где ASIN = \"B08F5VCNCY\" или в amazonTitle встречается \"drive\", не чувствителен к регистру.  без или: /products?filters=[amazonTitle][$contains]=drive
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
 **filters** | **String**| Примеры: /products?filters&#x3D;or[0][id][$eq]&#x3D;B08F5VCNCY;or[1][amazonTitle][$contains]&#x3D;drive отдает все где ASIN &#x3D; \&quot;B08F5VCNCY\&quot; или в amazonTitle встречается \&quot;drive\&quot;, не чувствителен к регистру.  без или: /products?filters&#x3D;[amazonTitle][$contains]&#x3D;drive | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse2006]**](InlineResponse2006.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1ClientsProductsPaidGet

> [InlineResponse2006] apiV1ClientsProductsPaidGet(opts)

# Получить список товаров оплаченных данного клиента.

## Получить список товаров оплаченных данного клиента.   ## Думаю это УСТАРЕВШИЙ метод. Он опирается на dirchecked.   

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
apiInstance.apiV1ClientsProductsPaidGet(opts).then((data) => {
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

[**[InlineResponse2006]**](InlineResponse2006.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1ClientsProductsPost

> InlineResponse2014 apiV1ClientsProductsPost(opts)

# Добавить новый продукт клиентом(копия эндпоинта как у ресерчера.).

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
  'body': new TestSwagger.InlineObject26() // InlineObject26 | 
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
 **body** | [**InlineObject26**](InlineObject26.md)|  | [optional] 

### Return type

[**InlineResponse2014**](InlineResponse2014.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1ClientsProductsVacGet

> [InlineResponse2006] apiV1ClientsProductsVacGet(opts)

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

[**[InlineResponse2006]**](InlineResponse2006.md)

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
let guid = "guid_example"; // String | guid отменяемой задачи
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
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
 **guid** | **String**| guid отменяемой задачи | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1ClientsTasksGet

> {String: Object} apiV1ClientsTasksGet(opts)

# Показать все задачи данного пользователя.

## Показать все задачи данного пользователя.   

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
  'offset': 0, // Number | Смещение в пагинации
  'limit': 20, // Number | Сколько записей отдать в пагинации
  'sortBy': "sortBy_example", // String | Название поля по которому происходи сортировка.
  'order': "order_example", // String | Направление сортировки
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
 **offset** | **Number**| Смещение в пагинации | [optional] [default to 0]
 **limit** | **Number**| Сколько записей отдать в пагинации | [optional] [default to 20]
 **sortBy** | **String**| Название поля по которому происходи сортировка. | [optional] 
 **order** | **String**| Направление сортировки | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**{String: Object}**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1ClientsTasksGuidDelete

> String apiV1ClientsTasksGuidDelete(guid, opts)

# Удалить задачу.

## Удалить задачу. !!! Можно удалять только задачи со статусом \&quot;0\&quot;.   

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
let guid = "guid_example"; // String | GUID удаляемого объекта.
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1ClientsTasksGuidDelete(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| GUID удаляемого объекта. | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1ClientsTasksLightGet

> [InlineResponse2003] apiV1ClientsTasksLightGet(opts)

# Облегченная версия. Показать все задачи данного пользователя.

## Показать все задачи данного пользователя.   

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
apiInstance.apiV1ClientsTasksLightGet(opts).then((data) => {
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

[**[InlineResponse2003]**](InlineResponse2003.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1ClientsTasksPost

> InlineResponse2012 apiV1ClientsTasksPost(opts)

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
  'body': new TestSwagger.InlineObject25() // InlineObject25 | 
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
 **body** | [**InlineObject25**](InlineObject25.md)|  | [optional] 

### Return type

[**InlineResponse2012**](InlineResponse2012.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

