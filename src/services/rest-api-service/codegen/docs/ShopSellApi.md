# TestSwagger.ShopSellApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1ShopSellGet**](ShopSellApi.md#apiV1ShopSellGet) | **GET** /api/v1/shop_sell/ | # Получить все магазины на продажу
[**apiV1ShopSellGuidGet**](ShopSellApi.md#apiV1ShopSellGuidGet) | **GET** /api/v1/shop_sell/{guid} | # Получить магазин на продажу по GUID
[**apiV1ShopSellGuidPatch**](ShopSellApi.md#apiV1ShopSellGuidPatch) | **PATCH** /api/v1/shop_sell/{guid} | # Обновить магазин на продажу.
[**apiV1ShopSellPost**](ShopSellApi.md#apiV1ShopSellPost) | **POST** /api/v1/shop_sell/ | # Добавить на продажу новый магазин.



## apiV1ShopSellGet

> [InlineResponse20057] apiV1ShopSellGet(opts)

# Получить все магазины на продажу

Если вызвал покупатель - Видны объявления в статусах \&quot;Опубликовано\&quot;/\&quot;Забронировано\&quot; Если вызвал покупатель, который забронировал магазин - Видны объявления в статусах \&quot;Опубликовано\&quot;/\&quot;Забронировано\&quot;/\&quot;Вызван модератор\&quot; Если вызвал продавец(создатель) - Видны объявления в статусах \&quot;DRAFT\&quot;/\&quot;DELETED\&quot;/\&quot;MODERATING\&quot;/\&quot;PUBLISHED\&quot;/\&quot;BOOKED\&quot;/\&quot;MODERATOR_CALLED\&quot;/\&quot;SOLD\&quot;

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ShopSellApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1ShopSellGet(opts).then((data) => {
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

[**[InlineResponse20057]**](InlineResponse20057.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1ShopSellGuidGet

> InlineResponse20058 apiV1ShopSellGuidGet(guid, opts)

# Получить магазин на продажу по GUID

Если вызвал покупатель - Видны объявления в статусах \&quot;Опубликовано\&quot;/\&quot;Забронировано\&quot; Если вызвал покупатель, который забронировал магазин - Видны объявления в статусах \&quot;Опубликовано\&quot;/\&quot;Забронировано\&quot;/\&quot;Вызван модератор\&quot; Если вызвал продавец(создатель) - Видны объявления в статусах \&quot;DRAFT\&quot;/\&quot;DELETED\&quot;/\&quot;MODERATING\&quot;/\&quot;PUBLISHED\&quot;/\&quot;BOOKED\&quot;/\&quot;MODERATOR_CALLED\&quot;/\&quot;SOLD\&quot;

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ShopSellApi();
let guid = null; // String | GUID магазина на продажу в БД.
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1ShopSellGuidGet(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID магазина на продажу в БД. | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**InlineResponse20058**](InlineResponse20058.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1ShopSellGuidPatch

> String apiV1ShopSellGuidPatch(guid, opts)

# Обновить магазин на продажу.

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ShopSellApi();
let guid = null; // String | GUID магазина на продажу в БД.
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject96() // InlineObject96 | 
};
apiInstance.apiV1ShopSellGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID магазина на продажу в БД. | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject96**](InlineObject96.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1ShopSellPost

> InlineResponse2017 apiV1ShopSellPost(opts)

# Добавить на продажу новый магазин.

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.ShopSellApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject95() // InlineObject95 | 
};
apiInstance.apiV1ShopSellPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject95**](InlineObject95.md)|  | [optional] 

### Return type

[**InlineResponse2017**](InlineResponse2017.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

