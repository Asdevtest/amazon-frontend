# Amazonapi.ClientApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1ClientsBatchesGet**](ClientApi.md#apiV1ClientsBatchesGet) | **GET** /api/v1/clients/batches | # Получить партии.
[**apiV1ClientsBoxesGet**](ClientApi.md#apiV1ClientsBoxesGet) | **GET** /api/v1/clients/boxes | # Показать все коробки.
[**apiV1ClientsBoxesGuidGet**](ClientApi.md#apiV1ClientsBoxesGuidGet) | **GET** /api/v1/clients/boxes/{guid} | # Показать коробку по GUID.
[**apiV1ClientsMakePaymentsPost**](ClientApi.md#apiV1ClientsMakePaymentsPost) | **POST** /api/v1/clients/make_payments | # Оплатить товары.
[**apiV1ClientsOrdersGet**](ClientApi.md#apiV1ClientsOrdersGet) | **GET** /api/v1/clients/orders | # Получить заказы текущего клиента.
[**apiV1ClientsOrdersGuidDelete**](ClientApi.md#apiV1ClientsOrdersGuidDelete) | **DELETE** /api/v1/clients/orders/{guid} | # Получить заказ по его GUID.
[**apiV1ClientsOrdersGuidGet**](ClientApi.md#apiV1ClientsOrdersGuidGet) | **GET** /api/v1/clients/orders/{guid} | # Получить заказ по его GUID.
[**apiV1ClientsOrdersGuidPatch**](ClientApi.md#apiV1ClientsOrdersGuidPatch) | **PATCH** /api/v1/clients/orders/{guid} | # Внести изменения в заказ.
[**apiV1ClientsOrdersPost**](ClientApi.md#apiV1ClientsOrdersPost) | **POST** /api/v1/clients/orders | # Создать заказ.
[**apiV1ClientsProductsGuidPatch**](ClientApi.md#apiV1ClientsProductsGuidPatch) | **PATCH** /api/v1/clients/products/{guid} | # Внести изменения в товар.
[**apiV1ClientsProductsMyGet**](ClientApi.md#apiV1ClientsProductsMyGet) | **GET** /api/v1/clients/products/my | # Получить список товаров данного клиента.
[**apiV1ClientsProductsPaidGet**](ClientApi.md#apiV1ClientsProductsPaidGet) | **GET** /api/v1/clients/products/paid | # Получить список товаров оплаченных данного клиента.
[**apiV1ClientsProductsPickupGuidPost**](ClientApi.md#apiV1ClientsProductsPickupGuidPost) | **POST** /api/v1/clients/products/pickup/{guid} | # Взять товар в работу.
[**apiV1ClientsProductsVacGet**](ClientApi.md#apiV1ClientsProductsVacGet) | **GET** /api/v1/clients/products/vac | # Получить список вакантных товаров.
[**apiV1ClientsTasksGet**](ClientApi.md#apiV1ClientsTasksGet) | **GET** /api/v1/clients/tasks | # Показать все задачи данного пользователя.
[**apiV1ClientsTasksPost**](ClientApi.md#apiV1ClientsTasksPost) | **POST** /api/v1/clients/tasks | # Создать задачу.
[**apiV1ClientsUsersGet**](ClientApi.md#apiV1ClientsUsersGet) | **GET** /api/v1/clients/users | # Получить список пользователей.
[**apiV1ClientsUsersGuidPatch**](ClientApi.md#apiV1ClientsUsersGuidPatch) | **PATCH** /api/v1/clients/users/{guid} | # Изменить пользователя.



## apiV1ClientsBatchesGet

> [InlineResponse2008] apiV1ClientsBatchesGet(opts)

# Получить партии.

## Получить партии.  

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.ClientApi();
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**[InlineResponse2008]**](InlineResponse2008.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1ClientsBoxesGet

> [InlineResponse2006] apiV1ClientsBoxesGet(opts)

# Показать все коробки.

## Показать все коробки.   Клиент ничего не может сам делать с коробками. Только видеть их параметры.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.ClientApi();
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1ClientsBoxesGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**[InlineResponse2006]**](InlineResponse2006.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1ClientsBoxesGuidGet

> InlineResponse2006 apiV1ClientsBoxesGuidGet(guid, opts)

# Показать коробку по GUID.

## Показать коробку по GUID.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.ClientApi();
let guid = "guid_example"; // String | GUID коробки.
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1ClientsBoxesGuidGet(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| GUID коробки. | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**InlineResponse2006**](InlineResponse2006.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1ClientsMakePaymentsPost

> Null apiV1ClientsMakePaymentsPost(opts)

# Оплатить товары.

## Оплатить товары.   ## ВНИМАНИЕ: Данный эндпоинт не выбросит ошибку если один из GUID будет валидным но товара с таким GUID    ## ВНИМАНИЕ: не будет найден в базе.    ## ВНИМАНИЕ: Эта оплата товара не имеет ничего общего с оплатой в блоке байер.    ## ВНИМАНИЕ: Здесь оплата заполняет значения полей paidby, paidat в Продукте.  

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.ClientApi();
let opts = {
  'Accept_Encoding': gzip, deflate, // String | 
  'InlineObject7': new Amazonapi.InlineObject7() // InlineObject7 | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]
 **InlineObject7** | [**InlineObject7**](InlineObject7.md)|  | [optional] 

### Return type

[**Null**](Null.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1ClientsOrdersGet

> [InlineResponse2002] apiV1ClientsOrdersGet(opts)

# Получить заказы текущего клиента.

## Получить заказы текущего клиента.   ## описание поля status:       formed: 0,  Корзина - статус \&quot;Формируется\&quot;      new: 1,  Клиент создал заказ - статус \&quot;Новый\&quot;      readyToProcess: 10,  Заказ доступен к обработке закупщиком (через 15минут после того как он был сделан, приобрёл статус Новый ) - статус \&quot;доступен для обработки\&quot;      atProcess: 15,  Закупщик взял заказ в обработку - статус \&quot;в обработке\&quot;        Варианты обработки - \&quot;Что-то не так - требуется уточнение у клиента\&quot; - уведомить клиента. - закупщику контрольное         уведомление (т.к. будет суброль)        Необходим поиск нового поставщика. - уведомить клиента. - закупщику контрольное уведомление (т.к. будет суброль)      paid: 20, закупщик оплатил заказ - статус \&quot;оплачен\&quot;       trackNumberIssued: 25, выдан и принят трек номер - статус \&quot;выдан трек номер\&quot;      inStock: 30, Товар пришёл на склад - \&quot;Пришёл на склад\&quot;      returnOrder: 35 Если Заказ пришёл не кондиционный - \&quot;возврат заказа\&quot;    

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.ClientApi();
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**[InlineResponse2002]**](InlineResponse2002.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1ClientsOrdersGuidDelete

> Null apiV1ClientsOrdersGuidDelete(guid, opts)

# Получить заказ по его GUID.

## Получить заказ по его GUID.   ## описание поля status:       formed: 0,  Корзина - статус \&quot;Формируется\&quot;      new: 1,  Клиент создал заказ - статус \&quot;Новый\&quot;      readyToProcess: 10,  Заказ доступен к обработке закупщиком (через 15минут после того как он был сделан, приобрёл статус Новый ) - статус \&quot;доступен для обработки\&quot;      atProcess: 15,  Закупщик взял заказ в обработку - статус \&quot;в обработке\&quot;        Варианты обработки - \&quot;Что-то не так - требуется уточнение у клиента\&quot; - уведомить клиента. - закупщику контрольное         уведомление (т.к. будет суброль)        Необходим поиск нового поставщика. - уведомить клиента. - закупщику контрольное уведомление (т.к. будет суброль)      paid: 20, закупщик оплатил заказ - статус \&quot;оплачен\&quot;       trackNumberIssued: 25, выдан и принят трек номер - статус \&quot;выдан трек номер\&quot;      inStock: 30, Товар пришёл на склад - \&quot;Пришёл на склад\&quot;      returnOrder: 35 Если Заказ пришёл не кондиционный - \&quot;возврат заказа\&quot;    

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.ClientApi();
let guid = "guid_example"; // String | GUID в сущности в БД
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**Null**](Null.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1ClientsOrdersGuidGet

> InlineResponse2005 apiV1ClientsOrdersGuidGet(guid, opts)

# Получить заказ по его GUID.

## Получить заказ по его GUID.   ## описание поля status:       formed: 0,  Корзина - статус \&quot;Формируется\&quot;      new: 1,  Клиент создал заказ - статус \&quot;Новый\&quot;      readyToProcess: 10,  Заказ доступен к обработке закупщиком (через 15минут после того как он был сделан, приобрёл статус Новый ) - статус \&quot;доступен для обработки\&quot;      atProcess: 15,  Закупщик взял заказ в обработку - статус \&quot;в обработке\&quot;        Варианты обработки - \&quot;Что-то не так - требуется уточнение у клиента\&quot; - уведомить клиента. - закупщику контрольное         уведомление (т.к. будет суброль)        Необходим поиск нового поставщика. - уведомить клиента. - закупщику контрольное уведомление (т.к. будет суброль)      paid: 20, закупщик оплатил заказ - статус \&quot;оплачен\&quot;       trackNumberIssued: 25, выдан и принят трек номер - статус \&quot;выдан трек номер\&quot;      inStock: 30, Товар пришёл на склад - \&quot;Пришёл на склад\&quot;      returnOrder: 35 Если Заказ пришёл не кондиционный - \&quot;возврат заказа\&quot;    

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.ClientApi();
let guid = "guid_example"; // String | GUID в сущности в БД
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**InlineResponse2005**](InlineResponse2005.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1ClientsOrdersGuidPatch

> Null apiV1ClientsOrdersGuidPatch(guid, InlineObject9, opts)

# Внести изменения в заказ.

## Внести изменения в заказ.   ## Обратить внимание - внутри заказа нельзя отдельно редактировать атрибуты товара.   ## Если изменился какой-то они товар, все равно нужно передать полностью новый массив с .   ## с товарами.   ## описание поля status:       formed: 0,  Корзина - статус \&quot;Формируется\&quot;      new: 1,  Клиент создал заказ - статус \&quot;Новый\&quot;      readyToProcess: 10,  Заказ доступен к обработке закупщиком (через 15минут после того как он был сделан, приобрёл статус Новый ) - статус \&quot;доступен для обработки\&quot;      atProcess: 15,  Закупщик взял заказ в обработку - статус \&quot;в обработке\&quot;        Варианты обработки - \&quot;Что-то не так - требуется уточнение у клиента\&quot; - уведомить клиента. - закупщику контрольное         уведомление (т.к. будет суброль)        Необходим поиск нового поставщика. - уведомить клиента. - закупщику контрольное уведомление (т.к. будет суброль)      paid: 20, закупщик оплатил заказ - статус \&quot;оплачен\&quot;       trackNumberIssued: 25, выдан и принят трек номер - статус \&quot;выдан трек номер\&quot;      inStock: 30, Товар пришёл на склад - \&quot;Пришёл на склад\&quot;      returnOrder: 35 Если Заказ пришёл не кондиционный - \&quot;возврат заказа\&quot;    

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.ClientApi();
let guid = 60806dbd5346527a0f90f41e; // String | GUID заказа, который будет изменен
let InlineObject9 = new Amazonapi.InlineObject9(); // InlineObject9 | 
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1ClientsOrdersGuidPatch(guid, InlineObject9, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| GUID заказа, который будет изменен | 
 **InlineObject9** | [**InlineObject9**](InlineObject9.md)|  | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**Null**](Null.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1ClientsOrdersPost

> InlineResponse201 apiV1ClientsOrdersPost(InlineObject8, opts)

# Создать заказ.

## Создать заказ.   ### Внимание ДИЧЬ!!! по коду если status установлен 1 то в коде он меняется на 10    ### Внимание ДИЧЬ!!! в комментариях по статусу есть то, что он через 10 минут должен стать 10.   ### Внимание ДИЧЬ!!! Если нужно так, то надо запилить планировщик задач и дергать его через крон.   ### описание поля status:       formed: 0,  Корзина - статус \&quot;Формируется\&quot;      new: 1,  Клиент создал заказ - статус \&quot;Новый\&quot;      readyToProcess: 10,  Заказ доступен к обработке закупщиком (через 15минут после того как он был сделан, приобрёл статус Новый ) - статус \&quot;доступен для обработки\&quot;      atProcess: 15,  Закупщик взял заказ в обработку - статус \&quot;в обработке\&quot;        Варианты обработки - \&quot;Что-то не так - требуется уточнение у клиента\&quot; - уведомить клиента. - закупщику контрольное         уведомление (т.к. будет суброль)        Необходим поиск нового поставщика. - уведомить клиента. - закупщику контрольное уведомление (т.к. будет суброль)      paid: 20, закупщик оплатил заказ - статус \&quot;оплачен\&quot;       trackNumberIssued: 25, выдан и принят трек номер - статус \&quot;выдан трек номер\&quot;      inStock: 30, Товар пришёл на склад - \&quot;Пришёл на склад\&quot;      returnOrder: 35 Если Заказ пришёл не кондиционный - \&quot;возврат заказа\&quot;    

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.ClientApi();
let InlineObject8 = new Amazonapi.InlineObject8(); // InlineObject8 | 
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1ClientsOrdersPost(InlineObject8, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **InlineObject8** | [**InlineObject8**](InlineObject8.md)|  | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**InlineResponse201**](InlineResponse201.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1ClientsProductsGuidPatch

> Null apiV1ClientsProductsGuidPatch(guid, opts)

# Внести изменения в товар.

## Внести изменения в товар.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.ClientApi();
let guid = 60806dbd5346527a0f90f41e; // String | GUID заказа, который будет изменен
let opts = {
  'Accept_Encoding': gzip, deflate, // String | 
  'InlineObject6': new Amazonapi.InlineObject6() // InlineObject6 | 
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
 **guid** | **String**| GUID заказа, который будет изменен | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]
 **InlineObject6** | [**InlineObject6**](InlineObject6.md)|  | [optional] 

### Return type

[**Null**](Null.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1ClientsProductsMyGet

> [InlineResponse200] apiV1ClientsProductsMyGet(opts)

# Получить список товаров данного клиента.

## Получить список товаров данного клиента.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.ClientApi();
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**[InlineResponse200]**](InlineResponse200.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1ClientsProductsPaidGet

> [InlineResponse200] apiV1ClientsProductsPaidGet(opts)

# Получить список товаров оплаченных данного клиента.

## Получить список товаров оплаченных данного клиента.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.ClientApi();
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**[InlineResponse200]**](InlineResponse200.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1ClientsProductsPickupGuidPost

> [InlineResponse200] apiV1ClientsProductsPickupGuidPost(guid, opts)

# Взять товар в работу.

## Взять товар в работу.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.ClientApi();
let guid = "guid_example"; // String | GUID продукта в БД
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1ClientsProductsPickupGuidPost(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| GUID продукта в БД | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**[InlineResponse200]**](InlineResponse200.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1ClientsProductsVacGet

> [InlineResponse200] apiV1ClientsProductsVacGet(opts)

# Получить список вакантных товаров.

## Получить список  вакантных товаров.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.ClientApi();
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**[InlineResponse200]**](InlineResponse200.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1ClientsTasksGet

> [InlineResponse2007] apiV1ClientsTasksGet(opts)

# Показать все задачи данного пользователя.

## Показать все задачи данного пользователя.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.ClientApi();
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**[InlineResponse2007]**](InlineResponse2007.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1ClientsTasksPost

> apiV1ClientsTasksPost(InlineObject11, opts)

# Создать задачу.

## Создать задачу.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.ClientApi();
let InlineObject11 = new Amazonapi.InlineObject11(); // InlineObject11 | 
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1ClientsTasksPost(InlineObject11, opts).then(() => {
  console.log('API called successfully.');
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **InlineObject11** | [**InlineObject11**](InlineObject11.md)|  | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

null (empty response body)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1ClientsUsersGet

> [ApiV1AdminsGetNotPaidProductsCreatedby] apiV1ClientsUsersGet(opts)

# Получить список пользователей.

## Получить список пользователей.  

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.ClientApi();
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1ClientsUsersGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**[ApiV1AdminsGetNotPaidProductsCreatedby]**](ApiV1AdminsGetNotPaidProductsCreatedby.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1ClientsUsersGuidPatch

> Null apiV1ClientsUsersGuidPatch(guid, opts)

# Изменить пользователя.

## Изменить пользователя.  

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.ClientApi();
let guid = "guid_example"; // String | GUID пользователя.
let opts = {
  'Accept_Encoding': gzip, deflate, // String | 
  'InlineObject10': new Amazonapi.InlineObject10() // InlineObject10 | 
};
apiInstance.apiV1ClientsUsersGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| GUID пользователя. | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]
 **InlineObject10** | [**InlineObject10**](InlineObject10.md)|  | [optional] 

### Return type

[**Null**](Null.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html

