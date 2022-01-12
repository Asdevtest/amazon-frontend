# TestSwagger.BoxesApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1BoxesApprovePost**](BoxesApi.md#apiV1BoxesApprovePost) | **POST** /api/v1/boxes/approve | # Подтвердить операцию объединения/разъединения коробок.
[**apiV1BoxesByOrderGuidGuidGet**](BoxesApi.md#apiV1BoxesByOrderGuidGuidGet) | **GET** /api/v1/boxes/by_order_guid/{guid} | # Получить коробки и их строки по GUID заказа.
[**apiV1BoxesByProductGuidGuidGet**](BoxesApi.md#apiV1BoxesByProductGuidGuidGet) | **GET** /api/v1/boxes/by_product_guid/{guid} | # Получить коробки и их строки по GUID продукта.
[**apiV1BoxesCalculateBoxDeliveryCostsInBatchPost**](BoxesApi.md#apiV1BoxesCalculateBoxDeliveryCostsInBatchPost) | **POST** /api/v1/boxes/calculate_box_delivery_costs_in_batch | # Рассчитать стоимость доставки коробов.
[**apiV1BoxesCancelEditPost**](BoxesApi.md#apiV1BoxesCancelEditPost) | **POST** /api/v1/boxes/cancel-edit | # Отменить редактирование коробок.
[**apiV1BoxesCancelEditWithDraftGuidPost**](BoxesApi.md#apiV1BoxesCancelEditWithDraftGuidPost) | **POST** /api/v1/boxes/cancel_edit_with_draft/{guid} | # Отменить редактирование коробок сотрудником склада.
[**apiV1BoxesCancelMergePost**](BoxesApi.md#apiV1BoxesCancelMergePost) | **POST** /api/v1/boxes/cancel-merge | # Отменить объединение коробок.
[**apiV1BoxesCancelSplitPost**](BoxesApi.md#apiV1BoxesCancelSplitPost) | **POST** /api/v1/boxes/cancel-split | # Отменить разделение коробок.
[**apiV1BoxesClientsDraftsGet**](BoxesApi.md#apiV1BoxesClientsDraftsGet) | **GET** /api/v1/boxes/clients/drafts | # Получить черновики коробок и их строки по текущему клиенту.
[**apiV1BoxesClientsGet**](BoxesApi.md#apiV1BoxesClientsGet) | **GET** /api/v1/boxes/clients | # Получить коробки и их строки по текущему клиенту.
[**apiV1BoxesClientsSentToBatchGet**](BoxesApi.md#apiV1BoxesClientsSentToBatchGet) | **GET** /api/v1/boxes/clients/sent_to_batch | # Получить коробки по текущему клиенту отправленные в партию.
[**apiV1BoxesDraftsGet**](BoxesApi.md#apiV1BoxesDraftsGet) | **GET** /api/v1/boxes/drafts | # Получить черновики коробок и их строки.
[**apiV1BoxesEditGuidPost**](BoxesApi.md#apiV1BoxesEditGuidPost) | **POST** /api/v1/boxes/edit/{guid} | # Отредактировать коробку.
[**apiV1BoxesGet**](BoxesApi.md#apiV1BoxesGet) | **GET** /api/v1/boxes/ | # Получить коробки и их строки.
[**apiV1BoxesGuidDelete**](BoxesApi.md#apiV1BoxesGuidDelete) | **DELETE** /api/v1/boxes/{guid} | # Удалить коробку.
[**apiV1BoxesMergePost**](BoxesApi.md#apiV1BoxesMergePost) | **POST** /api/v1/boxes/merge | # Объединить две и более коробок.
[**apiV1BoxesPost**](BoxesApi.md#apiV1BoxesPost) | **POST** /api/v1/boxes/ | # Создать коробку и ее строки.
[**apiV1BoxesRequestSendBoxesToBatchPost**](BoxesApi.md#apiV1BoxesRequestSendBoxesToBatchPost) | **POST** /api/v1/boxes/request_send_boxes_to_batch | # Запросить отправку набора коробок в партию.
[**apiV1BoxesSendBoxesToBatchPost**](BoxesApi.md#apiV1BoxesSendBoxesToBatchPost) | **POST** /api/v1/boxes/send_boxes_to_batch | # Отправить набор коробок в партию.
[**apiV1BoxesSplitPost**](BoxesApi.md#apiV1BoxesSplitPost) | **POST** /api/v1/boxes/split | # Разделить коробку.
[**apiV1BoxesStorekeepersGuidPatch**](BoxesApi.md#apiV1BoxesStorekeepersGuidPatch) | **PATCH** /api/v1/boxes/storekeepers/{guid} | # Изменить коробку сотрудником склада.



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
  'body': new TestSwagger.InlineObject12() // InlineObject12 | 
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
 **body** | [**InlineObject12**](InlineObject12.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1BoxesByOrderGuidGuidGet

> [ApiV1AdminsTasksBoxesBefore] apiV1BoxesByOrderGuidGuidGet(guid, opts)

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
let guid = "guid_example"; // String | GUID
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
 **guid** | **String**| GUID | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[ApiV1AdminsTasksBoxesBefore]**](ApiV1AdminsTasksBoxesBefore.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1BoxesByProductGuidGuidGet

> [ApiV1AdminsTasksBoxesBefore] apiV1BoxesByProductGuidGuidGet(guid, opts)

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
let guid = "guid_example"; // String | GUID
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
 **guid** | **String**| GUID | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[ApiV1AdminsTasksBoxesBefore]**](ApiV1AdminsTasksBoxesBefore.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1BoxesCalculateBoxDeliveryCostsInBatchPost

> [Object] apiV1BoxesCalculateBoxDeliveryCostsInBatchPost(opts)

# Рассчитать стоимость доставки коробов.

## Рассчитать стоимость доставки коробов.   

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
  'body': new TestSwagger.InlineObject14() // InlineObject14 | 
};
apiInstance.apiV1BoxesCalculateBoxDeliveryCostsInBatchPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject14**](InlineObject14.md)|  | [optional] 

### Return type

**[Object]**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
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
  'body': new TestSwagger.InlineObject7() // InlineObject7 | 
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
 **body** | [**InlineObject7**](InlineObject7.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


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
let guid = "guid_example"; // String | GUID коробки, объединение которой нужно отменить
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
 **guid** | **String**| GUID коробки, объединение которой нужно отменить | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


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
  'body': new TestSwagger.InlineObject9() // InlineObject9 | 
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
 **body** | [**InlineObject9**](InlineObject9.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


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
  'body': new TestSwagger.InlineObject11() // InlineObject11 | 
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
 **body** | [**InlineObject11**](InlineObject11.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1BoxesClientsDraftsGet

> [ApiV1AdminsTasksBoxesBefore] apiV1BoxesClientsDraftsGet(opts)

# Получить черновики коробок и их строки по текущему клиенту.

## Получить черновики коробок и их строки по текущему клиенту.   ## GUID клиента получаем из токена.   

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
apiInstance.apiV1BoxesClientsDraftsGet(opts).then((data) => {
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

[**[ApiV1AdminsTasksBoxesBefore]**](ApiV1AdminsTasksBoxesBefore.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1BoxesClientsGet

> [ApiV1AdminsTasksBoxesBefore] apiV1BoxesClientsGet(opts)

# Получить коробки и их строки по текущему клиенту.

## Получить коробки(без черновиков) и их строки по текущему клиенту. (Без отправленных в партию)  ## GUID клиента получаем из токена.   

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
apiInstance.apiV1BoxesClientsGet(opts).then((data) => {
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

[**[ApiV1AdminsTasksBoxesBefore]**](ApiV1AdminsTasksBoxesBefore.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1BoxesClientsSentToBatchGet

> [ApiV1AdminsTasksBoxesBefore] apiV1BoxesClientsSentToBatchGet(opts)

# Получить коробки по текущему клиенту отправленные в партию.

## Получить коробки по текущему клиенту отправленные в партию.  ## GUID клиента получаем из токена.   

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

[**[ApiV1AdminsTasksBoxesBefore]**](ApiV1AdminsTasksBoxesBefore.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1BoxesDraftsGet

> [ApiV1AdminsTasksBoxesBefore] apiV1BoxesDraftsGet(opts)

# Получить черновики коробок и их строки.

## Получить черновики коробок и их строки.   

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
apiInstance.apiV1BoxesDraftsGet(opts).then((data) => {
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

[**[ApiV1AdminsTasksBoxesBefore]**](ApiV1AdminsTasksBoxesBefore.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1BoxesEditGuidPost

> InlineResponse2012 apiV1BoxesEditGuidPost(guid, opts)

# Отредактировать коробку.

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
  'body': new TestSwagger.InlineObject6() // InlineObject6 | 
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
 **body** | [**InlineObject6**](InlineObject6.md)|  | [optional] 

### Return type

[**InlineResponse2012**](InlineResponse2012.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1BoxesGet

> [ApiV1AdminsTasksBoxesBefore] apiV1BoxesGet(opts)

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

[**[ApiV1AdminsTasksBoxesBefore]**](ApiV1AdminsTasksBoxesBefore.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1BoxesGuidDelete

> String apiV1BoxesGuidDelete(guid, opts)

# Удалить коробку.

## Удалить коробку.  

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
let guid = "guid_example"; // String | GUID для которой подтверждаем действие.
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1BoxesGuidDelete(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| GUID для которой подтверждаем действие. | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1BoxesMergePost

> InlineResponse2012 apiV1BoxesMergePost(opts)

# Объединить две и более коробок.

## Объединить две и более коробок.   

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
  'body': new TestSwagger.InlineObject8() // InlineObject8 | 
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
 **body** | [**InlineObject8**](InlineObject8.md)|  | [optional] 

### Return type

[**InlineResponse2012**](InlineResponse2012.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1BoxesPost

> InlineResponse2011 apiV1BoxesPost(opts)

# Создать коробку и ее строки.

## Создать коробку и ее строки.   ## Коробка состоит из шапки и строк (как накладная)   ## Коллекция Boxes содержит основные параметры коробки.   ## BoxesItems - коллекция которая содержит строки позиций в коробке.            У коробок есть еще такие параметры:            isActual - если false, то коробка удалена.            isDraft - если true, то коробка является черновиком. Его создал клиента при объеденении / разделении коробки            У клиента и у сотрудника склада их можно отфильтровать и обрабатывать в отдельном окне.         Сотрудник склада обработав позитивно изменение коробок от клиента просто ставит здесь (isDraft) false и коробка становится обычной.         Также у коробки созданной из других коробок заполнено поле parents. Это массив guid родительских коробок.         При отмене объединения коробок в базе по этим guid восстановим коробки isActual &#x3D; true. А новые будут удалены isActual &#x3D; false.         Также у коробки созданной при объединении/разделении будет заполнено поле brothers. Это guid других коробок которые были созданы вместе с этой из общих родителей.         Когда для любой из объединённых коробок будет запрошено удаление, восстановим старые коробки и кроме текущей коробки         будут удалены все ее братья.         

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
  'body': new TestSwagger.InlineObject5() // InlineObject5 | 
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
 **body** | [**InlineObject5**](InlineObject5.md)|  | [optional] 

### Return type

[**InlineResponse2011**](InlineResponse2011.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1BoxesRequestSendBoxesToBatchPost

> String apiV1BoxesRequestSendBoxesToBatchPost(opts)

# Запросить отправку набора коробок в партию.

## Запросить отправку набора коробок в партию.   при выполнении этого запроса у всех этих коробок поле sendToBatch должно выставиться в true.  Так же с клиента должны списаться деньги в пользу сотрудника склада.(и генерироваться оплаты) Проверки:  У каждой коробки поля clientId и storekeeperId должны быть заполнены.

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
  'body': new TestSwagger.InlineObject16() // InlineObject16 | 
};
apiInstance.apiV1BoxesRequestSendBoxesToBatchPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject16**](InlineObject16.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1BoxesSendBoxesToBatchPost

> String apiV1BoxesSendBoxesToBatchPost(opts)

# Отправить набор коробок в партию.

## Отправить набор коробок в партию.   Этот метод будет дергать склад и передавать в него массив id коробок, после этого метода у коробок sendToBatchComplete должен измениться на true

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
  'body': new TestSwagger.InlineObject15() // InlineObject15 | 
};
apiInstance.apiV1BoxesSendBoxesToBatchPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject15**](InlineObject15.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


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
  'body': new TestSwagger.InlineObject10() // InlineObject10 | 
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
 **body** | [**InlineObject10**](InlineObject10.md)|  | [optional] 

### Return type

**[String]**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1BoxesStorekeepersGuidPatch

> String apiV1BoxesStorekeepersGuidPatch(guid, opts)

# Изменить коробку сотрудником склада.

## Изменить коробку сотрудником склада.            Сотрудник склада не может редактировать содержание коробки, но ему доступно для         редактирования параметры коробки.         

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
let guid = "guid_example"; // String | 
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject13() // InlineObject13 | 
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
 **guid** | **String**|  | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject13**](InlineObject13.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html

