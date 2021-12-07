# Amazonapi.UserApi

All URIs are relative to *http://localhost*

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
[**apiV1UsersUserSettingsMyGet**](UserApi.md#apiV1UsersUserSettingsMyGet) | **GET** /api/v1/users/user-settings/my | Получить настройки пользователя.
[**apiV1UsersUserSettingsMyPatch**](UserApi.md#apiV1UsersUserSettingsMyPatch) | **PATCH** /api/v1/users/user-settings/my | #  Изменения пользователем своих настроек.
[**apiV1UsersUserSettingsPost**](UserApi.md#apiV1UsersUserSettingsPost) | **POST** /api/v1/users/user-settings | Создание настроек пользователя.



## apiV1TechClearAllSchemasPost

> String apiV1TechClearAllSchemasPost(opts)

Очистить все коллекции в БД кроме пользователей.

## Очистить все коллекции в БД кроме пользователей..   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.UserApi();
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1UsersInfoGet

> ApiV1AdminsOrdersCreatedBy apiV1UsersInfoGet(opts)

Получить информацию от текущем пользователе.

## Получить информацию от текущем пользователе.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.UserApi();
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**ApiV1AdminsOrdersCreatedBy**](ApiV1AdminsOrdersCreatedBy.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1UsersLinkSubUserPatch

> String apiV1UsersLinkSubUserPatch(InlineObject42, opts)

# Привязка суб пользователя.

## Этот эндпоинт может быть вызван из любой роли кроме админа.  ## По email пользователя которого к себе хочет привязать мастер пользователь.  

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.UserApi();
let InlineObject42 = new Amazonapi.InlineObject42(); // InlineObject42 | 
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1UsersLinkSubUserPatch(InlineObject42, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **InlineObject42** | [**InlineObject42**](InlineObject42.md)|  | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1UsersMePatch

> String apiV1UsersMePatch(InlineObject44, opts)

# Обновления информации о себе самим пользователем.

## Сейчас возможно только редактирование поля role.  ## Можно выбрать роль из массива allowedRoles.  

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.UserApi();
let InlineObject44 = new Amazonapi.InlineObject44(); // InlineObject44 | 
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1UsersMePatch(InlineObject44, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **InlineObject44** | [**InlineObject44**](InlineObject44.md)|  | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1UsersMySubUsersGet

> [InlineResponse2002] apiV1UsersMySubUsersGet(opts)

Получить список сабюзеров мастер пользователя.

## Получить список сабюзеров мастер пользователя.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.UserApi();
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**[InlineResponse2002]**](InlineResponse2002.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1UsersPost

> ApiV1AdminsOrdersCreatedBy apiV1UsersPost(InlineObject40, opts)

Создание нового пользователя. Регистрация.

## Создание нового пользователя. Регистрация.   

### Example

```javascript
import Amazonapi from 'amazonapi';

let apiInstance = new Amazonapi.UserApi();
let InlineObject40 = new Amazonapi.InlineObject40(); // InlineObject40 | 
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1UsersPost(InlineObject40, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **InlineObject40** | [**InlineObject40**](InlineObject40.md)|  | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**ApiV1AdminsOrdersCreatedBy**](ApiV1AdminsOrdersCreatedBy.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1UsersSignInPost

> InlineResponse2016 apiV1UsersSignInPost(InlineObject41, opts)

# Получение токена авторизации.

## Получение токена авторизации.   ## Время жизни токена 96 часов   

### Example

```javascript
import Amazonapi from 'amazonapi';

let apiInstance = new Amazonapi.UserApi();
let InlineObject41 = new Amazonapi.InlineObject41(); // InlineObject41 | 
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1UsersSignInPost(InlineObject41, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **InlineObject41** | [**InlineObject41**](InlineObject41.md)|  | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**InlineResponse2016**](InlineResponse2016.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1UsersUnlinkSubUserPatch

> String apiV1UsersUnlinkSubUserPatch(InlineObject43, opts)

# Отвязка суб пользователя.

## Этот эндпоинт может быть вызван из любой роли кроме админа.  ## По email пользователя которого хочет отвязать мастер пользователь.  

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.UserApi();
let InlineObject43 = new Amazonapi.InlineObject43(); // InlineObject43 | 
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1UsersUnlinkSubUserPatch(InlineObject43, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **InlineObject43** | [**InlineObject43**](InlineObject43.md)|  | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1UsersUserSettingsMyGet

> InlineResponse20013 apiV1UsersUserSettingsMyGet(opts)

Получить настройки пользователя.

## Получить настройки пользователем.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.UserApi();
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**InlineResponse20013**](InlineResponse20013.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1UsersUserSettingsMyPatch

> String apiV1UsersUserSettingsMyPatch(guid, InlineObject46, opts)

#  Изменения пользователем своих настроек.

## Изменения пользователем своих настроек.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.UserApi();
let guid = "guid_example"; // String | GUID permission в БД
let InlineObject46 = new Amazonapi.InlineObject46(); // InlineObject46 | 
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1UsersUserSettingsMyPatch(guid, InlineObject46, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| GUID permission в БД | 
 **InlineObject46** | [**InlineObject46**](InlineObject46.md)|  | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1UsersUserSettingsPost

> InlineResponse2015 apiV1UsersUserSettingsPost(InlineObject45, opts)

Создание настроек пользователя.

## Создание настроек пользователя.   ## У одного пользователя может быть только одна таблица настроек.

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.UserApi();
let InlineObject45 = new Amazonapi.InlineObject45(); // InlineObject45 | 
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1UsersUserSettingsPost(InlineObject45, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **InlineObject45** | [**InlineObject45**](InlineObject45.md)|  | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**InlineResponse2015**](InlineResponse2015.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html

