# TestSwagger.ResearcherApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1ResearchersCheckProductsAsinStrategyGet**](ResearcherApi.md#apiV1ResearchersCheckProductsAsinStrategyGet) | **GET** /api/v1/researchers/check_products/{asin}/{strategy} | Проверить продукт по ID существует ли он в базе.
[**apiV1ResearchersProductsGet**](ResearcherApi.md#apiV1ResearchersProductsGet) | **GET** /api/v1/researchers/products | Получить список товаров созданных данным пользователем.
[**apiV1ResearchersProductsGuidDelete**](ResearcherApi.md#apiV1ResearchersProductsGuidDelete) | **DELETE** /api/v1/researchers/products/{guid} | Удалить продукт.
[**apiV1ResearchersProductsGuidGet**](ResearcherApi.md#apiV1ResearchersProductsGuidGet) | **GET** /api/v1/researchers/products/{guid} | Получить товар по GUID.
[**apiV1ResearchersProductsGuidPatch**](ResearcherApi.md#apiV1ResearchersProductsGuidPatch) | **PATCH** /api/v1/researchers/products/{guid} | #  Изменить продукт.
[**apiV1ResearchersProductsPost**](ResearcherApi.md#apiV1ResearchersProductsPost) | **POST** /api/v1/researchers/products | # Добавить новый продукт.



## apiV1ResearchersCheckProductsAsinStrategyGet

> InlineResponse20062 apiV1ResearchersCheckProductsAsinStrategyGet(asin, strategy, opts)

Проверить продукт по ID существует ли он в базе.

Проверить продукт по ID существует ли он в базе.  В базе ASIN продукта должно быть уникально. База не даст завести дубль. Перед добавление продукта   нужно проверить, нет ли в базе уже продукта с таким ID   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ResearcherApi();
let asin = "asin_example"; // String | ASIN для проверки
let strategy = "strategy_example"; // String | Стратегия АСИНА для проверки
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1ResearchersCheckProductsAsinStrategyGet(asin, strategy, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **asin** | **String**| ASIN для проверки | 
 **strategy** | **String**| Стратегия АСИНА для проверки | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**InlineResponse20062**](InlineResponse20062.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1ResearchersProductsGet

> [InlineResponse200] apiV1ResearchersProductsGet(opts)

Получить список товаров созданных данным пользователем.

Получить список товаров созданных данным пользователем.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ResearcherApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1ResearchersProductsGet(opts).then((data) => {
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


## apiV1ResearchersProductsGuidDelete

> String apiV1ResearchersProductsGuidDelete(guid, opts)

Удалить продукт.

## Удалить продукт.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ResearcherApi();
let guid = "guid_example"; // String | GUID продукта.
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1ResearchersProductsGuidDelete(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| GUID продукта. | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1ResearchersProductsGuidGet

> InlineResponse200 apiV1ResearchersProductsGuidGet(guid, opts)

Получить товар по GUID.

Получить товар по GUID.

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ResearcherApi();
let guid = "guid_example"; // String | GUID запрашиваемого ресурса.
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1ResearchersProductsGuidGet(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| GUID запрашиваемого ресурса. | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**InlineResponse200**](InlineResponse200.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1ResearchersProductsGuidPatch

> String apiV1ResearchersProductsGuidPatch(guid, opts)

#  Изменить продукт.

## Изменить продукт.   ## ASIN нельзя менять после того как создан продукт.   Может редактировать только товары со статусами 0, 5, 10

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ResearcherApi();
let guid = "guid_example"; // String | GUID продукта БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject102() // InlineObject102 | 
};
apiInstance.apiV1ResearchersProductsGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| GUID продукта БД | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject102**](InlineObject102.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1ResearchersProductsPost

> InlineResponse2017 apiV1ResearchersProductsPost(opts)

# Добавить новый продукт.

## Добавить новый продукт.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ResearcherApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject101() // InlineObject101 | 
};
apiInstance.apiV1ResearchersProductsPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject101**](InlineObject101.md)|  | [optional] 

### Return type

[**InlineResponse2017**](InlineResponse2017.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

