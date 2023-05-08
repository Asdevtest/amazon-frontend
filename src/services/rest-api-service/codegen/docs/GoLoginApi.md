# TestSwagger.GoLoginApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1GologinProfilePost**](GoLoginApi.md#apiV1GologinProfilePost) | **POST** /api/v1/gologin/profile | # Создать новый профайл пользователя.
[**apiV1GologinProfileProfileIdPatch**](GoLoginApi.md#apiV1GologinProfileProfileIdPatch) | **PATCH** /api/v1/gologin/profile/{profileId} | # Изменить профайл пользователя.
[**apiV1GologinProfileStartPost**](GoLoginApi.md#apiV1GologinProfileStartPost) | **POST** /api/v1/gologin/profile/start | # Запустить пользователя.
[**apiV1GologinProfileStopPost**](GoLoginApi.md#apiV1GologinProfileStopPost) | **POST** /api/v1/gologin/profile/stop | # Остановить профайл пользователя.



## apiV1GologinProfilePost

> InlineResponse20044 apiV1GologinProfilePost(opts)

# Создать новый профайл пользователя.

## Создать новый профайл пользователя.  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.GoLoginApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject58() // InlineObject58 | 
};
apiInstance.apiV1GologinProfilePost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject58**](InlineObject58.md)|  | [optional] 

### Return type

[**InlineResponse20044**](InlineResponse20044.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1GologinProfileProfileIdPatch

> String apiV1GologinProfileProfileIdPatch(profileId, opts)

# Изменить профайл пользователя.

## Изменить профайл пользователя.  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.GoLoginApi();
let profileId = "profileId_example"; // String | id профайла который нужно изменить.
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject59() // InlineObject59 | 
};
apiInstance.apiV1GologinProfileProfileIdPatch(profileId, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **profileId** | **String**| id профайла который нужно изменить. | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject59**](InlineObject59.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1GologinProfileStartPost

> InlineResponse2019 apiV1GologinProfileStartPost(opts)

# Запустить пользователя.

## Запустить профайл пользователя.  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.GoLoginApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject60() // InlineObject60 | 
};
apiInstance.apiV1GologinProfileStartPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject60**](InlineObject60.md)|  | [optional] 

### Return type

[**InlineResponse2019**](InlineResponse2019.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1GologinProfileStopPost

> Object apiV1GologinProfileStopPost(opts)

# Остановить профайл пользователя.

## Остановить профайл пользователя.  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.GoLoginApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject61() // InlineObject61 | 
};
apiInstance.apiV1GologinProfileStopPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject61**](InlineObject61.md)|  | [optional] 

### Return type

**Object**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html

