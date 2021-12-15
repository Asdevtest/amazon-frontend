# TestSwagger.PermissionsApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1PermissionsGet**](PermissionsApi.md#apiV1PermissionsGet) | **GET** /api/v1/permissions/ | Получить список permissions.
[**apiV1PermissionsGroupsGet**](PermissionsApi.md#apiV1PermissionsGroupsGet) | **GET** /api/v1/permissions/groups | Получить список групп permissions.
[**apiV1PermissionsGroupsGuidDelete**](PermissionsApi.md#apiV1PermissionsGroupsGuidDelete) | **DELETE** /api/v1/permissions/groups/{guid} | # Удалить группу permission по его GUID.
[**apiV1PermissionsGroupsGuidPatch**](PermissionsApi.md#apiV1PermissionsGroupsGuidPatch) | **PATCH** /api/v1/permissions/groups/{guid} | #  Изменить группу permission.
[**apiV1PermissionsGroupsPost**](PermissionsApi.md#apiV1PermissionsGroupsPost) | **POST** /api/v1/permissions/groups | # Создать группу permission.
[**apiV1PermissionsGuidDelete**](PermissionsApi.md#apiV1PermissionsGuidDelete) | **DELETE** /api/v1/permissions/{guid} | # Удалить permission по его GUID.
[**apiV1PermissionsGuidPatch**](PermissionsApi.md#apiV1PermissionsGuidPatch) | **PATCH** /api/v1/permissions/{guid} | #  Изменить permission.
[**apiV1PermissionsPost**](PermissionsApi.md#apiV1PermissionsPost) | **POST** /api/v1/permissions/ | # Создать permission.
[**apiV1PermissionsSetForUserGuidPatch**](PermissionsApi.md#apiV1PermissionsSetForUserGuidPatch) | **PATCH** /api/v1/permissions/set-for-user/{guid} | #   Мастер пользователь задает пермишены своим суб пользователям.



## apiV1PermissionsGet

> [ApiV1AdminsUsersPermissions] apiV1PermissionsGet(opts)

Получить список permissions.

## Получить список permission-ы. Админ может запращивать по всем ролям.  ## Обычный пользователь может получить только permission-ы из его роли.

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.PermissionsApi();
let opts = {
  'role': 3.4, // Number | Если указать role - отфильтрует, нет - выведет все.
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1PermissionsGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **role** | **Number**| Если указать role - отфильтрует, нет - выведет все. | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[ApiV1AdminsUsersPermissions]**](ApiV1AdminsUsersPermissions.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1PermissionsGroupsGet

> [ApiV1AdminsUsersPermissionGroups] apiV1PermissionsGroupsGet(opts)

Получить список групп permissions.

Получить список групп permissions.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.PermissionsApi();
let opts = {
  'role': 3.4, // Number | Если указать role - отфильтрует, нет - выведет все.
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1PermissionsGroupsGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **role** | **Number**| Если указать role - отфильтрует, нет - выведет все. | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[ApiV1AdminsUsersPermissionGroups]**](ApiV1AdminsUsersPermissionGroups.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1PermissionsGroupsGuidDelete

> String apiV1PermissionsGroupsGuidDelete(guid, opts)

# Удалить группу permission по его GUID.

## Удалить группу permission по его GUID.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.PermissionsApi();
let guid = "guid_example"; // String | GUID в сущности в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1PermissionsGroupsGuidDelete(guid, opts).then((data) => {
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
- **Accept**: text/html


## apiV1PermissionsGroupsGuidPatch

> String apiV1PermissionsGroupsGuidPatch(guid, opts)

#  Изменить группу permission.

## Изменить группу permission.   ## Нельзя изменять поле key и role.   ## При изменении массива permission-ов, старый массив затирается

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.PermissionsApi();
let guid = "guid_example"; // String | GUID permission БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject27() // InlineObject27 | 
};
apiInstance.apiV1PermissionsGroupsGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| GUID permission БД | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject27**](InlineObject27.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1PermissionsGroupsPost

> InlineResponse2016 apiV1PermissionsGroupsPost(opts)

# Создать группу permission.

## Создать группу permission.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.PermissionsApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject26() // InlineObject26 | 
};
apiInstance.apiV1PermissionsGroupsPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject26**](InlineObject26.md)|  | [optional] 

### Return type

[**InlineResponse2016**](InlineResponse2016.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1PermissionsGuidDelete

> String apiV1PermissionsGuidDelete(guid, opts)

# Удалить permission по его GUID.

## Удалить permission по его GUID.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.PermissionsApi();
let guid = "guid_example"; // String | GUID в сущности в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1PermissionsGuidDelete(guid, opts).then((data) => {
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
- **Accept**: text/html


## apiV1PermissionsGuidPatch

> String apiV1PermissionsGuidPatch(guid, opts)

#  Изменить permission.

## Изменить permission.   ## Нельзя менять поле key.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.PermissionsApi();
let guid = "guid_example"; // String | GUID permission в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject25() // InlineObject25 | 
};
apiInstance.apiV1PermissionsGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| GUID permission в БД | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject25**](InlineObject25.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1PermissionsPost

> InlineResponse2016 apiV1PermissionsPost(opts)

# Создать permission.

## Создать permission.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.PermissionsApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject24() // InlineObject24 | 
};
apiInstance.apiV1PermissionsPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject24**](InlineObject24.md)|  | [optional] 

### Return type

[**InlineResponse2016**](InlineResponse2016.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1PermissionsSetForUserGuidPatch

> String apiV1PermissionsSetForUserGuidPatch(guid, opts)

#   Мастер пользователь задает пермишены своим суб пользователям.

## Мастер пользователь задает пермишены своим суб пользователям.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.PermissionsApi();
let guid = "guid_example"; // String | GUID суб пользователя в БД.
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject28() // InlineObject28 | 
};
apiInstance.apiV1PermissionsSetForUserGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| GUID суб пользователя в БД. | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject28**](InlineObject28.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html

