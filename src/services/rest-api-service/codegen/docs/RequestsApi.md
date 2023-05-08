# TestSwagger.RequestsApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1RequestsCalculateRequestCostGuidGet**](RequestsApi.md#apiV1RequestsCalculateRequestCostGuidGet) | **GET** /api/v1/requests/calculate_request_cost/{guid} | Получить детализацию стоимости заявки
[**apiV1RequestsCustomGet**](RequestsApi.md#apiV1RequestsCustomGet) | **GET** /api/v1/requests/custom/ | Получить все уникальные заявки для исполнителя.
[**apiV1RequestsCustomGuidGet**](RequestsApi.md#apiV1RequestsCustomGuidGet) | **GET** /api/v1/requests/custom/{guid} | Получить уникальную заявку по его guid.
[**apiV1RequestsCustomGuidPatch**](RequestsApi.md#apiV1RequestsCustomGuidPatch) | **PATCH** /api/v1/requests/custom/{guid} | #  Изменить заявку.
[**apiV1RequestsCustomPost**](RequestsApi.md#apiV1RequestsCustomPost) | **POST** /api/v1/requests/custom/ | # Создать универсальную заявку.
[**apiV1RequestsGet**](RequestsApi.md#apiV1RequestsGet) | **GET** /api/v1/requests/ | Получить список заявок
[**apiV1RequestsGuidAbortPatch**](RequestsApi.md#apiV1RequestsGuidAbortPatch) | **PATCH** /api/v1/requests/{guid}/abort | # Прервать прием предложений.
[**apiV1RequestsGuidCancelByCreatorPatch**](RequestsApi.md#apiV1RequestsGuidCancelByCreatorPatch) | **PATCH** /api/v1/requests/{guid}/cancel_by_creator | # Отменить заявку создателем
[**apiV1RequestsGuidDelete**](RequestsApi.md#apiV1RequestsGuidDelete) | **DELETE** /api/v1/requests/{guid} | # (возможно данные метод не нужен) Удалить заявку по его GUID.
[**apiV1RequestsGuidPickupPost**](RequestsApi.md#apiV1RequestsGuidPickupPost) | **POST** /api/v1/requests/{guid}/pickup | # Этот метод вызывает тот кто бронирует место в заявке.
[**apiV1RequestsGuidToPublishPatch**](RequestsApi.md#apiV1RequestsGuidToPublishPatch) | **PATCH** /api/v1/requests/{guid}/to_publish | #  Опубликовать заявку.
[**apiV1RequestsGuidUpdateDeadlinePatch**](RequestsApi.md#apiV1RequestsGuidUpdateDeadlinePatch) | **PATCH** /api/v1/requests/{guid}/update_deadline | # Обновить дедлайн, вернуть из статуса EXPIRED
[**apiV1RequestsMediaGuidDelete**](RequestsApi.md#apiV1RequestsMediaGuidDelete) | **DELETE** /api/v1/requests/media/{guid} | #  Удалить исходник.
[**apiV1RequestsMediaGuidGet**](RequestsApi.md#apiV1RequestsMediaGuidGet) | **GET** /api/v1/requests/media/{guid} | #  Получить медиа.
[**apiV1RequestsMediaGuidPatch**](RequestsApi.md#apiV1RequestsMediaGuidPatch) | **PATCH** /api/v1/requests/media/{guid} | #  Изменить медиа.
[**apiV1RequestsMediaManyPatch**](RequestsApi.md#apiV1RequestsMediaManyPatch) | **PATCH** /api/v1/requests/media/many | #  Изменить медиа.
[**apiV1RequestsMediaPost**](RequestsApi.md#apiV1RequestsMediaPost) | **POST** /api/v1/requests/media | #  Создать медиа.



## apiV1RequestsCalculateRequestCostGuidGet

> InlineResponse20058 apiV1RequestsCalculateRequestCostGuidGet(guid, opts)

Получить детализацию стоимости заявки

##  Получить детализацию стоимости заявки.  Перед публикованием заявки, нужно уведомить пользователя стоимости. Точность до сотых, (0.01$)   Проверки: Только владелец заявки может вызывать данный метод Только для заявок  со статусами DRAFT или FORBID_NEW_PROPOSALS.

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
let guid = null; // String | GUID в БД
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
 **guid** | [**String**](.md)| GUID в БД | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**InlineResponse20058**](InlineResponse20058.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1RequestsCustomGet

> [InlineResponse20076] apiV1RequestsCustomGet(guid, opts)

Получить все уникальные заявки для исполнителя.

## Получить все уникальные заявки для исполнителя.   

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
let guid = null; // String | GUID в сущности в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1RequestsCustomGet(guid, opts).then((data) => {
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

[**[InlineResponse20076]**](InlineResponse20076.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1RequestsCustomGuidGet

> InlineResponse20077 apiV1RequestsCustomGuidGet(guid, opts)

Получить уникальную заявку по его guid.

Получить уникальную заявку по его guid.   

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
let guid = null; // String | GUID в сущности в БД
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
 **guid** | [**String**](.md)| GUID в сущности в БД | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**InlineResponse20077**](InlineResponse20077.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1RequestsCustomGuidPatch

> String apiV1RequestsCustomGuidPatch(guid, opts)

#  Изменить заявку.

## Изменить заявку.   Цена будет округлена на до 0,01$   Проверки: Только владелец может редактировать заявку  Проверка на статус, статус должен быть DRAFT или PUBLISHED..

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
let guid = null; // String | GUID в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject130() // InlineObject130 | 
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
 **guid** | [**String**](.md)| GUID в БД | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject130**](InlineObject130.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1RequestsCustomPost

> InlineResponse2017 apiV1RequestsCustomPost(opts)

# Создать универсальную заявку.

## Создать универсальную заявку.   Цена будет округлена на до 0,01$   Роли которые могут работать с заявками клиент, фрилансер и супервайзер  Проверки: пока нет проверки (Цена за предложение не должно быть меньше установленного в админке.)

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
  'body': new TestSwagger.InlineObject129() // InlineObject129 | 
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
 **body** | [**InlineObject129**](InlineObject129.md)|  | [optional] 

### Return type

[**InlineResponse2017**](InlineResponse2017.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1RequestsGet

> [InlineResponse20059] apiV1RequestsGet(type, kind, opts)

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
let kind = "kind_example"; // String | Виды заявок:             VACANT - все заявки со статусом TO_PUBLISH и IN_PROCESS, + должны быть свободные слоты для предложений.             Фильтрует по ролям доступных для заявки.             Срыты заявки созданые тем кто вызвал данный метод.             MY - все заявки созданные тем кто вызывает метод,               countProposalsByStatuses: {                 allProposals: - предложения со статусами CREATED,OFFER_CONDITIONS_REJECTED,OFFER_CONDITIONS_CORRECTED,OFFER_CONDITIONS_ACCEPTED,READY_TO_VERIFY,VERIFYING_BY_SUPERVISOR,TO_CORRECT,CORRECTED,ACCEPTED_BY_CLIENT,ACCEPTED_BY_SUPERVISOR,                 waitedProposals: - предложения со статусами READY_TO_VERIFY,                 atWorkProposals: - предложения со статусами OFFER_CONDITIONS_ACCEPTED,READY_TO_VERIFY,VERIFYING_BY_SUPERVISOR,TO_CORRECT,CORRECTED,                 verifyingProposals: - предложения со статусами VERIFYING_BY_SUPERVISOR,                 acceptedProposals: - предложения со статусами ACCEPTED_BY_CLIENT,ACCEPTED_BY_SUPERVISOR               }             PICKUPED_BY_ME - все заявки где числится как исполнитель тот кто вызывает метод,             ALL - абсолютно все заявки, без исключения,             ASSIGNED_TO_ME - пока не реализовано.
let opts = {
  'typeTask': "typeTask_example", // String | Спецификация для запроса
  'productId': null, // String | Гуид продукта
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
 **kind** | **String**| Виды заявок:             VACANT - все заявки со статусом TO_PUBLISH и IN_PROCESS, + должны быть свободные слоты для предложений.             Фильтрует по ролям доступных для заявки.             Срыты заявки созданые тем кто вызвал данный метод.             MY - все заявки созданные тем кто вызывает метод,               countProposalsByStatuses: {                 allProposals: - предложения со статусами CREATED,OFFER_CONDITIONS_REJECTED,OFFER_CONDITIONS_CORRECTED,OFFER_CONDITIONS_ACCEPTED,READY_TO_VERIFY,VERIFYING_BY_SUPERVISOR,TO_CORRECT,CORRECTED,ACCEPTED_BY_CLIENT,ACCEPTED_BY_SUPERVISOR,                 waitedProposals: - предложения со статусами READY_TO_VERIFY,                 atWorkProposals: - предложения со статусами OFFER_CONDITIONS_ACCEPTED,READY_TO_VERIFY,VERIFYING_BY_SUPERVISOR,TO_CORRECT,CORRECTED,                 verifyingProposals: - предложения со статусами VERIFYING_BY_SUPERVISOR,                 acceptedProposals: - предложения со статусами ACCEPTED_BY_CLIENT,ACCEPTED_BY_SUPERVISOR               }             PICKUPED_BY_ME - все заявки где числится как исполнитель тот кто вызывает метод,             ALL - абсолютно все заявки, без исключения,             ASSIGNED_TO_ME - пока не реализовано. | 
 **typeTask** | **String**| Спецификация для запроса | [optional] 
 **productId** | [**String**](.md)| Гуид продукта | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse20059]**](InlineResponse20059.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1RequestsGuidAbortPatch

> String apiV1RequestsGuidAbortPatch(guid, opts)

# Прервать прием предложений.

## Прервать прием предложений.  При вызове этого метода клиент прекращает прием предложений, статус меняется на FORBID_NEW_PROPOSALS  Проверки: Только владелец заявки может вызывать данный метод Только для заявок  со статусами PUBLISHED, IN_PROGRESS

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
  'body': new TestSwagger.InlineObject96() // InlineObject96 | 
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
 **body** | [**InlineObject96**](InlineObject96.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1RequestsGuidCancelByCreatorPatch

> String apiV1RequestsGuidCancelByCreatorPatch(guid, opts)

# Отменить заявку создателем

## УОтменить заявку создателем.    Заявку можно отменить только если статус DRAFT или PUBLISHED. Только владелец может отменить заявку  

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
let guid = null; // String | GUID в сущности в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1RequestsGuidCancelByCreatorPatch(guid, opts).then((data) => {
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


## apiV1RequestsGuidDelete

> String apiV1RequestsGuidDelete(guid, opts)

# (возможно данные метод не нужен) Удалить заявку по его GUID.

## Удалить заявку по его GUIDD.    Заявку можно удалить только если статус DRAFT или PUBLISHED. Только владелец может удалить заявку  

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
let guid = null; // String | GUID в сущности в БД
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
 **guid** | [**String**](.md)| GUID в сущности в БД | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1RequestsGuidPickupPost

> InlineResponse20112 apiV1RequestsGuidPickupPost(guid, opts)

# Этот метод вызывает тот кто бронирует место в заявке.

## Этот метод вызывает тот кто бронирует место в заявке.  При первом бронировании статус заявка меняется с PUBLISHED на IN_PROGRESS. В зависимости от типа заявки создается предложение и его детали, статус предложения CREATED  ## Создается чат и добавляется клиент и исполнитель  Проверки: Можно бронировать только заявки со статусами: PUBLISHED, IN_PROCESS Владелец заявки не может отправлять себе предложения.  Если роль пользователя нет в списке roles заявки, то не может забронировать Если есть ограничение по количеству предложений maxAmountOfProposals !&#x3D;&#x3D; null  Количество активных (принятых + в работе) предложений меньше чем ограничение клиента на эту заявку. Активные предложения имеют статусы:  CREATED OFFER_CONDITIONS_REJECTED OFFER_CONDITIONS_CORRECTED OFFER_CONDITIONS_ACCEPTED READY_TO_VERIFY VERIFYING_BY_SUPERVISOR TO_CORRECT CORRECTED ACCEPTED_BY_CLIENT ACCEPTED_BY_SUPERVISOR  Если у данной заявки есть незавершенные предложения от данного пользователя Незавершенные предложения имеют статусы:  CREATED OFFER_CONDITIONS_REJECTED OFFER_CONDITIONS_CORRECTED OFFER_CONDITIONS_ACCEPTED READY_TO_VERIFY VERIFYING_BY_SUPERVISOR TO_CORRECT CORRECTED

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
let guid = null; // String | GUID в сущности в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject95() // InlineObject95 | 
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
 **guid** | [**String**](.md)| GUID в сущности в БД | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject95**](InlineObject95.md)|  | [optional] 

### Return type

[**InlineResponse20112**](InlineResponse20112.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1RequestsGuidToPublishPatch

> String apiV1RequestsGuidToPublishPatch(guid, opts)

#  Опубликовать заявку.

## Опубликовать заявку.   Статус поменяется на PUBLISHED. ## Важно!! Для избежания проблем связанных с изменением состояния заявки, с того момента когда пользователь  ## получил детализацию из калькулятора стоимости заявки и до момента вызова данного метода,  для подтверждения нужно вернуть totalCost Проверки:  Публиковать можно только заявки со статусом DRAFT и FORBID_NEW_PROPOSALS. Только владелец может опубликовать. Проверка изменения totalCost

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
let guid = null; // String | GUID в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject93() // InlineObject93 | 
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
 **guid** | [**String**](.md)| GUID в БД | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject93**](InlineObject93.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1RequestsGuidUpdateDeadlinePatch

> String apiV1RequestsGuidUpdateDeadlinePatch(guid, opts)

# Обновить дедлайн, вернуть из статуса EXPIRED

Обновить дедлайн, вернуть из статуса EXPIRED

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
let guid = null; // String | GUID в сущности в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject94() // InlineObject94 | 
};
apiInstance.apiV1RequestsGuidUpdateDeadlinePatch(guid, opts).then((data) => {
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
 **body** | [**InlineObject94**](InlineObject94.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1RequestsMediaGuidDelete

> String apiV1RequestsMediaGuidDelete(guid, opts)

#  Удалить исходник.

## Удалить исходник

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
let guid = null; // String | GUID в сущности в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1RequestsMediaGuidDelete(guid, opts).then((data) => {
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


## apiV1RequestsMediaGuidGet

> [InlineResponse20060] apiV1RequestsMediaGuidGet(guid, opts)

#  Получить медиа.

## Получить медиа

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
apiInstance.apiV1RequestsMediaGuidGet(guid, opts).then((data) => {
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

[**[InlineResponse20060]**](InlineResponse20060.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1RequestsMediaGuidPatch

> String apiV1RequestsMediaGuidPatch(guid, opts)

#  Изменить медиа.

## Изменить медиа

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
let guid = null; // String | GUID в сущности в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject97() // InlineObject97 | 
};
apiInstance.apiV1RequestsMediaGuidPatch(guid, opts).then((data) => {
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
 **body** | [**InlineObject97**](InlineObject97.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1RequestsMediaManyPatch

> String apiV1RequestsMediaManyPatch(opts)

#  Изменить медиа.

## Изменить медиа

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
  'body': [new TestSwagger.InlineObject5()] // [InlineObject5] | 
};
apiInstance.apiV1RequestsMediaManyPatch(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**[InlineObject5]**](InlineObject5.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1RequestsMediaPost

> InlineResponse20113 apiV1RequestsMediaPost(opts)

#  Создать медиа.

## Создать медиа

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
  'body': new TestSwagger.InlineObject98() // InlineObject98 | 
};
apiInstance.apiV1RequestsMediaPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject98**](InlineObject98.md)|  | [optional] 

### Return type

[**InlineResponse20113**](InlineResponse20113.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

