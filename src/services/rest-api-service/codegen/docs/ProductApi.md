# Amazonapi.ProductApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1ProductsAddSuppliersGuidPost**](ProductApi.md#apiV1ProductsAddSuppliersGuidPost) | **POST** /api/v1/products/add_suppliers/{guid} | Добавить поставщиков к продукту.
[**apiV1ProductsRemoveSuppliersGuidPost**](ProductApi.md#apiV1ProductsRemoveSuppliersGuidPost) | **POST** /api/v1/products/remove_suppliers/{guid} | Удалить поставщиков из продукта.



## apiV1ProductsAddSuppliersGuidPost

> String apiV1ProductsAddSuppliersGuidPost(guid, opts)

Добавить поставщиков к продукту.

## Добавить поставщиков к продукту.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.ProductApi();
let guid = "guid_example"; // String | GUID продукта в БД.
let opts = {
  'Accept_Encoding': gzip, deflate, // String | 
  'InlineObject28': new Amazonapi.InlineObject28() // InlineObject28 | 
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
 **guid** | **String**| GUID продукта в БД. | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]
 **InlineObject28** | [**InlineObject28**](InlineObject28.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1ProductsRemoveSuppliersGuidPost

> String apiV1ProductsRemoveSuppliersGuidPost(guid, opts)

Удалить поставщиков из продукта.

## Удалить поставщиков из продукта.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.ProductApi();
let guid = "guid_example"; // String | GUID продукта в БД.
let opts = {
  'Accept_Encoding': gzip, deflate, // String | 
  'InlineObject29': new Amazonapi.InlineObject29() // InlineObject29 | 
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
 **guid** | **String**| GUID продукта в БД. | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]
 **InlineObject29** | [**InlineObject29**](InlineObject29.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html

