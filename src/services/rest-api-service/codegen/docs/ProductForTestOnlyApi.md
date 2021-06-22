# Amazonapi.ProductForTestOnlyApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1ProductsIdDelete**](ProductForTestOnlyApi.md#apiV1ProductsIdDelete) | **DELETE** /api/v1/products/{id} | Удалить продукт.
[**apiV1ProductsIdGet**](ProductForTestOnlyApi.md#apiV1ProductsIdGet) | **GET** /api/v1/products/{id} | Получить продукт по GUID.
[**apiV1ProductsIdPatch**](ProductForTestOnlyApi.md#apiV1ProductsIdPatch) | **PATCH** /api/v1/products/{id} | Изменить продукт.
[**apiV1ProductsPost**](ProductForTestOnlyApi.md#apiV1ProductsPost) | **POST** /api/v1/products/ | Добавить новый продукт.



## apiV1ProductsIdDelete

> Null apiV1ProductsIdDelete(id, opts)

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

[**Null**](Null.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1ProductsIdGet

> InlineResponse200 apiV1ProductsIdGet(id, opts)

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
apiInstance.apiV1ProductsIdGet(id, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
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

[**InlineResponse200**](InlineResponse200.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1ProductsIdPatch

> Null apiV1ProductsIdPatch(id, opts)

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
  'InlineObject18': new Amazonapi.InlineObject18() // InlineObject18 | 
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
 **InlineObject18** | [**InlineObject18**](InlineObject18.md)|  | [optional] 

### Return type

[**Null**](Null.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1ProductsPost

> InlineResponse2011 apiV1ProductsPost(InlineObject17, opts)

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
let InlineObject17 = new Amazonapi.InlineObject17(); // InlineObject17 | 
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1ProductsPost(InlineObject17, opts).then((data) => {
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

[**InlineResponse2011**](InlineResponse2011.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html

