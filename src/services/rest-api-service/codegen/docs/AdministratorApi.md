# TestSwagger.AdministratorApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1AdminsGetCheckingProductsGet**](AdministratorApi.md#apiV1AdminsGetCheckingProductsGet) | **GET** /api/v1/admins/get_checking_products | # Получить список товаров, которые находятся на проверке. 
[**apiV1AdminsGetNotPaidProductsGet**](AdministratorApi.md#apiV1AdminsGetNotPaidProductsGet) | **GET** /api/v1/admins/get_not_paid_products | # Получить список не оплаченных товаров.
[**apiV1AdminsGetPaidProductsGet**](AdministratorApi.md#apiV1AdminsGetPaidProductsGet) | **GET** /api/v1/admins/get_paid_products | # Получить список оплаченных товаров.
[**apiV1AdminsGetProductsByStatusGet**](AdministratorApi.md#apiV1AdminsGetProductsByStatusGet) | **GET** /api/v1/admins/get_products_by_status | # Получить список продуктов с фильтром по статусу.
[**apiV1AdminsGetSettingsGet**](AdministratorApi.md#apiV1AdminsGetSettingsGet) | **GET** /api/v1/admins/get_settings | Получить настройки.
[**apiV1AdminsGetVacProductsGet**](AdministratorApi.md#apiV1AdminsGetVacProductsGet) | **GET** /api/v1/admins/get_vac_products | # Получить список товаров, которые ожидают проверку. 
[**apiV1AdminsGetWaitingProductsGet**](AdministratorApi.md#apiV1AdminsGetWaitingProductsGet) | **GET** /api/v1/admins/get_waiting_products | # Получить список товаров, которые ожидают проверку. 
[**apiV1AdminsMakePaymentPost**](AdministratorApi.md#apiV1AdminsMakePaymentPost) | **POST** /api/v1/admins/make_payment | # Создать оплату или штраф для пользователя.
[**apiV1AdminsOrdersGet**](AdministratorApi.md#apiV1AdminsOrdersGet) | **GET** /api/v1/admins/orders | # Получить список заказов.
[**apiV1AdminsOrdersGuidPatch**](AdministratorApi.md#apiV1AdminsOrdersGuidPatch) | **PATCH** /api/v1/admins/orders/{guid} | # Редактировать заказ.
[**apiV1AdminsPatchProductsGuidPatch**](AdministratorApi.md#apiV1AdminsPatchProductsGuidPatch) | **PATCH** /api/v1/admins/patch_products/{guid} | # Внести изменения в продукт (снять с биржи).
[**apiV1AdminsPaymentsGet**](AdministratorApi.md#apiV1AdminsPaymentsGet) | **GET** /api/v1/admins/payments | # Получить все оплаты, которые были начислены всем ролям.
[**apiV1AdminsPickupProductGuidPost**](AdministratorApi.md#apiV1AdminsPickupProductGuidPost) | **POST** /api/v1/admins/pickup_product/{guid} | # Взять продукт на проверку.
[**apiV1AdminsSetSettingPost**](AdministratorApi.md#apiV1AdminsSetSettingPost) | **POST** /api/v1/admins/set_setting | # Задать настройку.
[**apiV1AdminsTasksGet**](AdministratorApi.md#apiV1AdminsTasksGet) | **GET** /api/v1/admins/tasks | # Получить задачи.
[**apiV1AdminsUsersGet**](AdministratorApi.md#apiV1AdminsUsersGet) | **GET** /api/v1/admins/users | Получить всех пользователей.
[**apiV1AdminsUsersGuidDelete**](AdministratorApi.md#apiV1AdminsUsersGuidDelete) | **DELETE** /api/v1/admins/users/{guid} | Изменить пользователя.
[**apiV1AdminsUsersGuidGet**](AdministratorApi.md#apiV1AdminsUsersGuidGet) | **GET** /api/v1/admins/users/{guid} | Получить пользователя по GUID.
[**apiV1AdminsUsersGuidPatch**](AdministratorApi.md#apiV1AdminsUsersGuidPatch) | **PATCH** /api/v1/admins/users/{guid} | Изменить пользователя.



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
- **Accept**: text/html


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
- **Accept**: text/html


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
- **Accept**: text/html


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
- **Accept**: text/html


## apiV1AdminsGetSettingsGet

> {String: Object} apiV1AdminsGetSettingsGet(opts)

Получить настройки.

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
- **Accept**: text/html


## apiV1AdminsGetVacProductsGet

> [InlineResponse200] apiV1AdminsGetVacProductsGet(opts)

# Получить список товаров, которые ожидают проверку. 

## переименовали в клиент. Возможно, уже не нужен.   ## Сейчас показывает товары со статусом 0, 10, 40, 50, 60 - т.е. требуют проверки супером.   

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
apiInstance.apiV1AdminsGetVacProductsGet(opts).then((data) => {
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
- **Accept**: text/html


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
- **Accept**: text/html


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
- **Accept**: text/html


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
- **Accept**: text/html


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
- **Accept**: text/html


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
- **Accept**: text/html


## apiV1AdminsPaymentsGet

> [InlineResponse2003] apiV1AdminsPaymentsGet(opts)

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

[**[InlineResponse2003]**](InlineResponse2003.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1AdminsPickupProductGuidPost

> String apiV1AdminsPickupProductGuidPost(guid, opts)

# Взять продукт на проверку.

## Взять продукт на проверку.   ## Берет на проверку от имени директора. Думаю это устаревший эндпоинт.   

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
apiInstance.apiV1AdminsPickupProductGuidPost(guid, opts).then((data) => {
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
- **Accept**: text/html


## apiV1AdminsSetSettingPost

> InlineResponse201 apiV1AdminsSetSettingPost(opts)

# Задать настройку.

## Задается имя параметра и новое значение.   

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
apiInstance.apiV1AdminsSetSettingPost(opts).then((data) => {
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

[**InlineResponse201**](InlineResponse201.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


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
- **Accept**: text/html


## apiV1AdminsUsersGet

> [InlineResponse2002] apiV1AdminsUsersGet(opts)

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

[**[InlineResponse2002]**](InlineResponse2002.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


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
- **Accept**: text/html


## apiV1AdminsUsersGuidGet

> InlineResponse2002 apiV1AdminsUsersGuidGet(guid, opts)

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

[**InlineResponse2002**](InlineResponse2002.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


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
- **Accept**: text/html

