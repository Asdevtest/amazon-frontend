# TestSwagger.UserApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1TechClearAllSchemasPost**](UserApi.md#apiV1TechClearAllSchemasPost) | **POST** /api/v1/tech/clear_all_schemas | Очистить все коллекции в БД кроме пользователей.
[**apiV1UsersInfoGet**](UserApi.md#apiV1UsersInfoGet) | **GET** /api/v1/users/info | Получить информацию от текущем пользователе.
[**apiV1UsersLinkSubUserPatch**](UserApi.md#apiV1UsersLinkSubUserPatch) | **PATCH** /api/v1/users/link_sub-user | # Привязка суб пользователя.
[**apiV1UsersMePatch**](UserApi.md#apiV1UsersMePatch) | **PATCH** /api/v1/users/me | # Обновления информации о себе самим пользователем.
[**apiV1UsersMySubUsersGet**](UserApi.md#apiV1UsersMySubUsersGet) | **GET** /api/v1/users/my_sub-users | Получить список сабюзеров мастер пользователя.
[**apiV1UsersPost**](UserApi.md#apiV1UsersPost) | **POST** /api/v1/users/ | Создание нового пользователя. Регистрация.
[**apiV1UsersSignInPost**](UserApi.md#apiV1UsersSignInPost) | **POST** /api/v1/users/sign_in | # Получение токена авторизации.
[**apiV1UsersUnlinkSubUserPatch**](UserApi.md#apiV1UsersUnlinkSubUserPatch) | **PATCH** /api/v1/users/unlink_sub-user | # Отвязка суб пользователя.
[**apiV1UsersUserSettingsAvailableGet**](UserApi.md#apiV1UsersUserSettingsAvailableGet) | **GET** /api/v1/users/user-settings/available | Выдача массива доступных настроек пользователя.
[**apiV1UsersUserSettingsMyGet**](UserApi.md#apiV1UsersUserSettingsMyGet) | **GET** /api/v1/users/user-settings/my | Получить настройки пользователя.
[**apiV1UsersUserSettingsMyPatch**](UserApi.md#apiV1UsersUserSettingsMyPatch) | **PATCH** /api/v1/users/user-settings/my | #  Изменения пользователем своих настроек.
[**apiV1UsersUserSettingsPost**](UserApi.md#apiV1UsersUserSettingsPost) | **POST** /api/v1/users/user-settings | Создание настроек пользователя.



## apiV1TechClearAllSchemasPost

> String apiV1TechClearAllSchemasPost(opts)

Очистить все коллекции в БД кроме пользователей.

## Очистить все коллекции в БД кроме пользователей..   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.UserApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1TechClearAllSchemasPost(opts).then((data) => {
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

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1UsersInfoGet

> UserFullSchema apiV1UsersInfoGet(opts)

Получить информацию от текущем пользователе.

## Получить информацию от текущем пользователе.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.UserApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1UsersInfoGet(opts).then((data) => {
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

[**UserFullSchema**](UserFullSchema.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1UsersLinkSubUserPatch

> String apiV1UsersLinkSubUserPatch(opts)

# Привязка суб пользователя.

## Этот эндпоинт может быть вызван из любой роли кроме админа.  ## По email пользователя которого к себе хочет привязать мастер пользователь.  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.UserApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.LinkSubuserInputSchema() // LinkSubuserInputSchema | 
};
apiInstance.apiV1UsersLinkSubUserPatch(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**LinkSubuserInputSchema**](LinkSubuserInputSchema.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1UsersMePatch

> String apiV1UsersMePatch(opts)

# Обновления информации о себе самим пользователем.

## Сейчас возможно только редактирование поля role.  ## Можно выбрать роль из массива allowedRoles.  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.UserApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.MePatchInputSchema() // MePatchInputSchema | 
};
apiInstance.apiV1UsersMePatch(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**MePatchInputSchema**](MePatchInputSchema.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1UsersMySubUsersGet

> [UserFullSchema] apiV1UsersMySubUsersGet(opts)

Получить список сабюзеров мастер пользователя.

## Получить список сабюзеров мастер пользователя.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.UserApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1UsersMySubUsersGet(opts).then((data) => {
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

[**[UserFullSchema]**](UserFullSchema.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1UsersPost

> UserFullSchema apiV1UsersPost(opts)

Создание нового пользователя. Регистрация.

## Создание нового пользователя. Регистрация.   

### Example

```javascript
import TestSwagger from 'test_swagger';

let apiInstance = new TestSwagger.UserApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.UserRegisterSchema() // UserRegisterSchema | 
};
apiInstance.apiV1UsersPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**UserRegisterSchema**](UserRegisterSchema.md)|  | [optional] 

### Return type

[**UserFullSchema**](UserFullSchema.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1UsersSignInPost

> SignInResponseSchema apiV1UsersSignInPost(opts)

# Получение токена авторизации.

## Получение токена авторизации.   ## Время жизни токена 96 часов   

### Example

```javascript
import TestSwagger from 'test_swagger';

let apiInstance = new TestSwagger.UserApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.SigninInputSchema() // SigninInputSchema | 
};
apiInstance.apiV1UsersSignInPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**SigninInputSchema**](SigninInputSchema.md)|  | [optional] 

### Return type

[**SignInResponseSchema**](SignInResponseSchema.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1UsersUnlinkSubUserPatch

> String apiV1UsersUnlinkSubUserPatch(opts)

# Отвязка суб пользователя.

## Этот эндпоинт может быть вызван из любой роли кроме админа.  ## По email пользователя которого хочет отвязать мастер пользователь.  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.UserApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.LinkSubuserInputSchema() // LinkSubuserInputSchema | 
};
apiInstance.apiV1UsersUnlinkSubUserPatch(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**LinkSubuserInputSchema**](LinkSubuserInputSchema.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1UsersUserSettingsAvailableGet

> [Object] apiV1UsersUserSettingsAvailableGet(opts)

Выдача массива доступных настроек пользователя.

## Выдача массива доступных настроек пользователя..   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.UserApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1UsersUserSettingsAvailableGet(opts).then((data) => {
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

**[Object]**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1UsersUserSettingsMyGet

> UserSettingResponseSchema apiV1UsersUserSettingsMyGet(opts)

Получить настройки пользователя.

## Получить настройки пользователем.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.UserApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1UsersUserSettingsMyGet(opts).then((data) => {
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

[**UserSettingResponseSchema**](UserSettingResponseSchema.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1UsersUserSettingsMyPatch

> String apiV1UsersUserSettingsMyPatch(guid, opts)

#  Изменения пользователем своих настроек.

## Изменения пользователем своих настроек.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.UserApi();
let guid = "guid_example"; // String | GUID permission в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.UserSettingPatchSchema() // UserSettingPatchSchema | 
};
apiInstance.apiV1UsersUserSettingsMyPatch(guid, opts).then((data) => {
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
 **body** | [**UserSettingPatchSchema**](UserSettingPatchSchema.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1UsersUserSettingsPost

> UserSettingPostResponseSchema apiV1UsersUserSettingsPost(opts)

Создание настроек пользователя.

## Создание настроек пользователя.   ## У одного пользователя может быть только одна таблица настроек.

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.UserApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.UserSettingInputSchema() // UserSettingInputSchema | 
};
apiInstance.apiV1UsersUserSettingsPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**UserSettingInputSchema**](UserSettingInputSchema.md)|  | [optional] 

### Return type

[**UserSettingPostResponseSchema**](UserSettingPostResponseSchema.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html

