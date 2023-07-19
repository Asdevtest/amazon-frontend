# TestSwagger.UserApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1UsersChangeForgottenPasswordPost**](UserApi.md#apiV1UsersChangeForgottenPasswordPost) | **POST** /api/v1/users/change_forgotten_password | Поменять пароль, если его забыли
[**apiV1UsersChangePasswordPatch**](UserApi.md#apiV1UsersChangePasswordPatch) | **PATCH** /api/v1/users/change_password | Сменить пароль
[**apiV1UsersCheckIsUniqueNameOrEmailPost**](UserApi.md#apiV1UsersCheckIsUniqueNameOrEmailPost) | **POST** /api/v1/users/check_isUnique_name_or_email | Выдача массива объектов с ответом является ли уникальным name и/или email.
[**apiV1UsersContactsGet**](UserApi.md#apiV1UsersContactsGet) | **GET** /api/v1/users/contacts | Выдача массива перечень всех контактов пользователя.
[**apiV1UsersEditMySubUsersGuidPatch**](UserApi.md#apiV1UsersEditMySubUsersGuidPatch) | **PATCH** /api/v1/users/edit_my_sub-users/{guid} | Редактирование сабюзера мастер юзером.
[**apiV1UsersFeedbackGuidDelete**](UserApi.md#apiV1UsersFeedbackGuidDelete) | **DELETE** /api/v1/users/feedback/{guid} | Удалить отзыв
[**apiV1UsersFeedbackGuidGet**](UserApi.md#apiV1UsersFeedbackGuidGet) | **GET** /api/v1/users/feedback/{guid} | Получить отзывы оставленые юзеру по его гуиду
[**apiV1UsersFeedbackGuidPatch**](UserApi.md#apiV1UsersFeedbackGuidPatch) | **PATCH** /api/v1/users/feedback/{guid} | Изменить отзыв
[**apiV1UsersFeedbackGuidPost**](UserApi.md#apiV1UsersFeedbackGuidPost) | **POST** /api/v1/users/feedback/{guid} | Оставить юзеру отзыв
[**apiV1UsersFeedbackMyGet**](UserApi.md#apiV1UsersFeedbackMyGet) | **GET** /api/v1/users/feedback/my | Получить отзывы оставленые юзеру
[**apiV1UsersForgotPasswordPost**](UserApi.md#apiV1UsersForgotPasswordPost) | **POST** /api/v1/users/forgot_password | Запросить смену пароля
[**apiV1UsersInfoGet**](UserApi.md#apiV1UsersInfoGet) | **GET** /api/v1/users/info | Получить информацию от текущем пользователе.
[**apiV1UsersInfoGuidGet**](UserApi.md#apiV1UsersInfoGuidGet) | **GET** /api/v1/users/info/{guid} | Получить информацию от текущем пользователе.
[**apiV1UsersLinkSubUserPatch**](UserApi.md#apiV1UsersLinkSubUserPatch) | **PATCH** /api/v1/users/link_sub-user | # Привязка субпользователя.
[**apiV1UsersMePatch**](UserApi.md#apiV1UsersMePatch) | **PATCH** /api/v1/users/me | # Обновления информации о себе самим пользователем.
[**apiV1UsersMySubUsersGet**](UserApi.md#apiV1UsersMySubUsersGet) | **GET** /api/v1/users/my_sub-users | Получить список сабюзеров мастер пользователя.
[**apiV1UsersPlatformSettingsGet**](UserApi.md#apiV1UsersPlatformSettingsGet) | **GET** /api/v1/users/platform_settings | Выдача настроек сервера.
[**apiV1UsersPost**](UserApi.md#apiV1UsersPost) | **POST** /api/v1/users/ | Создание нового пользователя. Регистрация.
[**apiV1UsersSignInPost**](UserApi.md#apiV1UsersSignInPost) | **POST** /api/v1/users/sign_in | # Получение токена авторизации.
[**apiV1UsersSubNotePatch**](UserApi.md#apiV1UsersSubNotePatch) | **PATCH** /api/v1/users/sub_note | Создание/изменение subNote
[**apiV1UsersUnlinkSubUserPatch**](UserApi.md#apiV1UsersUnlinkSubUserPatch) | **PATCH** /api/v1/users/unlink_sub-user | # Отвязка суб пользователя.
[**apiV1UsersUserSettingsAvailableGet**](UserApi.md#apiV1UsersUserSettingsAvailableGet) | **GET** /api/v1/users/user-settings/available | Deprecated! Выдача массива доступных настроек пользователя.



## apiV1UsersChangeForgottenPasswordPost

> String apiV1UsersChangeForgottenPasswordPost(opts)

Поменять пароль, если его забыли

## Поменять пароль, если его забыли

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
  'body': new TestSwagger.InlineObject126() // InlineObject126 | 
};
apiInstance.apiV1UsersChangeForgottenPasswordPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject126**](InlineObject126.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1UsersChangePasswordPatch

> String apiV1UsersChangePasswordPatch(opts)

Сменить пароль

## Сменить пароль

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
  'body': new TestSwagger.InlineObject124() // InlineObject124 | 
};
apiInstance.apiV1UsersChangePasswordPatch(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject124**](InlineObject124.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1UsersCheckIsUniqueNameOrEmailPost

> CheckIsUniqueNameOrEmailReqSchema apiV1UsersCheckIsUniqueNameOrEmailPost(opts)

Выдача массива объектов с ответом является ли уникальным name и/или email.

## Выдача массива объектов с ответом является ли уникальным name и/или email.   Нужно использовать данный эдпонт перед создание или редактирования пользователя.    В противном случае получит ошибку записи в базу, если уже есть пользователь с таким name или email.

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
  'body': new TestSwagger.CheckIsUniqueNameOrEmailSchema() // CheckIsUniqueNameOrEmailSchema | 
};
apiInstance.apiV1UsersCheckIsUniqueNameOrEmailPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**CheckIsUniqueNameOrEmailSchema**](CheckIsUniqueNameOrEmailSchema.md)|  | [optional] 

### Return type

[**CheckIsUniqueNameOrEmailReqSchema**](CheckIsUniqueNameOrEmailReqSchema.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1UsersContactsGet

> [InlineResponse20076] apiV1UsersContactsGet(opts)

Выдача массива перечень всех контактов пользователя.

## Выдача массива перечень всех контактов пользователя.   

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
apiInstance.apiV1UsersContactsGet(opts).then((data) => {
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

[**[InlineResponse20076]**](InlineResponse20076.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1UsersEditMySubUsersGuidPatch

> String apiV1UsersEditMySubUsersGuidPatch(guid, opts)

Редактирование сабюзера мастер юзером.

##  Редактирование сабюзера мастер юзером.  Только мастер пользователь может редактировать Запрешено редактировать мастер юзера Мастер может редактировать только своих сабов Пермишены должны принадлежать роли сабюзера

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
let guid = null; // String | GUID в БД.
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.SubUserPatchDtoSchema() // SubUserPatchDtoSchema | 
};
apiInstance.apiV1UsersEditMySubUsersGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID в БД. | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**SubUserPatchDtoSchema**](SubUserPatchDtoSchema.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1UsersFeedbackGuidDelete

> String apiV1UsersFeedbackGuidDelete(guid, opts)

Удалить отзыв

## Удалить отзыв

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
let guid = null; // String | 
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1UsersFeedbackGuidDelete(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)|  | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1UsersFeedbackGuidGet

> [InlineResponse20077] apiV1UsersFeedbackGuidGet(guid, opts)

Получить отзывы оставленые юзеру по его гуиду

## Получить отзывы оставленые юзеру по его гуиду

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
let guid = null; // String | 
let opts = {
  'role': 56, // Number | Фиьлтр по роли создателя отзыва на момент создания
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1UsersFeedbackGuidGet(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)|  | 
 **role** | **Number**| Фиьлтр по роли создателя отзыва на момент создания | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse20077]**](InlineResponse20077.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1UsersFeedbackGuidPatch

> String apiV1UsersFeedbackGuidPatch(guid, opts)

Изменить отзыв

## Изменить отзыв

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
let guid = null; // String | 
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject128() // InlineObject128 | 
};
apiInstance.apiV1UsersFeedbackGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)|  | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject128**](InlineObject128.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1UsersFeedbackGuidPost

> InlineResponse20112 apiV1UsersFeedbackGuidPost(guid, opts)

Оставить юзеру отзыв

## Оставить юзеру отзыв

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
let guid = null; // String | 
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject127() // InlineObject127 | 
};
apiInstance.apiV1UsersFeedbackGuidPost(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)|  | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject127**](InlineObject127.md)|  | [optional] 

### Return type

[**InlineResponse20112**](InlineResponse20112.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1UsersFeedbackMyGet

> [InlineResponse20077] apiV1UsersFeedbackMyGet(opts)

Получить отзывы оставленые юзеру

## Получить отзывы оставленые юзеру

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
  'role': 56, // Number | Фиьлтр по роли создателя отзыва на момент создания
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1UsersFeedbackMyGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **role** | **Number**| Фиьлтр по роли создателя отзыва на момент создания | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse20077]**](InlineResponse20077.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1UsersForgotPasswordPost

> String apiV1UsersForgotPasswordPost(opts)

Запросить смену пароля

## Запросить смену пароля

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
  'body': new TestSwagger.InlineObject125() // InlineObject125 | 
};
apiInstance.apiV1UsersForgotPasswordPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject125**](InlineObject125.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1UsersInfoGet

> UserInfoSchema apiV1UsersInfoGet(opts)

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

[**UserInfoSchema**](UserInfoSchema.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1UsersInfoGuidGet

> UserInfoSchema apiV1UsersInfoGuidGet(guid, opts)

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
let guid = null; // String | 
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1UsersInfoGuidGet(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)|  | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**UserInfoSchema**](UserInfoSchema.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1UsersLinkSubUserPatch

> String apiV1UsersLinkSubUserPatch(opts)

# Привязка субпользователя.

## Этот эндпоинт может быть вызван из любой роли кроме админа.  По email пользователя которого к себе хочет привязать мастер пользователь.  Проверки: у админа не может быть сабюзера, сабюзер не может иметь сабюзера,  Может ли данный пользователь быть мастер юзером, такую возможность дает только администратор. только кандидата можно привязать к качестве субпользователя

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
- **Accept**: application/json


## apiV1UsersMePatch

> String apiV1UsersMePatch(opts)

# Обновления информации о себе самим пользователем.

## Сейчас возможно только редактирование поля role.  ## Можно выбрать роль из массива allowedRoles.  При редактировании полей name email необходимо проверить на уникальность.  // POST /users/check_isUnique_name_or_email Проверки: Данный метод не доступен для сабюзера и админа   новое имя или почта должна быть уникальной.

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
- **Accept**: application/json


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
- **Accept**: application/json


## apiV1UsersPlatformSettingsGet

> InlineResponse20075 apiV1UsersPlatformSettingsGet(opts)

Выдача настроек сервера.

## Выдача настроек сервера.   

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
apiInstance.apiV1UsersPlatformSettingsGet(opts).then((data) => {
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

[**InlineResponse20075**](InlineResponse20075.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


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
- **Accept**: application/json


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
- **Accept**: application/json


## apiV1UsersSubNotePatch

> String apiV1UsersSubNotePatch(opts)

Создание/изменение subNote

## Создание/изменение subNote, если null, то удаляется

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
  'body': new TestSwagger.InlineObject123() // InlineObject123 | 
};
apiInstance.apiV1UsersSubNotePatch(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject123**](InlineObject123.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1UsersUnlinkSubUserPatch

> String apiV1UsersUnlinkSubUserPatch(opts)

# Отвязка суб пользователя.

##  По guid саб пользователя которого хочет отвязать мастер пользователь.  Саб пользователь просто блокируется. Проверки: по guid должен существовать пользователь,    У суб пользователя поле masterUser должно совпадать с id мастер пользователя.

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
  'body': new TestSwagger.UnLinkSubuserInputSchema() // UnLinkSubuserInputSchema | 
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
 **body** | [**UnLinkSubuserInputSchema**](UnLinkSubuserInputSchema.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1UsersUserSettingsAvailableGet

> [Object] apiV1UsersUserSettingsAvailableGet(opts)

Deprecated! Выдача массива доступных настроек пользователя.

## Deprecated!  Выдача массива доступных настроек пользователя..   

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
- **Accept**: application/json

