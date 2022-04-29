# TestSwagger.OtherApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1OtherImgGuidGet**](OtherApi.md#apiV1OtherImgGuidGet) | **GET** /api/v1/other/img/{guid} | # Получить изображение.
[**apiV1OtherPaymentsByProductGuidGet**](OtherApi.md#apiV1OtherPaymentsByProductGuidGet) | **GET** /api/v1/other/payments/by_product/{guid} | # Получить все оплаты, которые были начислены в связи с продуктом с указанным гуидом.
[**apiV1OtherPaymentsByUserGuidGet**](OtherApi.md#apiV1OtherPaymentsByUserGuidGet) | **GET** /api/v1/other/payments/by_user/{guid} | # Получить все оплаты, которые были начислены пользователю с указанным гуидом.
[**apiV1OtherPaymentsMyGet**](OtherApi.md#apiV1OtherPaymentsMyGet) | **GET** /api/v1/other/payments/my | # Получить все оплаты, которые были произведены обратившемся пользователем.
[**apiV1OtherUploadAvatarPost**](OtherApi.md#apiV1OtherUploadAvatarPost) | **POST** /api/v1/other/upload_avatar | # Загрузить аватар.
[**apiV1OtherUploadFileByUrlPost**](OtherApi.md#apiV1OtherUploadFileByUrlPost) | **POST** /api/v1/other/upload_file_by_url | # Загрузить изображение по ссылке.
[**apiV1OtherUploadFilePost**](OtherApi.md#apiV1OtherUploadFilePost) | **POST** /api/v1/other/upload_file | # Загрузить изображение.



## apiV1OtherImgGuidGet

> apiV1OtherImgGuidGet(guid, opts)

# Получить изображение.

## Получить изображение.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.OtherApi();
let guid = "guid_example"; // String | guid файла
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1OtherImgGuidGet(guid, opts).then(() => {
  console.log('API called successfully.');
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| guid файла | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

null (empty response body)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1OtherPaymentsByProductGuidGet

> [InlineResponse2003] apiV1OtherPaymentsByProductGuidGet(guid, opts)

# Получить все оплаты, которые были начислены в связи с продуктом с указанным гуидом.

## Получить все оплаты, которые были начислены в связи с продуктом с указанным гуидом.  Админ видит все операции

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.OtherApi();
let guid = null; // String | guid товара по которому нужны оплаты.
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1OtherPaymentsByProductGuidGet(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| guid товара по которому нужны оплаты. | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse2003]**](InlineResponse2003.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1OtherPaymentsByUserGuidGet

> [InlineResponse2003] apiV1OtherPaymentsByUserGuidGet(guid, opts)

# Получить все оплаты, которые были начислены пользователю с указанным гуидом.

## Получить все оплаты, которые были начислены пользователю с указанным гуидом.  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.OtherApi();
let guid = null; // String | guid пользователя по которому нужны оплаты.
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1OtherPaymentsByUserGuidGet(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| guid пользователя по которому нужны оплаты. | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse2003]**](InlineResponse2003.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1OtherPaymentsMyGet

> [InlineResponse2003] apiV1OtherPaymentsMyGet(opts)

# Получить все оплаты, которые были произведены обратившемся пользователем.

## Получить все оплаты, которые были произведены обратившемся пользователем.  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.OtherApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1OtherPaymentsMyGet(opts).then((data) => {
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

[**[InlineResponse2003]**](InlineResponse2003.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1OtherUploadAvatarPost

> InlineResponse2016 apiV1OtherUploadAvatarPost(opts)

# Загрузить аватар.

## Загрузить аватар.   Данный метод нужен для заливки аватара пользователем, при повторном вызове происходит обновление. Старая картинка затирается новой! картинка уменьшается до 300 на 300 точек(без обрезания). после сжиматься.  пример: \&quot;https://amazonapi.fvds.ru/uploads/avatars/{userId}.webp\&quot;, где userId это GUID пользователя например, 90aac7d1-5777-4ef3-b29c-212f665a2543 https://amazonapi.fvds.ru/uploads/avatars/90aac7d1-5777-4ef3-b29c-212f665a2543.webp Проверки: Проверка расширений, доступные форматы:  &#39;jpeg&#39;, &#39;jpg&#39;, &#39;png&#39;, &#39;webp&#39;, &#39;gif&#39;, &#39;avif&#39;, &#39;tiff&#39; 

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.OtherApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1OtherUploadAvatarPost(opts).then((data) => {
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

[**InlineResponse2016**](InlineResponse2016.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1OtherUploadFileByUrlPost

> InlineResponse2016 apiV1OtherUploadFileByUrlPost(opts)

# Загрузить изображение по ссылке.

## Загрузить изображение ссылке.   Если файл картинка, то создается превьюшка, не более 150*150 точек, путь до которой \&quot;fileName\&quot; + \&quot;.preview.webp\&quot; При сохранении к имени файла добавляется случайно сгенерированный GUID  пример: ссылка на файл https://www.amazon.com/Oculus.jpeg Доступные форматы: jpeg, jpg, png, webp, gif, avif, tiff, pdf новое имя файла на сервере 318b1f4d-ae7a-443e-8258-f8ed05237812.Oculus.jpeg

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.OtherApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject36() // InlineObject36 | 
};
apiInstance.apiV1OtherUploadFileByUrlPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject36**](InlineObject36.md)|  | [optional] 

### Return type

[**InlineResponse2016**](InlineResponse2016.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1OtherUploadFilePost

> InlineResponse2016 apiV1OtherUploadFilePost(opts)

# Загрузить изображение.

## Загрузить изображение.   Если файл картинка, то создается превьюшка, не более 150*150 точек, путь до которой \&quot;fileName\&quot; + \&quot;.preview.webp\&quot;

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.OtherApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1OtherUploadFilePost(opts).then((data) => {
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

[**InlineResponse2016**](InlineResponse2016.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

