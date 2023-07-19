# TestSwagger.OrderApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1OrdersCheckPendingOrderByProductGuidGet**](OrderApi.md#apiV1OrdersCheckPendingOrderByProductGuidGet) | **GET** /api/v1/orders/check_pending_order_by_product/{guid} | # Проверить, существует ли заказ в статусах 0, 2, 3(formed, pending, readyForBuyout) с данным продуктом
[**apiV1OrdersCommentGuidPatch**](OrderApi.md#apiV1OrdersCommentGuidPatch) | **PATCH** /api/v1/orders/comment/{guid} | # Изменение ордера в статусе pending(2).
[**apiV1OrdersPendingGuidPatch**](OrderApi.md#apiV1OrdersPendingGuidPatch) | **PATCH** /api/v1/orders/pending/{guid} | # Изменение ордера в статусе pending(2).
[**apiV1OrdersReadyToBuyoutGuidPatch**](OrderApi.md#apiV1OrdersReadyToBuyoutGuidPatch) | **PATCH** /api/v1/orders/ready_to_buyout/{guid} | # Перевести ордер со статуса pending(2) в статус readyForBuyout(3)



## apiV1OrdersCheckPendingOrderByProductGuidGet

> [InlineResponse20051] apiV1OrdersCheckPendingOrderByProductGuidGet(guid, opts)

# Проверить, существует ли заказ в статусах 0, 2, 3(formed, pending, readyForBuyout) с данным продуктом

# Проверить, существует ли заказ в статусах 0, 2, 3(formed, pending, readyForBuyout) с данным продуктом

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.OrderApi();
let guid = null; // String | GUID заказа, который планируем изменить
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1OrdersCheckPendingOrderByProductGuidGet(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID заказа, который планируем изменить | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse20051]**](InlineResponse20051.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1OrdersCommentGuidPatch

> String apiV1OrdersCommentGuidPatch(guid, opts)

# Изменение ордера в статусе pending(2).

Изменение ордера в статусе pending(2).

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.OrderApi();
let guid = null; // String | GUID заказа, который планируем изменить
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject71() // InlineObject71 | 
};
apiInstance.apiV1OrdersCommentGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID заказа, который планируем изменить | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject71**](InlineObject71.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1OrdersPendingGuidPatch

> String apiV1OrdersPendingGuidPatch(guid, opts)

# Изменение ордера в статусе pending(2).

Изменение ордера в статусе pending(2).

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.OrderApi();
let guid = null; // String | GUID заказа, который планируем изменить
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject70() // InlineObject70 | 
};
apiInstance.apiV1OrdersPendingGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID заказа, который планируем изменить | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject70**](InlineObject70.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1OrdersReadyToBuyoutGuidPatch

> String apiV1OrdersReadyToBuyoutGuidPatch(guid, opts)

# Перевести ордер со статуса pending(2) в статус readyForBuyout(3)

Перевести ордер со статуса pending(2) в статус readyForBuyout(3), только для баера ордера

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.OrderApi();
let guid = null; // String | GUID заказа, который планируем изменить
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1OrdersReadyToBuyoutGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID заказа, который планируем изменить | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

