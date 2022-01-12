# TestSwagger.RequestsApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1RequestsCustomGuidDelete**](RequestsApi.md#apiV1RequestsCustomGuidDelete) | **DELETE** /api/v1/requests/custom/{guid} | # Удалить кастомную заявку по его GUID.
[**apiV1RequestsCustomGuidGet**](RequestsApi.md#apiV1RequestsCustomGuidGet) | **GET** /api/v1/requests/custom/{guid} | Получить кастомную заявку по его guid.
[**apiV1RequestsCustomGuidPatch**](RequestsApi.md#apiV1RequestsCustomGuidPatch) | **PATCH** /api/v1/requests/custom/{guid} | #  Изменить кастомую заявку.
[**apiV1RequestsCustomPost**](RequestsApi.md#apiV1RequestsCustomPost) | **POST** /api/v1/requests/custom/ | # Создать кастомную заявку.
[**apiV1RequestsGet**](RequestsApi.md#apiV1RequestsGet) | **GET** /api/v1/requests/ | Получить список заявок
[**apiV1RequestsGuidCompletePost**](RequestsApi.md#apiV1RequestsGuidCompletePost) | **POST** /api/v1/requests/{guid}/complete | # (ВОЗМОЖНО НЕ АКТУАЛЬНЫЙ ЭНДПОИНТ!!!) Отметить заявку как выполнена.
[**apiV1RequestsGuidPickupPost**](RequestsApi.md#apiV1RequestsGuidPickupPost) | **POST** /api/v1/requests/{guid}/pickup | # Этот метод вызывает тот кто бронирует место в заявке.
[**apiV1RequestsGuidToPublishPatch**](RequestsApi.md#apiV1RequestsGuidToPublishPatch) | **PATCH** /api/v1/requests/{guid}/to_publish | #  Опубликовать заявку.



## apiV1RequestsCustomGuidDelete

> String apiV1RequestsCustomGuidDelete(guid, opts)

# Удалить кастомную заявку по его GUID.

## Удалить кастомную заявку по его GUIDD.    Заявку можно удалить только если статус TO_PUBLISH или CREATED.. Удаление заявки приведет к удалению всех предложений относящихся к ней!!! Только владелец может удалить заявку  

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
apiInstance.apiV1RequestsCustomGuidDelete(guid, opts).then((data) => {
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
- **Accept**: text/html


## apiV1RequestsCustomGuidGet

<<<<<<< HEAD
> InlineResponse2007 apiV1RequestsCustomGuidGet(guid, opts)
=======
> InlineResponse20013 apiV1RequestsCustomGuidGet(guid, opts)
>>>>>>> 7f563425... 989, 1085, 1086, 1083, 1090, 1091, 1089, 1087, 1092, 1094, 1086, 1082, 1085, 1073, 1076, 1075, 1077, 1078, 1068 tasks

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

<<<<<<< HEAD
[**InlineResponse2007**](InlineResponse2007.md)
=======
[**InlineResponse20013**](InlineResponse20013.md)
>>>>>>> 7f563425... 989, 1085, 1086, 1083, 1090, 1091, 1089, 1087, 1092, 1094, 1086, 1082, 1085, 1073, 1076, 1075, 1077, 1078, 1068 tasks

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1RequestsCustomGuidPatch

> String apiV1RequestsCustomGuidPatch(guid, opts)

#  Изменить кастомую заявку.

## Изменить кастомую заявку.   Проверка на статус, статус должен быть CREATED или TO_PUBLISH. Только владелец может редактировать заявку  

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
  'body': new TestSwagger.InlineObject43() // InlineObject43 | 
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
 **body** | [**InlineObject43**](InlineObject43.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


<<<<<<< HEAD
## apiV1RequestsCustomGuidProposalsGet

> [InlineResponse20012] apiV1RequestsCustomGuidProposalsGet(guid, opts)

Получить список предложений к заявке.

Получить список предложений к заявке.   

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
apiInstance.apiV1RequestsCustomGuidProposalsGet(guid, opts).then((data) => {
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

[**[InlineResponse20012]**](InlineResponse20012.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


=======
>>>>>>> 7f563425... 989, 1085, 1086, 1083, 1090, 1091, 1089, 1087, 1092, 1094, 1086, 1082, 1085, 1073, 1076, 1075, 1077, 1078, 1068 tasks
## apiV1RequestsCustomPost

> InlineResponse2017 apiV1RequestsCustomPost(opts)

# Создать кастомную заявку.

## Создать кастомную заявку. 

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
  'body': new TestSwagger.InlineObject42() // InlineObject42 | 
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
 **body** | [**InlineObject42**](InlineObject42.md)|  | [optional] 

### Return type

[**InlineResponse2017**](InlineResponse2017.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1RequestsGet

<<<<<<< HEAD
> [InlineResponse2007] apiV1RequestsGet(type, opts)
=======
> [InlineResponse20010] apiV1RequestsGet(type, kind, opts)
>>>>>>> 7f563425... 989, 1085, 1086, 1083, 1090, 1091, 1089, 1087, 1092, 1094, 1086, 1082, 1085, 1073, 1076, 1075, 1077, 1078, 1068 tasks

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
<<<<<<< HEAD
  'kind': "kind_example", // String | Виды заявок:             VACANT - все заявки со статусом CREATED и IN_PROCESS,             MY - все заявки созданные тем кто вызывает метод,             ASSIGNEES - все заявки где числится как исполнитель,             ALL - абсолютно все заявки, без исключения.
=======
>>>>>>> 7f563425... 989, 1085, 1086, 1083, 1090, 1091, 1089, 1087, 1092, 1094, 1086, 1082, 1085, 1073, 1076, 1075, 1077, 1078, 1068 tasks
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
<<<<<<< HEAD
 **kind** | **String**| Виды заявок:             VACANT - все заявки со статусом CREATED и IN_PROCESS,             MY - все заявки созданные тем кто вызывает метод,             ASSIGNEES - все заявки где числится как исполнитель,             ALL - абсолютно все заявки, без исключения. | [optional] 
=======
 **kind** | **String**| Виды заявок:             VACANT - все заявки со статусом TO_PUBLISH и IN_PROCESS, + должны быть свободные слоты для предложений.             MY - все заявки созданные тем кто вызывает метод,             PICKUPED_BY_ME - все заявки где числится как исполнитель тот кто вызывает метод,             ALL - абсолютно все заявки, без исключения,             ASSIGNED_TO_ME - пока не реализовано. | 
>>>>>>> 7f563425... 989, 1085, 1086, 1083, 1090, 1091, 1089, 1087, 1092, 1094, 1086, 1082, 1085, 1073, 1076, 1075, 1077, 1078, 1068 tasks
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

<<<<<<< HEAD
[**[InlineResponse2007]**](InlineResponse2007.md)
=======
[**[InlineResponse20010]**](InlineResponse20010.md)
>>>>>>> 7f563425... 989, 1085, 1086, 1083, 1090, 1091, 1089, 1087, 1092, 1094, 1086, 1082, 1085, 1073, 1076, 1075, 1077, 1078, 1068 tasks

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1RequestsGuidCompletePost

> InlineResponse2017 apiV1RequestsGuidCompletePost(guid, opts)

# (ВОЗМОЖНО НЕ АКТУАЛЬНЫЙ ЭНДПОИНТ!!!) Отметить заявку как выполнена.

## Отметить заявку как выполнена.  При вызове этого метода нужно делать проверку если статус request еще не COMPLETE.  Проверяет принадлежит ли предложения к данной заявке.   При вызове этого эндпоинта предложения из массива будут считаться принятыми  (устанавливать accepted &#x3D;&#x3D;&#x3D; true) далее ресерчер не может редактировать предложение.

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
  'body': new TestSwagger.InlineObject31() // InlineObject31 | 
};
apiInstance.apiV1RequestsGuidCompletePost(guid, opts).then((data) => {
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
 **body** | [**InlineObject31**](InlineObject31.md)|  | [optional] 

### Return type

[**InlineResponse2017**](InlineResponse2017.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
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

<<<<<<< HEAD
[**InlineResponse2017**](InlineResponse2017.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1RequestsSearchNicheGet

> [InlineResponse20013] apiV1RequestsSearchNicheGet(opts)

Получить список деталей заявок созданных данным клиентом.

Получить список деталей заявок созданных данным клиентом.   

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
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1RequestsSearchNicheGet(opts).then((data) => {
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

[**[InlineResponse20013]**](InlineResponse20013.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1RequestsSearchNicheGuidDelete

> String apiV1RequestsSearchNicheGuidDelete(guid, opts)

# Удалить детали заявки на поиск ниш по его GUID.

## Удалить детали заявки по его GUID, возможно только после проверки статуса.   ## Только владелец, админ или супервайзер могут удалять заявку  

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
apiInstance.apiV1RequestsSearchNicheGuidDelete(guid, opts).then((data) => {
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
- **Accept**: text/html


## apiV1RequestsSearchNicheGuidPatch

> String apiV1RequestsSearchNicheGuidPatch(guid, opts)

#  Изменить детали заявки на поиск ниш.

## Изменить детали заявки на поиск ниш.   ## Только владелец, админ или супервайзер могут редактировать заявку   

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
let guid = "guid_example"; // String | GUID продукта БД
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject42() // InlineObject42 | 
};
apiInstance.apiV1RequestsSearchNicheGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| GUID продукта БД | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject42**](InlineObject42.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1RequestsSearchNichePost

> InlineResponse2016 apiV1RequestsSearchNichePost(opts)

# Создать детали заявки на поиск ниш.

## Создать детали заявки на поиск ниш. 

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
  'body': new TestSwagger.InlineObject41() // InlineObject41 | 
};
apiInstance.apiV1RequestsSearchNichePost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject41**](InlineObject41.md)|  | [optional] 

### Return type

=======
>>>>>>> 7f563425... 989, 1085, 1086, 1083, 1090, 1091, 1089, 1087, 1092, 1094, 1086, 1082, 1085, 1073, 1076, 1075, 1077, 1078, 1068 tasks
[**InlineResponse2016**](InlineResponse2016.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
<<<<<<< HEAD
- **Accept**: text/html


## apiV1RequestsSearchProductsGet

> [InlineResponse20014] apiV1RequestsSearchProductsGet(opts)

Получить список деталей заявок созданных данным клиентом.

Получить список деталей заявок созданных данным клиентом.   

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
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1RequestsSearchProductsGet(opts).then((data) => {
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

[**[InlineResponse20014]**](InlineResponse20014.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1RequestsSearchProductsGuidDelete

> String apiV1RequestsSearchProductsGuidDelete(guid, opts)

# Удалить детали заявки на поиск товара по его GUID.

## Удалить детали заявки по его GUID, возможно только после проверки статуса.    ## Только владелец, админ или супервайзер могут удалять заявку   

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
apiInstance.apiV1RequestsSearchProductsGuidDelete(guid, opts).then((data) => {
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
- **Accept**: text/html
=======
- **Accept**: application/json
>>>>>>> 7f563425... 989, 1085, 1086, 1083, 1090, 1091, 1089, 1087, 1092, 1094, 1086, 1082, 1085, 1073, 1076, 1075, 1077, 1078, 1068 tasks


## apiV1RequestsGuidToPublishPatch

> String apiV1RequestsGuidToPublishPatch(guid, opts)

#  Опубликовать заявку.

## Опубликовать заявку.   Статус поменяется на TO_PUBLISH. Проверки:  Публиковать можно только заявки со статусом CREATED. Только владелец может опубликовать.

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
  'body': null // Object | 
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
 **body** | **Object**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html

