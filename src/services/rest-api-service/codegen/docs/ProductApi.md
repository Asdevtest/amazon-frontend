# TestSwagger.ProductApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1ProductsAddSuppliersGuidPost**](ProductApi.md#apiV1ProductsAddSuppliersGuidPost) | **POST** /api/v1/products/add_suppliers/{guid} | Добавить поставщиков к продукту.
[**apiV1ProductsEditHsCodePatch**](ProductApi.md#apiV1ProductsEditHsCodePatch) | **PATCH** /api/v1/products/edit_hsCode | # Редактирование поля hsCode в продукте.
[**apiV1ProductsGuidGet**](ProductApi.md#apiV1ProductsGuidGet) | **GET** /api/v1/products/{guid} | # Получить товар оп id.
[**apiV1ProductsParseAmazonIdGet**](ProductApi.md#apiV1ProductsParseAmazonIdGet) | **GET** /api/v1/products/parse_amazon/{id} | Получить данные о продукте с сайта Амазон по id(asin)
[**apiV1ProductsParseSellercentralGet**](ProductApi.md#apiV1ProductsParseSellercentralGet) | **GET** /api/v1/products/parse_sellercentral | Получить данные о продукте с SellerCentral
[**apiV1ProductsRemoveSuppliersGuidPost**](ProductApi.md#apiV1ProductsRemoveSuppliersGuidPost) | **POST** /api/v1/products/remove_suppliers/{guid} | Удалить поставщиков из продукта.



## apiV1ProductsAddSuppliersGuidPost

> String apiV1ProductsAddSuppliersGuidPost(guid, opts)

Добавить поставщиков к продукту.

## Добавить поставщиков к продукту.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ProductApi();
let guid = null; // String | GUID продукта в БД.
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject39() // InlineObject39 | 
};
apiInstance.apiV1ProductsAddSuppliersGuidPost(guid, opts).then((data) => {
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
 **body** | [**InlineObject39**](InlineObject39.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1ProductsEditHsCodePatch

> String apiV1ProductsEditHsCodePatch(opts)

# Редактирование поля hsCode в продукте.

## Редактирование поля hsCode в продукте.   Доступно только для Байера, Клиента, Сторкипера

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ProductApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': [new TestSwagger.InlineObject2()] // [InlineObject2] | 
};
apiInstance.apiV1ProductsEditHsCodePatch(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**[InlineObject2]**](InlineObject2.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1ProductsGuidGet

> InlineResponse200 apiV1ProductsGuidGet(guid, opts)

# Получить товар оп id.

## Получить товар оп id.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ProductApi();
let guid = null; // String | id товара.
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1ProductsGuidGet(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| id товара. | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**InlineResponse200**](InlineResponse200.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1ProductsParseAmazonIdGet

> {String: Object} apiV1ProductsParseAmazonIdGet(id, opts)

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

let apiInstance = new TestSwagger.ProductApi();
let id = "id_example"; // String | id(asin) для проверки
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1ProductsParseAmazonIdGet(id, opts).then((data) => {
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


## apiV1ProductsParseSellercentralGet

> InlineResponse20014 apiV1ProductsParseSellercentralGet(asin, opts)

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

let apiInstance = new TestSwagger.ProductApi();
let asin = "asin_example"; // String | ASIN продукта
let opts = {
  'price': 3.4, // Number | Цена продукта.
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1ProductsParseSellercentralGet(asin, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **asin** | **String**| ASIN продукта | 
 **price** | **Number**| Цена продукта. | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**InlineResponse20014**](InlineResponse20014.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1ProductsRemoveSuppliersGuidPost

> String apiV1ProductsRemoveSuppliersGuidPost(guid, opts)

Удалить поставщиков из продукта.

## Удалить поставщиков из продукта.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ProductApi();
let guid = null; // String | GUID продукта в БД.
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject40() // InlineObject40 | 
};
apiInstance.apiV1ProductsRemoveSuppliersGuidPost(guid, opts).then((data) => {
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
 **body** | [**InlineObject40**](InlineObject40.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

