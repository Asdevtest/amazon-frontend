# TestSwagger.AdministratorApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1AdminsBatchesGet**](AdministratorApi.md#apiV1AdminsBatchesGet) | **GET** /api/v1/admins/batches | # Получить все партии.
[**apiV1AdminsGetCheckingProductsGet**](AdministratorApi.md#apiV1AdminsGetCheckingProductsGet) | **GET** /api/v1/admins/get_checking_products | # Получить список товаров, которые находятся на проверке. 
[**apiV1AdminsGetNotPaidProductsGet**](AdministratorApi.md#apiV1AdminsGetNotPaidProductsGet) | **GET** /api/v1/admins/get_not_paid_products | # Получить список не оплаченных товаров.
[**apiV1AdminsGetPaidProductsGet**](AdministratorApi.md#apiV1AdminsGetPaidProductsGet) | **GET** /api/v1/admins/get_paid_products | # Получить список оплаченных товаров.
[**apiV1AdminsGetProductsByStatusGet**](AdministratorApi.md#apiV1AdminsGetProductsByStatusGet) | **GET** /api/v1/admins/get_products_by_status | # Получить список продуктов с фильтром по статусу.
[**apiV1AdminsGetSettingsGet**](AdministratorApi.md#apiV1AdminsGetSettingsGet) | **GET** /api/v1/admins/get_settings | Получить все настройки.
[**apiV1AdminsGetWaitingProductsGet**](AdministratorApi.md#apiV1AdminsGetWaitingProductsGet) | **GET** /api/v1/admins/get_waiting_products | # Получить список товаров, которые ожидают проверку. 
[**apiV1AdminsMakePaymentPost**](AdministratorApi.md#apiV1AdminsMakePaymentPost) | **POST** /api/v1/admins/make_payment | # Создать оплату или штраф для пользователя.
[**apiV1AdminsMakePaymentsPost**](AdministratorApi.md#apiV1AdminsMakePaymentsPost) | **POST** /api/v1/admins/make_payments | # Оплатить товары. (точная копия как у клиента)
[**apiV1AdminsOrdersGet**](AdministratorApi.md#apiV1AdminsOrdersGet) | **GET** /api/v1/admins/orders | # Получить список заказов.
[**apiV1AdminsOrdersGuidPatch**](AdministratorApi.md#apiV1AdminsOrdersGuidPatch) | **PATCH** /api/v1/admins/orders/{guid} | # Редактировать заказ.
[**apiV1AdminsPatchProductsGuidPatch**](AdministratorApi.md#apiV1AdminsPatchProductsGuidPatch) | **PATCH** /api/v1/admins/patch_products/{guid} | # Внести изменения в продукт (снять с биржи).
[**apiV1AdminsPaymentsGet**](AdministratorApi.md#apiV1AdminsPaymentsGet) | **GET** /api/v1/admins/payments | # Получить все оплаты, которые были начислены всем ролям.
[**apiV1AdminsProductsVacGet**](AdministratorApi.md#apiV1AdminsProductsVacGet) | **GET** /api/v1/admins/products/vac | # Получить список вакантных товаров.
[**apiV1AdminsSetSettingPatch**](AdministratorApi.md#apiV1AdminsSetSettingPatch) | **PATCH** /api/v1/admins/set_setting | # Установить динамические настройки.
[**apiV1AdminsTasksGet**](AdministratorApi.md#apiV1AdminsTasksGet) | **GET** /api/v1/admins/tasks | # Получить задачи.
[**apiV1AdminsTasksLightGet**](AdministratorApi.md#apiV1AdminsTasksLightGet) | **GET** /api/v1/admins/tasks_light | #  Облегченная версия. Получить задачи.
[**apiV1AdminsUsersGet**](AdministratorApi.md#apiV1AdminsUsersGet) | **GET** /api/v1/admins/users | Получить всех пользователей.
[**apiV1AdminsUsersGuidDelete**](AdministratorApi.md#apiV1AdminsUsersGuidDelete) | **DELETE** /api/v1/admins/users/{guid} | Изменить пользователя.
[**apiV1AdminsUsersGuidGet**](AdministratorApi.md#apiV1AdminsUsersGuidGet) | **GET** /api/v1/admins/users/{guid} | Получить пользователя по GUID.
[**apiV1AdminsUsersGuidPatch**](AdministratorApi.md#apiV1AdminsUsersGuidPatch) | **PATCH** /api/v1/admins/users/{guid} | Изменить пользователя.



## apiV1AdminsBatchesGet

> [InlineResponse2005] apiV1AdminsBatchesGet(opts)

# Получить все партии.

## Получить все партии.  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.AdministratorApi();
let opts = {
  'isActual': true, // Boolean | Только актуальные. По умолчанию False
  'sendToBatchRequest': true, // Boolean | Только сделаны запрос на отправку коробки в партию. По умолчанию False
  'clientId': "clientId_example", // String | Id клиента. По умолчанию все.
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1AdminsBatchesGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **isActual** | **Boolean**| Только актуальные. По умолчанию False | [optional] 
 **sendToBatchRequest** | **Boolean**| Только сделаны запрос на отправку коробки в партию. По умолчанию False | [optional] 
 **clientId** | **String**| Id клиента. По умолчанию все. | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse2005]**](InlineResponse2005.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1AdminsGetCheckingProductsGet

> [InlineResponse200] apiV1AdminsGetCheckingProductsGet(opts)

# Получить список товаров, которые находятся на проверке. 

## Получить список товаров, которые находятся на проверке.   ## У таких товаров clientId !&#x3D; null &amp;&amp; paidat &#x3D; null   ## !!! Тоже из тех времен когда директор что-то проверял.   ## !!! Думаю надо деприкнуть его.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.AdministratorApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1AdminsGetCheckingProductsGet(opts).then((data) => {
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

[**[InlineResponse200]**](InlineResponse200.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1AdminsGetNotPaidProductsGet

> [InlineResponse200] apiV1AdminsGetNotPaidProductsGet(opts)

# Получить список не оплаченных товаров.

## Получить список не оплаченных товаров.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.AdministratorApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1AdminsGetNotPaidProductsGet(opts).then((data) => {
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

[**[InlineResponse200]**](InlineResponse200.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1AdminsGetPaidProductsGet

> [InlineResponse200] apiV1AdminsGetPaidProductsGet(opts)

# Получить список оплаченных товаров.

## Получить список оплаченных товаров.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.AdministratorApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1AdminsGetPaidProductsGet(opts).then((data) => {
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

[**[InlineResponse200]**](InlineResponse200.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1AdminsGetProductsByStatusGet

> [InlineResponse200] apiV1AdminsGetProductsByStatusGet(opts)

# Получить список продуктов с фильтром по статусу.

## Получить список продуктов с фильтром по статусу.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.AdministratorApi();
let opts = {
  'status': 3.4, // Number | Статус заказа для фильтра.
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1AdminsGetProductsByStatusGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **status** | **Number**| Статус заказа для фильтра. | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse200]**](InlineResponse200.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1AdminsGetSettingsGet

> {String: Object} apiV1AdminsGetSettingsGet(opts)

Получить все настройки.

## Получить все актуальные настройки.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.AdministratorApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1AdminsGetSettingsGet(opts).then((data) => {
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

**{String: Object}**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1AdminsGetWaitingProductsGet

> [InlineResponse200] apiV1AdminsGetWaitingProductsGet(opts)

# Получить список товаров, которые ожидают проверку. 

## Получить список товаров, которые ожидают проверку.   ## У таких товаров status &#x3D; 0   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.AdministratorApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1AdminsGetWaitingProductsGet(opts).then((data) => {
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

[**[InlineResponse200]**](InlineResponse200.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1AdminsMakePaymentPost

> String apiV1AdminsMakePaymentPost(opts)

# Создать оплату или штраф для пользователя.

## Создать оплату или штраф для пользователя.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.AdministratorApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject1() // InlineObject1 | 
};
apiInstance.apiV1AdminsMakePaymentPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject1**](InlineObject1.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1AdminsMakePaymentsPost

> String apiV1AdminsMakePaymentsPost(opts)

# Оплатить товары. (точная копия как у клиента)

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

let apiInstance = new TestSwagger.AdministratorApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject5() // InlineObject5 | 
};
apiInstance.apiV1AdminsMakePaymentsPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject5**](InlineObject5.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1AdminsOrdersGet

> [InlineResponse2001] apiV1AdminsOrdersGet(opts)

# Получить список заказов.

## Получить список заказов.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.AdministratorApi();
let opts = {
  'status': 3.4, // Number | Статус заказа для фильтра.
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1AdminsOrdersGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **status** | **Number**| Статус заказа для фильтра. | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse2001]**](InlineResponse2001.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1AdminsOrdersGuidPatch

> String apiV1AdminsOrdersGuidPatch(guid, opts)

# Редактировать заказ.

## Редактировать заказ.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.AdministratorApi();
let guid = "guid_example"; // String | GUID заказа, который планируем изменить
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject2() // InlineObject2 | 
};
apiInstance.apiV1AdminsOrdersGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| GUID заказа, который планируем изменить | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject2**](InlineObject2.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1AdminsPatchProductsGuidPatch

> String apiV1AdminsPatchProductsGuidPatch(guid, opts)

# Внести изменения в продукт (снять с биржи).

## Внести изменения в продукт (снять с биржи).   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.AdministratorApi();
let guid = "guid_example"; // String | GUID продукта в БД.
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject() // InlineObject | 
};
apiInstance.apiV1AdminsPatchProductsGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| GUID продукта в БД. | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject**](InlineObject.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1AdminsPaymentsGet

> [InlineResponse2002] apiV1AdminsPaymentsGet(opts)

# Получить все оплаты, которые были начислены всем ролям.

## Получить все оплаты, которые были начислены всем ролям.  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.AdministratorApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1AdminsPaymentsGet(opts).then((data) => {
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

[**[InlineResponse2002]**](InlineResponse2002.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1AdminsProductsVacGet

> [InlineResponse2006] apiV1AdminsProductsVacGet(opts)

# Получить список вакантных товаров.

## Получить список  вакантных товаров. статусы 70 и 110  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.AdministratorApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1AdminsProductsVacGet(opts).then((data) => {
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


## apiV1AdminsSetSettingPatch

> String apiV1AdminsSetSettingPatch(opts)

# Установить динамические настройки.

## Установить динамические настройки.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.AdministratorApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject4() // InlineObject4 | 
};
apiInstance.apiV1AdminsSetSettingPatch(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject4**](InlineObject4.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1AdminsTasksGet

> [InlineResponse2004] apiV1AdminsTasksGet(opts)

# Получить задачи.

## Получить задачи.  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.AdministratorApi();
let opts = {
  'status': "status_example", // String | если указать статус - отфильтрует, нет - выведет все.
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1AdminsTasksGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **status** | **String**| если указать статус - отфильтрует, нет - выведет все. | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse2004]**](InlineResponse2004.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1AdminsTasksLightGet

> [InlineResponse2003] apiV1AdminsTasksLightGet(opts)

#  Облегченная версия. Получить задачи.

## Получить задачи.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.AdministratorApi();
let opts = {
  'status': "status_example", // String | если указать статус - отфильтрует, нет - выведет все.
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1AdminsTasksLightGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **status** | **String**| если указать статус - отфильтрует, нет - выведет все. | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse2003]**](InlineResponse2003.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1AdminsUsersGet

> [UserAdminFullSchema] apiV1AdminsUsersGet(opts)

Получить всех пользователей.

## Получить всех пользователей.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.AdministratorApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1AdminsUsersGet(opts).then((data) => {
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

[**[UserAdminFullSchema]**](UserAdminFullSchema.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1AdminsUsersGuidDelete

> String apiV1AdminsUsersGuidDelete(guid, opts)

Изменить пользователя.

##  Изменить пользователя.  ##  Эндпоинт предназначен в большой степени для тестов. Удаление пользователя  ##  предполагалось логическим. Для этого в поле active нужно поставить false.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.AdministratorApi();
let guid = "guid_example"; // String | GUID продукта в БД.
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1AdminsUsersGuidDelete(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| GUID продукта в БД. | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1AdminsUsersGuidGet

> UserAdminFullSchemaWithSubUsers apiV1AdminsUsersGuidGet(guid, opts)

Получить пользователя по GUID.

## Получить пользователя по GUID.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.AdministratorApi();
let guid = "guid_example"; // String | 
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1AdminsUsersGuidGet(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**|  | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**UserAdminFullSchemaWithSubUsers**](UserAdminFullSchemaWithSubUsers.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1AdminsUsersGuidPatch

> String apiV1AdminsUsersGuidPatch(guid, opts)

Изменить пользователя.

##  Изменить пользователя.  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.AdministratorApi();
let guid = "guid_example"; // String | GUID продукта в БД.
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject3() // InlineObject3 | 
};
apiInstance.apiV1AdminsUsersGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| GUID продукта в БД. | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject3**](InlineObject3.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

