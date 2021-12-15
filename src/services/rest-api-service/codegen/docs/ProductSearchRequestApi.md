# TestSwagger.ProductSearchRequestApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1RequestsSearchProductsAddRequestDetailsSearchProductPost**](ProductSearchRequestApi.md#apiV1RequestsSearchProductsAddRequestDetailsSearchProductPost) | **POST** /api/v1/requests/search_products/add_request_details_search_product | # Создать детали заявки на поиск товара.
[**apiV1RequestsSearchProductsClientsGet**](ProductSearchRequestApi.md#apiV1RequestsSearchProductsClientsGet) | **GET** /api/v1/requests/search_products/clients | Получить список деталей заявок созданных данным клиентом.
[**apiV1RequestsSearchProductsRemoveRequestDetailsSearchProductGuidPatch**](ProductSearchRequestApi.md#apiV1RequestsSearchProductsRemoveRequestDetailsSearchProductGuidPatch) | **PATCH** /api/v1/requests/search_products/remove_request_details_search_product/{guid} | # Удалить детали заявки на поиск товара по его GUID.
[**apiV1RequestsSearchProductsUpdateRequestDetailsSearchProductGuidPatch**](ProductSearchRequestApi.md#apiV1RequestsSearchProductsUpdateRequestDetailsSearchProductGuidPatch) | **PATCH** /api/v1/requests/search_products/update_request_details_search_product/{guid} | #  Изменить детали заявки на поиск товара.



## apiV1RequestsSearchProductsAddRequestDetailsSearchProductPost

> InlineResponse2016 apiV1RequestsSearchProductsAddRequestDetailsSearchProductPost(opts)

# Создать детали заявки на поиск товара.

## Создать детали заявки на поиск товара. 

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ProductSearchRequestApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject44() // InlineObject44 | 
};
apiInstance.apiV1RequestsSearchProductsAddRequestDetailsSearchProductPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject44**](InlineObject44.md)|  | [optional] 

### Return type

[**InlineResponse2016**](InlineResponse2016.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1RequestsSearchProductsClientsGet

> [InlineObject45] apiV1RequestsSearchProductsClientsGet(opts)

Получить список деталей заявок созданных данным клиентом.

Получить список деталей заявок созданных данным клиентом.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ProductSearchRequestApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1RequestsSearchProductsClientsGet(opts).then((data) => {
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

[**[InlineObject45]**](InlineObject45.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1RequestsSearchProductsRemoveRequestDetailsSearchProductGuidPatch

> String apiV1RequestsSearchProductsRemoveRequestDetailsSearchProductGuidPatch(guid, opts)

# Удалить детали заявки на поиск товара по его GUID.

## Удалить детали заявки по его GUID, возможно только после проверки статуса.    

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ProductSearchRequestApi();
let guid = "guid_example"; // String | GUID в сущности в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': null // Object | 
};
apiInstance.apiV1RequestsSearchProductsRemoveRequestDetailsSearchProductGuidPatch(guid, opts).then((data) => {
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
 **body** | **Object**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1RequestsSearchProductsUpdateRequestDetailsSearchProductGuidPatch

> String apiV1RequestsSearchProductsUpdateRequestDetailsSearchProductGuidPatch(guid, opts)

#  Изменить детали заявки на поиск товара.

## Изменить детали заявки на поиск товара.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ProductSearchRequestApi();
let guid = "guid_example"; // String | GUID продукта БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject45() // InlineObject45 | 
};
apiInstance.apiV1RequestsSearchProductsUpdateRequestDetailsSearchProductGuidPatch(guid, opts).then((data) => {
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
 **body** | [**InlineObject45**](InlineObject45.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html

