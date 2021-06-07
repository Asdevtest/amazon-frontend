# Amazonapi.ReseacherApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1ResearchersCheckProductsIdGet**](ReseacherApi.md#apiV1ResearchersCheckProductsIdGet) | **GET** /api/v1/researchers/check_products/{id} | Проверить продукт по ID существует ли он в базе.
[**apiV1ResearchersParseAmazonIdGet**](ReseacherApi.md#apiV1ResearchersParseAmazonIdGet) | **GET** /api/v1/researchers/parse_amazon/{id} | Получить данные о продукте с сайта Амазон по id(asin)
[**apiV1ResearchersParseSellercentralGet**](ReseacherApi.md#apiV1ResearchersParseSellercentralGet) | **GET** /api/v1/researchers/parse_sellercentral | Получить данные о продукте с SellerCentral
[**apiV1ResearchersPaymentsMyGet**](ReseacherApi.md#apiV1ResearchersPaymentsMyGet) | **GET** /api/v1/researchers/payments/my | Получить информацию об платежах для этого менеджера.
[**apiV1ResearchersProductsGet**](ReseacherApi.md#apiV1ResearchersProductsGet) | **GET** /api/v1/researchers/products | Получить список товаров созданных данным пользователем.
[**apiV1ResearchersProductsGuidDelete**](ReseacherApi.md#apiV1ResearchersProductsGuidDelete) | **DELETE** /api/v1/researchers/products/{guid} | Удалить продукт.
[**apiV1ResearchersProductsGuidGet**](ReseacherApi.md#apiV1ResearchersProductsGuidGet) | **GET** /api/v1/researchers/products/{guid} | Получить товар по GUID.
[**apiV1ResearchersProductsGuidPatch**](ReseacherApi.md#apiV1ResearchersProductsGuidPatch) | **PATCH** /api/v1/researchers/products/{guid} | #  Изменить продукт.
[**apiV1ResearchersProductsPost**](ReseacherApi.md#apiV1ResearchersProductsPost) | **POST** /api/v1/researchers/products | # Добавить новый продукт.



## apiV1ResearchersCheckProductsIdGet

> InlineResponse2004 apiV1ResearchersCheckProductsIdGet(id, opts)

Проверить продукт по ID существует ли он в базе.

Проверить продукт по ID существует ли он в базе.  В базе id продукта (asin) должно быть уникально. База не даст завести дубль. Перед добавление продукта   нужно проверить, нет ли в базе уже продукта с таким ID   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.ReseacherApi();
let id = "id_example"; // String | id для проверки
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1ResearchersCheckProductsIdGet(id, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**| id для проверки | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**InlineResponse2004**](InlineResponse2004.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1ResearchersParseAmazonIdGet

> InlineResponse2005 apiV1ResearchersParseAmazonIdGet(id, opts)

Получить данные о продукте с сайта Амазон по id(asin)

Получить данные о продукте с сайта Амазон по id(asin)  

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.ReseacherApi();
let id = "id_example"; // String | id(asin) для проверки
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**InlineResponse2005**](InlineResponse2005.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1ResearchersParseSellercentralGet

> InlineResponse2005 apiV1ResearchersParseSellercentralGet(opts)

Получить данные о продукте с SellerCentral

Получить данные о продукте с SellerCentral  

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.ReseacherApi();
let opts = {
  'id': "id_example", // String | ASIN продукта
  'price': 3.4, // Number | Цена продукта.
  'Accept_Encoding': gzip, deflate // String | 
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
 **id** | **String**| ASIN продукта | [optional] 
 **price** | **Number**| Цена продукта. | [optional] 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**InlineResponse2005**](InlineResponse2005.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1ResearchersPaymentsMyGet

> [Object] apiV1ResearchersPaymentsMyGet(opts)

Получить информацию об платежах для этого менеджера.

Получить информацию об платежах для этого менеджера.

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.ReseacherApi();
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1ResearchersPaymentsMyGet(opts).then((data) => {
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


## apiV1ResearchersProductsGet

> [Object] apiV1ResearchersProductsGet(opts)

Получить список товаров созданных данным пользователем.

Получить список товаров созданных данным пользователем.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.ReseacherApi();
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

**[Object]**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1ResearchersProductsGuidDelete

> Null apiV1ResearchersProductsGuidDelete(guid, opts)

Удалить продукт.

## Удалить продукт.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.ReseacherApi();
let guid = 60806dbd5346527a0f90f41e; // String | GUID продукта.
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**Null**](Null.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1ResearchersProductsGuidGet

> InlineResponse2003 apiV1ResearchersProductsGuidGet(guid, opts)

Получить товар по GUID.

Получить товар по GUID.

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.ReseacherApi();
let guid = "guid_example"; // String | GUID запрашиваемого ресурса.
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**InlineResponse2003**](InlineResponse2003.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1ResearchersProductsGuidPatch

> Null apiV1ResearchersProductsGuidPatch(guid, opts)

#  Изменить продукт.

## Изменить продукт.   ## ASIN нельзя менять после того как создан продукт.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.ReseacherApi();
let guid = "guid_example"; // String | GUID продукта БД
let opts = {
  'Accept_Encoding': gzip, deflate, // String | 
  'InlineObject14': new Amazonapi.InlineObject14() // InlineObject14 | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]
 **InlineObject14** | [**InlineObject14**](InlineObject14.md)|  | [optional] 

### Return type

[**Null**](Null.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1ResearchersProductsPost

> InlineResponse201 apiV1ResearchersProductsPost(InlineObject13, opts)

# Добавить новый продукт.

## Добавить новый продукт.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.ReseacherApi();
let InlineObject13 = new Amazonapi.InlineObject13(); // InlineObject13 | 
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1ResearchersProductsPost(InlineObject13, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **InlineObject13** | [**InlineObject13**](InlineObject13.md)|  | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**InlineResponse201**](InlineResponse201.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html

