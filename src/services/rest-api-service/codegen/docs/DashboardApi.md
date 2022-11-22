# TestSwagger.DashboardApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1DashboardBuyerCountsGet**](DashboardApi.md#apiV1DashboardBuyerCountsGet) | **GET** /api/v1/dashboard/buyer/counts | # Получить количество основных элементов в бд.
[**apiV1DashboardClientCountsGet**](DashboardApi.md#apiV1DashboardClientCountsGet) | **GET** /api/v1/dashboard/client/counts | # Получить количество основных элементов в бд.
[**apiV1DashboardFreelancerCountsGet**](DashboardApi.md#apiV1DashboardFreelancerCountsGet) | **GET** /api/v1/dashboard/freelancer/counts | # Получить количество основных элементов в бд.
[**apiV1DashboardResearcherCountsGet**](DashboardApi.md#apiV1DashboardResearcherCountsGet) | **GET** /api/v1/dashboard/researcher/counts | # Получить количество основных элементов в бд.
[**apiV1DashboardStorekeeperCountsGet**](DashboardApi.md#apiV1DashboardStorekeeperCountsGet) | **GET** /api/v1/dashboard/storekeeper/counts | # Получить количество основных элементов в бд.
[**apiV1DashboardSupervisorCountsGet**](DashboardApi.md#apiV1DashboardSupervisorCountsGet) | **GET** /api/v1/dashboard/supervisor/counts | # Получить количество основных элементов в бд.



## apiV1DashboardBuyerCountsGet

> InlineResponse20025 apiV1DashboardBuyerCountsGet(opts)

# Получить количество основных элементов в бд.

## Получить количество заказов, магазинов, заявок, товаров, партий и коробок.  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.DashboardApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1DashboardBuyerCountsGet(opts).then((data) => {
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

[**InlineResponse20025**](InlineResponse20025.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1DashboardClientCountsGet

> InlineResponse20024 apiV1DashboardClientCountsGet(opts)

# Получить количество основных элементов в бд.

## Получить количество заказов, магазинов, заявок, товаров, партий и коробок.  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.DashboardApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1DashboardClientCountsGet(opts).then((data) => {
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

[**InlineResponse20024**](InlineResponse20024.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1DashboardFreelancerCountsGet

> InlineResponse20028 apiV1DashboardFreelancerCountsGet(opts)

# Получить количество основных элементов в бд.

## Получить количество заказов, магазинов, заявок, товаров, партий и коробок.  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.DashboardApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1DashboardFreelancerCountsGet(opts).then((data) => {
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

[**InlineResponse20028**](InlineResponse20028.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1DashboardResearcherCountsGet

> InlineResponse20027 apiV1DashboardResearcherCountsGet(opts)

# Получить количество основных элементов в бд.

## Получить количество заказов, магазинов, заявок, товаров, партий и коробок.  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.DashboardApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1DashboardResearcherCountsGet(opts).then((data) => {
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

[**InlineResponse20027**](InlineResponse20027.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1DashboardStorekeeperCountsGet

> InlineResponse20026 apiV1DashboardStorekeeperCountsGet(opts)

# Получить количество основных элементов в бд.

## Получить количество заказов, магазинов, заявок, товаров, партий и коробок.  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.DashboardApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1DashboardStorekeeperCountsGet(opts).then((data) => {
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

[**InlineResponse20026**](InlineResponse20026.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1DashboardSupervisorCountsGet

> InlineResponse20029 apiV1DashboardSupervisorCountsGet(opts)

# Получить количество основных элементов в бд.

## Получить количество заказов, магазинов, заявок, товаров, партий и коробок.  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.DashboardApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1DashboardSupervisorCountsGet(opts).then((data) => {
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

[**InlineResponse20029**](InlineResponse20029.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

