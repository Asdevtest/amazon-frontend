# TestSwagger.SupplierApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1SuppliersGet**](SupplierApi.md#apiV1SuppliersGet) | **GET** /api/v1/suppliers/ | # Получить список поставщиков.
[**apiV1SuppliersGuidDelete**](SupplierApi.md#apiV1SuppliersGuidDelete) | **DELETE** /api/v1/suppliers/{guid} | # Удалить поставщика.
[**apiV1SuppliersGuidGet**](SupplierApi.md#apiV1SuppliersGuidGet) | **GET** /api/v1/suppliers/{guid} | # Получить одного поставщика.
[**apiV1SuppliersGuidPatch**](SupplierApi.md#apiV1SuppliersGuidPatch) | **PATCH** /api/v1/suppliers/{guid} | # Изменить поставщика.
[**apiV1SuppliersPost**](SupplierApi.md#apiV1SuppliersPost) | **POST** /api/v1/suppliers/ | # Добавить нового поставщика.



## apiV1SuppliersGet

> [ApiV1AdminsGetProductsByStatusCurrentSupplier] apiV1SuppliersGet(opts)

# Получить список поставщиков.

## Получить список поставщиков.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.SupplierApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1SuppliersGet(opts).then((data) => {
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

[**[ApiV1AdminsGetProductsByStatusCurrentSupplier]**](ApiV1AdminsGetProductsByStatusCurrentSupplier.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1SuppliersGuidDelete

> String apiV1SuppliersGuidDelete(guid, opts)

# Удалить поставщика.

##  Удалить поставщика.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.SupplierApi();
let guid = "guid_example"; // String | GUID в сущности в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1SuppliersGuidDelete(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| GUID в сущности в БД | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1SuppliersGuidGet

> {String: Object} apiV1SuppliersGuidGet(guid, opts)

# Получить одного поставщика.

## Получить одного поставщика.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.SupplierApi();
let guid = "guid_example"; // String | GUID в сущности в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1SuppliersGuidGet(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| GUID в сущности в БД | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**{String: Object}**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1SuppliersGuidPatch

> String apiV1SuppliersGuidPatch(guid, opts)

# Изменить поставщика.

## Изменить  поставщика.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.SupplierApi();
let guid = "guid_example"; // String | GUID в сущности в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject56() // InlineObject56 | 
};
apiInstance.apiV1SuppliersGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| GUID в сущности в БД | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject56**](InlineObject56.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1SuppliersPost

> InlineResponse2013 apiV1SuppliersPost(opts)

# Добавить нового поставщика.

## Добавить нового поставщика.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.SupplierApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject55() // InlineObject55 | 
};
apiInstance.apiV1SuppliersPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject55**](InlineObject55.md)|  | [optional] 

### Return type

[**InlineResponse2013**](InlineResponse2013.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

