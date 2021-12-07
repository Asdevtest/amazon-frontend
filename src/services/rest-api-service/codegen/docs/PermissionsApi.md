# Amazonapi.PermissionsApi

All URIs are relative to *http://localhost*

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
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.PermissionsApi();
let opts = {
  'role': 3.4, // Number | Если указать role - отфильтрует, нет - выведет все.
  'Accept_Encoding': gzip, deflate // String | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

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
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.PermissionsApi();
let opts = {
  'role': 3.4, // Number | Если указать role - отфильтрует, нет - выведет все.
  'Accept_Encoding': gzip, deflate // String | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

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
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.PermissionsApi();
let guid = "guid_example"; // String | GUID в сущности в БД
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

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
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.PermissionsApi();
let guid = "guid_example"; // String | GUID permission БД
let opts = {
  'Accept_Encoding': gzip, deflate, // String | 
  'InlineObject25': new Amazonapi.InlineObject25() // InlineObject25 | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]
 **InlineObject25** | [**InlineObject25**](InlineObject25.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1PermissionsGroupsPost

> InlineResponse2015 apiV1PermissionsGroupsPost(InlineObject24, opts)

# Создать группу permission.

## Создать группу permission.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.PermissionsApi();
let InlineObject24 = new Amazonapi.InlineObject24(); // InlineObject24 | 
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1PermissionsGroupsPost(InlineObject24, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **InlineObject24** | [**InlineObject24**](InlineObject24.md)|  | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**InlineResponse2015**](InlineResponse2015.md)

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
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.PermissionsApi();
let guid = "guid_example"; // String | GUID в сущности в БД
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

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
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.PermissionsApi();
let guid = "guid_example"; // String | GUID permission в БД
let opts = {
  'Accept_Encoding': gzip, deflate, // String | 
  'InlineObject23': new Amazonapi.InlineObject23() // InlineObject23 | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]
 **InlineObject23** | [**InlineObject23**](InlineObject23.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1PermissionsPost

> InlineResponse2015 apiV1PermissionsPost(InlineObject22, opts)

# Создать permission.

## Создать permission.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.PermissionsApi();
let InlineObject22 = new Amazonapi.InlineObject22(); // InlineObject22 | 
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1PermissionsPost(InlineObject22, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **InlineObject22** | [**InlineObject22**](InlineObject22.md)|  | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**InlineResponse2015**](InlineResponse2015.md)

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
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.PermissionsApi();
let guid = "guid_example"; // String | GUID суб пользователя в БД.
let opts = {
  'Accept_Encoding': gzip, deflate, // String | 
  'InlineObject26': new Amazonapi.InlineObject26() // InlineObject26 | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]
 **InlineObject26** | [**InlineObject26**](InlineObject26.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html

