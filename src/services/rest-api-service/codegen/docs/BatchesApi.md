# TestSwagger.BatchesApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1BatchesArchivePatch**](BatchesApi.md#apiV1BatchesArchivePatch) | **PATCH** /api/v1/batches/archive | # Изменить у массива партий поле archive
[**apiV1BatchesByProductGuidGet**](BatchesApi.md#apiV1BatchesByProductGuidGet) | **GET** /api/v1/batches/by_product/{guid} | # Получить партии по гуиду продукта
[**apiV1BatchesCalculateBoxDeliveryCostsInBatchPost**](BatchesApi.md#apiV1BatchesCalculateBoxDeliveryCostsInBatchPost) | **POST** /api/v1/batches/calculate_box_delivery_costs_in_batch | # Рассчитать стоимость доставки коробов.
[**apiV1BatchesGet**](BatchesApi.md#apiV1BatchesGet) | **GET** /api/v1/batches/ | # Получить партии.
[**apiV1BatchesGuidAddBoxesPatch**](BatchesApi.md#apiV1BatchesGuidAddBoxesPatch) | **PATCH** /api/v1/batches/{guid}/add_boxes | # Добавить коробки в партию.
[**apiV1BatchesGuidBatchHasDispatchedPatch**](BatchesApi.md#apiV1BatchesGuidBatchHasDispatchedPatch) | **PATCH** /api/v1/batches/{guid}/batch_has_dispatched | # Выставить статус отбытия партии из склада.
[**apiV1BatchesGuidEditAttachedDocumentsPatch**](BatchesApi.md#apiV1BatchesGuidEditAttachedDocumentsPatch) | **PATCH** /api/v1/batches/{guid}/edit_attachedDocuments | # Редактировать прикрепленные документы партии.
[**apiV1BatchesGuidGet**](BatchesApi.md#apiV1BatchesGuidGet) | **GET** /api/v1/batches/{guid} | # Получить партии.
[**apiV1BatchesGuidPatch**](BatchesApi.md#apiV1BatchesGuidPatch) | **PATCH** /api/v1/batches/{guid} | # Изменение партии
[**apiV1BatchesGuidRemoveBoxesPatch**](BatchesApi.md#apiV1BatchesGuidRemoveBoxesPatch) | **PATCH** /api/v1/batches/{guid}/remove_boxes | # Удалить коробки из партии.
[**apiV1BatchesPost**](BatchesApi.md#apiV1BatchesPost) | **POST** /api/v1/batches/ | # Создать партию.
[**apiV1BatchesReportBatchIdGet**](BatchesApi.md#apiV1BatchesReportBatchIdGet) | **GET** /api/v1/batches/report/{batchId} | # Получить репорт по партии
[**apiV1BatchesRequestSendBoxesToBatchPost**](BatchesApi.md#apiV1BatchesRequestSendBoxesToBatchPost) | **POST** /api/v1/batches/request_send_boxes_to_batch | # Запросить отправку набора коробок в партию.
[**apiV1BatchesWithFiltersGet**](BatchesApi.md#apiV1BatchesWithFiltersGet) | **GET** /api/v1/batches/with_filters | # Получить партии.



## apiV1BatchesArchivePatch

> String apiV1BatchesArchivePatch(opts)

# Изменить у массива партий поле archive

## Изменить у массива партий поле archive

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BatchesApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject18() // InlineObject18 | 
};
apiInstance.apiV1BatchesArchivePatch(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject18**](InlineObject18.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1BatchesByProductGuidGet

> [InlineResponse20015] apiV1BatchesByProductGuidGet(guid, opts)

# Получить партии по гуиду продукта

## Получить партии по гуиду продукта.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BatchesApi();
let guid = null; // String | GUID продукта.
let opts = {
  'archive': true, // Boolean | Заархивирована ли партия
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1BatchesByProductGuidGet(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID продукта. | 
 **archive** | **Boolean**| Заархивирована ли партия | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse20015]**](InlineResponse20015.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1BatchesCalculateBoxDeliveryCostsInBatchPost

> [InlineResponse20014] apiV1BatchesCalculateBoxDeliveryCostsInBatchPost(opts)

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

let apiInstance = new TestSwagger.BatchesApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject16() // InlineObject16 | 
};
apiInstance.apiV1BatchesCalculateBoxDeliveryCostsInBatchPost(opts).then((data) => {
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

[**[InlineResponse20014]**](InlineResponse20014.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1BatchesGet

> [InlineResponse20012] apiV1BatchesGet(opts)

# Получить партии.

## Получить партии. В зависимости от роли:  админ - получает все партии без исключения.         клиент - получает все партии в которых есть его коробки.         супер: получает все партии без исключения.         байер: получает все партии в которых есть его коробки, которые он создал.         сторкипер: получает только свои партии.

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BatchesApi();
let opts = {
  'status': "status_example", // String | GUID склада который нужно получить.
  'storekeeperId': null, // String | GUID склада который нужно получить.
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1BatchesGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **status** | **String**| GUID склада который нужно получить. | [optional] 
 **storekeeperId** | [**String**](.md)| GUID склада который нужно получить. | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse20012]**](InlineResponse20012.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1BatchesGuidAddBoxesPatch

> String apiV1BatchesGuidAddBoxesPatch(guid, opts)

# Добавить коробки в партию.

## Добавить коробки в партию.   В коробки вписывается id партии и статус меняется на IN_BATCH         Проверки:         Доступно только для сторкипера         Только партии со статусом IS_BEING_COLLECTED         Только коробки которые запросили отправить в партию, REQUESTED_SEND_TO_BATCH,  IN_BATCH         В партии все коробки должны быть от данного сторкипера         В партии у всех коробок должен быть одинаковый адрес склада прибытия.         Актуальный тариф доставки всех коробок.         В партии все коробки должны быть с одинаковым тариф доставки         Наличие шипинг лейбла у всех коробок.

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BatchesApi();
let guid = null; // String | GUID партии.
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject13() // InlineObject13 | 
};
apiInstance.apiV1BatchesGuidAddBoxesPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID партии. | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject13**](InlineObject13.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1BatchesGuidBatchHasDispatchedPatch

> String apiV1BatchesGuidBatchHasDispatchedPatch(guid, opts)

# Выставить статус отбытия партии из склада.

## Выставить статус отбытия партии из склада  Этот метод будет дергать склад,         Статус партии поменяется на HAS_DISPATCHED.         Статус коробок поменяется на IN_BATCH_ON_THE_WAY.         Проверки:         Сторкипер может редактировать только свою партию         Статус партии должен быть ранее: IS_BEING_COLLECTED         В партии должна быть хотя бы одно коробка.         у всех коробок статус должен быть ранее: IN_BATCH         Итоговая цена за доставку должна быть больше 0.

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BatchesApi();
let guid = null; // String | GUID партии.
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1BatchesGuidBatchHasDispatchedPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID партии. | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1BatchesGuidEditAttachedDocumentsPatch

> InlineResponse201 apiV1BatchesGuidEditAttachedDocumentsPatch(guid, opts)

# Редактировать прикрепленные документы партии.

## Редактировать прикрепленные документы партии.   ## Проверки:         Доступно только для сторкипера

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BatchesApi();
let guid = null; // String | GUID партии.
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject17() // InlineObject17 | 
};
apiInstance.apiV1BatchesGuidEditAttachedDocumentsPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID партии. | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject17**](InlineObject17.md)|  | [optional] 

### Return type

[**InlineResponse201**](InlineResponse201.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1BatchesGuidGet

> InlineResponse20012 apiV1BatchesGuidGet(guid, opts)

# Получить партии.

## Получить партии. В зависимости от роли:  админ - получает все партии без исключения.         клиент - получает все партии в которых есть его коробки.         супер: получает все партии без исключения.         байер: получает все партии в которых есть его коробки, которые он создал.         сторкипер: получает только свои партии.

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BatchesApi();
let guid = null; // String | GUID партии.
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1BatchesGuidGet(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID партии. | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**InlineResponse20012**](InlineResponse20012.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1BatchesGuidPatch

> String apiV1BatchesGuidPatch(guid, opts)

# Изменение партии

## Изменение партии   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BatchesApi();
let guid = null; // String | GUID продукта.
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject15() // InlineObject15 | 
};
apiInstance.apiV1BatchesGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID продукта. | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject15**](InlineObject15.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1BatchesGuidRemoveBoxesPatch

> String apiV1BatchesGuidRemoveBoxesPatch(guid, opts)

# Удалить коробки из партии.

## Удалить коробки из партии.   В коробках поле batchId становиться null, и статус возвращается на REQUESTED_SEND_TO_BATCH         Проверки:         Доступно только для сторкипера или клиента владелец коробки.         Только коробки которые есть в партии

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BatchesApi();
let guid = null; // String | GUID партии.
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject14() // InlineObject14 | 
};
apiInstance.apiV1BatchesGuidRemoveBoxesPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID партии. | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject14**](InlineObject14.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1BatchesPost

> InlineResponse201 apiV1BatchesPost(opts)

# Создать партию.

## Создать партию.   При выполнении этого запроса создается партия со статусом IS_BEING_COLLECTED - набирается         В коробки вписывается id партии и статус меняется на IN_BATCH         Проверки:         Доступно только для сторкипера         Только коробки которые запросили отправить в партию, REQUESTED_SEND_TO_BATCH, IN_BATCH         В партии все коробки должны быть от одного сторкипера         В партии у всех коробок должен быть одинаковый адрес склада прибытия.         В партии все коробки должны быть с одинаковым тарифом доставки         Коробку нельзя повторно добавить в партию         Наличие шипинг лейбла у всех коробок.         Актуальный тариф доставки всех коробок.

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BatchesApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject12() // InlineObject12 | 
};
apiInstance.apiV1BatchesPost(opts).then((data) => {
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

[**InlineResponse201**](InlineResponse201.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1BatchesReportBatchIdGet

> File apiV1BatchesReportBatchIdGet(batchId, opts)

# Получить репорт по партии

## Получить репорт по партии.       Возвращает файл xlsx, есть 2 версии       

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BatchesApi();
let batchId = 3.4; // Number | GUID продукта.
let opts = {
  'getOldVer': true, // Boolean | Если true то заполнит старую версию отчета
  'woPicture': true, // Boolean | Не скачивать файлы?
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1BatchesReportBatchIdGet(batchId, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **batchId** | **Number**| GUID продукта. | 
 **getOldVer** | **Boolean**| Если true то заполнит старую версию отчета | [optional] 
 **woPicture** | **Boolean**| Не скачивать файлы? | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**File**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1BatchesRequestSendBoxesToBatchPost

> String apiV1BatchesRequestSendBoxesToBatchPost(opts)

# Запросить отправку набора коробок в партию.

## Запросить отправку набора коробок в партию.  при выполнении этого запроса у всех этих коробок поле статус меняется на  REQUESTED_SEND_TO_BATCH.         У клиента замораживаются средства.         Стоимость доставки записывается в поле deliveryTotalPrice         Проверки:         Доступно только для клиента         Коробку нельзя повторно отправлять для набора в партию, статус должен быть IN_STOCK         Наличие шипинг лейбла у всех коробок.         Актуальный тариф доставки всех коробок.

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BatchesApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject11() // InlineObject11 | 
};
apiInstance.apiV1BatchesRequestSendBoxesToBatchPost(opts).then((data) => {
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
- **Accept**: application/json


## apiV1BatchesWithFiltersGet

> InlineResponse20013 apiV1BatchesWithFiltersGet(status, opts)

# Получить партии.

## Получить партии. В зависимости от роли:  админ - получает все партии без исключения.         клиент - получает все партии в которых есть его коробки.         супер: получает все партии без исключения.         байер: получает все партии в которых есть его коробки, которые он создал.         сторкипер: получает только свои партии.

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BatchesApi();
let status = "status_example"; // String | GUID склада который нужно получить.
let opts = {
  'archive': true, // Boolean | Заархивирована ли партия
  'filters': "filters_example", // String |                Возможные поля: asin:, amazonTitle, skusByClient, orderHumanFriendlyId, trackNumberText, orderItem, humanFriendlyId               Поиск для полей продукта идет через схему Задача -> Коробка -> Айтем коробки -> Продукт               Поиск для полей заказа идет через схему Задача -> Коробка -> Айтем коробки -> Заказ               2 варианта использования:                 1. Фильтр по одному полю:                   [amazonTitle][$eq]=some_title                 2. Фильтр по нескольким полям:                   or[0][amazonTitle][$eq]=some_title;or[1][asin][$eq]=some_asin                     Возвращает партии с коробками с продуктами, в которых amazonTitle равен some_title или asin равен some_asin               2 оператора совпадения:                 $eq - полное совпадение, нечувствителен к регистру                 $contains - наличие данной подстроки в поле, нечувствителен к регистру, предназначен только для строк             
  'limit': 10.0, // Number | Лимит записей для пагинации
  'offset': 0.0, // Number | Смещение для пагинации
  'sortField': "sortField_example", // String | Название поля
  'sortType': "sortType_example", // String | Тип сортировки
  'storekeeperId': null, // String | GUID склада который нужно получить.
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1BatchesWithFiltersGet(status, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **status** | **String**| GUID склада который нужно получить. | 
 **archive** | **Boolean**| Заархивирована ли партия | [optional] 
 **filters** | **String**|                Возможные поля: asin:, amazonTitle, skusByClient, orderHumanFriendlyId, trackNumberText, orderItem, humanFriendlyId               Поиск для полей продукта идет через схему Задача -&gt; Коробка -&gt; Айтем коробки -&gt; Продукт               Поиск для полей заказа идет через схему Задача -&gt; Коробка -&gt; Айтем коробки -&gt; Заказ               2 варианта использования:                 1. Фильтр по одному полю:                   [amazonTitle][$eq]&#x3D;some_title                 2. Фильтр по нескольким полям:                   or[0][amazonTitle][$eq]&#x3D;some_title;or[1][asin][$eq]&#x3D;some_asin                     Возвращает партии с коробками с продуктами, в которых amazonTitle равен some_title или asin равен some_asin               2 оператора совпадения:                 $eq - полное совпадение, нечувствителен к регистру                 $contains - наличие данной подстроки в поле, нечувствителен к регистру, предназначен только для строк              | [optional] 
 **limit** | **Number**| Лимит записей для пагинации | [optional] [default to 10.0]
 **offset** | **Number**| Смещение для пагинации | [optional] [default to 0.0]
 **sortField** | **String**| Название поля | [optional] 
 **sortType** | **String**| Тип сортировки | [optional] 
 **storekeeperId** | [**String**](.md)| GUID склада который нужно получить. | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**InlineResponse20013**](InlineResponse20013.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

