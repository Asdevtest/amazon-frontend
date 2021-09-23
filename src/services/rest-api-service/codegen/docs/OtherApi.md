# Amazonapi.OtherApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1OtherImgGuidGet**](OtherApi.md#apiV1OtherImgGuidGet) | **GET** /api/v1/other/img/{guid} | # Получить изображение.
[**apiV1OtherPaymentsByProductGuidGet**](OtherApi.md#apiV1OtherPaymentsByProductGuidGet) | **GET** /api/v1/other/payments/by_product/{guid} | # Получить все оплаты, которые были начислены в связи с продуктом с указанным гуидом.
[**apiV1OtherPaymentsByUserGuidGet**](OtherApi.md#apiV1OtherPaymentsByUserGuidGet) | **GET** /api/v1/other/payments/by_user/{guid} | # Получить все оплаты, которые были начислены пользователю с указанным гуидом.
[**apiV1OtherPaymentsMyGet**](OtherApi.md#apiV1OtherPaymentsMyGet) | **GET** /api/v1/other/payments/my | # Получить все оплаты, которые были начислены обратившемуся пользователю.
[**apiV1OtherUploadFilePost**](OtherApi.md#apiV1OtherUploadFilePost) | **POST** /api/v1/other/upload_file | # Загрузить изображение.



## apiV1OtherImgGuidGet

> apiV1OtherImgGuidGet(guid, opts)

# Получить изображение.

## Получить изображение.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.OtherApi();
let guid = "guid_example"; // String | guid файла
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1OtherImgGuidGet(guid, opts).then(() => {
  console.log('API called successfully.');
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| guid файла | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

null (empty response body)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1OtherPaymentsByProductGuidGet

> [InlineResponse2003] apiV1OtherPaymentsByProductGuidGet(guid, opts)

# Получить все оплаты, которые были начислены в связи с продуктом с указанным гуидом.

## Получить все оплаты, которые были начислены в связи с продуктом с указанным гуидом.  

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.OtherApi();
let guid = "guid_example"; // String | guid пользователя по которому нужны оплаты.
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1OtherPaymentsByProductGuidGet(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| guid пользователя по которому нужны оплаты. | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**[InlineResponse2003]**](InlineResponse2003.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1OtherPaymentsByUserGuidGet

> [InlineResponse2003] apiV1OtherPaymentsByUserGuidGet(guid, opts)

# Получить все оплаты, которые были начислены пользователю с указанным гуидом.

## Получить все оплаты, которые были начислены пользователю с указанным гуидом.  

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.OtherApi();
let guid = "guid_example"; // String | guid пользователя по которому нужны оплаты.
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1OtherPaymentsByUserGuidGet(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| guid пользователя по которому нужны оплаты. | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**[InlineResponse2003]**](InlineResponse2003.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1OtherPaymentsMyGet

> [InlineResponse2003] apiV1OtherPaymentsMyGet(opts)

# Получить все оплаты, которые были начислены обратившемуся пользователю.

## Получить все оплаты, которые были начислены обратившемуся пользователю.  

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.OtherApi();
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1OtherPaymentsMyGet(opts).then((data) => {
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

[**[InlineResponse2003]**](InlineResponse2003.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1OtherUploadFilePost

> InlineResponse2015 apiV1OtherUploadFilePost(opts)

# Загрузить изображение.

## Загрузить изображение.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.OtherApi();
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1OtherUploadFilePost(opts).then((data) => {
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

[**InlineResponse2015**](InlineResponse2015.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html

