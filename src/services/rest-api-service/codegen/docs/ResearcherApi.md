# TestSwagger.ResearcherApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1ResearchersCheckProductsAsinGet**](ResearcherApi.md#apiV1ResearchersCheckProductsAsinGet) | **GET** /api/v1/researchers/check_products/{asin} | Проверить продукт по ID существует ли он в базе.
[**apiV1ResearchersParseAmazonIdGet**](ResearcherApi.md#apiV1ResearchersParseAmazonIdGet) | **GET** /api/v1/researchers/parse_amazon/{id} | Получить данные о продукте с сайта Амазон по id(asin)
[**apiV1ResearchersParseSellercentralGet**](ResearcherApi.md#apiV1ResearchersParseSellercentralGet) | **GET** /api/v1/researchers/parse_sellercentral | Получить данные о продукте с SellerCentral
[**apiV1ResearchersProductsGet**](ResearcherApi.md#apiV1ResearchersProductsGet) | **GET** /api/v1/researchers/products | Получить список товаров созданных данным пользователем.
[**apiV1ResearchersProductsGuidDelete**](ResearcherApi.md#apiV1ResearchersProductsGuidDelete) | **DELETE** /api/v1/researchers/products/{guid} | Удалить продукт.
[**apiV1ResearchersProductsGuidGet**](ResearcherApi.md#apiV1ResearchersProductsGuidGet) | **GET** /api/v1/researchers/products/{guid} | Получить товар по GUID.
[**apiV1ResearchersProductsGuidPatch**](ResearcherApi.md#apiV1ResearchersProductsGuidPatch) | **PATCH** /api/v1/researchers/products/{guid} | #  Изменить продукт.
[**apiV1ResearchersProductsPost**](ResearcherApi.md#apiV1ResearchersProductsPost) | **POST** /api/v1/researchers/products | # Добавить новый продукт.



## apiV1ResearchersCheckProductsAsinGet

> InlineResponse20014 apiV1ResearchersCheckProductsAsinGet(asin, opts)

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
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1ResearchersCheckProductsAsinGet(asin, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **asin** | **String**| ASIN для проверки | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**InlineResponse20014**](InlineResponse20014.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1ResearchersParseAmazonIdGet

> {String: Object} apiV1ResearchersParseAmazonIdGet(id, opts)

Получить данные о продукте с сайта Амазон по id(asin)

Получить данные о продукте с сайта Амазон по id(asin)  

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
let id = "id_example"; // String | id(asin) для проверки
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1ResearchersParseAmazonIdGet(id, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**| id(asin) для проверки | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**{String: Object}**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1ResearchersParseSellercentralGet

> InlineResponse20015 apiV1ResearchersParseSellercentralGet(opts)

Получить данные о продукте с SellerCentral

Получить данные о продукте с SellerCentral  

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
  'asin': "asin_example", // String | ASIN продукта
  'price': 3.4, // Number | Цена продукта.
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1ResearchersParseSellercentralGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **asin** | **String**| ASIN продукта | [optional] 
 **price** | **Number**| Цена продукта. | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**InlineResponse20015**](InlineResponse20015.md)

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
  'body': new TestSwagger.InlineObject47() // InlineObject47 | 
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
 **body** | [**InlineObject47**](InlineObject47.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1ResearchersProductsPost

> InlineResponse2014 apiV1ResearchersProductsPost(opts)

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
  'body': new TestSwagger.InlineObject46() // InlineObject46 | 
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
 **body** | [**InlineObject46**](InlineObject46.md)|  | [optional] 

### Return type

[**InlineResponse2014**](InlineResponse2014.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

