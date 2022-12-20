# TestSwagger.ProductApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1ProductsAddShopsGuidPost**](ProductApi.md#apiV1ProductsAddShopsGuidPost) | **POST** /api/v1/products/add_shops/{guid} | Добавить магазины к продукту.
[**apiV1ProductsAddSuppliersGuidPost**](ProductApi.md#apiV1ProductsAddSuppliersGuidPost) | **POST** /api/v1/products/add_suppliers/{guid} | Добавить поставщиков к продукту.
[**apiV1ProductsByCreatorGuidGet**](ProductApi.md#apiV1ProductsByCreatorGuidGet) | **GET** /api/v1/products/by_creator/{guid} | Получение продуктов по ID создателя
[**apiV1ProductsEditHsCodePatch**](ProductApi.md#apiV1ProductsEditHsCodePatch) | **PATCH** /api/v1/products/edit_hsCode | # Редактирование поля hsCode в продукте.
[**apiV1ProductsGuidGet**](ProductApi.md#apiV1ProductsGuidGet) | **GET** /api/v1/products/{guid} | # Получить товар оп id.
[**apiV1ProductsParseAmazonIdGet**](ProductApi.md#apiV1ProductsParseAmazonIdGet) | **GET** /api/v1/products/parse_amazon/{id} | Получить данные о продукте с сайта Амазон по id(asin)
[**apiV1ProductsParseSellercentralGet**](ProductApi.md#apiV1ProductsParseSellercentralGet) | **GET** /api/v1/products/parse_sellercentral | Получить данные о продукте с SellerCentral
[**apiV1ProductsRemoveShopsGuidPost**](ProductApi.md#apiV1ProductsRemoveShopsGuidPost) | **POST** /api/v1/products/remove_shops/{guid} | Удалить магазины из продукта.
[**apiV1ProductsRemoveSuppliersGuidPost**](ProductApi.md#apiV1ProductsRemoveSuppliersGuidPost) | **POST** /api/v1/products/remove_suppliers/{guid} | Удалить поставщиков из продукта.



## apiV1ProductsAddShopsGuidPost

> String apiV1ProductsAddShopsGuidPost(guid, opts)

Добавить магазины к продукту.

## Добавить магазины к продукту.   

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
  'body': new TestSwagger.InlineObject71() // InlineObject71 | 
};
apiInstance.apiV1ProductsAddShopsGuidPost(guid, opts).then((data) => {
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
 **body** | [**InlineObject71**](InlineObject71.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


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
  'body': new TestSwagger.InlineObject69() // InlineObject69 | 
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
 **body** | [**InlineObject69**](InlineObject69.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1ProductsByCreatorGuidGet

> [InlineResponse20022] apiV1ProductsByCreatorGuidGet(guid, opts)

Получение продуктов по ID создателя

## Отдает все продукты, созданные определенным пользователем

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
let guid = null; // String | ID пользователя
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1ProductsByCreatorGuidGet(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| ID пользователя | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse20022]**](InlineResponse20022.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
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
  'body': [new TestSwagger.InlineObject3()] // [InlineObject3] | 
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
 **body** | [**[InlineObject3]**](InlineObject3.md)|  | [optional] 

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

> InlineResponse20041 apiV1ProductsParseSellercentralGet(asin, opts)

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

[**InlineResponse20041**](InlineResponse20041.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1ProductsRemoveShopsGuidPost

> String apiV1ProductsRemoveShopsGuidPost(guid, opts)

Удалить магазины из продукта.

## Удалить магазины из продукта.   

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
  'body': new TestSwagger.InlineObject72() // InlineObject72 | 
};
apiInstance.apiV1ProductsRemoveShopsGuidPost(guid, opts).then((data) => {
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
 **body** | [**InlineObject72**](InlineObject72.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
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
  'body': new TestSwagger.InlineObject70() // InlineObject70 | 
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
 **body** | [**InlineObject70**](InlineObject70.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

