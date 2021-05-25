# Amazonapi.StorekeepersApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1StorekeepersBatchesGet**](StorekeepersApi.md#apiV1StorekeepersBatchesGet) | **GET** /api/v1/storekeepers/batches | # Получить партии....
[**apiV1StorekeepersBoxesGuidPatch**](StorekeepersApi.md#apiV1StorekeepersBoxesGuidPatch) | **PATCH** /api/v1/storekeepers/boxes/{guid} | # Изменить коробку с товаром.
[**apiV1StorekeepersBoxesMyGet**](StorekeepersApi.md#apiV1StorekeepersBoxesMyGet) | **GET** /api/v1/storekeepers/boxes/my | # Получить коробки закрепленные за данным сборщиком..
[**apiV1StorekeepersBoxesPickupGuidPost**](StorekeepersApi.md#apiV1StorekeepersBoxesPickupGuidPost) | **POST** /api/v1/storekeepers/boxes/pickup/{guid} | # Закрепить коробку за сборщиками.
[**apiV1StorekeepersBoxesVacGet**](StorekeepersApi.md#apiV1StorekeepersBoxesVacGet) | **GET** /api/v1/storekeepers/boxes/vac | # Получить коробки не закрепленные за сборщиками.
[**apiV1StorekeepersTasksGuidPatch**](StorekeepersApi.md#apiV1StorekeepersTasksGuidPatch) | **PATCH** /api/v1/storekeepers/tasks/{guid} | # Изменить задачу.
[**apiV1StorekeepersTasksMyGet**](StorekeepersApi.md#apiV1StorekeepersTasksMyGet) | **GET** /api/v1/storekeepers/tasks/my | # Получить задачи закрепленные за данным сборщиком..
[**apiV1StorekeepersTasksPickupGuidPost**](StorekeepersApi.md#apiV1StorekeepersTasksPickupGuidPost) | **POST** /api/v1/storekeepers/tasks/pickup/{guid} | # Закрепить задачу за сборщиком.
[**apiV1StorekeepersTasksVacGet**](StorekeepersApi.md#apiV1StorekeepersTasksVacGet) | **GET** /api/v1/storekeepers/tasks/vac | # Получить задачи не закрепленные за сотрудниками склада.



## apiV1StorekeepersBatchesGet

> [InlineResponse20012] apiV1StorekeepersBatchesGet(opts)

# Получить партии....

## Получить партии...  

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.StorekeepersApi();
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1StorekeepersBatchesGet(opts).then((data) => {
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

[**[InlineResponse20012]**](InlineResponse20012.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1StorekeepersBoxesGuidPatch

> InlineResponse201 apiV1StorekeepersBoxesGuidPatch(guid, opts)

# Изменить коробку с товаром.

## Изменить коробку с товаром.  ## Выборка идет по GUID коробки и кладовщика/сборщика, кто ее подобрал. Нельзя отредактировать чужую коробку.  

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.StorekeepersApi();
let guid = "guid_example"; // String | GUID коробки, которую мы хотим изменить
let opts = {
  'Accept_Encoding': gzip, deflate, // String | 
  'InlineObject16': new Amazonapi.InlineObject16() // InlineObject16 | 
};
apiInstance.apiV1StorekeepersBoxesGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| GUID коробки, которую мы хотим изменить | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]
 **InlineObject16** | [**InlineObject16**](InlineObject16.md)|  | [optional] 

### Return type

[**InlineResponse201**](InlineResponse201.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1StorekeepersBoxesMyGet

> [InlineResponse20010] apiV1StorekeepersBoxesMyGet(opts)

# Получить коробки закрепленные за данным сборщиком..

## Получить коробки закрепленные за данным сборщиком.  

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.StorekeepersApi();
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1StorekeepersBoxesMyGet(opts).then((data) => {
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

[**[InlineResponse20010]**](InlineResponse20010.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1StorekeepersBoxesPickupGuidPost

> Null apiV1StorekeepersBoxesPickupGuidPost(guid, opts)

# Закрепить коробку за сборщиками.

## Закрепить коробку за сборщиками.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.StorekeepersApi();
let guid = "guid_example"; // String | GUID коробки, которую мы хотим изменить
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1StorekeepersBoxesPickupGuidPost(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| GUID коробки, которую мы хотим изменить | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**Null**](Null.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1StorekeepersBoxesVacGet

> [InlineResponse20010] apiV1StorekeepersBoxesVacGet(opts)

# Получить коробки не закрепленные за сборщиками.

## Получить коробки не закрепленные за сборщиками.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.StorekeepersApi();
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1StorekeepersBoxesVacGet(opts).then((data) => {
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

[**[InlineResponse20010]**](InlineResponse20010.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1StorekeepersTasksGuidPatch

> Null apiV1StorekeepersTasksGuidPatch(guid, InlineObject17, opts)

# Изменить задачу.

## Изменить задачу. Здесь только статус.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.StorekeepersApi();
let guid = "guid_example"; // String | GUID задачи, которую мы хотим изменить
let InlineObject17 = new Amazonapi.InlineObject17(); // InlineObject17 | 
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1StorekeepersTasksGuidPatch(guid, InlineObject17, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| GUID задачи, которую мы хотим изменить | 
 **InlineObject17** | [**InlineObject17**](InlineObject17.md)|  | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**Null**](Null.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1StorekeepersTasksMyGet

> [InlineResponse20011] apiV1StorekeepersTasksMyGet(opts)

# Получить задачи закрепленные за данным сборщиком..

## Получить задачи закрепленные за данным сборщиком.  

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.StorekeepersApi();
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1StorekeepersTasksMyGet(opts).then((data) => {
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

[**[InlineResponse20011]**](InlineResponse20011.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1StorekeepersTasksPickupGuidPost

> Null apiV1StorekeepersTasksPickupGuidPost(guid, opts)

# Закрепить задачу за сборщиком.

## Закрепить задачу за сборщиком.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.StorekeepersApi();
let guid = "guid_example"; // String | GUID задачи, которую мы хотим изменить
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1StorekeepersTasksPickupGuidPost(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| GUID задачи, которую мы хотим изменить | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**Null**](Null.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1StorekeepersTasksVacGet

> [InlineResponse20011] apiV1StorekeepersTasksVacGet(opts)

# Получить задачи не закрепленные за сотрудниками склада.

## Получить задачи не закрепленные за сотрудниками склада.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.StorekeepersApi();
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1StorekeepersTasksVacGet(opts).then((data) => {
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

[**[InlineResponse20011]**](InlineResponse20011.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html

