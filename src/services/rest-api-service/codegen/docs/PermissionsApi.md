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
[**apiV1PermissionsProductsGet**](PermissionsApi.md#apiV1PermissionsProductsGet) | **GET** /api/v1/permissions/products | Получить список разрешений для продуктов всех сабъюзеров.
[**apiV1PermissionsProductsGuidGet**](PermissionsApi.md#apiV1PermissionsProductsGuidGet) | **GET** /api/v1/permissions/products/{guid} | Получить список разрешений для продуктов юзера по его айди.
[**apiV1PermissionsProductsPatch**](PermissionsApi.md#apiV1PermissionsProductsPatch) | **PATCH** /api/v1/permissions/products | Переписать разрешения для продукта для саба.
[**apiV1PermissionsSetForUserGuidPatch**](PermissionsApi.md#apiV1PermissionsSetForUserGuidPatch) | **PATCH** /api/v1/permissions/set-for-user/{guid} | #   !!! не актуально, нужно использовать  /users/edit_my_sub-users/:guid



## apiV1PermissionsGet

> [PermissionGetDtoSchema] apiV1PermissionsGet(opts)

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

[**[PermissionGetDtoSchema]**](PermissionGetDtoSchema.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1PermissionsGroupsGet

> [PermissionGroupGetDtoSchema] apiV1PermissionsGroupsGet(opts)

Получить список групп permissions.

## Получить список групп permissions.   

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

[**[PermissionGroupGetDtoSchema]**](PermissionGroupGetDtoSchema.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


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
let guid = null; // String | GUID permission в БД
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
 **guid** | [**String**](.md)| GUID permission в БД | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


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
let guid = null; // String | GUID permission в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.PermissionGroupPatchDtoSchema() // PermissionGroupPatchDtoSchema | 
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
 **guid** | [**String**](.md)| GUID permission в БД | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**PermissionGroupPatchDtoSchema**](PermissionGroupPatchDtoSchema.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1PermissionsGroupsPost

> SuccessResponseBodyWithGuid apiV1PermissionsGroupsPost(opts)

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
  'body': new TestSwagger.PermissionGroupPostDtoSchema() // PermissionGroupPostDtoSchema | 
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
 **body** | [**PermissionGroupPostDtoSchema**](PermissionGroupPostDtoSchema.md)|  | [optional] 

### Return type

[**SuccessResponseBodyWithGuid**](SuccessResponseBodyWithGuid.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


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
let guid = null; // String | GUID permission в БД
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
 **guid** | [**String**](.md)| GUID permission в БД | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


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
let guid = null; // String | GUID permission в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.PermissionPatchDtoSchema() // PermissionPatchDtoSchema | 
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
 **guid** | [**String**](.md)| GUID permission в БД | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**PermissionPatchDtoSchema**](PermissionPatchDtoSchema.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1PermissionsPost

> SuccessResponseBodyWithGuid apiV1PermissionsPost(opts)

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
  'body': new TestSwagger.PermissionPostDtoSchema() // PermissionPostDtoSchema | 
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
 **body** | [**PermissionPostDtoSchema**](PermissionPostDtoSchema.md)|  | [optional] 

### Return type

[**SuccessResponseBodyWithGuid**](SuccessResponseBodyWithGuid.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1PermissionsProductsGet

> [InlineResponse20052] apiV1PermissionsProductsGet(opts)

Получить список разрешений для продуктов всех сабъюзеров.

## Получить список разрешений для продуктов всех сабъюзеров.

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
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1PermissionsProductsGet(opts).then((data) => {
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

[**[InlineResponse20052]**](InlineResponse20052.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1PermissionsProductsGuidGet

> [InlineResponse20053] apiV1PermissionsProductsGuidGet(guid, opts)

Получить список разрешений для продуктов юзера по его айди.

## Получить список разрешений для продуктов юзера по его айди.

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
let guid = null; // String | GUID permission в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1PermissionsProductsGuidGet(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID permission в БД | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse20053]**](InlineResponse20053.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1PermissionsProductsPatch

> String apiV1PermissionsProductsPatch(opts)

Переписать разрешения для продукта для саба.

## Переписать разрешения для продукта для саба.

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
  'body': new TestSwagger.InlineObject73() // InlineObject73 | 
};
apiInstance.apiV1PermissionsProductsPatch(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject73**](InlineObject73.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1PermissionsSetForUserGuidPatch

> String apiV1PermissionsSetForUserGuidPatch(guid, opts)

#   !!! не актуально, нужно использовать  /users/edit_my_sub-users/:guid

## !!! не актуально, нужно использовать  /users/edit_my_sub-users/:guid.   

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
let guid = null; // String | GUID permission в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.SetPermissionsForUsersPathDTOSchema() // SetPermissionsForUsersPathDTOSchema | 
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
 **guid** | [**String**](.md)| GUID permission в БД | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**SetPermissionsForUsersPathDTOSchema**](SetPermissionsForUsersPathDTOSchema.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

