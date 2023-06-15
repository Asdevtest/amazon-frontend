# TestSwagger.IdeaApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1IdeasAddSuppliersGuidPost**](IdeaApi.md#apiV1IdeasAddSuppliersGuidPost) | **POST** /api/v1/ideas/add_suppliers/{guid} | Добавить поставщиков к идее
[**apiV1IdeasEditRequestGuidPatch**](IdeaApi.md#apiV1IdeasEditRequestGuidPatch) | **PATCH** /api/v1/ideas/edit_request/{guid} | Изменить заявку на поиск поставщика к идее
[**apiV1IdeasEditRequestsStatusGuidPatch**](IdeaApi.md#apiV1IdeasEditRequestsStatusGuidPatch) | **PATCH** /api/v1/ideas/edit_requests_status/{guid} | Изменить стаус заявки на поиск поставщика
[**apiV1IdeasFindSupplierGuidPost**](IdeaApi.md#apiV1IdeasFindSupplierGuidPost) | **POST** /api/v1/ideas/find_supplier/{guid} | Создать заявку на поиск поставщика к идее
[**apiV1IdeasGet**](IdeaApi.md#apiV1IdeasGet) | **GET** /api/v1/ideas/ | Список всех идей
[**apiV1IdeasGetSupplierRequestsGet**](IdeaApi.md#apiV1IdeasGetSupplierRequestsGet) | **GET** /api/v1/ideas/get_supplier_requests/ | Получить все заяки на поиск поставщика
[**apiV1IdeasGetSupplierRequestsGuidGet**](IdeaApi.md#apiV1IdeasGetSupplierRequestsGuidGet) | **GET** /api/v1/ideas/get_supplier_requests/{guid} | Получить определенную заявку на поиск поставщика
[**apiV1IdeasGuidDelete**](IdeaApi.md#apiV1IdeasGuidDelete) | **DELETE** /api/v1/ideas/{guid} | Удалить идею
[**apiV1IdeasGuidGet**](IdeaApi.md#apiV1IdeasGuidGet) | **GET** /api/v1/ideas/{guid} | Получить идею по гуиду
[**apiV1IdeasGuidPatch**](IdeaApi.md#apiV1IdeasGuidPatch) | **PATCH** /api/v1/ideas/{guid} | Редактировать идею
[**apiV1IdeasNotificationsGet**](IdeaApi.md#apiV1IdeasNotificationsGet) | **GET** /api/v1/ideas/notifications | Получить нотификации идей
[**apiV1IdeasPost**](IdeaApi.md#apiV1IdeasPost) | **POST** /api/v1/ideas/ | Добавить идею
[**apiV1IdeasRemoveSupplierGuidPost**](IdeaApi.md#apiV1IdeasRemoveSupplierGuidPost) | **POST** /api/v1/ideas/remove_supplier/{guid} | Удалить поставщика



## apiV1IdeasAddSuppliersGuidPost

> String apiV1IdeasAddSuppliersGuidPost(guid, opts)

Добавить поставщиков к идее

## Добавление поставщиков к идее  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.IdeaApi();
let guid = null; // String | ID идеи
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject64() // InlineObject64 | 
};
apiInstance.apiV1IdeasAddSuppliersGuidPost(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| ID идеи | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject64**](InlineObject64.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1IdeasEditRequestGuidPatch

> String apiV1IdeasEditRequestGuidPatch(guid, opts)

Изменить заявку на поиск поставщика к идее

## Изменение заявки на поиск поставщика  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.IdeaApi();
let guid = null; // String | ID идеи
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject67() // InlineObject67 | 
};
apiInstance.apiV1IdeasEditRequestGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| ID идеи | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject67**](InlineObject67.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1IdeasEditRequestsStatusGuidPatch

> String apiV1IdeasEditRequestsStatusGuidPatch(guid, opts)

Изменить стаус заявки на поиск поставщика

## Изменение статуса заявки на поиск поставщика  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.IdeaApi();
let guid = null; // String | ID идеи
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject68() // InlineObject68 | 
};
apiInstance.apiV1IdeasEditRequestsStatusGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| ID идеи | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject68**](InlineObject68.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1IdeasFindSupplierGuidPost

> String apiV1IdeasFindSupplierGuidPost(guid, opts)

Создать заявку на поиск поставщика к идее

## Создание заявки на поиск поставщика  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.IdeaApi();
let guid = null; // String | ID идеи
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject66() // InlineObject66 | 
};
apiInstance.apiV1IdeasFindSupplierGuidPost(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| ID идеи | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject66**](InlineObject66.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1IdeasGet

> [InlineResponse20045] apiV1IdeasGet(opts)

Список всех идей

Получить список всех идей

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.IdeaApi();
let opts = {
  'productId': "productId_example", // String | ID продукта, который должен быть в идее
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1IdeasGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **productId** | **String**| ID продукта, который должен быть в идее | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse20045]**](InlineResponse20045.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1IdeasGetSupplierRequestsGet

> String apiV1IdeasGetSupplierRequestsGet(opts)

Получить все заяки на поиск поставщика

## Получение всех заявок на поиск поставщика  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.IdeaApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1IdeasGetSupplierRequestsGet(opts).then((data) => {
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
- **Accept**: application/json


## apiV1IdeasGetSupplierRequestsGuidGet

> String apiV1IdeasGetSupplierRequestsGuidGet(guid, opts)

Получить определенную заявку на поиск поставщика

## Получение определенной заявки на поиск поставщика  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.IdeaApi();
let guid = null; // String | ID идеи
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1IdeasGetSupplierRequestsGuidGet(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| ID идеи | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1IdeasGuidDelete

> String apiV1IdeasGuidDelete(guid, opts)

Удалить идею

## Удаление идеи  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.IdeaApi();
let guid = null; // String | ID идеи
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1IdeasGuidDelete(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| ID идеи | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1IdeasGuidGet

> {String: Object} apiV1IdeasGuidGet(guid, opts)

Получить идею по гуиду

Получить идею по гуиду

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.IdeaApi();
let guid = "guid_example"; // String | GUID идеи в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1IdeasGuidGet(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| GUID идеи в БД | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**{String: Object}**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1IdeasGuidPatch

> String apiV1IdeasGuidPatch(guid, opts)

Редактировать идею

## Редактирование существующей идеи  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.IdeaApi();
let guid = null; // String | ID идеи
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject63() // InlineObject63 | 
};
apiInstance.apiV1IdeasGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| ID идеи | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject63**](InlineObject63.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1IdeasNotificationsGet

> [InlineResponse20046] apiV1IdeasNotificationsGet(opts)

Получить нотификации идей

## Получить нотификации идей  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.IdeaApi();
let opts = {
  'archive': false, // Boolean | Показывать в архиве/не в архиме нотификации
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1IdeasNotificationsGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **archive** | **Boolean**| Показывать в архиве/не в архиме нотификации | [optional] [default to false]
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse20046]**](InlineResponse20046.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1IdeasPost

> InlineResponse2015 apiV1IdeasPost(opts)

Добавить идею

## Добавление новой идеи   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.IdeaApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject62() // InlineObject62 | 
};
apiInstance.apiV1IdeasPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject62**](InlineObject62.md)|  | [optional] 

### Return type

[**InlineResponse2015**](InlineResponse2015.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1IdeasRemoveSupplierGuidPost

> String apiV1IdeasRemoveSupplierGuidPost(guid, opts)

Удалить поставщика

## Удаление поставщика у идеи  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.IdeaApi();
let guid = null; // String | ID идеи
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject65() // InlineObject65 | 
};
apiInstance.apiV1IdeasRemoveSupplierGuidPost(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| ID идеи | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject65**](InlineObject65.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

