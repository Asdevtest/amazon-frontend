# TestSwagger.AnnouncementsApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1AnnouncementsGuidArchivePatch**](AnnouncementsApi.md#apiV1AnnouncementsGuidArchivePatch) | **PATCH** /api/v1/announcements/{guid}/archive | # Изменить статус архива в анонс
[**apiV1AnnouncementsGuidDelete**](AnnouncementsApi.md#apiV1AnnouncementsGuidDelete) | **DELETE** /api/v1/announcements/{guid} | # Удалить анонс по гуиду
[**apiV1AnnouncementsGuidGet**](AnnouncementsApi.md#apiV1AnnouncementsGuidGet) | **GET** /api/v1/announcements/{guid} | # Получить анонс по гуиду
[**apiV1AnnouncementsGuidPatch**](AnnouncementsApi.md#apiV1AnnouncementsGuidPatch) | **PATCH** /api/v1/announcements/{guid} | # Изменить анонс
[**apiV1AnnouncementsMyGet**](AnnouncementsApi.md#apiV1AnnouncementsMyGet) | **GET** /api/v1/announcements/my | # Получить свои анонсы
[**apiV1AnnouncementsPost**](AnnouncementsApi.md#apiV1AnnouncementsPost) | **POST** /api/v1/announcements/ | # Создать анонс
[**apiV1AnnouncementsVacGet**](AnnouncementsApi.md#apiV1AnnouncementsVacGet) | **GET** /api/v1/announcements/vac | # Получить не свои анонсы



## apiV1AnnouncementsGuidArchivePatch

> String apiV1AnnouncementsGuidArchivePatch(guid, opts)

# Изменить статус архива в анонс

## Изменить статус архива в анонс

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.AnnouncementsApi();
let guid = null; // String | Гуид анонса
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject37() // InlineObject37 | 
};
apiInstance.apiV1AnnouncementsGuidArchivePatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| Гуид анонса | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject37**](InlineObject37.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1AnnouncementsGuidDelete

> String apiV1AnnouncementsGuidDelete(guid, opts)

# Удалить анонс по гуиду

## Удалить анонс по гуиду

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.AnnouncementsApi();
let guid = null; // String | Гуид анонса
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1AnnouncementsGuidDelete(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| Гуид анонса | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1AnnouncementsGuidGet

> {String: Object} apiV1AnnouncementsGuidGet(guid, opts)

# Получить анонс по гуиду

## Получить анонс по гуиду

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.AnnouncementsApi();
let guid = null; // String | Гуид анонса
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1AnnouncementsGuidGet(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| Гуид анонса | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**{String: Object}**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1AnnouncementsGuidPatch

> String apiV1AnnouncementsGuidPatch(guid, opts)

# Изменить анонс

## Изменить анонс

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.AnnouncementsApi();
let guid = null; // String | Гуид анонса
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject36() // InlineObject36 | 
};
apiInstance.apiV1AnnouncementsGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| Гуид анонса | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject36**](InlineObject36.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1AnnouncementsMyGet

> [InlineResponse20024] apiV1AnnouncementsMyGet(opts)

# Получить свои анонсы

## Получить свои анонсы

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.AnnouncementsApi();
let opts = {
  'type': "type_example", // String | 
  'archive': true, // Boolean | 
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1AnnouncementsMyGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **type** | **String**|  | [optional] 
 **archive** | **Boolean**|  | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse20024]**](InlineResponse20024.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1AnnouncementsPost

> InlineResponse2014 apiV1AnnouncementsPost(opts)

# Создать анонс

## Создать анонс

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.AnnouncementsApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject35() // InlineObject35 | 
};
apiInstance.apiV1AnnouncementsPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject35**](InlineObject35.md)|  | [optional] 

### Return type

[**InlineResponse2014**](InlineResponse2014.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1AnnouncementsVacGet

> [InlineResponse20024] apiV1AnnouncementsVacGet(opts)

# Получить не свои анонсы

## Получить не свои анонсы

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.AnnouncementsApi();
let opts = {
  'type': "type_example", // String | 
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1AnnouncementsVacGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **type** | **String**|  | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse20024]**](InlineResponse20024.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

