# Amazonapi.ProductForTestOnlyApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1ProductsIdDelete**](ProductForTestOnlyApi.md#apiV1ProductsIdDelete) | **DELETE** /api/v1/products/{id} | Удалить продукт.
[**apiV1ProductsIdGet**](ProductForTestOnlyApi.md#apiV1ProductsIdGet) | **GET** /api/v1/products/{id} | Получить продукт по GUID.
[**apiV1ProductsIdPatch**](ProductForTestOnlyApi.md#apiV1ProductsIdPatch) | **PATCH** /api/v1/products/{id} | Изменить продукт.
[**apiV1ProductsPost**](ProductForTestOnlyApi.md#apiV1ProductsPost) | **POST** /api/v1/products/ | Добавить новый продукт.



## apiV1ProductsIdDelete

> String apiV1ProductsIdDelete(id, opts)

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

let apiInstance = new Amazonapi.ProductForTestOnlyApi();
let id = 60806dbd5346527a0f90f41e; // String | GUID продукта.
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1ProductsIdDelete(id, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**| GUID продукта. | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1ProductsIdGet

> apiV1ProductsIdGet(id, opts)

Получить продукт по GUID.

## Получить продукт по GUID.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.ProductForTestOnlyApi();
let id = "id_example"; // String | GUID продукта в БД.
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1ProductsIdGet(id, opts).then(() => {
  console.log('API called successfully.');
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**| GUID продукта в БД. | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

null (empty response body)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1ProductsIdPatch

> String apiV1ProductsIdPatch(id, opts)

Изменить продукт.

## Изменить продукт.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.ProductForTestOnlyApi();
let id = 60806dbd5346527a0f90f41e; // String | GUID продукта, который будет изменен
let opts = {
  'Accept_Encoding': gzip, deflate, // String | 
  'InlineObject22': new Amazonapi.InlineObject22() // InlineObject22 | 
};
apiInstance.apiV1ProductsIdPatch(id, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**| GUID продукта, который будет изменен | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]
 **InlineObject22** | [**InlineObject22**](InlineObject22.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1ProductsPost

> InlineResponse2014 apiV1ProductsPost(opts)

Добавить новый продукт.

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

let apiInstance = new Amazonapi.ProductForTestOnlyApi();
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1ProductsPost(opts).then((data) => {
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

[**InlineResponse2014**](InlineResponse2014.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html

