# TestSwagger.IdeaApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1IdeasAddSuppliersGuidPost**](IdeaApi.md#apiV1IdeasAddSuppliersGuidPost) | **POST** /api/v1/ideas/add_suppliers/{guid} | Добавить поставщиков к идее
[**apiV1IdeasAddingAsinGuidPatch**](IdeaApi.md#apiV1IdeasAddingAsinGuidPatch) | **PATCH** /api/v1/ideas/adding_asin/{guid} | Изменить статус заявки на addingAsin(18)
[**apiV1IdeasByParentGuidGet**](IdeaApi.md#apiV1IdeasByParentGuidGet) | **GET** /api/v1/ideas/by_parent/{guid} | Получить идеи по родительскому продукту
[**apiV1IdeasClosedGuidPatch**](IdeaApi.md#apiV1IdeasClosedGuidPatch) | **PATCH** /api/v1/ideas/closed/{guid} | Изменить статус заявки на closed(30)
[**apiV1IdeasFinishedGuidPatch**](IdeaApi.md#apiV1IdeasFinishedGuidPatch) | **PATCH** /api/v1/ideas/finished/{guid} | Изменить статус заявки на finished(20)
[**apiV1IdeasGuidDelete**](IdeaApi.md#apiV1IdeasGuidDelete) | **DELETE** /api/v1/ideas/{guid} | Удалить идею
[**apiV1IdeasGuidGet**](IdeaApi.md#apiV1IdeasGuidGet) | **GET** /api/v1/ideas/{guid} | Получить идею по гуиду
[**apiV1IdeasGuidPatch**](IdeaApi.md#apiV1IdeasGuidPatch) | **PATCH** /api/v1/ideas/{guid} | Редактировать идею
[**apiV1IdeasNotificationsGet**](IdeaApi.md#apiV1IdeasNotificationsGet) | **GET** /api/v1/ideas/notifications | Получить нотификации идей
[**apiV1IdeasOnCheckGuidPatch**](IdeaApi.md#apiV1IdeasOnCheckGuidPatch) | **PATCH** /api/v1/ideas/on_check/{guid} | Изменить статус заявки на OnCheck(10)
[**apiV1IdeasPagMyGet**](IdeaApi.md#apiV1IdeasPagMyGet) | **GET** /api/v1/ideas/pag/my | Список всех идей с пагинацией
[**apiV1IdeasPost**](IdeaApi.md#apiV1IdeasPost) | **POST** /api/v1/ideas/ | Добавить идею
[**apiV1IdeasProductCreatingGuidPatch**](IdeaApi.md#apiV1IdeasProductCreatingGuidPatch) | **PATCH** /api/v1/ideas/product_creating/{guid} | Изменить статус заявки на productCreating(16)
[**apiV1IdeasRejectedGuidPatch**](IdeaApi.md#apiV1IdeasRejectedGuidPatch) | **PATCH** /api/v1/ideas/rejected/{guid} | Изменить статус заявки на rejected(25)
[**apiV1IdeasRemoveSupplierGuidPost**](IdeaApi.md#apiV1IdeasRemoveSupplierGuidPost) | **POST** /api/v1/ideas/remove_supplier/{guid} | Удалить поставщика
[**apiV1IdeasReopenGuidPatch**](IdeaApi.md#apiV1IdeasReopenGuidPatch) | **PATCH** /api/v1/ideas/reopen/{guid} | Открыть заявку заново
[**apiV1IdeasSupplierFoundGuidPatch**](IdeaApi.md#apiV1IdeasSupplierFoundGuidPatch) | **PATCH** /api/v1/ideas/supplier_found/{guid} | Изменить статус заявки на supplierFound(14)
[**apiV1IdeasSupplierNotFoundGuidPatch**](IdeaApi.md#apiV1IdeasSupplierNotFoundGuidPatch) | **PATCH** /api/v1/ideas/supplier_not_found/{guid} | Изменить статус заявки на supplierNotFound(15)
[**apiV1IdeasSupplierSearchGuidPatch**](IdeaApi.md#apiV1IdeasSupplierSearchGuidPatch) | **PATCH** /api/v1/ideas/supplier_search/{guid} | Изменить статус заявки на supplierSearch(13)



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
  'body': new TestSwagger.InlineObject66() // InlineObject66 | 
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
 **body** | [**InlineObject66**](InlineObject66.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1IdeasAddingAsinGuidPatch

> String apiV1IdeasAddingAsinGuidPatch(guid, opts)

Изменить статус заявки на addingAsin(18)

## Изменить статус заявки с supplierFound(14) или productCreating(16) на addingAsin(18)

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
apiInstance.apiV1IdeasAddingAsinGuidPatch(guid, opts).then((data) => {
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


## apiV1IdeasByParentGuidGet

> [InlineResponse20045] apiV1IdeasByParentGuidGet(guid, opts)

Получить идеи по родительскому продукту

Получить идеи по родительскому продукту

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
let guid = null; // String | ID родительского продукта, который должен быть в идее
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1IdeasByParentGuidGet(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| ID родительского продукта, который должен быть в идее | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse20045]**](InlineResponse20045.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1IdeasClosedGuidPatch

> String apiV1IdeasClosedGuidPatch(guid, opts)

Изменить статус заявки на closed(30)

## Изменить статус заявки с rejected(25) на closed(30)

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
apiInstance.apiV1IdeasClosedGuidPatch(guid, opts).then((data) => {
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


## apiV1IdeasFinishedGuidPatch

> String apiV1IdeasFinishedGuidPatch(guid, opts)

Изменить статус заявки на finished(20)

## Изменить статус заявки с addingAsin(18) на finished(20)

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
apiInstance.apiV1IdeasFinishedGuidPatch(guid, opts).then((data) => {
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

> InlineResponse20046Rows apiV1IdeasGuidGet(guid, opts)

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
  'withRequests': true, // Boolean | Наличие в ответе заявок в продуктах
  'withOrder': true, // Boolean | Наличие в ответе заказа в продуктах
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
 **withRequests** | **Boolean**| Наличие в ответе заявок в продуктах | [optional] 
 **withOrder** | **Boolean**| Наличие в ответе заказа в продуктах | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**InlineResponse20046Rows**](InlineResponse20046Rows.md)

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
  'body': new TestSwagger.InlineObject64() // InlineObject64 | 
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
 **body** | [**InlineObject64**](InlineObject64.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1IdeasNotificationsGet

> [InlineResponse20047] apiV1IdeasNotificationsGet(opts)

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

[**[InlineResponse20047]**](InlineResponse20047.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1IdeasOnCheckGuidPatch

> String apiV1IdeasOnCheckGuidPatch(guid, opts)

Изменить статус заявки на OnCheck(10)

## Изменить статус заявки с new(5) на OnCheck(10)

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
apiInstance.apiV1IdeasOnCheckGuidPatch(guid, opts).then((data) => {
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


## apiV1IdeasPagMyGet

> InlineResponse20046 apiV1IdeasPagMyGet(opts)

Список всех идей с пагинацией

Получить список всех идей с пагинацией

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
  'filters': "filters_example", // String |                Возможные поля: asin:, _id, title, status, comments, intervalStatusNew, intervalStatusOnCheck,               intervalStatusSupplierSearch, intervalStatusCardCreating, intervalStatusAddingAsin,               intervalStatusFinished, intervalStatusRejected, intervalsSum, dateStatusOnCheck, dateStatusSupplierSearch               dateStatusCardCreating, dateStatusAddingAsin, dateStatusFinished, dateStatusRejected, dateStatusClosed               intervalsSum, onCheckRequestsHumanFriendlyId, onFinishedRequestsHumanFriendlyId, onCheckRequestStatus, onFinishedRequestStatus, childProductSkusByClient, childProductAmazonTitle,               childProductShopIds, childProductAsin, parentProductSkusByClient, parentProductAmazonTitle,               parentProductShopIds, parentProductAsin               2 варианта использования:                 1. Фильтр по одному полю:                   [parentProductAmazonTitle][$eq]=some_title                 2. Фильтр по нескольким полям:                   or[0][parentProductAmazonTitle][$eq]=some_title;or[1][parentProductAsin][$eq]=some_asin                     Возвращает партии с коробками с продуктами, в которых parentProductAmazonTitle равен some_title или parentProductAsin равен some_asin               2 оператора совпадения:                 $eq - полное совпадение, нечувствителен к регистру                 $contains - наличие данной подстроки в поле, нечувствителен к регистру, предназначен только для строк             
  'withRequests': true, // Boolean | Наличие в ответе заявок в продуктах
  'withOrder': true, // Boolean | Наличие в ответе заказа в продуктах
  'limit': 10.0, // Number | Лимит записей для пагинации
  'offset': 0.0, // Number | Смещение для пагинации
  'sortField': "sortField_example", // String | Название поля
  'sortType': "sortType_example", // String | Тип сортировки
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1IdeasPagMyGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **filters** | **String**|                Возможные поля: asin:, _id, title, status, comments, intervalStatusNew, intervalStatusOnCheck,               intervalStatusSupplierSearch, intervalStatusCardCreating, intervalStatusAddingAsin,               intervalStatusFinished, intervalStatusRejected, intervalsSum, dateStatusOnCheck, dateStatusSupplierSearch               dateStatusCardCreating, dateStatusAddingAsin, dateStatusFinished, dateStatusRejected, dateStatusClosed               intervalsSum, onCheckRequestsHumanFriendlyId, onFinishedRequestsHumanFriendlyId, onCheckRequestStatus, onFinishedRequestStatus, childProductSkusByClient, childProductAmazonTitle,               childProductShopIds, childProductAsin, parentProductSkusByClient, parentProductAmazonTitle,               parentProductShopIds, parentProductAsin               2 варианта использования:                 1. Фильтр по одному полю:                   [parentProductAmazonTitle][$eq]&#x3D;some_title                 2. Фильтр по нескольким полям:                   or[0][parentProductAmazonTitle][$eq]&#x3D;some_title;or[1][parentProductAsin][$eq]&#x3D;some_asin                     Возвращает партии с коробками с продуктами, в которых parentProductAmazonTitle равен some_title или parentProductAsin равен some_asin               2 оператора совпадения:                 $eq - полное совпадение, нечувствителен к регистру                 $contains - наличие данной подстроки в поле, нечувствителен к регистру, предназначен только для строк              | [optional] 
 **withRequests** | **Boolean**| Наличие в ответе заявок в продуктах | [optional] 
 **withOrder** | **Boolean**| Наличие в ответе заказа в продуктах | [optional] 
 **limit** | **Number**| Лимит записей для пагинации | [optional] [default to 10.0]
 **offset** | **Number**| Смещение для пагинации | [optional] [default to 0.0]
 **sortField** | **String**| Название поля | [optional] 
 **sortType** | **String**| Тип сортировки | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**InlineResponse20046**](InlineResponse20046.md)

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
  'body': new TestSwagger.InlineObject65() // InlineObject65 | 
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
 **body** | [**InlineObject65**](InlineObject65.md)|  | [optional] 

### Return type

[**InlineResponse2015**](InlineResponse2015.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1IdeasProductCreatingGuidPatch

> String apiV1IdeasProductCreatingGuidPatch(guid, opts)

Изменить статус заявки на productCreating(16)

## Изменить статус заявки с supplierFound(14) на productCreating(16)

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
apiInstance.apiV1IdeasProductCreatingGuidPatch(guid, opts).then((data) => {
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


## apiV1IdeasRejectedGuidPatch

> String apiV1IdeasRejectedGuidPatch(guid, opts)

Изменить статус заявки на rejected(25)

## Изменить статус заявки со статусов 5/10/13/14/15 на rejected(25)

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
apiInstance.apiV1IdeasRejectedGuidPatch(guid, opts).then((data) => {
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
  'body': new TestSwagger.InlineObject67() // InlineObject67 | 
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
 **body** | [**InlineObject67**](InlineObject67.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1IdeasReopenGuidPatch

> String apiV1IdeasReopenGuidPatch(guid, opts)

Открыть заявку заново

## Открыть заявку заново rejected(25) -&gt; new(5), затереть даты и интервалы

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
apiInstance.apiV1IdeasReopenGuidPatch(guid, opts).then((data) => {
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


## apiV1IdeasSupplierFoundGuidPatch

> String apiV1IdeasSupplierFoundGuidPatch(guid, opts)

Изменить статус заявки на supplierFound(14)

## Изменить статус заявки с supplierSearch(13) на supplierFound(14)

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
apiInstance.apiV1IdeasSupplierFoundGuidPatch(guid, opts).then((data) => {
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


## apiV1IdeasSupplierNotFoundGuidPatch

> String apiV1IdeasSupplierNotFoundGuidPatch(guid, opts)

Изменить статус заявки на supplierNotFound(15)

## Изменить статус заявки с supplierSearch(13) на supplierNotFound(15)

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
apiInstance.apiV1IdeasSupplierNotFoundGuidPatch(guid, opts).then((data) => {
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


## apiV1IdeasSupplierSearchGuidPatch

> String apiV1IdeasSupplierSearchGuidPatch(guid, opts)

Изменить статус заявки на supplierSearch(13)

## Изменить статус заявки с OnCheck(10) на supplierSearch(13)

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
apiInstance.apiV1IdeasSupplierSearchGuidPatch(guid, opts).then((data) => {
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

