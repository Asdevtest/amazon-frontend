# TestSwagger.RequestProposalsApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1RequestProposalsCustomGuidDelete**](RequestProposalsApi.md#apiV1RequestProposalsCustomGuidDelete) | **DELETE** /api/v1/request-proposals/custom/{guid} | # Удалить предложение к кастомной заявки по его GUID.
[**apiV1RequestProposalsCustomGuidGet**](RequestProposalsApi.md#apiV1RequestProposalsCustomGuidGet) | **GET** /api/v1/request-proposals/custom/{guid} | Получить предложение по его id.
[**apiV1RequestProposalsCustomGuidPatch**](RequestProposalsApi.md#apiV1RequestProposalsCustomGuidPatch) | **PATCH** /api/v1/request-proposals/custom/{guid} | #  Изменить предложение к заявке.
[**apiV1RequestProposalsCustomPost**](RequestProposalsApi.md#apiV1RequestProposalsCustomPost) | **POST** /api/v1/request-proposals/custom/ | # Создать предложение к кастомной заявке.



## apiV1RequestProposalsCustomGuidDelete

> String apiV1RequestProposalsCustomGuidDelete(guid, opts)

# Удалить предложение к кастомной заявки по его GUID.

## Удалить предложение к кастомной заявки по его GUID   Если заявка принята, то удаление запрещено. Только владелец, админ или супервайзер могут удалять заявку  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.RequestProposalsApi();
let guid = "guid_example"; // String | GUID в сущности в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1RequestProposalsCustomGuidDelete(guid, opts).then((data) => {
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

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1RequestProposalsCustomGuidGet

> {String: Object} apiV1RequestProposalsCustomGuidGet(guid, opts)

Получить предложение по его id.

## Получить предложение по его id.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.RequestProposalsApi();
let guid = "guid_example"; // String | GUID в сущности в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1RequestProposalsCustomGuidGet(guid, opts).then((data) => {
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

### Return type

**{String: Object}**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1RequestProposalsCustomGuidPatch

> String apiV1RequestProposalsCustomGuidPatch(guid, opts)

#  Изменить предложение к заявке.

## Изменить предложение к заявке.   Если заявка принята, то редактирование запрещено. Только владелец, админ или супервайзер могут редактировать  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.RequestProposalsApi();
let guid = "guid_example"; // String | GUID в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject38() // InlineObject38 | 
};
apiInstance.apiV1RequestProposalsCustomGuidPatch(guid, opts).then((data) => {
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
 **body** | [**InlineObject38**](InlineObject38.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1RequestProposalsCustomPost

> InlineResponse2016 apiV1RequestProposalsCustomPost(opts)

# Создать предложение к кастомной заявке.

## Создать предложение к кастомной заявке.   Проверки: на наличие заявки, статус заявки и нет ли среди бронировавших id пользователя. 

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.RequestProposalsApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject37() // InlineObject37 | 
};
apiInstance.apiV1RequestProposalsCustomPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject37**](InlineObject37.md)|  | [optional] 

### Return type

[**InlineResponse2016**](InlineResponse2016.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

