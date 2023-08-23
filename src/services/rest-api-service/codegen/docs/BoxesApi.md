# TestSwagger.BoxesApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1BoxesAdditionalInfoGuidPatch**](BoxesApi.md#apiV1BoxesAdditionalInfoGuidPatch) | **PATCH** /api/v1/boxes/additional_info/{guid} | # Изменить дополнительную информацию коробки.
[**apiV1BoxesApprovePost**](BoxesApi.md#apiV1BoxesApprovePost) | **POST** /api/v1/boxes/approve | # Подтвердить операцию объединения/разъединения коробок.
[**apiV1BoxesByOrderGuidGuidGet**](BoxesApi.md#apiV1BoxesByOrderGuidGuidGet) | **GET** /api/v1/boxes/by_order_guid/{guid} | # Получить коробки и их строки по GUID заказа.
[**apiV1BoxesByProductGuidGuidGet**](BoxesApi.md#apiV1BoxesByProductGuidGuidGet) | **GET** /api/v1/boxes/by_product_guid/{guid} | # Получить коробки и их строки по GUID продукта.
[**apiV1BoxesByProductGuidLightGuidGet**](BoxesApi.md#apiV1BoxesByProductGuidLightGuidGet) | **GET** /api/v1/boxes/by_product_guid_light/{guid} | # Получить коробки и их строки по GUID продукта.
[**apiV1BoxesCancelEditPost**](BoxesApi.md#apiV1BoxesCancelEditPost) | **POST** /api/v1/boxes/cancel-edit | # Отменить редактирование коробок.
[**apiV1BoxesCancelEditWithDraftGuidPost**](BoxesApi.md#apiV1BoxesCancelEditWithDraftGuidPost) | **POST** /api/v1/boxes/cancel_edit_with_draft/{guid} | # Отменить редактирование коробок сотрудником склада.
[**apiV1BoxesCancelMergePost**](BoxesApi.md#apiV1BoxesCancelMergePost) | **POST** /api/v1/boxes/cancel-merge | # Отменить объединение коробок.
[**apiV1BoxesCancelSplitPost**](BoxesApi.md#apiV1BoxesCancelSplitPost) | **POST** /api/v1/boxes/cancel-split | # Отменить разделение коробок.
[**apiV1BoxesChangeDimensionsGuidPatch**](BoxesApi.md#apiV1BoxesChangeDimensionsGuidPatch) | **PATCH** /api/v1/boxes/change-dimensions/{guid} | # Изменить полей габаритов, массы коробки.
[**apiV1BoxesClientsGet**](BoxesApi.md#apiV1BoxesClientsGet) | **GET** /api/v1/boxes/clients | # Получить коробки и их строки по текущему клиенту.
[**apiV1BoxesClientsGuidPatch**](BoxesApi.md#apiV1BoxesClientsGuidPatch) | **PATCH** /api/v1/boxes/clients/{guid} | # Отредактировать коробку клиентом
[**apiV1BoxesClientsInTransferGuidGet**](BoxesApi.md#apiV1BoxesClientsInTransferGuidGet) | **GET** /api/v1/boxes/clients/in_transfer/{guid} | # Получить коробки  в статусах “REQUESTED_SEND_TO_BATCH“, “In Batch“, “In Batch on the way”, \&quot;NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE\&quot;, “NEED_TO_UPDATE_THE_TARIFF“, с фильтрацией по продукту
[**apiV1BoxesClientsLightGet**](BoxesApi.md#apiV1BoxesClientsLightGet) | **GET** /api/v1/boxes/clients_light | # Получить коробки и их строки по текущему клиенту.
[**apiV1BoxesClientsSentToBatchGet**](BoxesApi.md#apiV1BoxesClientsSentToBatchGet) | **GET** /api/v1/boxes/clients/sent_to_batch | # Получить коробки по текущему клиенту отправленные в партию.
[**apiV1BoxesEditGuidPost**](BoxesApi.md#apiV1BoxesEditGuidPost) | **POST** /api/v1/boxes/edit/{guid} | # Отредактировать коробку. Сликом гибкий метод
[**apiV1BoxesGet**](BoxesApi.md#apiV1BoxesGet) | **GET** /api/v1/boxes/ | # Получить коробки и их строки.
[**apiV1BoxesGroupedGet**](BoxesApi.md#apiV1BoxesGroupedGet) | **GET** /api/v1/boxes/grouped | # Получить сгруппированные коробки
[**apiV1BoxesGroupedGroupsGet**](BoxesApi.md#apiV1BoxesGroupedGroupsGet) | **GET** /api/v1/boxes/grouped/groups | # Получить группы
[**apiV1BoxesGroupedSimilarGet**](BoxesApi.md#apiV1BoxesGroupedSimilarGet) | **GET** /api/v1/boxes/grouped/similar | # Получить похожие коробки
[**apiV1BoxesIsFormedGuidPatch**](BoxesApi.md#apiV1BoxesIsFormedGuidPatch) | **PATCH** /api/v1/boxes/is_formed/{guid} | # Изменить поле isFormed
[**apiV1BoxesManyPatch**](BoxesApi.md#apiV1BoxesManyPatch) | **PATCH** /api/v1/boxes/many | # Изменить несколько коробок сторкипером.
[**apiV1BoxesMergePost**](BoxesApi.md#apiV1BoxesMergePost) | **POST** /api/v1/boxes/merge | # Объединить две и более коробок.
[**apiV1BoxesPagClientsLightGet**](BoxesApi.md#apiV1BoxesPagClientsLightGet) | **GET** /api/v1/boxes/pag/clients_light | # Получить коробки и их строки по текущему клиенту.
[**apiV1BoxesPost**](BoxesApi.md#apiV1BoxesPost) | **POST** /api/v1/boxes/ | # Создать коробку и ее строки.
[**apiV1BoxesPrepIdPatch**](BoxesApi.md#apiV1BoxesPrepIdPatch) | **PATCH** /api/v1/boxes/prep_id | # Изменить поле prepId
[**apiV1BoxesSplitPost**](BoxesApi.md#apiV1BoxesSplitPost) | **POST** /api/v1/boxes/split | # Разделить коробку.
[**apiV1BoxesStorekeepersGuidPatch**](BoxesApi.md#apiV1BoxesStorekeepersGuidPatch) | **PATCH** /api/v1/boxes/storekeepers/{guid} | # Изменить коробку сотрудником склада.
[**apiV1BoxesStorekeepersGuidSetItemsBarCodePatch**](BoxesApi.md#apiV1BoxesStorekeepersGuidSetItemsBarCodePatch) | **PATCH** /api/v1/boxes/storekeepers/{guid}/set_itemsBarCode | # Изменить чекбоксы баркода.
[**apiV1BoxesStorekeepersSentToBatchGet**](BoxesApi.md#apiV1BoxesStorekeepersSentToBatchGet) | **GET** /api/v1/boxes/storekeepers/sent_to_batch | # Получить коробки по текущему сторкипера отправленные в партию.
[**apiV1BoxesSuperboxRegroupPatch**](BoxesApi.md#apiV1BoxesSuperboxRegroupPatch) | **PATCH** /api/v1/boxes/superbox/regroup | # Сделать из нескольких боксов один супербокс



## apiV1BoxesAdditionalInfoGuidPatch

> String apiV1BoxesAdditionalInfoGuidPatch(guid, opts)

# Изменить дополнительную информацию коробки.

## Изменить дополнительную информацию коробки.

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BoxesApi();
let guid = null; // String | GUID тарифа.
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject35() // InlineObject35 | 
};
apiInstance.apiV1BoxesAdditionalInfoGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID тарифа. | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject35**](InlineObject35.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1BoxesApprovePost

> String apiV1BoxesApprovePost(opts)

# Подтвердить операцию объединения/разъединения коробок.

## Подтвердить операцию объединения/разъединения коробок.  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BoxesApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject30() // InlineObject30 | 
};
apiInstance.apiV1BoxesApprovePost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject30**](InlineObject30.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1BoxesByOrderGuidGuidGet

> [ApiV1BatchesBoxes] apiV1BoxesByOrderGuidGuidGet(guid, opts)

# Получить коробки и их строки по GUID заказа.

## # Получить коробки и их строки по GUID заказа.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BoxesApi();
let guid = null; // String | GUID
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1BoxesByOrderGuidGuidGet(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[ApiV1BatchesBoxes]**](ApiV1BatchesBoxes.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1BoxesByProductGuidGuidGet

> [ApiV1BatchesBoxes] apiV1BoxesByProductGuidGuidGet(guid, opts)

# Получить коробки и их строки по GUID продукта.

## Получить коробки и их строки по GUID продукта.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BoxesApi();
let guid = null; // String | GUID
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1BoxesByProductGuidGuidGet(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[ApiV1BatchesBoxes]**](ApiV1BatchesBoxes.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1BoxesByProductGuidLightGuidGet

> [ApiV1BatchesBoxes] apiV1BoxesByProductGuidLightGuidGet(guid, opts)

# Получить коробки и их строки по GUID продукта.

## Получить коробки и их строки по GUID продукта.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BoxesApi();
let guid = null; // String | GUID
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1BoxesByProductGuidLightGuidGet(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[ApiV1BatchesBoxes]**](ApiV1BatchesBoxes.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1BoxesCancelEditPost

> String apiV1BoxesCancelEditPost(opts)

# Отменить редактирование коробок.

## Отменить редактирование коробок.  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BoxesApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject25() // InlineObject25 | 
};
apiInstance.apiV1BoxesCancelEditPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject25**](InlineObject25.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1BoxesCancelEditWithDraftGuidPost

> String apiV1BoxesCancelEditWithDraftGuidPost(guid, opts)

# Отменить редактирование коробок сотрудником склада.

## Отменить редактирование коробок сотрудником склада.  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BoxesApi();
let guid = null; // String | GUID коробки, объединение которой нужно отменить
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1BoxesCancelEditWithDraftGuidPost(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID коробки, объединение которой нужно отменить | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1BoxesCancelMergePost

> String apiV1BoxesCancelMergePost(opts)

# Отменить объединение коробок.

## Отменить объединение коробок.  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BoxesApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject27() // InlineObject27 | 
};
apiInstance.apiV1BoxesCancelMergePost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject27**](InlineObject27.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1BoxesCancelSplitPost

> String apiV1BoxesCancelSplitPost(opts)

# Отменить разделение коробок.

## Отменить разделение коробок.   ## !!! У каждой коробки которая была создана разделением есть братья.    ## !!! Братья - коробки которые были созданы с этой, при разделении родителя.    ## !!! При отмене текущая коробка и все ee братья будут удалены. Родитель восстановлен.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BoxesApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject29() // InlineObject29 | 
};
apiInstance.apiV1BoxesCancelSplitPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject29**](InlineObject29.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1BoxesChangeDimensionsGuidPatch

> String apiV1BoxesChangeDimensionsGuidPatch(guid, opts)

# Изменить полей габаритов, массы коробки.

## Изменить полей габаритов, массы коробки.

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BoxesApi();
let guid = null; // String | GUID коробки.
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject33() // InlineObject33 | 
};
apiInstance.apiV1BoxesChangeDimensionsGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID коробки. | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject33**](InlineObject33.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1BoxesClientsGet

> [ApiV1BatchesBoxes] apiV1BoxesClientsGet(status, opts)

# Получить коробки и их строки по текущему клиенту.

## Получить коробки(без черновиков) и их строки по текущему клиенту. (Без отправленных в партию)  ## GUID клиента получаем из токена.   По статусу коробок

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BoxesApi();
let status = "status_example"; // String | Статусы коробок разделенные запятой
let opts = {
  'hasBatch': true, // Boolean | Должна ли коробка иметь свою партию
  'storekeeperId': null, // String | GUID склада который нужно получить.
  'destinationId': "destinationId_example", // String | GUID дестинейшна, который должен быть у боксов. Может быть null
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1BoxesClientsGet(status, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **status** | **String**| Статусы коробок разделенные запятой | 
 **hasBatch** | **Boolean**| Должна ли коробка иметь свою партию | [optional] 
 **storekeeperId** | [**String**](.md)| GUID склада который нужно получить. | [optional] 
 **destinationId** | **String**| GUID дестинейшна, который должен быть у боксов. Может быть null | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[ApiV1BatchesBoxes]**](ApiV1BatchesBoxes.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1BoxesClientsGuidPatch

> InlineResponse2013 apiV1BoxesClientsGuidPatch(guid, opts)

# Отредактировать коробку клиентом

## Отредактировать коробку клиентом  Клиент может отредактировать только свои коробки.  проверка на наличие склада назначения  проверка на наличие тарифа к сторкипера

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BoxesApi();
let guid = "guid_example"; // String | GUID в сущности в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject23() // InlineObject23 | 
};
apiInstance.apiV1BoxesClientsGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| GUID в сущности в БД | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject23**](InlineObject23.md)|  | [optional] 

### Return type

[**InlineResponse2013**](InlineResponse2013.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1BoxesClientsInTransferGuidGet

> [InlineResponse20014] apiV1BoxesClientsInTransferGuidGet(guid, opts)

# Получить коробки  в статусах “REQUESTED_SEND_TO_BATCH“, “In Batch“, “In Batch on the way”, \&quot;NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE\&quot;, “NEED_TO_UPDATE_THE_TARIFF“, с фильтрацией по продукту

# Получить коробки  в статусах “REQUESTED_SEND_TO_BATCH“, “In Batch“, “In Batch on the way”, \&quot;NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE\&quot;, “NEED_TO_UPDATE_THE_TARIFF“, с фильтрацией по продукту

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BoxesApi();
let guid = null; // String | poroduct GUID
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1BoxesClientsInTransferGuidGet(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| poroduct GUID | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse20014]**](InlineResponse20014.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1BoxesClientsLightGet

> [InlineResponse20013] apiV1BoxesClientsLightGet(status, opts)

# Получить коробки и их строки по текущему клиенту.

## Получить коробки(без черновиков) и их строки по текущему клиенту. (Без отправленных в партию)  ## GUID клиента получаем из токена.   По статусу коробок

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BoxesApi();
let status = "status_example"; // String | 
let opts = {
  'shopIds': "shopIds_example", // String | Гуиды магазинов
  'storekeeperId': null, // String | GUID склада который нужно получить.
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1BoxesClientsLightGet(status, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **status** | **String**|  | 
 **shopIds** | **String**| Гуиды магазинов | [optional] 
 **storekeeperId** | [**String**](.md)| GUID склада который нужно получить. | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse20013]**](InlineResponse20013.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1BoxesClientsSentToBatchGet

> [InlineResponse20016] apiV1BoxesClientsSentToBatchGet(opts)

# Получить коробки по текущему клиенту отправленные в партию.

## Получить коробки по текущему клиенту отправленные в партию. REQUESTED_SEND_TO_BATCH  ## GUID клиента получаем из токена.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BoxesApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1BoxesClientsSentToBatchGet(opts).then((data) => {
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

[**[InlineResponse20016]**](InlineResponse20016.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1BoxesEditGuidPost

> InlineResponse2013 apiV1BoxesEditGuidPost(guid, opts)

# Отредактировать коробку. Сликом гибкий метод

## ЭТО МЕТОД ИСОЛЬЗУЕТСЯ ДЛЯ ТАСКОВ  ## Отредактировать коробку. Коробка после редактирования станет черновиком. Ее нужно будет подтвердить  ## ВНИМАНИЕ - фактически будет создана новая коробка а старая пометится как удаленная.   ## ВНИМАНИЕ - передайте весь набор параметров как на создание новой коробки. Не только те которые нужно изменить.  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BoxesApi();
let guid = "guid_example"; // String | GUID в сущности в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject22() // InlineObject22 | 
};
apiInstance.apiV1BoxesEditGuidPost(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| GUID в сущности в БД | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject22**](InlineObject22.md)|  | [optional] 

### Return type

[**InlineResponse2013**](InlineResponse2013.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1BoxesGet

> [ApiV1BatchesBoxes] apiV1BoxesGet(opts)

# Получить коробки и их строки.

## Получить коробки их строки.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BoxesApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1BoxesGet(opts).then((data) => {
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

[**[ApiV1BatchesBoxes]**](ApiV1BatchesBoxes.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1BoxesGroupedGet

> InlineResponse20018 apiV1BoxesGroupedGet(opts)

# Получить сгруппированные коробки

## Получить сгруппированные коробки

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BoxesApi();
let opts = {
  'additionalGroupParameter': "additionalGroupParameter_example", // String |                Пример: /boxes/grouped?fields=orderId,logicsTariffId,destinationId,amount             
  'limit': 56, // Number | Сколько вернуть полей
  'offset': 56, // Number | Сколько отступить от начала полей
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1BoxesGroupedGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **additionalGroupParameter** | **String**|                Пример: /boxes/grouped?fields&#x3D;orderId,logicsTariffId,destinationId,amount              | [optional] 
 **limit** | **Number**| Сколько вернуть полей | [optional] 
 **offset** | **Number**| Сколько отступить от начала полей | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**InlineResponse20018**](InlineResponse20018.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1BoxesGroupedGroupsGet

> InlineResponse20017 apiV1BoxesGroupedGroupsGet(opts)

# Получить группы

## Получить группы

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BoxesApi();
let opts = {
  'additionalGroupParameter': "additionalGroupParameter_example", // String |                Пример: /boxes/grouped?fields=orderId,logicsTariffId,destinationId,amount             
  'limit': 56, // Number | Сколько вернуть полей
  'offset': 56, // Number | Сколько отступить от начала полей
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1BoxesGroupedGroupsGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **additionalGroupParameter** | **String**|                Пример: /boxes/grouped?fields&#x3D;orderId,logicsTariffId,destinationId,amount              | [optional] 
 **limit** | **Number**| Сколько вернуть полей | [optional] 
 **offset** | **Number**| Сколько отступить от начала полей | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**InlineResponse20017**](InlineResponse20017.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1BoxesGroupedSimilarGet

> [InlineResponse20012] apiV1BoxesGroupedSimilarGet(opts)

# Получить похожие коробки

## Получить похожие коробки  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BoxesApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1BoxesGroupedSimilarGet(opts).then((data) => {
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

[**[InlineResponse20012]**](InlineResponse20012.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1BoxesIsFormedGuidPatch

> String apiV1BoxesIsFormedGuidPatch(guid, opts)

# Изменить поле isFormed

# Изменить поле isFormed

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BoxesApi();
let guid = null; // String | GUID коробки.
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject36() // InlineObject36 | 
};
apiInstance.apiV1BoxesIsFormedGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID коробки. | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject36**](InlineObject36.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1BoxesManyPatch

> String apiV1BoxesManyPatch(opts)

# Изменить несколько коробок сторкипером.

## Изменить несколько коробок сторкипером.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BoxesApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject24() // InlineObject24 | 
};
apiInstance.apiV1BoxesManyPatch(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject24**](InlineObject24.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1BoxesMergePost

> InlineResponse2014 apiV1BoxesMergePost(opts)

# Объединить две и более коробок.

## Объединить две и более коробок.  Данный методод только для клиента Проверки: Все коробки должны быть от одного сторкипера, принадлежать одному клиенту, Тариф доставки должен принадлежать данному сторкиперу Провверки:  Все item-ы иметь одинаковый баркод Проверяем чтобы баркоды были проклеены у всех, иначе в новой коробке будет false.

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BoxesApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject26() // InlineObject26 | 
};
apiInstance.apiV1BoxesMergePost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject26**](InlineObject26.md)|  | [optional] 

### Return type

[**InlineResponse2014**](InlineResponse2014.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1BoxesPagClientsLightGet

> InlineResponse20015 apiV1BoxesPagClientsLightGet(status, opts)

# Получить коробки и их строки по текущему клиенту.

## Получить коробки(без черновиков) и их строки по текущему клиенту. (Без отправленных в партию)  ## GUID клиента получаем из токена.   По статусу коробок

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BoxesApi();
let status = "status_example"; // String | 
let opts = {
  'filters': "filters_example", // String |                Возможные поля: asin, amazonTitle, title, humanFriendlyId, orderHumanFriendlyId, orderItem               Поиск для полей продукта идет через схему Коробка -> Айтем коробки -> Продукт               2 варианта использования:                 1. Фильтр по одному полю:                   [amazonTitle][$eq]=some_title                 2. Фильтр по нескольким полям:                   or[0][amazonTitle][$eq]=some_title;or[1][asin][$eq]=some_asin                     Возвращает партии с коробками с продуктами, в которых amazonTitle равен some_title или asin равен some_asin               2 оператора совпадения:                 $eq - полное совпадение, нечувствителен к регистру                 $contains - наличие данной подстроки в поле, нечувствителен к регистру, предназначен только для строк             
  'destinationId': "destinationId_example", // String | GUID дестинейшна, который должен быть у боксов.
  'storekeeperId': null, // String | GUID склада который нужно получить.
  'isFormed': true, // Boolean | Сформирована ли коробка
  'shopIds': "shopIds_example", // String | Гуиды магазинов
  'hasBatch': true, // Boolean | Должна ли коробка иметь свою партию
  'limit': 10.0, // Number | Лимит записей для пагинации
  'offset': 0.0, // Number | Смещение для пагинации
  'sortField': "sortField_example", // String | Название поля
  'sortType': "sortType_example", // String | Тип сортировки
  'productGuid': "productGuid_example", // String | 
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1BoxesPagClientsLightGet(status, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **status** | **String**|  | 
 **filters** | **String**|                Возможные поля: asin, amazonTitle, title, humanFriendlyId, orderHumanFriendlyId, orderItem               Поиск для полей продукта идет через схему Коробка -&gt; Айтем коробки -&gt; Продукт               2 варианта использования:                 1. Фильтр по одному полю:                   [amazonTitle][$eq]&#x3D;some_title                 2. Фильтр по нескольким полям:                   or[0][amazonTitle][$eq]&#x3D;some_title;or[1][asin][$eq]&#x3D;some_asin                     Возвращает партии с коробками с продуктами, в которых amazonTitle равен some_title или asin равен some_asin               2 оператора совпадения:                 $eq - полное совпадение, нечувствителен к регистру                 $contains - наличие данной подстроки в поле, нечувствителен к регистру, предназначен только для строк              | [optional] 
 **destinationId** | **String**| GUID дестинейшна, который должен быть у боксов. | [optional] 
 **storekeeperId** | [**String**](.md)| GUID склада который нужно получить. | [optional] 
 **isFormed** | **Boolean**| Сформирована ли коробка | [optional] 
 **shopIds** | **String**| Гуиды магазинов | [optional] 
 **hasBatch** | **Boolean**| Должна ли коробка иметь свою партию | [optional] 
 **limit** | **Number**| Лимит записей для пагинации | [optional] [default to 10.0]
 **offset** | **Number**| Смещение для пагинации | [optional] [default to 0.0]
 **sortField** | **String**| Название поля | [optional] 
 **sortType** | **String**| Тип сортировки | [optional] 
 **productGuid** | **String**|  | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**InlineResponse20015**](InlineResponse20015.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1BoxesPost

> InlineResponse2012 apiV1BoxesPost(opts)

# Создать коробку и ее строки.

## Создать коробку и ее строки.  При создании коробка получает статус \&quot;IN_STOCK\&quot; ## Коробка состоит из шапки и строк (как накладная)  ## Коллекция Boxes содержит основные параметры коробки.  ## BoxesItems - коллекция которая содержит строки позиций в коробке.  У коробок есть еще такие параметры:         isActual - если false, то коробка удалена.         isDraft - если true, то коробка является черновиком. Его создал клиента при объеденении / разделении коробки         У клиента и у сотрудника склада их можно отфильтровать и обрабатывать в отдельном окне.         Сотрудник склада обработав позитивно изменение коробок от клиента просто ставит здесь (isDraft) false и коробка становится обычной.         Также у коробки созданной из других коробок заполнено поле parents. Это массив guid родительских коробок.         При отмене объединения коробок в базе по этим guid восстановим коробки isActual &#x3D; true. А новые будут удалены isActual &#x3D; false.         Также у коробки созданной при объединении/разделении будет заполнено поле brothers. Это guid других коробок которые были созданы вместе с этой из общих родителей.         Когда для любой из объединённых коробок будет запрошено удаление, восстановим старые коробки и кроме текущей коробки         будут удалены все ее братья.

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BoxesApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject21() // InlineObject21 | 
};
apiInstance.apiV1BoxesPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject21**](InlineObject21.md)|  | [optional] 

### Return type

[**InlineResponse2012**](InlineResponse2012.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1BoxesPrepIdPatch

> String apiV1BoxesPrepIdPatch(opts)

# Изменить поле prepId

# Изменить поле prepId

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BoxesApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': [new TestSwagger.InlineObject()] // [InlineObject] | 
};
apiInstance.apiV1BoxesPrepIdPatch(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**[InlineObject]**](InlineObject.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1BoxesSplitPost

> [String] apiV1BoxesSplitPost(opts)

# Разделить коробку.

## Разделить коробку.   При разделении коробок странная сущность передается. Там массив массивов.Первый массив это          новые коробки - сколько элементов, столько и создаст коробок. Второй массив - это элементы в коробке.          В нем строки новой коробки. Фронт отвечает за то, что суммарное содержание новых коробок,          было ровно содержанию исходной коробки.

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BoxesApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject28() // InlineObject28 | 
};
apiInstance.apiV1BoxesSplitPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject28**](InlineObject28.md)|  | [optional] 

### Return type

**[String]**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1BoxesStorekeepersGuidPatch

> String apiV1BoxesStorekeepersGuidPatch(guid, opts)

# Изменить коробку сотрудником склада.

## Изменить коробку сотрудником склада.   Сотрудник склада не может редактировать содержание коробки, но ему доступно для         редактирования параметры коробки.

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BoxesApi();
let guid = null; // String | 
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject31() // InlineObject31 | 
};
apiInstance.apiV1BoxesStorekeepersGuidPatch(guid, opts).then((data) => {
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
 **body** | [**InlineObject31**](InlineObject31.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1BoxesStorekeepersGuidSetItemsBarCodePatch

> String apiV1BoxesStorekeepersGuidSetItemsBarCodePatch(guid, opts)

# Изменить чекбоксы баркода.

## Изменить чекбоксы баркода.   Сотрудник склада не может редактировать содержание коробки, но ему доступно для         редактирования параметры коробки.

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BoxesApi();
let guid = null; // String | 
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject32() // InlineObject32 | 
};
apiInstance.apiV1BoxesStorekeepersGuidSetItemsBarCodePatch(guid, opts).then((data) => {
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
 **body** | [**InlineObject32**](InlineObject32.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1BoxesStorekeepersSentToBatchGet

> [InlineResponse20016] apiV1BoxesStorekeepersSentToBatchGet(opts)

# Получить коробки по текущему сторкипера отправленные в партию.

## Получить коробки по текущему сторкипера отправленные в партию. REQUESTED_SEND_TO_BATCH  ## GUID клиента получаем из токена.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BoxesApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1BoxesStorekeepersSentToBatchGet(opts).then((data) => {
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

[**[InlineResponse20016]**](InlineResponse20016.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1BoxesSuperboxRegroupPatch

> [String] apiV1BoxesSuperboxRegroupPatch(opts)

# Сделать из нескольких боксов один супербокс

## делать из нескольких боксов один супербокс

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BoxesApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject34() // InlineObject34 | 
};
apiInstance.apiV1BoxesSuperboxRegroupPatch(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject34**](InlineObject34.md)|  | [optional] 

### Return type

**[String]**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

