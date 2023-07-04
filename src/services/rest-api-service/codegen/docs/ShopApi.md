# TestSwagger.ShopApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1ShopsGet**](ShopApi.md#apiV1ShopsGet) | **GET** /api/v1/shops/ | # Получить все магазины пользователя.
[**apiV1ShopsGuidDelete**](ShopApi.md#apiV1ShopsGuidDelete) | **DELETE** /api/v1/shops/{guid} | # Логическое удаление магазина по его GUID.
[**apiV1ShopsGuidPatch**](ShopApi.md#apiV1ShopsGuidPatch) | **PATCH** /api/v1/shops/{guid} | # Редактировать магазин.
[**apiV1ShopsNamesGet**](ShopApi.md#apiV1ShopsNamesGet) | **GET** /api/v1/shops/names | # Получить все названия магазинов пользователя.
[**apiV1ShopsPost**](ShopApi.md#apiV1ShopsPost) | **POST** /api/v1/shops/ | # Добавить новый магазин клиентом.



## apiV1ShopsGet

> [InlineResponse20065] apiV1ShopsGet(opts)

# Получить все магазины пользователя.

## Получить все магазины пользователя.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ShopApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1ShopsGet(opts).then((data) => {
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

[**[InlineResponse20065]**](InlineResponse20065.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1ShopsGuidDelete

> String apiV1ShopsGuidDelete(guid, opts)

# Логическое удаление магазина по его GUID.

## Логическое удаление магазина по его GUID.    Только владелец может удалить магазин.  После удаления магазин дезактивируется.

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ShopApi();
let guid = null; // String | GUID в сущности в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1ShopsGuidDelete(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID в сущности в БД | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1ShopsGuidPatch

> String apiV1ShopsGuidPatch(guid, opts)

# Редактировать магазин.

# Редактировать магазин. клиентом.  ## Только владелец может редактировать  Перед записью в базу проверка работоспособности ссылок Поля со ссылками должны быть в формате uri!!! Это полная ссылка до файлов. валидный пример: \&quot;https://user:password@app.sellerboard.com/ru/automation/reports?id&#x3D;e5...8&amp;format&#x3D;csv\&quot;

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ShopApi();
let guid = null; // String | GUID объекта в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject106() // InlineObject106 | 
};
apiInstance.apiV1ShopsGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID объекта в БД | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject106**](InlineObject106.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1ShopsNamesGet

> [InlineResponse20066] apiV1ShopsNamesGet(opts)

# Получить все названия магазинов пользователя.

## Получить все названия магазины пользователя.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ShopApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1ShopsNamesGet(opts).then((data) => {
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

[**[InlineResponse20066]**](InlineResponse20066.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1ShopsPost

> InlineResponse2017 apiV1ShopsPost(opts)

# Добавить новый магазин клиентом.

# Добавить новый магазин клиентом.  ## Создает новые магазин и добавляет в таблицу связи user_shops Проверки: Пользователь не может иметь два магазина с одинаковыми именами (name) Перед записью в базу проверка работоспособности ссылок Поля со ссылками должны быть в формате uri!!! Это полная ссылка до файлов. валидный пример: \&quot;https://user:password@app.sellerboard.com/ru/automation/reports?id&#x3D;e5...8&amp;format&#x3D;csv\&quot;

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ShopApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject105() // InlineObject105 | 
};
apiInstance.apiV1ShopsPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject105**](InlineObject105.md)|  | [optional] 

### Return type

[**InlineResponse2017**](InlineResponse2017.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

