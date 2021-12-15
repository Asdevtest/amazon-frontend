# TestSwagger.NicheSearchRequestApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1RequestsCustomAddCustomRequestDetailsPost**](NicheSearchRequestApi.md#apiV1RequestsCustomAddCustomRequestDetailsPost) | **POST** /api/v1/requests/custom/add_custom_request_details | # Создать детали кастомной заявки.
[**apiV1RequestsCustomClientsGet**](NicheSearchRequestApi.md#apiV1RequestsCustomClientsGet) | **GET** /api/v1/requests/custom/clients | Получить список деталей кастомных заявок.
[**apiV1RequestsCustomRemoveCustomRequestDetailsGuidPatch**](NicheSearchRequestApi.md#apiV1RequestsCustomRemoveCustomRequestDetailsGuidPatch) | **PATCH** /api/v1/requests/custom/remove_custom_request_details/{guid} | # Удалить детали кастомной заявки по его GUID.
[**apiV1RequestsCustomUpdateCustomRequestDetailsGuidPatch**](NicheSearchRequestApi.md#apiV1RequestsCustomUpdateCustomRequestDetailsGuidPatch) | **PATCH** /api/v1/requests/custom/update_custom_request_details/{guid} | #  Изменить детали кастомной заявки.
[**apiV1RequestsSearchNicheAddRequestDetailsSearchNichePost**](NicheSearchRequestApi.md#apiV1RequestsSearchNicheAddRequestDetailsSearchNichePost) | **POST** /api/v1/requests/search_niche/add_request_details_search_niche | # Создать детали заявки на поиск ниш.
[**apiV1RequestsSearchNicheClientsGet**](NicheSearchRequestApi.md#apiV1RequestsSearchNicheClientsGet) | **GET** /api/v1/requests/search_niche/clients | Получить список деталей заявок созданных данным клиентом.
[**apiV1RequestsSearchNicheRemoveRequestDetailsSearchNicheGuidPatch**](NicheSearchRequestApi.md#apiV1RequestsSearchNicheRemoveRequestDetailsSearchNicheGuidPatch) | **PATCH** /api/v1/requests/search_niche/remove_request_details_search_niche/{guid} | # Удалить детали заявки на поиск ниш по его GUID.
[**apiV1RequestsSearchNicheUpdateRequestDetailsSearchNicheGuidPatch**](NicheSearchRequestApi.md#apiV1RequestsSearchNicheUpdateRequestDetailsSearchNicheGuidPatch) | **PATCH** /api/v1/requests/search_niche/update_request_details_search_niche/{guid} | #  Изменить детали заявки на поиск ниш.



## apiV1RequestsCustomAddCustomRequestDetailsPost

> InlineResponse2016 apiV1RequestsCustomAddCustomRequestDetailsPost(opts)

# Создать детали кастомной заявки.

## Создать детали кастомной заявки. 

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.NicheSearchRequestApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject40() // InlineObject40 | 
};
apiInstance.apiV1RequestsCustomAddCustomRequestDetailsPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject40**](InlineObject40.md)|  | [optional] 

### Return type

[**InlineResponse2016**](InlineResponse2016.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1RequestsCustomClientsGet

> [InlineObject41] apiV1RequestsCustomClientsGet(opts)

Получить список деталей кастомных заявок.

Получить список деталей кастомных заявок.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.NicheSearchRequestApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1RequestsCustomClientsGet(opts).then((data) => {
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

[**[InlineObject41]**](InlineObject41.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1RequestsCustomRemoveCustomRequestDetailsGuidPatch

> String apiV1RequestsCustomRemoveCustomRequestDetailsGuidPatch(guid, opts)

# Удалить детали кастомной заявки по его GUID.

## Удалить детали кастомной заявки по его GUID, возможно только после проверки статуса.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.NicheSearchRequestApi();
let guid = "guid_example"; // String | GUID в сущности в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': null // Object | 
};
apiInstance.apiV1RequestsCustomRemoveCustomRequestDetailsGuidPatch(guid, opts).then((data) => {
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


## apiV1RequestsCustomUpdateCustomRequestDetailsGuidPatch

> String apiV1RequestsCustomUpdateCustomRequestDetailsGuidPatch(guid, opts)

#  Изменить детали кастомной заявки.

## Изменить детали кастомной заявки.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.NicheSearchRequestApi();
let guid = "guid_example"; // String | GUID в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject41() // InlineObject41 | 
};
apiInstance.apiV1RequestsCustomUpdateCustomRequestDetailsGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| GUID в БД | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject41**](InlineObject41.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1RequestsSearchNicheAddRequestDetailsSearchNichePost

> InlineResponse2016 apiV1RequestsSearchNicheAddRequestDetailsSearchNichePost(opts)

# Создать детали заявки на поиск ниш.

## Создать детали заявки на поиск ниш. 

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.NicheSearchRequestApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject42() // InlineObject42 | 
};
apiInstance.apiV1RequestsSearchNicheAddRequestDetailsSearchNichePost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject42**](InlineObject42.md)|  | [optional] 

### Return type

[**InlineResponse2016**](InlineResponse2016.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1RequestsSearchNicheClientsGet

> [InlineObject43] apiV1RequestsSearchNicheClientsGet(opts)

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

let apiInstance = new TestSwagger.NicheSearchRequestApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1RequestsSearchNicheClientsGet(opts).then((data) => {
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

[**[InlineObject43]**](InlineObject43.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1RequestsSearchNicheRemoveRequestDetailsSearchNicheGuidPatch

> String apiV1RequestsSearchNicheRemoveRequestDetailsSearchNicheGuidPatch(guid, opts)

# Удалить детали заявки на поиск ниш по его GUID.

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

let apiInstance = new TestSwagger.NicheSearchRequestApi();
let guid = "guid_example"; // String | GUID в сущности в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': null // Object | 
};
apiInstance.apiV1RequestsSearchNicheRemoveRequestDetailsSearchNicheGuidPatch(guid, opts).then((data) => {
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


## apiV1RequestsSearchNicheUpdateRequestDetailsSearchNicheGuidPatch

> String apiV1RequestsSearchNicheUpdateRequestDetailsSearchNicheGuidPatch(guid, opts)

#  Изменить детали заявки на поиск ниш.

## Изменить детали заявки на поиск ниш.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.NicheSearchRequestApi();
let guid = "guid_example"; // String | GUID продукта БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject43() // InlineObject43 | 
};
apiInstance.apiV1RequestsSearchNicheUpdateRequestDetailsSearchNicheGuidPatch(guid, opts).then((data) => {
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
 **body** | [**InlineObject43**](InlineObject43.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html

