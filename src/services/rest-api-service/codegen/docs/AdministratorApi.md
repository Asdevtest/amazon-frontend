# TestSwagger.AdministratorApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1AdminsDestinationEditGuidPatch**](AdministratorApi.md#apiV1AdminsDestinationEditGuidPatch) | **PATCH** /api/v1/admins/destination_edit/{guid} | #  Редактировать склад назначения.
[**apiV1AdminsDestinationGuidDelete**](AdministratorApi.md#apiV1AdminsDestinationGuidDelete) | **DELETE** /api/v1/admins/destination/{guid} | #  Редактировать склад назначения.
[**apiV1AdminsDestinationPost**](AdministratorApi.md#apiV1AdminsDestinationPost) | **POST** /api/v1/admins/destination | #  Создать склад назначения.
[**apiV1AdminsFeedbackGet**](AdministratorApi.md#apiV1AdminsFeedbackGet) | **GET** /api/v1/admins/feedback | #  Получить список отзывов/репортов
[**apiV1AdminsGetCheckingProductsGet**](AdministratorApi.md#apiV1AdminsGetCheckingProductsGet) | **GET** /api/v1/admins/get_checking_products | # Получить список товаров, которые находятся на проверке. 
[**apiV1AdminsGetPaidProductsGet**](AdministratorApi.md#apiV1AdminsGetPaidProductsGet) | **GET** /api/v1/admins/get_paid_products | # Получить список оплаченных товаров.
[**apiV1AdminsGetProductsByStatusGet**](AdministratorApi.md#apiV1AdminsGetProductsByStatusGet) | **GET** /api/v1/admins/get_products_by_status | # Получить список продуктов с фильтром по статусу.
[**apiV1AdminsGetSettingsGet**](AdministratorApi.md#apiV1AdminsGetSettingsGet) | **GET** /api/v1/admins/get_settings | Получить все настройки.
[**apiV1AdminsGetWaitingProductsGet**](AdministratorApi.md#apiV1AdminsGetWaitingProductsGet) | **GET** /api/v1/admins/get_waiting_products | # Получить список товаров, которые ожидают проверку. 
[**apiV1AdminsMakePaymentPost**](AdministratorApi.md#apiV1AdminsMakePaymentPost) | **POST** /api/v1/admins/make_payment | # Создать оплату или штраф для пользователя.
[**apiV1AdminsMakePaymentsPost**](AdministratorApi.md#apiV1AdminsMakePaymentsPost) | **POST** /api/v1/admins/make_payments | # Оплатить товары.
[**apiV1AdminsOrdersGet**](AdministratorApi.md#apiV1AdminsOrdersGet) | **GET** /api/v1/admins/orders | # Получить список заказов.
[**apiV1AdminsPatchProductsGuidPatch**](AdministratorApi.md#apiV1AdminsPatchProductsGuidPatch) | **PATCH** /api/v1/admins/patch_products/{guid} | # Внести изменения в продукт (снять с биржи).
[**apiV1AdminsPaymentsGet**](AdministratorApi.md#apiV1AdminsPaymentsGet) | **GET** /api/v1/admins/payments | # Получить все оплаты, которые были начислены всем ролям.
[**apiV1AdminsProductLinkOrUnlinkUserRolePatch**](AdministratorApi.md#apiV1AdminsProductLinkOrUnlinkUserRolePatch) | **PATCH** /api/v1/admins/product/link_or_unlink_user_role | #  Привязать/отвязать юзера к товару
[**apiV1AdminsProductsVacGet**](AdministratorApi.md#apiV1AdminsProductsVacGet) | **GET** /api/v1/admins/products/vac | # Получить список вакантных товаров.
[**apiV1AdminsProxyGet**](AdministratorApi.md#apiV1AdminsProxyGet) | **GET** /api/v1/admins/proxy | #  Получить список прокси
[**apiV1AdminsProxyPost**](AdministratorApi.md#apiV1AdminsProxyPost) | **POST** /api/v1/admins/proxy | #  Изменить список прокси
[**apiV1AdminsRedFlagsGuidDelete**](AdministratorApi.md#apiV1AdminsRedFlagsGuidDelete) | **DELETE** /api/v1/admins/red_flags/{guid} | #  Получить список отзывов/репортов
[**apiV1AdminsRedFlagsPost**](AdministratorApi.md#apiV1AdminsRedFlagsPost) | **POST** /api/v1/admins/red_flags | #  Получить список отзывов/репортов
[**apiV1AdminsSetSettingPatch**](AdministratorApi.md#apiV1AdminsSetSettingPatch) | **PATCH** /api/v1/admins/set_setting | # Установить динамические настройки.
[**apiV1AdminsSetTimeToDeadlinePendingOrderValuePatch**](AdministratorApi.md#apiV1AdminsSetTimeToDeadlinePendingOrderValuePatch) | **PATCH** /api/v1/admins/set_timeToDeadlinePendingOrder/{value} | # Изменить интервал нотификаций касательно дедлайна ордера
[**apiV1AdminsTasksLightGet**](AdministratorApi.md#apiV1AdminsTasksLightGet) | **GET** /api/v1/admins/tasks_light | #  Облегченная версия. Получить задачи.
[**apiV1AdminsToggleServerPatch**](AdministratorApi.md#apiV1AdminsToggleServerPatch) | **PATCH** /api/v1/admins/toggle_server | # Включить/выключить сервер
[**apiV1AdminsUsersByRoleGet**](AdministratorApi.md#apiV1AdminsUsersByRoleGet) | **GET** /api/v1/admins/users_by_role | #  Получить пользователей по роли
[**apiV1AdminsUsersGet**](AdministratorApi.md#apiV1AdminsUsersGet) | **GET** /api/v1/admins/users | Получить всех пользователей.
[**apiV1AdminsUsersGuidGet**](AdministratorApi.md#apiV1AdminsUsersGuidGet) | **GET** /api/v1/admins/users/{guid} | Получить пользователя по GUID.
[**apiV1AdminsUsersGuidPatch**](AdministratorApi.md#apiV1AdminsUsersGuidPatch) | **PATCH** /api/v1/admins/users/{guid} | Изменить пользователя.



## apiV1AdminsDestinationEditGuidPatch

> String apiV1AdminsDestinationEditGuidPatch(guid, opts)

#  Редактировать склад назначения.

## Редактировать склад назначения.   

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
let guid = null; // String | 
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject32() // InlineObject32 | 
};
apiInstance.apiV1AdminsDestinationEditGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)|  | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject32**](InlineObject32.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1AdminsDestinationGuidDelete

> String apiV1AdminsDestinationGuidDelete(guid, opts)

#  Редактировать склад назначения.

## Редактировать склад назначения.   

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
let guid = null; // String | 
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1AdminsDestinationGuidDelete(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)|  | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1AdminsDestinationPost

> SuccessResponseBodyWithGuid apiV1AdminsDestinationPost(opts)

#  Создать склад назначения.

## Создать склад назначения.   

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
  'body': new TestSwagger.InlineObject31() // InlineObject31 | 
};
apiInstance.apiV1AdminsDestinationPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject31**](InlineObject31.md)|  | [optional] 

### Return type

[**SuccessResponseBodyWithGuid**](SuccessResponseBodyWithGuid.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1AdminsFeedbackGet

> [InlineResponse20017] apiV1AdminsFeedbackGet(opts)

#  Получить список отзывов/репортов

## Получить список отзывов/репортов   

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
apiInstance.apiV1AdminsFeedbackGet(opts).then((data) => {
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

[**[InlineResponse20017]**](InlineResponse20017.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1AdminsGetCheckingProductsGet

> [ApiV1BatchesProduct] apiV1AdminsGetCheckingProductsGet(opts)

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

[**[ApiV1BatchesProduct]**](ApiV1BatchesProduct.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1AdminsGetPaidProductsGet

> [ApiV1BatchesProduct] apiV1AdminsGetPaidProductsGet(opts)

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

[**[ApiV1BatchesProduct]**](ApiV1BatchesProduct.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1AdminsGetProductsByStatusGet

> [ApiV1BatchesProduct] apiV1AdminsGetProductsByStatusGet(opts)

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

[**[ApiV1BatchesProduct]**](ApiV1BatchesProduct.md)

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

> [ApiV1BatchesProduct] apiV1AdminsGetWaitingProductsGet(opts)

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

[**[ApiV1BatchesProduct]**](ApiV1BatchesProduct.md)

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
  'body': new TestSwagger.InlineObject27() // InlineObject27 | 
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
 **body** | [**InlineObject27**](InlineObject27.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1AdminsMakePaymentsPost

> String apiV1AdminsMakePaymentsPost(opts)

# Оплатить товары.

## Оплатить товары.   ## Переводит статус на 110 (принадлежит платформе. распространяется бесплатно)    Вся информация о ресерчере удается: createdById меняется на id админа isCreatedByClient меняется true needCheckBySupervisor меняется true  Проверки: Нельзя повторно купить продукт (product.status &#x3D;&#x3D;&#x3D; 70 &amp;&amp; product.paidById !&#x3D;&#x3D; null) Админ не может купить товар который уже принадлежит платформе (product.status &#x3D;&#x3D;&#x3D; 110)

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
  'body': new TestSwagger.InlineObject30() // InlineObject30 | 
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
 **body** | [**InlineObject30**](InlineObject30.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1AdminsOrdersGet

> [ApiV1BatchesOrder] apiV1AdminsOrdersGet(opts)

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

[**[ApiV1BatchesOrder]**](ApiV1BatchesOrder.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
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
let guid = null; // String | GUID продукта в БД.
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject26() // InlineObject26 | 
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
 **guid** | [**String**](.md)| GUID продукта в БД. | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject26**](InlineObject26.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1AdminsPaymentsGet

> [InlineResponse20013] apiV1AdminsPaymentsGet(opts)

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

[**[InlineResponse20013]**](InlineResponse20013.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1AdminsProductLinkOrUnlinkUserRolePatch

> String apiV1AdminsProductLinkOrUnlinkUserRolePatch(opts)

#  Привязать/отвязать юзера к товару

## Привязать/отвязать юзера к товару   

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
  'body': new TestSwagger.InlineObject34() // InlineObject34 | 
};
apiInstance.apiV1AdminsProductLinkOrUnlinkUserRolePatch(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject34**](InlineObject34.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1AdminsProductsVacGet

> [InlineResponse20016] apiV1AdminsProductsVacGet(opts)

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

[**[InlineResponse20016]**](InlineResponse20016.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1AdminsProxyGet

> [String] apiV1AdminsProxyGet(opts)

#  Получить список прокси

## Получить список прокси   

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
apiInstance.apiV1AdminsProxyGet(opts).then((data) => {
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

**[String]**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1AdminsProxyPost

> String apiV1AdminsProxyPost(opts)

#  Изменить список прокси

## Изменить список прокси   

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
  'body': ["null"] // [String] | 
};
apiInstance.apiV1AdminsProxyPost(opts).then((data) => {
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


## apiV1AdminsRedFlagsGuidDelete

> String apiV1AdminsRedFlagsGuidDelete(guid, opts)

#  Получить список отзывов/репортов

## Получить список отзывов/репортов   

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
let guid = null; // String | GUID красного флага в БД.
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1AdminsRedFlagsGuidDelete(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID красного флага в БД. | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1AdminsRedFlagsPost

> {String: Object} apiV1AdminsRedFlagsPost(opts)

#  Получить список отзывов/репортов

## Получить список отзывов/репортов   

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
  'body': new TestSwagger.InlineObject33() // InlineObject33 | 
};
apiInstance.apiV1AdminsRedFlagsPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject33**](InlineObject33.md)|  | [optional] 

### Return type

**{String: Object}**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
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
  'body': new TestSwagger.InlineObject29() // InlineObject29 | 
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
 **body** | [**InlineObject29**](InlineObject29.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1AdminsSetTimeToDeadlinePendingOrderValuePatch

> InlineResponse20015 apiV1AdminsSetTimeToDeadlinePendingOrderValuePatch(value, opts)

# Изменить интервал нотификаций касательно дедлайна ордера

## Изменить интервал нотификаций касательно дедлайна ордера

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
let value = 56; // Number | интервал нотификаций касательно дедлайна ордера
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1AdminsSetTimeToDeadlinePendingOrderValuePatch(value, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **value** | **Number**| интервал нотификаций касательно дедлайна ордера | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**InlineResponse20015**](InlineResponse20015.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1AdminsTasksLightGet

> [InlineResponse20014] apiV1AdminsTasksLightGet(opts)

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

[**[InlineResponse20014]**](InlineResponse20014.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1AdminsToggleServerPatch

> InlineResponse20015 apiV1AdminsToggleServerPatch(opts)

# Включить/выключить сервер

## Включить/выключить сервер   

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
apiInstance.apiV1AdminsToggleServerPatch(opts).then((data) => {
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

[**InlineResponse20015**](InlineResponse20015.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1AdminsUsersByRoleGet

> [InlineResponse20018] apiV1AdminsUsersByRoleGet(role, opts)

#  Получить пользователей по роли

## Получить пользователей по роли без сабов   

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
let role = 56; // Number | Роль юзера
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1AdminsUsersByRoleGet(role, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **role** | **Number**| Роль юзера | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse20018]**](InlineResponse20018.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1AdminsUsersGet

> [UserAdminFullSchema] apiV1AdminsUsersGet(opts)

Получить всех пользователей.

## Получить всех пользователей или сабюзеров через query параметр   

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


## apiV1AdminsUsersGuidGet

> InlineResponse20012 apiV1AdminsUsersGuidGet(guid, opts)

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
let guid = null; // String | 
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
 **guid** | [**String**](.md)|  | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**InlineResponse20012**](InlineResponse20012.md)

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
let guid = null; // String | GUID продукта в БД.
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject28() // InlineObject28 | 
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
 **guid** | [**String**](.md)| GUID продукта в БД. | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject28**](InlineObject28.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

