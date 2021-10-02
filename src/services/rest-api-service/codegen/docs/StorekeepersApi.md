# Amazonapi.StorekeepersApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1StorekeepersBatchesGet**](StorekeepersApi.md#apiV1StorekeepersBatchesGet) | **GET** /api/v1/storekeepers/batches | # Получить партии....
[**apiV1StorekeepersOrdersSetBarcodeAndStatusGuidPatch**](StorekeepersApi.md#apiV1StorekeepersOrdersSetBarcodeAndStatusGuidPatch) | **PATCH** /api/v1/storekeepers/orders/set_barcode_and_status/{guid} | # Изменить значение isBarCodeAlreadyAttachedByTheSupplier и status в сущности заказ.
[**apiV1StorekeepersTasksCancelGuidPost**](StorekeepersApi.md#apiV1StorekeepersTasksCancelGuidPost) | **POST** /api/v1/storekeepers/tasks/cancel/{guid} | # Отметить задачу, как отмененную..
[**apiV1StorekeepersTasksDoneGuidPost**](StorekeepersApi.md#apiV1StorekeepersTasksDoneGuidPost) | **POST** /api/v1/storekeepers/tasks/done/{guid} | # Отметить задачу, как выполненную.
[**apiV1StorekeepersTasksGuidPatch**](StorekeepersApi.md#apiV1StorekeepersTasksGuidPatch) | **PATCH** /api/v1/storekeepers/tasks/{guid} | # Изменить задачу.
[**apiV1StorekeepersTasksMyGet**](StorekeepersApi.md#apiV1StorekeepersTasksMyGet) | **GET** /api/v1/storekeepers/tasks/my | # Получить задачи закрепленные за данным сборщиком..
[**apiV1StorekeepersTasksPickupGuidPost**](StorekeepersApi.md#apiV1StorekeepersTasksPickupGuidPost) | **POST** /api/v1/storekeepers/tasks/pickup/{guid} | # Закрепить задачу за сборщиком.
[**apiV1StorekeepersTasksVacGet**](StorekeepersApi.md#apiV1StorekeepersTasksVacGet) | **GET** /api/v1/storekeepers/tasks/vac | # Получить задачи не закрепленные за сотрудниками склада.



## apiV1StorekeepersBatchesGet

> [InlineResponse2004] apiV1StorekeepersBatchesGet(opts)

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

[**[InlineResponse2004]**](InlineResponse2004.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1StorekeepersOrdersSetBarcodeAndStatusGuidPatch

> String apiV1StorekeepersOrdersSetBarcodeAndStatusGuidPatch(guid, opts)

# Изменить значение isBarCodeAlreadyAttachedByTheSupplier и status в сущности заказ.

## Изменить значение isBarCodeAlreadyAttachedByTheSupplier и status  в сущности заказ.   

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
let guid = "guid_example"; // String | GUID ордера, который мы хотим изменить
let opts = {
  'Accept_Encoding': gzip, deflate, // String | 
  'InlineObject29': new Amazonapi.InlineObject29() // InlineObject29 | 
};
apiInstance.apiV1StorekeepersOrdersSetBarcodeAndStatusGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| GUID ордера, который мы хотим изменить | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]
 **InlineObject29** | [**InlineObject29**](InlineObject29.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1StorekeepersTasksCancelGuidPost

> String apiV1StorekeepersTasksCancelGuidPost(guid, opts)

# Отметить задачу, как отмененную..

## Отметить задачу, как отмененную.  

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
apiInstance.apiV1StorekeepersTasksCancelGuidPost(guid, opts).then((data) => {
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

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1StorekeepersTasksDoneGuidPost

> String apiV1StorekeepersTasksDoneGuidPost(guid, opts)

# Отметить задачу, как выполненную.

## Отметить задачу, как выполненную.  

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
  'Accept_Encoding': gzip, deflate, // String | 
  'InlineObject27': new Amazonapi.InlineObject27() // InlineObject27 | 
};
apiInstance.apiV1StorekeepersTasksDoneGuidPost(guid, opts).then((data) => {
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
 **InlineObject27** | [**InlineObject27**](InlineObject27.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1StorekeepersTasksGuidPatch

> String apiV1StorekeepersTasksGuidPatch(guid, opts)

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
let opts = {
  'Accept_Encoding': gzip, deflate, // String | 
  'InlineObject28': new Amazonapi.InlineObject28() // InlineObject28 | 
};
apiInstance.apiV1StorekeepersTasksGuidPatch(guid, opts).then((data) => {
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
 **InlineObject28** | [**InlineObject28**](InlineObject28.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1StorekeepersTasksMyGet

> [InlineResponse20010] apiV1StorekeepersTasksMyGet(opts)

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

[**[InlineResponse20010]**](InlineResponse20010.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1StorekeepersTasksPickupGuidPost

> String apiV1StorekeepersTasksPickupGuidPost(guid, opts)

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

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1StorekeepersTasksVacGet

> apiV1StorekeepersTasksVacGet(opts)

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
apiInstance.apiV1StorekeepersTasksVacGet(opts).then(() => {
  console.log('API called successfully.');
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

null (empty response body)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html

