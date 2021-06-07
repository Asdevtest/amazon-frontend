# Amazonapi.AdministratorApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1AdminsGetCheckingProductsGet**](AdministratorApi.md#apiV1AdminsGetCheckingProductsGet) | **GET** /api/v1/admins/get_checking_products | # Получить список товаров, которые находятся на проверке. 
[**apiV1AdminsGetNotPaidProductsGet**](AdministratorApi.md#apiV1AdminsGetNotPaidProductsGet) | **GET** /api/v1/admins/get_not_paid_products | # Получить список не оплаченных товаров.
[**apiV1AdminsGetVacProductsGet**](AdministratorApi.md#apiV1AdminsGetVacProductsGet) | **GET** /api/v1/admins/get_vac_products | # Получить список товаров, которые ожидают проверку. 
[**apiV1AdminsGetWaitingProductsGet**](AdministratorApi.md#apiV1AdminsGetWaitingProductsGet) | **GET** /api/v1/admins/get_waiting_products | # Получить список товаров, которые ожидают проверку. 
[**apiV1AdminsMakePaymentPost**](AdministratorApi.md#apiV1AdminsMakePaymentPost) | **POST** /api/v1/admins/make_payment | # Оплатить выбранные продукты.
[**apiV1AdminsPatchProductsGuidPatch**](AdministratorApi.md#apiV1AdminsPatchProductsGuidPatch) | **PATCH** /api/v1/admins/patch_products/{guid} | # Внести изменения в продукт.
[**apiV1AdminsPickupProductGuidPost**](AdministratorApi.md#apiV1AdminsPickupProductGuidPost) | **POST** /api/v1/admins/pickup_product/{guid} | # Взять продукт на проверку.
[**apiV1AdminsUsersGet**](AdministratorApi.md#apiV1AdminsUsersGet) | **GET** /api/v1/admins/users | Получить всех пользователей.
[**apiV1AdminsUsersGuidDelete**](AdministratorApi.md#apiV1AdminsUsersGuidDelete) | **DELETE** /api/v1/admins/users/{guid} | Изменить пользователя.
[**apiV1AdminsUsersGuidPatch**](AdministratorApi.md#apiV1AdminsUsersGuidPatch) | **PATCH** /api/v1/admins/users/{guid} | Изменить пользователя.



## apiV1AdminsGetCheckingProductsGet

> [Object] apiV1AdminsGetCheckingProductsGet(opts)

# Получить список товаров, которые находятся на проверке. 

## Получить список товаров, которые находятся на проверке.   ## У таких товаров dircheckedby !&#x3D; null &amp;&amp; paidat &#x3D; null   ## !!! Тоже из тех времен когда директор что-то проверял.   ## !!! Думаю надо деприкнуть его.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.AdministratorApi();
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

**[Object]**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1AdminsGetNotPaidProductsGet

> [Object] apiV1AdminsGetNotPaidProductsGet(opts)

# Получить список не оплаченных товаров.

## Получить список не оплаченных товаров.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.AdministratorApi();
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

**[Object]**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1AdminsGetVacProductsGet

> [Object] apiV1AdminsGetVacProductsGet(opts)

# Получить список товаров, которые ожидают проверку. 

## переименовали в клиент. Возможно, уже не нужен.   ## Сейчас показывает товары со статусом 0, 10, 40, 50, 60 - т.е. требуют проверки супером.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.AdministratorApi();
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

**[Object]**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1AdminsGetWaitingProductsGet

> [Object] apiV1AdminsGetWaitingProductsGet(opts)

# Получить список товаров, которые ожидают проверку. 

## Получить список товаров, которые ожидают проверку.   ## У таких товаров status &#x3D; 0   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.AdministratorApi();
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

**[Object]**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1AdminsMakePaymentPost

> Null apiV1AdminsMakePaymentPost(opts)

# Оплатить выбранные продукты.

## Оплатить выбранные продукты. У данных продуктов будет выставлена дата оплаты.   ## В дальнейшем все продукты у которых выставлена дата полаты можно не показывать.   ## ВНИМАНИЕ: нет проверки все ли guid корректны. По корректным GUID обновит. Битые заигнорит..   ## ВНИМАНИЕ: ПОХОЖЕ ЭТО УСТАРЕВШИЙ ФУНКЦИОНАЛ  Оплаты идут от супервайзера как отдельная сущность.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.AdministratorApi();
let opts = {
  'Accept_Encoding': gzip, deflate, // String | 
  'InlineObject1': new Amazonapi.InlineObject1() // InlineObject1 | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]
 **InlineObject1** | [**InlineObject1**](InlineObject1.md)|  | [optional] 

### Return type

[**Null**](Null.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1AdminsPatchProductsGuidPatch

> Null apiV1AdminsPatchProductsGuidPatch(guid, InlineObject, opts)

# Внести изменения в продукт.

## Внести изменения в продукт.   ## УТОЧНИТЬ ПОХОЖЕ УЖЕУСТАРЕЛО. .   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.AdministratorApi();
let guid = "guid_example"; // String | GUID продукта в БД.
let InlineObject = new Amazonapi.InlineObject(); // InlineObject | 
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1AdminsPatchProductsGuidPatch(guid, InlineObject, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| GUID продукта в БД. | 
 **InlineObject** | [**InlineObject**](InlineObject.md)|  | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**Null**](Null.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1AdminsPickupProductGuidPost

> Null apiV1AdminsPickupProductGuidPost(guid, opts)

# Взять продукт на проверку.

## Взять продукт на проверку.   ## Берет на проверку от имени директора. Думаю это устаревший эндпоинт.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.AdministratorApi();
let guid = "guid_example"; // String | GUID продукта в БД.
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**Null**](Null.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1AdminsUsersGet

> [Object] apiV1AdminsUsersGet(opts)

Получить всех пользователей.

## Получить всех пользователей.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.AdministratorApi();
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

**[Object]**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1AdminsUsersGuidDelete

> Null apiV1AdminsUsersGuidDelete(guid, opts)

Изменить пользователя.

##  Изменить пользователя.  ##  Эндпоинт предназначен в большой степени для тестов. Удаление пользователя  ##  предполагалось логическим. Для этого в поле active нужно поставить false.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.AdministratorApi();
let guid = "guid_example"; // String | GUID продукта в БД.
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**Null**](Null.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1AdminsUsersGuidPatch

> Null apiV1AdminsUsersGuidPatch(guid, opts)

Изменить пользователя.

##  Изменить пользователя.  

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.AdministratorApi();
let guid = "guid_example"; // String | GUID продукта в БД.
let opts = {
  'Accept_Encoding': gzip, deflate, // String | 
  'InlineObject2': new Amazonapi.InlineObject2() // InlineObject2 | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]
 **InlineObject2** | [**InlineObject2**](InlineObject2.md)|  | [optional] 

### Return type

[**Null**](Null.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html

