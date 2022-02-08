# TestSwagger.RequestsApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1RequestsCalculateRequestCostGuidGet**](RequestsApi.md#apiV1RequestsCalculateRequestCostGuidGet) | **GET** /api/v1/requests/calculate_request_cost/{guid} | Получить детализации стоимости заявки
[**apiV1RequestsCustomGuidGet**](RequestsApi.md#apiV1RequestsCustomGuidGet) | **GET** /api/v1/requests/custom/{guid} | Получить кастомную заявку по его guid.
[**apiV1RequestsCustomGuidPatch**](RequestsApi.md#apiV1RequestsCustomGuidPatch) | **PATCH** /api/v1/requests/custom/{guid} | #  Изменить заявку.
[**apiV1RequestsCustomPost**](RequestsApi.md#apiV1RequestsCustomPost) | **POST** /api/v1/requests/custom/ | # Создать кастомную заявку.
[**apiV1RequestsGet**](RequestsApi.md#apiV1RequestsGet) | **GET** /api/v1/requests/ | Получить список заявок
[**apiV1RequestsGuidAbortPatch**](RequestsApi.md#apiV1RequestsGuidAbortPatch) | **PATCH** /api/v1/requests/{guid}/abort | # Прервать прием предложений.
[**apiV1RequestsGuidDelete**](RequestsApi.md#apiV1RequestsGuidDelete) | **DELETE** /api/v1/requests/{guid} | # Удалить заявку по его GUID.
[**apiV1RequestsGuidPickupPost**](RequestsApi.md#apiV1RequestsGuidPickupPost) | **POST** /api/v1/requests/{guid}/pickup | # Этот метод вызывает тот кто бронирует место в заявке.
[**apiV1RequestsGuidToPublishPatch**](RequestsApi.md#apiV1RequestsGuidToPublishPatch) | **PATCH** /api/v1/requests/{guid}/to_publish | #  Опубликовать заявку.



## apiV1RequestsCalculateRequestCostGuidGet

> InlineResponse20011 apiV1RequestsCalculateRequestCostGuidGet(guid, opts)

Получить детализации стоимости заявки

Получить детализации стоимости заявки.  ## Перед публикованием заявки нужно уведомить пользователя. Для заявок с статусом CREATED выдает детализацию для всех предложений.  ## Перед отменой заявки клиентом, нужно уведомить пользователя что придется все активные предложения принять и оплатить.  Для заявок с статусом IN_PROCESS выдает детализацию для всех незавершенных предложений. Незавершенные предложения имеют статусы:  EMPTY, CREATED, READY_TO_VERIFY, TO_CORRECT, CORRECTED, VERIFYING_BY_SUPERVISOR## Точность до сотых, (0.01$)   Проверки: Только владелец заявки может вызывать данный метод Только для заявок  со статусами CREATED, IN_PROCESS.

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.RequestsApi();
let guid = "guid_example"; // String | GUID в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1RequestsCalculateRequestCostGuidGet(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| GUID в БД | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**InlineResponse20011**](InlineResponse20011.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1RequestsCustomGuidGet

> InlineResponse20017 apiV1RequestsCustomGuidGet(guid, opts)

Получить кастомную заявку по его guid.

Получить кастомную заявку по его guid.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.RequestsApi();
let guid = "guid_example"; // String | GUID в сущности в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1RequestsCustomGuidGet(guid, opts).then((data) => {
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

### Return type

[**InlineResponse20017**](InlineResponse20017.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1RequestsCustomGuidPatch

> String apiV1RequestsCustomGuidPatch(guid, opts)

#  Изменить заявку.

## Изменить заявку.   Проверка на статус, статус должен быть CREATED или TO_PUBLISH. ## Важно!!!, если заявка была ранее опубликована, и еще не имеет предложений (TO_PUBLISH) статус вернется на CREATED, замороженные средства будут возвращены, нужно снова публиковать Проверки: Только владелец может редактировать заявку  Цена за предложение не может быть ниже установленного минимума.

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.RequestsApi();
let guid = "guid_example"; // String | GUID в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject51() // InlineObject51 | 
};
apiInstance.apiV1RequestsCustomGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| GUID в БД | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject51**](InlineObject51.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1RequestsCustomPost

> InlineResponse2014 apiV1RequestsCustomPost(opts)

# Создать кастомную заявку.

## Создать кастомную заявку. Проверки: Цена за предложение не должно быть меньше установленного.

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.RequestsApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject50() // InlineObject50 | 
};
apiInstance.apiV1RequestsCustomPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject50**](InlineObject50.md)|  | [optional] 

### Return type

[**InlineResponse2014**](InlineResponse2014.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1RequestsGet

> [InlineResponse20012] apiV1RequestsGet(type, kind, opts)

Получить список заявок

Метод должен выдавать заявки в зависимости от query params.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.RequestsApi();
let type = "type_example"; // String | Тип заявки
let kind = "kind_example"; // String | Виды заявок:             VACANT - все заявки со статусом TO_PUBLISH и IN_PROCESS, + должны быть свободные слоты для предложений.             MY - все заявки созданные тем кто вызывает метод,             PICKUPED_BY_ME - все заявки где числится как исполнитель тот кто вызывает метод,             ALL - абсолютно все заявки, без исключения,             ASSIGNED_TO_ME - пока не реализовано.
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1RequestsGet(type, kind, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **type** | **String**| Тип заявки | 
 **kind** | **String**| Виды заявок:             VACANT - все заявки со статусом TO_PUBLISH и IN_PROCESS, + должны быть свободные слоты для предложений.             MY - все заявки созданные тем кто вызывает метод,             PICKUPED_BY_ME - все заявки где числится как исполнитель тот кто вызывает метод,             ALL - абсолютно все заявки, без исключения,             ASSIGNED_TO_ME - пока не реализовано. | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse20012]**](InlineResponse20012.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1RequestsGuidAbortPatch

> String apiV1RequestsGuidAbortPatch(guid, opts)

# Прервать прием предложений.

## Прервать прием предложений.  При вызове этого метода клиент прекращает прием предложений, статус меняется на CANCELED  Все незавершенные предложения будут приняты и оплачены.   ## Важно!! Для избежания проблем связанных с изменением состояния заявки, с того момента когда пользователь  ## получил детализацию из калькулятора стоимости заявки и принятия решения,  для подтверждения нужно вернуть totalCost Остаток средств будет возвращен на баланс. NНезавершенные предложения имеют статусы:  EMPTY, CREATED, READY_TO_VERIFY, TO_CORRECT, CORRECTED, VERIFYING_BY_SUPERVISOR Проверки: Только владелец заявки может вызывать данный метод Только для заявок  со статусами IN_PROCESS,  Проверка изменения totalCost

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.RequestsApi();
let guid = "guid_example"; // String | GUID в сущности в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject37() // InlineObject37 | 
};
apiInstance.apiV1RequestsGuidAbortPatch(guid, opts).then((data) => {
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
 **body** | [**InlineObject37**](InlineObject37.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1RequestsGuidDelete

> String apiV1RequestsGuidDelete(guid, opts)

# Удалить заявку по его GUID.

## Удалить заявку по его GUIDD.    Заявку можно удалить только если статус TO_PUBLISH или CREATED. Замороженные средства будут возвращены!!! Только владелец может удалить заявку  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.RequestsApi();
let guid = "guid_example"; // String | GUID в сущности в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1RequestsGuidDelete(guid, opts).then((data) => {
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

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1RequestsGuidPickupPost

> InlineResponse2016 apiV1RequestsGuidPickupPost(guid, opts)

# Этот метод вызывает тот кто бронирует место в заявке.

## Этот метод вызывает тот кто бронирует место в заявке.  При первом бронировании статус меняется с TO_PUBLISH на IN_PROGRESS. В зависимости от типа заявки создается предложение и его детали, статуc предложения EMPTY Проверки: Владелец заявки не может отправлять себе предложения. Количество активных предложений меньше чем ограничение клиента на эту заявку. Активные предложения имеют статусы:  EMPTY, CREATED, READY_TO_VERIFY, TO_CORRECT, CORRECTED, VERIFYING_BY_SUPERVISOR, ACCEPTED_BY_CLIENT, ACCEPTED_BY_SUPERVISOR Если у данной заявки есть незавершенные предложения от данного пользователя Незавершенные предложения имеют статусы:  EMPTY, CREATED, READY_TO_VERIFY, TO_CORRECT, CORRECTED, VERIFYING_BY_SUPERVISOR

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.RequestsApi();
let guid = "guid_example"; // String | GUID в сущности в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': null // Object | 
};
apiInstance.apiV1RequestsGuidPickupPost(guid, opts).then((data) => {
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
 **body** | **Object**|  | [optional] 

### Return type

[**InlineResponse2016**](InlineResponse2016.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1RequestsGuidToPublishPatch

> String apiV1RequestsGuidToPublishPatch(guid, opts)

#  Опубликовать заявку.

## Опубликовать заявку.   Статус поменяется на TO_PUBLISH. Будут заморожены средства на оплату предложений к заявке ## Важно!! Для избежания проблем связанных с изменением состояния заявки, с того момента когда пользователь  ## получил детализацию из калькулятора стоимости заявки и до момента вызова данного метода,  для подтверждения нужно вернуть totalCost Проверки:  Публиковать можно только заявки со статусом CREATED. Только владелец может опубликовать. Проверка изменения totalCost

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.RequestsApi();
let guid = "guid_example"; // String | GUID в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject36() // InlineObject36 | 
};
apiInstance.apiV1RequestsGuidToPublishPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| GUID в БД | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject36**](InlineObject36.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

