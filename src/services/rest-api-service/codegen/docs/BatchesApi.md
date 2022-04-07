# TestSwagger.BatchesApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1BatchesCalculateBoxDeliveryCostsInBatchPost**](BatchesApi.md#apiV1BatchesCalculateBoxDeliveryCostsInBatchPost) | **POST** /api/v1/batches/calculate_box_delivery_costs_in_batch | # Рассчитать стоимость доставки коробов.
[**apiV1BatchesGet**](BatchesApi.md#apiV1BatchesGet) | **GET** /api/v1/batches/ | # Получить партии....
[**apiV1BatchesGuidAddBoxesPatch**](BatchesApi.md#apiV1BatchesGuidAddBoxesPatch) | **PATCH** /api/v1/batches/{guid}/add_boxes | # Добавить коробки в партию.
[**apiV1BatchesGuidBatchHasDispatchedPatch**](BatchesApi.md#apiV1BatchesGuidBatchHasDispatchedPatch) | **PATCH** /api/v1/batches/{guid}/batch_has_dispatched | # Выставить статус отбытия партии из склада.
[**apiV1BatchesGuidRemoveBoxesPatch**](BatchesApi.md#apiV1BatchesGuidRemoveBoxesPatch) | **PATCH** /api/v1/batches/{guid}/remove_boxes | # Удалить коробки из партии.
[**apiV1BatchesPost**](BatchesApi.md#apiV1BatchesPost) | **POST** /api/v1/batches/ | # Создать партию.
[**apiV1BatchesRequestSendBoxesToBatchPost**](BatchesApi.md#apiV1BatchesRequestSendBoxesToBatchPost) | **POST** /api/v1/batches/request_send_boxes_to_batch | # Запросить отправку набора коробок в партию.



## apiV1BatchesCalculateBoxDeliveryCostsInBatchPost

> [Object] apiV1BatchesCalculateBoxDeliveryCostsInBatchPost(opts)

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
  'body': new TestSwagger.InlineObject8() // InlineObject8 | 
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
 **body** | [**InlineObject8**](InlineObject8.md)|  | [optional] 

### Return type

**[Object]**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1BatchesGet

> [InlineResponse2005] apiV1BatchesGet(opts)

# Получить партии....

## Получить партии. В зависимости от роли:  админ: получает все партии без исключения. клиент: получает все партии в которых есть его коробки. супер: получает все партии без исключения. байер: получает все партии в которых есть его коробки, которые он создал. сторкипер: получает только свои партии. 

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
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse2005]**](InlineResponse2005.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1BatchesGuidAddBoxesPatch

> String apiV1BatchesGuidAddBoxesPatch(guid, opts)

# Добавить коробки в партию.

## Добавить коробки в партию.   В коробки вписывается id партии и статус меняется на IN_BATCH  Проверки:  Доступно только для сторкипера Только партии со статусом IS_BEING_COLLECTED Только коробки которые запросили отправить в партию, REQUESTED_SEND_TO_BATCH В партии все коробки должны быть от данного сторкипера В партии у всех коробок должен быть одинаковый адрес склада прибытия.  В партии все коробки должны быть с одинаковым тариф доставки Наличие шипинг лейбла у всех коробок.

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
  'body': new TestSwagger.InlineObject10() // InlineObject10 | 
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
 **body** | [**InlineObject10**](InlineObject10.md)|  | [optional] 

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

## Выставить статус отбытия партии из склада.   Этот метод будет дергать склад, после этого у коробок партии sendToBatchComplete должен измениться на true.  Статус партии поменяется на \&quot;HAS_DISPATCHED ##  Что делать с запланированной датой отправки scheduledDispatchDate в коробках? Проверки: Сторкипер может только свою партию редактировать Статус партии должен быть ранее \&quot;IS_BEING_COLLECTED\&quot; Проверка коробок: Должна быть хотя бы одна коробка в данной партии. В партии все коробки должны быть от одного сторкипера В партии у всех коробок должен быть одинаковый адрес склада прибытия. (warehouse, складом в Америке) В партии все коробки должны быть с одинаковым методом доставки Все коробки должны быть в статусе sendToBatchRequest &#x3D;&#x3D;&#x3D; true (отправлена для набора в партию) Все коробки должны быть в статусе sendToBatchComplete &#x3D;&#x3D;&#x3D; false (еще не завершена отправка для набора в партию) Наличие шипинг лейбла у всех коробок.

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


## apiV1BatchesGuidRemoveBoxesPatch

> String apiV1BatchesGuidRemoveBoxesPatch(opts)

# Удалить коробки из партии.

## Удалить коробки из партии.   В коробках поле batchId становиться null  Проверки:  Доступно только для сторкипера Только коробки которые есть в партии 

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
apiInstance.apiV1BatchesGuidRemoveBoxesPatch(opts).then((data) => {
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


## apiV1BatchesPost

> InlineResponse201 apiV1BatchesPost(opts)

# Создать партию.

## Создать партию.   При выполнении этого запроса создается партия со статусом IS_BEING_COLLECTED - набирается В коробки вписывается id партии и статус меняется на IN_BATCH  Проверки:  Доступно только для сторкипера Только коробки которые запросили отправить в партию, REQUESTED_SEND_TO_BATCH В партии все коробки должны быть от одного сторкипера В партии у всех коробок должен быть одинаковый адрес склада прибытия. В партии все коробки должны быть с одинаковым тарифом доставки Коробку нельзя повторно добавить в партию Наличие шипинг лейбла у всех коробок.

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
  'body': new TestSwagger.InlineObject7() // InlineObject7 | 
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
 **body** | [**InlineObject7**](InlineObject7.md)|  | [optional] 

### Return type

[**InlineResponse201**](InlineResponse201.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1BatchesRequestSendBoxesToBatchPost

> String apiV1BatchesRequestSendBoxesToBatchPost(opts)

# Запросить отправку набора коробок в партию.

## Запросить отправку набора коробок в партию.   при выполнении этого запроса у всех этих коробок поле статус должно выставиться в REQUESTED_SEND_TO_BATCH.  Так же с клиента должны списаться деньги в пользу сотрудника склада.(и генерироваться оплаты) Проверки:  Доступно только для клиента Коробку нельзя повторно отправлять для набора в партию, статус должен быть IN_STOCK Наличие шипинг лейбла у всех коробок.

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
  'body': new TestSwagger.InlineObject9() // InlineObject9 | 
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
 **body** | [**InlineObject9**](InlineObject9.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

