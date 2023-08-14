# TestSwagger.RequestProposalsApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1RequestProposalsCustomByRequestIdGuidGet**](RequestProposalsApi.md#apiV1RequestProposalsCustomByRequestIdGuidGet) | **GET** /api/v1/request-proposals/custom/by_request_id/{guid} | Получить список предложений по guid заявки.
[**apiV1RequestProposalsCustomGuidGet**](RequestProposalsApi.md#apiV1RequestProposalsCustomGuidGet) | **GET** /api/v1/request-proposals/custom/{guid} | Получить предложение по его id.
[**apiV1RequestProposalsCustomGuidResultEditPatch**](RequestProposalsApi.md#apiV1RequestProposalsCustomGuidResultEditPatch) | **PATCH** /api/v1/request-proposals/custom/{guid}/result_edit | #  Редактировать результат работы.
[**apiV1RequestProposalsFreelanceSourcesGet**](RequestProposalsApi.md#apiV1RequestProposalsFreelanceSourcesGet) | **GET** /api/v1/request-proposals/freelance-sources | #  Получить исходники.
[**apiV1RequestProposalsFreelanceSourcesGuidDelete**](RequestProposalsApi.md#apiV1RequestProposalsFreelanceSourcesGuidDelete) | **DELETE** /api/v1/request-proposals/freelance-sources/{guid} | #  Изменить исходник.
[**apiV1RequestProposalsFreelanceSourcesGuidPatch**](RequestProposalsApi.md#apiV1RequestProposalsFreelanceSourcesGuidPatch) | **PATCH** /api/v1/request-proposals/freelance-sources/{guid} | #  Изменить исходник.
[**apiV1RequestProposalsFreelanceSourcesPost**](RequestProposalsApi.md#apiV1RequestProposalsFreelanceSourcesPost) | **POST** /api/v1/request-proposals/freelance-sources | #  Создать исходник.
[**apiV1RequestProposalsGet**](RequestProposalsApi.md#apiV1RequestProposalsGet) | **GET** /api/v1/request-proposals/ | Получить все предложения для супервизора.
[**apiV1RequestProposalsGuidApprovePatch**](RequestProposalsApi.md#apiV1RequestProposalsGuidApprovePatch) | **PATCH** /api/v1/request-proposals/{guid}/approve | #  Одобрить/отклонить роботу над предложением саба
[**apiV1RequestProposalsGuidCancelBeforeDealPatch**](RequestProposalsApi.md#apiV1RequestProposalsGuidCancelBeforeDealPatch) | **PATCH** /api/v1/request-proposals/{guid}/cancel_before_deal | # Отмена предложения до заключения сделки.
[**apiV1RequestProposalsGuidCancelPatch**](RequestProposalsApi.md#apiV1RequestProposalsGuidCancelPatch) | **PATCH** /api/v1/request-proposals/{guid}/cancel | # Отмена предложения после заключения сделки, в зависимости от того кто вызвал ставится статус.
[**apiV1RequestProposalsGuidLinkOrUnlinkSupervisorPatch**](RequestProposalsApi.md#apiV1RequestProposalsGuidLinkOrUnlinkSupervisorPatch) | **PATCH** /api/v1/request-proposals/{guid}/link_or_unlink_supervisor | #  Привязать или \&quot;отвязать\&quot; супервайзера от предложения.
[**apiV1RequestProposalsGuidProposalAcceptPatch**](RequestProposalsApi.md#apiV1RequestProposalsGuidProposalAcceptPatch) | **PATCH** /api/v1/request-proposals/{guid}/proposal_accept | #  Принять предложение.
[**apiV1RequestProposalsGuidProposalCorrectedPatch**](RequestProposalsApi.md#apiV1RequestProposalsGuidProposalCorrectedPatch) | **PATCH** /api/v1/request-proposals/{guid}/proposal_corrected | # Отправить предложение обратно, после доработки.
[**apiV1RequestProposalsGuidProposalEditPatch**](RequestProposalsApi.md#apiV1RequestProposalsGuidProposalEditPatch) | **PATCH** /api/v1/request-proposals/{guid}/proposal_edit | #  Редактировать условия предложения.
[**apiV1RequestProposalsGuidProposalRejectPatch**](RequestProposalsApi.md#apiV1RequestProposalsGuidProposalRejectPatch) | **PATCH** /api/v1/request-proposals/{guid}/proposal_reject | # Отказаться от предложения.
[**apiV1RequestProposalsGuidReadyToVerifyPatch**](RequestProposalsApi.md#apiV1RequestProposalsGuidReadyToVerifyPatch) | **PATCH** /api/v1/request-proposals/{guid}/ready_to_verify | #  Отправить предложение на утверждение.
[**apiV1RequestProposalsGuidResultAcceptPatch**](RequestProposalsApi.md#apiV1RequestProposalsGuidResultAcceptPatch) | **PATCH** /api/v1/request-proposals/{guid}/result_accept | #  Принять результаты работы.
[**apiV1RequestProposalsGuidResultCorrectedPatch**](RequestProposalsApi.md#apiV1RequestProposalsGuidResultCorrectedPatch) | **PATCH** /api/v1/request-proposals/{guid}/result_corrected | #  Отправить обратно на утверждение, после доработки.
[**apiV1RequestProposalsGuidResultToCorrectPatch**](RequestProposalsApi.md#apiV1RequestProposalsGuidResultToCorrectPatch) | **PATCH** /api/v1/request-proposals/{guid}/result_to_correct | # Отправить на доработку результат работы.



## apiV1RequestProposalsCustomByRequestIdGuidGet

> [InlineResponse20079] apiV1RequestProposalsCustomByRequestIdGuidGet(guid, opts)

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
let guid = null; // String | GUID в сущности в БД
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
 **guid** | [**String**](.md)| GUID в сущности в БД | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse20079]**](InlineResponse20079.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
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
let guid = null; // String | GUID в сущности в БД
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
 **guid** | [**String**](.md)| GUID в сущности в БД | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**{String: Object}**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1RequestProposalsCustomGuidResultEditPatch

> String apiV1RequestProposalsCustomGuidResultEditPatch(guid, opts)

#  Редактировать результат работы.

## Редактировать результат работы   Проверки: Владелец предложения может редактировать.  Принимаются только статусы:  OFFER_CONDITIONS_ACCEPTED READY_TO_VERIFY VERIFYING_BY_SUPERVISOR TO_CORRECT CORRECTED

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
let guid = null; // String | GUID в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject132() // InlineObject132 | 
};
apiInstance.apiV1RequestProposalsCustomGuidResultEditPatch(guid, opts).then((data) => {
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
 **body** | [**InlineObject132**](InlineObject132.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1RequestProposalsFreelanceSourcesGet

> [InlineResponse20061] apiV1RequestProposalsFreelanceSourcesGet(opts)

#  Получить исходники.

## Получить исходники

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
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1RequestProposalsFreelanceSourcesGet(opts).then((data) => {
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

[**[InlineResponse20061]**](InlineResponse20061.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1RequestProposalsFreelanceSourcesGuidDelete

> String apiV1RequestProposalsFreelanceSourcesGuidDelete(guid, opts)

#  Изменить исходник.

## Изменить исходник

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
let guid = null; // String | GUID в сущности в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1RequestProposalsFreelanceSourcesGuidDelete(guid, opts).then((data) => {
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


## apiV1RequestProposalsFreelanceSourcesGuidPatch

> String apiV1RequestProposalsFreelanceSourcesGuidPatch(guid, opts)

#  Изменить исходник.

## Изменить исходник

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
let guid = null; // String | GUID в сущности в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject101() // InlineObject101 | 
};
apiInstance.apiV1RequestProposalsFreelanceSourcesGuidPatch(guid, opts).then((data) => {
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
 **body** | [**InlineObject101**](InlineObject101.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1RequestProposalsFreelanceSourcesPost

> InlineResponse20113 apiV1RequestProposalsFreelanceSourcesPost(opts)

#  Создать исходник.

## Создать исходник

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
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject100() // InlineObject100 | 
};
apiInstance.apiV1RequestProposalsFreelanceSourcesPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject100**](InlineObject100.md)|  | [optional] 

### Return type

[**InlineResponse20113**](InlineResponse20113.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1RequestProposalsGet

> [InlineResponse20060] apiV1RequestProposalsGet(type, kind, opts)

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
let kind = "kind_example"; // String | Виды запросов:       LINKED_TO_ME - предложения которые связанны с данным пользователем,       ALL - все предложения, если в заявке требовалась проверка супервайзера,       VACANT - все доступные предложения на проверку сепервайзером. Данный запрос доступен только для роли супервайзера
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
 **kind** | **String**| Виды запросов:       LINKED_TO_ME - предложения которые связанны с данным пользователем,       ALL - все предложения, если в заявке требовалась проверка супервайзера,       VACANT - все доступные предложения на проверку сепервайзером. Данный запрос доступен только для роли супервайзера | 
 **status** | [**[String]**](String.md)| Сортировать по статусам. | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse20060]**](InlineResponse20060.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1RequestProposalsGuidApprovePatch

> String apiV1RequestProposalsGuidApprovePatch(guid, opts)

#  Одобрить/отклонить роботу над предложением саба

Одобрить/отклонить роботу над предложением саба, может сделать только записаный в createdBy юзер

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
let guid = null; // String | GUID в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject91() // InlineObject91 | 
};
apiInstance.apiV1RequestProposalsGuidApprovePatch(guid, opts).then((data) => {
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
 **body** | [**InlineObject91**](InlineObject91.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1RequestProposalsGuidCancelBeforeDealPatch

> String apiV1RequestProposalsGuidCancelBeforeDealPatch(guid, opts)

# Отмена предложения до заключения сделки.

## Отмена предложения до заключения сделки  ## Статус меняется на CANCELED_BY_EXECUTOR Проверки: Только  предложения со статусами:  CREATED OFFER_CONDITIONS_REJECTED OFFER_CONDITIONS_CORRECTED Является ли вызвавший данный метод владельцем предложения.

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
let guid = null; // String | GUID в сущности в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject90() // InlineObject90 | 
};
apiInstance.apiV1RequestProposalsGuidCancelBeforeDealPatch(guid, opts).then((data) => {
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
 **body** | [**InlineObject90**](InlineObject90.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1RequestProposalsGuidCancelPatch

> String apiV1RequestProposalsGuidCancelPatch(guid, opts)

# Отмена предложения после заключения сделки, в зависимости от того кто вызвал ставится статус.

## Отмена предложения после заключения сделки  Вызывает возврат замороженных средств.  ## Если вызвал исполнитель(фрилансер), стутус меняется на CANCELED_BY_EXECUTOR Проверки: Только  предложения со статусами:  OFFER_CONDITIONS_ACCEPTED READY_TO_VERIFY TO_CORRECT CORRECTED Является ли вызвавший данный метод владельцем предложения. ## Если вызвал клиент, статус меняется на CANCELED_BY_CREATOR_OF_REQUEST Проверки: Только  предложения со статусами:  OFFER_CONDITIONS_ACCEPTED READY_TO_VERIFY VERIFYING_BY_SUPERVISOR TO_CORRECT CORRECTED Является ли вызвавший данный метод владельцем заявки к торой относится данное предложение. ## Если вызвал супервайзер, статус меняется на CANCELED_BY_SUPERVISOR Проверки: Только  предложения со статусами:  VERIFYING_BY_SUPERVISOR TO_CORRECT CORRECTED Является ли вызвавший данный метод супервайзер ответственным за проверку данного предложения.

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
let guid = null; // String | GUID в сущности в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject98() // InlineObject98 | 
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
 **guid** | [**String**](.md)| GUID в сущности в БД | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject98**](InlineObject98.md)|  | [optional] 

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

## Привязать  супервайзра к предложению. Статус меняется на VERIFYING_BY_SUPERVISOR В поле supervisorId вписывается id супервайзера. Устанавливается время за которое супервайзер должен принять решение. Пос истечения времени супервайзер снимается.  ## Супервайзер добавляется в чат  Проверки: Предложения должны быть со статусом READY_TO_VERIFY и в заявке указывалась необходимость в проверке. Взять на проверку предложение не могут создатель заявки или предложения ## Отвязать супервайзра от предложения . Статус возвращается на READY_TO_VERIFY id супервайзера удалятся из supervisorId. Проверки: Только со статусами предложений:   VERIFYING_BY_SUPERVISOR TO_CORRECT CORRECTED ## Это нужно чтобы рассчитать остаток средств при закрытии заявки. Супервайзер не может отвязать от себя предложение если он не связан.

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
let guid = null; // String | GUID в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject99() // InlineObject99 | 
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
 **guid** | [**String**](.md)| GUID в БД | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject99**](InlineObject99.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1RequestProposalsGuidProposalAcceptPatch

> String apiV1RequestProposalsGuidProposalAcceptPatch(guid, opts)

#  Принять предложение.

## Принять предложение.   При вызове данного метода клиент подтверждает согласие на заключение договора Если клиент принял предложение, то статус меняется на OFFER_CONDITIONS_ACCEPTEDУ фрилансеру дается время в минутах, которое было оговорено (execution_time). У клиента замораживаются средства. Проверки: Только владелец заявки может принять предложение Принимаются предложения только со статусами:  CREATED OFFER_CONDITIONS_REJECTED OFFER_CONDITIONS_CORRECTED

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
let guid = null; // String | GUID в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': null // Object | 
};
apiInstance.apiV1RequestProposalsGuidProposalAcceptPatch(guid, opts).then((data) => {
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
 **body** | **Object**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1RequestProposalsGuidProposalCorrectedPatch

> String apiV1RequestProposalsGuidProposalCorrectedPatch(guid, opts)

# Отправить предложение обратно, после доработки.

##  Отправить предложение обратно, после доработки.  Статус ставится автоматом: OFFER_CONDITIONS_CORRECTED Исполнитель может написать комментарий к действию или прикрепить ссылки на медиа файлы Проверки: Принимаются только статусы:  CREATED OFFER_CONDITIONS_REJECTED OFFER_CONDITIONS_CORRECTED Только владелец предложения может вызвать данный метод.

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
let guid = null; // String | GUID в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject94() // InlineObject94 | 
};
apiInstance.apiV1RequestProposalsGuidProposalCorrectedPatch(guid, opts).then((data) => {
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
 **body** | [**InlineObject94**](InlineObject94.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1RequestProposalsGuidProposalEditPatch

> String apiV1RequestProposalsGuidProposalEditPatch(guid, opts)

#  Редактировать условия предложения.

## Редактировать условия предложения   Данный метод может вызываться исполнителем до заключения договора, Если при первом вызове, исполнитель не ввел свои изменения (цены или времени), то данные берутся из заявки При повторном вызове, если исполнитель не ввел свои изменения (цены или времени), то данные не меняются. Проверки: Владелец предложения может редактировать.  Принимаются только статусы:  CREATED OFFER_CONDITIONS_REJECTED OFFER_CONDITIONS_CORRECTED

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
let guid = null; // String | GUID в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject93() // InlineObject93 | 
};
apiInstance.apiV1RequestProposalsGuidProposalEditPatch(guid, opts).then((data) => {
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


## apiV1RequestProposalsGuidProposalRejectPatch

> String apiV1RequestProposalsGuidProposalRejectPatch(guid, opts)

# Отказаться от предложения.

## Отказаться от предложения..  Ставиться статус: OFFER_CONDITIONS_REJECTED Нужно написать в комментарии причину. Проверки: Принимаются только статусы:  CREATED OFFER_CONDITIONS_REJECTED OFFER_CONDITIONS_CORRECTED Является ли пользователь владельцем заявки к которой относится предложение. 

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
let guid = null; // String | GUID в сущности в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject92() // InlineObject92 | 
};
apiInstance.apiV1RequestProposalsGuidProposalRejectPatch(guid, opts).then((data) => {
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
 **body** | [**InlineObject92**](InlineObject92.md)|  | [optional] 

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

##  Отправить на утверждение.  Статус READY_TO_VERIFY ставится автоматом Устанавливается время на принятие автоматом предложения клиентом  Если в заявке было требование проверять супервизором, то время не устанавливается. Проверки: Только предложения со статусом:  OFFER_CONDITIONS_ACCEPTED

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
let guid = null; // String | GUID в БД
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
 **guid** | [**String**](.md)| GUID в БД | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | **Object**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1RequestProposalsGuidResultAcceptPatch

> String apiV1RequestProposalsGuidResultAcceptPatch(guid, opts)

#  Принять результаты работы.

## Принять результаты работы.   Произвести оплаты Если клиент принял предложение, то статус меняется на ACCEPTED_BY_CLIENT, Если супервайзер принял предложение, то статус меняется на ACCEPTED_BY_SUPERVISOR  ## Заявка переходит в статус COMPLETE_PROPOSALS_AMOUNT_ACHIEVED при достижении задорного количества принятых предложений. Проверки: Если вызвал СОЗДАТЕЛЬ ЗАЯВКИ принимаются только статусы:  OFFER_CONDITIONS_ACCEPTED, READY_TO_VERIFY, VERIFYING_BY_SUPERVISOR, TO_CORRECT, CORRECTED Является ли пользователь владельцем заявки к которой относится предложение. Если вызвал СУПЕРВАЙЗЕР принимаются только статусы:  VERIFYING_BY_SUPERVISOR, TO_CORRECT, CORRECTED Является ли вызвавший данный метод супервайзер ответственным за проверку данного предложения.

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
let guid = null; // String | GUID в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject97() // InlineObject97 | 
};
apiInstance.apiV1RequestProposalsGuidResultAcceptPatch(guid, opts).then((data) => {
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
 **body** | [**InlineObject97**](InlineObject97.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1RequestProposalsGuidResultCorrectedPatch

> String apiV1RequestProposalsGuidResultCorrectedPatch(guid, opts)

#  Отправить обратно на утверждение, после доработки.

##  Отправить обратно на утверждение, после доработки.  Статус ставится автоматом: CORRECTED В зависимости была ли в заявке требование проверки супервизором, устанавливается время. После достижении времени, предложение будет принято автоматом  если была в заявке была проверка супервайзером, то сепервайзер снимается с проверки предложения. Исполнитель может написать комментарий к действию или прикрепить ссылки на медиа файлы Проверки: Только предложения со статусом: TO_CORRECT

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
let guid = null; // String | GUID в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject96() // InlineObject96 | 
};
apiInstance.apiV1RequestProposalsGuidResultCorrectedPatch(guid, opts).then((data) => {
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
 **body** | [**InlineObject96**](InlineObject96.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1RequestProposalsGuidResultToCorrectPatch

> String apiV1RequestProposalsGuidResultToCorrectPatch(guid, opts)

# Отправить на доработку результат работы.

## Отправить на доработку результат работы.  Ставиться статус TO_CORRECT Нужно написать в комментарии причину. Можно выставить время на доработку, в минутах. по умолчанию 120 мин. Проверки: Если вызвал СОЗДАТЕЛЬ ЗАЯВКИ принимаются только статусы:  OFFER_CONDITIONS_ACCEPTED READY_TO_VERIFY VERIFYING_BY_SUPERVISOR TO_CORRECT CORRECTED Является ли пользователь владельцем заявки к которой относится предложение. Если вызвал СУПЕРВАЙЗЕР принимаются только статусы:  VERIFYING_BY_SUPERVISOR TO_CORRECT CORRECTED Является ли вызвавший данный метод супервайзер ответственным за проверку данного предложения.

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
let guid = null; // String | GUID в сущности в БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject95() // InlineObject95 | 
};
apiInstance.apiV1RequestProposalsGuidResultToCorrectPatch(guid, opts).then((data) => {
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

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

