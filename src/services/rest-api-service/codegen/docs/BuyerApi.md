# Amazonapi.BuyerApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1BuyersOrdersGuidGet**](BuyerApi.md#apiV1BuyersOrdersGuidGet) | **GET** /api/v1/buyers/orders/{guid} | # Получить конкретный заказ по его GUID.
[**apiV1BuyersOrdersGuidPatch**](BuyerApi.md#apiV1BuyersOrdersGuidPatch) | **PATCH** /api/v1/buyers/orders/{guid} | # Редактировать заказ.
[**apiV1BuyersOrdersMyGet**](BuyerApi.md#apiV1BuyersOrdersMyGet) | **GET** /api/v1/buyers/orders/my | # Получить список заказов текущего байера.
[**apiV1BuyersOrdersPickupGuidPost**](BuyerApi.md#apiV1BuyersOrdersPickupGuidPost) | **POST** /api/v1/buyers/orders/pickup/{guid} | # Закрепить заказ за байером. Взять его в работу.
[**apiV1BuyersOrdersVacGet**](BuyerApi.md#apiV1BuyersOrdersVacGet) | **GET** /api/v1/buyers/orders/vac | # Получить список свободных заказов.
[**apiV1BuyersProductsGuidPatch**](BuyerApi.md#apiV1BuyersProductsGuidPatch) | **PATCH** /api/v1/buyers/products/{guid} | # Внести изменения в продукт.
[**apiV1BuyersProductsMyGet**](BuyerApi.md#apiV1BuyersProductsMyGet) | **GET** /api/v1/buyers/products/my | # Получить список товаров взятых в работу байером.
[**apiV1BuyersProductsPickupGuidPost**](BuyerApi.md#apiV1BuyersProductsPickupGuidPost) | **POST** /api/v1/buyers/products/pickup/{guid} | # Закрепить продукт за байером. Взять его в работу.
[**apiV1BuyersProductsVacGet**](BuyerApi.md#apiV1BuyersProductsVacGet) | **GET** /api/v1/buyers/products/vac | # Получить список вакантных товаров.
[**apiV1BuyersTasksCancelGuidPost**](BuyerApi.md#apiV1BuyersTasksCancelGuidPost) | **POST** /api/v1/buyers/tasks/cancel/{guid} | # Отменить задачу.
[**apiV1BuyersTasksGet**](BuyerApi.md#apiV1BuyersTasksGet) | **GET** /api/v1/buyers/tasks | # Показать все задачи данного пользователя.
[**apiV1BuyersTasksPost**](BuyerApi.md#apiV1BuyersTasksPost) | **POST** /api/v1/buyers/tasks | # Создать задачу.



## apiV1BuyersOrdersGuidGet

> InlineResponse2001 apiV1BuyersOrdersGuidGet(guid, opts)

# Получить конкретный заказ по его GUID.

## Получить конкретный заказ по его GUID.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.BuyerApi();
let guid = "guid_example"; // String | GUID заказа.
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1BuyersOrdersGuidGet(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| GUID заказа. | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**InlineResponse2001**](InlineResponse2001.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1BuyersOrdersGuidPatch

> String apiV1BuyersOrdersGuidPatch(guid, opts)

# Редактировать заказ.

## Редактировать заказ.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.BuyerApi();
let guid = "guid_example"; // String | GUID заказа, который планируем изменить
let opts = {
  'Accept_Encoding': gzip, deflate, // String | 
  'InlineObject16': new Amazonapi.InlineObject16() // InlineObject16 | 
};
apiInstance.apiV1BuyersOrdersGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| GUID заказа, который планируем изменить | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]
 **InlineObject16** | [**InlineObject16**](InlineObject16.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1BuyersOrdersMyGet

> [InlineResponse2001] apiV1BuyersOrdersMyGet(opts)

# Получить список заказов текущего байера.

## Получить список заказов текущего байера.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.BuyerApi();
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1BuyersOrdersMyGet(opts).then((data) => {
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

[**[InlineResponse2001]**](InlineResponse2001.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1BuyersOrdersPickupGuidPost

> String apiV1BuyersOrdersPickupGuidPost(guid, opts)

# Закрепить заказ за байером. Взять его в работу.

## Закрепить заказ за байером. Взять его в работу.  ##  На основании заказа НУЖНО СФОРМИРОВАТЬ коробки по кол-ву товаров в заказе.   ## Эндпоинт НЕ ВЕРНЕТ сформированные коробки что бы не плодить МАГИЮ или ГЛЮКИ.   ## Запросите закрепление заказа. Если операция пройдет успешно 204 - запросите создание коробки.   ## Следующим этапом сделаем возможность закреплять пачку заказов и пачку коробок готовить одним запросом. Но потом.   ## Текущая база не поддерживает транзакции.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.BuyerApi();
let guid = "guid_example"; // String | GUID заказа, который планируем изменить
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1BuyersOrdersPickupGuidPost(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| GUID заказа, который планируем изменить | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1BuyersOrdersVacGet

> [InlineResponse2001] apiV1BuyersOrdersVacGet(opts)

# Получить список свободных заказов.

## Получить список свободных заказов.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.BuyerApi();
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1BuyersOrdersVacGet(opts).then((data) => {
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

[**[InlineResponse2001]**](InlineResponse2001.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1BuyersProductsGuidPatch

> String apiV1BuyersProductsGuidPatch(guid, opts)

# Внести изменения в продукт.

## Внести изменения в продукт.  ## Байер может редактировать только товары со статусом: 30, 35, 40, 50, 60.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.BuyerApi();
let guid = "guid_example"; // String | GUID продукта, который планируем изменить
let opts = {
  'Accept_Encoding': gzip, deflate, // String | 
  'request_body': {key: null} // {String: Object} | 
};
apiInstance.apiV1BuyersProductsGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| GUID продукта, который планируем изменить | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]
 **request_body** | [**{String: Object}**](Object.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1BuyersProductsMyGet

> [InlineResponse200] apiV1BuyersProductsMyGet(opts)

# Получить список товаров взятых в работу байером.

## Получить список товаров взятых в работу байером.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.BuyerApi();
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1BuyersProductsMyGet(opts).then((data) => {
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


## apiV1BuyersProductsPickupGuidPost

> String apiV1BuyersProductsPickupGuidPost(guid, opts)

# Закрепить продукт за байером. Взять его в работу.

## Закрепить продукт за байером. Взять его в работу.  

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.BuyerApi();
let guid = "guid_example"; // String | GUID продукта, который планируем изменить
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1BuyersProductsPickupGuidPost(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| GUID продукта, который планируем изменить | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1BuyersProductsVacGet

> [InlineResponse200] apiV1BuyersProductsVacGet(opts)

# Получить список вакантных товаров.

## Получить список вакантных товаров.   ## Товары со статусом 30 у которых не заполнен buyer   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.BuyerApi();
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1BuyersProductsVacGet(opts).then((data) => {
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


## apiV1BuyersTasksCancelGuidPost

> String apiV1BuyersTasksCancelGuidPost(guid, opts)

# Отменить задачу.

## Отменить задачу. Выставляет задаче статус 30.  

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.BuyerApi();
let guid = "guid_example"; // String | guid отменяемой задачи
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1BuyersTasksCancelGuidPost(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| guid отменяемой задачи | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1BuyersTasksGet

> [InlineResponse2006] apiV1BuyersTasksGet(opts)

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

let apiInstance = new Amazonapi.BuyerApi();
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1BuyersTasksGet(opts).then((data) => {
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


## apiV1BuyersTasksPost

> InlineResponse2013 apiV1BuyersTasksPost(InlineObject17, opts)

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

let apiInstance = new Amazonapi.BuyerApi();
let InlineObject17 = new Amazonapi.InlineObject17(); // InlineObject17 | 
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1BuyersTasksPost(InlineObject17, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **InlineObject17** | [**InlineObject17**](InlineObject17.md)|  | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**InlineResponse2013**](InlineResponse2013.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html

