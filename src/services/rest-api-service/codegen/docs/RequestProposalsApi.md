# TestSwagger.RequestProposalsApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1RequestProposalsCustomByRequestIdGuidGet**](RequestProposalsApi.md#apiV1RequestProposalsCustomByRequestIdGuidGet) | **GET** /api/v1/request-proposals/custom/by_request_id/{guid} | Получить список предложений по guid заявки.
[**apiV1RequestProposalsCustomGuidEditPatch**](RequestProposalsApi.md#apiV1RequestProposalsCustomGuidEditPatch) | **PATCH** /api/v1/request-proposals/custom/{guid}/edit | #  Редактировать предложение.
[**apiV1RequestProposalsCustomGuidGet**](RequestProposalsApi.md#apiV1RequestProposalsCustomGuidGet) | **GET** /api/v1/request-proposals/custom/{guid} | Получить предложение по его id.
[**apiV1RequestProposalsGet**](RequestProposalsApi.md#apiV1RequestProposalsGet) | **GET** /api/v1/request-proposals/ | Получить все предложения для супервизора.
[**apiV1RequestProposalsGuidAcceptPatch**](RequestProposalsApi.md#apiV1RequestProposalsGuidAcceptPatch) | **PATCH** /api/v1/request-proposals/{guid}/accept | #  Принять предложение.
[**apiV1RequestProposalsGuidCancelPatch**](RequestProposalsApi.md#apiV1RequestProposalsGuidCancelPatch) | **PATCH** /api/v1/request-proposals/{guid}/cancel | # Отмена предложения, в зависимости от того кто вызвал ставится статус.
[**apiV1RequestProposalsGuidCorrectPatch**](RequestProposalsApi.md#apiV1RequestProposalsGuidCorrectPatch) | **PATCH** /api/v1/request-proposals/{guid}/correct | # Отправить на доработку.
[**apiV1RequestProposalsGuidCorrectedPatch**](RequestProposalsApi.md#apiV1RequestProposalsGuidCorrectedPatch) | **PATCH** /api/v1/request-proposals/{guid}/corrected | #  Отправить обратно на утверждение, после доработки.
[**apiV1RequestProposalsGuidLinkOrUnlinkSupervisorPatch**](RequestProposalsApi.md#apiV1RequestProposalsGuidLinkOrUnlinkSupervisorPatch) | **PATCH** /api/v1/request-proposals/{guid}/link_or_unlink_supervisor | #  Привязать или \&quot;отвязать\&quot; супервайзера от предложения.
[**apiV1RequestProposalsGuidReadyToVerifyPatch**](RequestProposalsApi.md#apiV1RequestProposalsGuidReadyToVerifyPatch) | **PATCH** /api/v1/request-proposals/{guid}/ready_to_verify | #  Отправить предложение на утверждение.



## apiV1RequestProposalsCustomByRequestIdGuidGet

> [InlineResponse20016] apiV1RequestProposalsCustomByRequestIdGuidGet(guid, opts)

Получить список предложений по guid заявки.

## Получить список предложений по guid заявки..   Если его вызывает создатель заявки:  Эндпоинт должен отдавать список всех предложений со всеми статусами Если его вызывает исполнитель(фрилансер): Он должен отдавать предложения к заявке, только от этого исполнителя со всеми статусами Если его вызывает супервизор: Он должен отдавать предложения проверяемые данным супервайзером.

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.RequestProposalsApi();
let guid = "guid_example"; // String | GUID в сущности в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1RequestProposalsCustomByRequestIdGuidGet(guid, opts).then((data) => {
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

[**[InlineResponse20016]**](InlineResponse20016.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1RequestProposalsCustomGuidEditPatch

> String apiV1RequestProposalsCustomGuidEditPatch(guid, opts)

#  Редактировать предложение.

## Редактировать предложение   Если были статусы EMPTY или CREATED ставиться статус CREATED Если был статус TO_CORRECT, то статус не меняется Проверки: Только предложения со статусом EMPTY, CREATED и TO_CORRECT могут быть отредактированы.

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.RequestProposalsApi();
let guid = "guid_example"; // String | GUID в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject49() // InlineObject49 | 
};
apiInstance.apiV1RequestProposalsCustomGuidEditPatch(guid, opts).then((data) => {
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
 **body** | [**InlineObject49**](InlineObject49.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1RequestProposalsCustomGuidGet

> {String: Object} apiV1RequestProposalsCustomGuidGet(guid, opts)

Получить предложение по его id.

## Получить предложение по его id.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.RequestProposalsApi();
let guid = "guid_example"; // String | GUID в сущности в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1RequestProposalsCustomGuidGet(guid, opts).then((data) => {
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

**{String: Object}**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1RequestProposalsGet

> [InlineResponse20010] apiV1RequestProposalsGet(type, kind, opts)

Получить все предложения для супервизора.

## Получить все предложения для супервизора.  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.RequestProposalsApi();
let type = "type_example"; // String | Тип заявки
let kind = "kind_example"; // String | Виды запросов:       LINKED_TO_ME - предложения которые связанны с данным пользователем,       ALL - все предложения, если в заявке требовалась проверка супервайзера,       VACANT - все доступные предложения на проверку сепервайзером.
let opts = {
  'status': ["null"], // [String] | Сортировать по статусам.
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1RequestProposalsGet(type, kind, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **type** | **String**| Тип заявки | 
 **kind** | **String**| Виды запросов:       LINKED_TO_ME - предложения которые связанны с данным пользователем,       ALL - все предложения, если в заявке требовалась проверка супервайзера,       VACANT - все доступные предложения на проверку сепервайзером. | 
 **status** | [**[String]**](String.md)| Сортировать по статусам. | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse20010]**](InlineResponse20010.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1RequestProposalsGuidAcceptPatch

> String apiV1RequestProposalsGuidAcceptPatch(guid, opts)

#  Принять предложение.

## Принять предложение.   Произвести оплаты Если клиент принял предложение, то статус меняется на ACCEPTED_BY_CLIENT, Если супервайзер принял предложение, то статус меняется на ACCEPTED_BY_SUPERVISOR Проверки: Если вызвал КЛИЕНТ принимаются только статусы:  READY_TO_VERIFY, VERIFYING_BY_SUPERVISOR, TO_CORRECT, CORRECTED Является ли пользователь владельцем заявки к которой относится предложение. Если вызвал СУПЕРВАЙЗЕР принимаются только статусы:  VERIFYING_BY_SUPERVISOR, TO_CORRECT, CORRECTED Является ли вызвавший данный метод супервайзер ответственным за проверку данного предложения.

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.RequestProposalsApi();
let guid = "guid_example"; // String | GUID в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': null // Object | 
};
apiInstance.apiV1RequestProposalsGuidAcceptPatch(guid, opts).then((data) => {
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
 **body** | **Object**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1RequestProposalsGuidCancelPatch

> String apiV1RequestProposalsGuidCancelPatch(guid, opts)

# Отмена предложения, в зависимости от того кто вызвал ставится статус.

## Отмена предложение по его GUID  ## Если вызвал исполнитель(фрилансер), стутус меняется на CANCELED_BY_EXECUTOR Проверки: Только  предложения со статусами:  EMPTY, CREATED, READY_TO_VERIFY Является ли вызвавший данный метод владельцем предложения. ## Если вызвал клиент, статус меняется на CANCELED_BY_CLIENT Проверки: Только  предложения со статусами:  READY_TO_VERIFY, VERIFYING_BY_SUPERVISOR, TO_CORRECT, CORRECTED Является ли вызвавший данный метод владельцем заявки к торой относится данное предложение. ## Если вызвал супервайзер, статус меняется на CANCELED_BY_SUPERVISOR Проверки: Только  предложения со статусами:  VERIFYING_BY_SUPERVISOR, TO_CORRECT, CORRECTED Является ли вызвавший данный метод супервайзер ответственным за проверку данного предложения.

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.RequestProposalsApi();
let guid = "guid_example"; // String | GUID в сущности в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject34() // InlineObject34 | 
};
apiInstance.apiV1RequestProposalsGuidCancelPatch(guid, opts).then((data) => {
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
 **body** | [**InlineObject34**](InlineObject34.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1RequestProposalsGuidCorrectPatch

> String apiV1RequestProposalsGuidCorrectPatch(guid, opts)

# Отправить на доработку.

## Отправить на доработку.  Ставиться статус TO_CORRECT Нужно написать в комментарии причину. Можно выставить время на доработку, в минутах. по умолчанию 120 мин. Проверки: Если вызвал КЛИЕНТ принимаются только статусы:  READY_TO_VERIFY, VERIFYING_BY_SUPERVISOR, TO_CORRECT, CORRECTED Является ли пользователь владельцем заявки к которой относится предложение. Если вызвал СУПЕРВАЙЗЕР принимаются только статусы:  VERIFYING_BY_SUPERVISOR, TO_CORRECT, CORRECTED Является ли вызвавший данный метод супервайзер ответственным за проверку данного предложения.

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.RequestProposalsApi();
let guid = "guid_example"; // String | GUID в сущности в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject32() // InlineObject32 | 
};
apiInstance.apiV1RequestProposalsGuidCorrectPatch(guid, opts).then((data) => {
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
 **body** | [**InlineObject32**](InlineObject32.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1RequestProposalsGuidCorrectedPatch

> String apiV1RequestProposalsGuidCorrectedPatch(guid, opts)

#  Отправить обратно на утверждение, после доработки.

##  Отправить обратно на утверждение, после доработки.  Статус CORRECTED ставится автоматом В зависимости была ли в заявке требование проверки супервизором, устанавливается время. После достижении времени, предложение будет принято автоматом  если была в заявке была проверка супервайзером, то сепервайзер снимается с проверки предложения. Фрилансер может написать комментарий к действию или прикрепить ссылки на медиа файлы Проверки: Только предложения со статусом TO_CORRECT. 

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.RequestProposalsApi();
let guid = "guid_example"; // String | GUID в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject33() // InlineObject33 | 
};
apiInstance.apiV1RequestProposalsGuidCorrectedPatch(guid, opts).then((data) => {
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
 **body** | [**InlineObject33**](InlineObject33.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1RequestProposalsGuidLinkOrUnlinkSupervisorPatch

> String apiV1RequestProposalsGuidLinkOrUnlinkSupervisorPatch(guid, opts)

#  Привязать или \&quot;отвязать\&quot; супервайзера от предложения.

## Привязать  супервайзра за предложением. Статус меняется на VERIFYING_BY_SUPERVISOR В поле supervisorId вписывается id супервайзера. Устанавливается время за которое супервайзер должен принять решение. Пос истечения времени супервайзер снимается.Проверки: Предложения должны быть со статусом READY_TO_VERIFY и в заявке указывалась необходимость в проверке. Взять на проверку предложение не могут создатель заявки или предложения ## Отвязать супервайзра от предложения . Статус возвращается на READY_TO_VERIFY id супервайзера удалятся из supervisorId. Проверки: Только со статусами предложений:   VERIFYING_BY_SUPERVISOR, TO_CORRECT, CORRECTED ## Это нужно чтобы рассчитать остаток средств при закрытии заявки. Супервайзер не может отвязать от себя предложение если он не связан.

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.RequestProposalsApi();
let guid = "guid_example"; // String | GUID в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject35() // InlineObject35 | 
};
apiInstance.apiV1RequestProposalsGuidLinkOrUnlinkSupervisorPatch(guid, opts).then((data) => {
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
 **body** | [**InlineObject35**](InlineObject35.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1RequestProposalsGuidReadyToVerifyPatch

> String apiV1RequestProposalsGuidReadyToVerifyPatch(guid, opts)

#  Отправить предложение на утверждение.

##  Отправить на утверждение.  Статус READY_TO_VERIFY ставится автоматом Устанавливается время на принятие автоматом предложения клиентом  Если в заявке было требование проверять супервизором, то время не устанавливается. Проверки: Только предложения со статусом CREATED. 

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.RequestProposalsApi();
let guid = "guid_example"; // String | GUID в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': null // Object | 
};
apiInstance.apiV1RequestProposalsGuidReadyToVerifyPatch(guid, opts).then((data) => {
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
 **body** | **Object**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

