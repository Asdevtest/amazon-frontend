# Amazonapi.UserApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1UsersInfoGet**](UserApi.md#apiV1UsersInfoGet) | **GET** /api/v1/users/info | Получить информацию от текущем пользователе.
[**apiV1UsersPost**](UserApi.md#apiV1UsersPost) | **POST** /api/v1/users/ | Создание нового пользователя. Регистрация.
[**apiV1UsersSignInPost**](UserApi.md#apiV1UsersSignInPost) | **POST** /api/v1/users/sign_in | # Получение токена авторизации.



## apiV1UsersInfoGet

> ApiV1AdminsGetNotPaidProductsCreatedby apiV1UsersInfoGet(opts)

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

[**ApiV1AdminsGetNotPaidProductsCreatedby**](ApiV1AdminsGetNotPaidProductsCreatedby.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1UsersPost

> ApiV1AdminsGetNotPaidProductsCreatedby apiV1UsersPost(InlineObject21, opts)

Создание нового пользователя. Регистрация.

## Создание нового пользователя. Регистрация.   

### Example

```javascript
import Amazonapi from 'amazonapi';

let apiInstance = new Amazonapi.UserApi();
let InlineObject21 = new Amazonapi.InlineObject21(); // InlineObject21 | 
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1UsersPost(InlineObject21, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **InlineObject21** | [**InlineObject21**](InlineObject21.md)|  | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**ApiV1AdminsGetNotPaidProductsCreatedby**](ApiV1AdminsGetNotPaidProductsCreatedby.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1UsersSignInPost

> InlineResponse2011 apiV1UsersSignInPost(InlineObject22, opts)

# Получение токена авторизации.

## Получение токена авторизации.   ## Время жизни токена 96 часов   

### Example

```javascript
import Amazonapi from 'amazonapi';

let apiInstance = new Amazonapi.UserApi();
let InlineObject22 = new Amazonapi.InlineObject22(); // InlineObject22 | 
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1UsersSignInPost(InlineObject22, opts).then((data) => {
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

[**InlineResponse2011**](InlineResponse2011.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html

