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



## apiV1RequestsCalculateRequestCostGuidGet

> InlineResponse20049 apiV1RequestsCalculateRequestCostGuidGet(guid, opts)

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

[**InlineResponse20049**](InlineResponse20049.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1RequestsCustomGet

> [InlineResponse20062] apiV1RequestsCustomGet(guid, opts)

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

[**[InlineResponse20062]**](InlineResponse20062.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1RequestsCustomGuidGet

> InlineResponse20063 apiV1RequestsCustomGuidGet(guid, opts)

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

[**InlineResponse20063**](InlineResponse20063.md)

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
  'body': new TestSwagger.InlineObject112() // InlineObject112 | 
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
 **body** | [**InlineObject112**](InlineObject112.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1RequestsCustomPost

> InlineResponse2016 apiV1RequestsCustomPost(opts)

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
  'body': new TestSwagger.InlineObject111() // InlineObject111 | 
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
 **body** | [**InlineObject111**](InlineObject111.md)|  | [optional] 

### Return type

[**InlineResponse2016**](InlineResponse2016.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1RequestsGet

> [InlineResponse20050] apiV1RequestsGet(type, kind, opts)

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
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse20050]**](InlineResponse20050.md)

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
  'body': new TestSwagger.InlineObject86() // InlineObject86 | 
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
 **body** | [**InlineObject86**](InlineObject86.md)|  | [optional] 

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

> InlineResponse2019 apiV1RequestsGuidPickupPost(guid, opts)

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
  'body': new TestSwagger.InlineObject85() // InlineObject85 | 
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
 **body** | [**InlineObject85**](InlineObject85.md)|  | [optional] 

### Return type

[**InlineResponse2019**](InlineResponse2019.md)

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
  'body': new TestSwagger.InlineObject84() // InlineObject84 | 
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
 **body** | [**InlineObject84**](InlineObject84.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

