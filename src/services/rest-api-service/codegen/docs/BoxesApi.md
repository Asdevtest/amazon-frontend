# Amazonapi.BoxesApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1BoxesApprovePost**](BoxesApi.md#apiV1BoxesApprovePost) | **POST** /api/v1/boxes/approve | # Подтвердить операцию объединения/разъединения коробок.
[**apiV1BoxesCancelMergePost**](BoxesApi.md#apiV1BoxesCancelMergePost) | **POST** /api/v1/boxes/cancel-merge | # Отменить объединение коробок.
[**apiV1BoxesCancelSplitPost**](BoxesApi.md#apiV1BoxesCancelSplitPost) | **POST** /api/v1/boxes/cancel-split | # Отменить разделение коробок.
[**apiV1BoxesClientsDraftsGet**](BoxesApi.md#apiV1BoxesClientsDraftsGet) | **GET** /api/v1/boxes/clients/drafts | # Получить черновики коробок и их строки по текущему клиенту.
[**apiV1BoxesClientsGet**](BoxesApi.md#apiV1BoxesClientsGet) | **GET** /api/v1/boxes/clients | # Получить коробки и их строки по текущему клиенту.
[**apiV1BoxesDraftsGet**](BoxesApi.md#apiV1BoxesDraftsGet) | **GET** /api/v1/boxes/drafts | # Получить черновики коробок и их строки.
[**apiV1BoxesGet**](BoxesApi.md#apiV1BoxesGet) | **GET** /api/v1/boxes/ | # Получить коробки и их строки.
[**apiV1BoxesGuidDelete**](BoxesApi.md#apiV1BoxesGuidDelete) | **DELETE** /api/v1/boxes/{guid} | # Удалить коробку.
[**apiV1BoxesMergePost**](BoxesApi.md#apiV1BoxesMergePost) | **POST** /api/v1/boxes/merge | # Объединить две и более коробок.
[**apiV1BoxesPost**](BoxesApi.md#apiV1BoxesPost) | **POST** /api/v1/boxes/ | # Создать коробку и ее строки.
[**apiV1BoxesSplitPost**](BoxesApi.md#apiV1BoxesSplitPost) | **POST** /api/v1/boxes/split | # Разделить коробку.
[**apiV1BoxesStorekeepersGuidPatch**](BoxesApi.md#apiV1BoxesStorekeepersGuidPatch) | **PATCH** /api/v1/boxes/storekeepers/{guid} | # Изменить коробку сотрудником склада.



## apiV1BoxesApprovePost

> Null apiV1BoxesApprovePost(opts)

# Подтвердить операцию объединения/разъединения коробок.

## Подтвердить операцию объединения/разъединения коробок.  

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.BoxesApi();
let opts = {
  'Accept_Encoding': gzip, deflate, // String | 
  'InlineObject9': new Amazonapi.InlineObject9() // InlineObject9 | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]
 **InlineObject9** | [**InlineObject9**](InlineObject9.md)|  | [optional] 

### Return type

[**Null**](Null.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1BoxesCancelMergePost

> Null apiV1BoxesCancelMergePost(opts)

# Отменить объединение коробок.

## Отменить объединение коробок.  

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.BoxesApi();
let opts = {
  'Accept_Encoding': gzip, deflate, // String | 
  'InlineObject6': new Amazonapi.InlineObject6() // InlineObject6 | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]
 **InlineObject6** | [**InlineObject6**](InlineObject6.md)|  | [optional] 

### Return type

[**Null**](Null.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1BoxesCancelSplitPost

> Null apiV1BoxesCancelSplitPost(opts)

# Отменить разделение коробок.

## Отменить разделение коробок.   ## !!! У каждой коробки которая была создана разделением есть братья.    ## !!! Братья - коробки которые были созданы с этой, при разделении родителя.    ## !!! При отмене текущая коробка и все ee братья будут удалены. Родитель восстановлен.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.BoxesApi();
let opts = {
  'Accept_Encoding': gzip, deflate, // String | 
  'InlineObject8': new Amazonapi.InlineObject8() // InlineObject8 | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]
 **InlineObject8** | [**InlineObject8**](InlineObject8.md)|  | [optional] 

### Return type

[**Null**](Null.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1BoxesClientsDraftsGet

> [InlineResponse2002] apiV1BoxesClientsDraftsGet(opts)

# Получить черновики коробок и их строки по текущему клиенту.

## Получить черновики коробок и их строки по текущему клиенту.   ## GUID клиента получаем из токена.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.BoxesApi();
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**[InlineResponse2002]**](InlineResponse2002.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1BoxesClientsGet

> [InlineResponse2002] apiV1BoxesClientsGet(opts)

# Получить коробки и их строки по текущему клиенту.

## Получить коробки(без черновиков) и их строки по текущему клиенту.   ## GUID клиента получаем из токена.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.BoxesApi();
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**[InlineResponse2002]**](InlineResponse2002.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1BoxesDraftsGet

> [InlineResponse2002] apiV1BoxesDraftsGet(opts)

# Получить черновики коробок и их строки.

## Получить черновики коробок и их строки.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.BoxesApi();
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**[InlineResponse2002]**](InlineResponse2002.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1BoxesGet

> [InlineResponse2002] apiV1BoxesGet(opts)

# Получить коробки и их строки.

## Получить коробки их строки.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.BoxesApi();
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**[InlineResponse2002]**](InlineResponse2002.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1BoxesGuidDelete

> Null apiV1BoxesGuidDelete(guid, opts)

# Удалить коробку.

## Удалить коробку.  

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.BoxesApi();
let guid = "guid_example"; // String | GUID для которой подтверждаем действие.
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**Null**](Null.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1BoxesMergePost

> Null apiV1BoxesMergePost(opts)

# Объединить две и более коробок.

## Объединить две и более коробок.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.BoxesApi();
let opts = {
  'Accept_Encoding': gzip, deflate, // String | 
  'InlineObject5': new Amazonapi.InlineObject5() // InlineObject5 | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]
 **InlineObject5** | [**InlineObject5**](InlineObject5.md)|  | [optional] 

### Return type

[**Null**](Null.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1BoxesPost

> InlineResponse201 apiV1BoxesPost(InlineObject4, opts)

# Создать коробку и ее строки.

## Создать коробку и ее строки.   ## Коробка состоит из шапки и строк (как накладная)   ## Коллекция Boxes содержит основные параметры коробки.   ## BoxesItems - коллекция которая содержит строки позиций в коробке.            У коробок есть еще такие параметры:            isActual - если false, то коробка удалена.            isDraft - если true, то коробка является черновиком. Его создал клиента при объеденении / разделении коробки            У клиента и у сотрудника склада их можно отфильтровать и обрабатывать в отдельном окне.         Сотрудник склада обработав позитивно изменение коробок от клиента просто ставит здесь (isDraft) false и коробка становится обычной.         Также у коробки созданной из других коробок заполнено поле parents. Это массив guid родительских коробок.         При отмене объединения коробок в базе по этим guid восстановим коробки isActual &#x3D; true. А новые будут удалены isActual &#x3D; false.         Также у коробки созданной при объединении/разделении будет заполнено поле brothers. Это guid других коробок которые были созданы вместе с этой из общих родителей.         Когда для любой из объединённых коробок будет запрошено удаление, восстановим старые коробки и кроме текущей коробки         будут удалены все ее братья.         

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.BoxesApi();
let InlineObject4 = new Amazonapi.InlineObject4(); // InlineObject4 | 
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1BoxesPost(InlineObject4, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **InlineObject4** | [**InlineObject4**](InlineObject4.md)|  | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**InlineResponse201**](InlineResponse201.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1BoxesSplitPost

> Null apiV1BoxesSplitPost(opts)

# Разделить коробку.

## Разделить коробку.   При разделении коробок странная сущность передается. Там массив массивов.Первый массив это          новые коробки - сколько элементов, столько и создаст коробок. Второй массив - это элементы в коробке.          В нем строки новой коробки. Фронт отвечает за то, что суммарное содержание новых коробок,          было ровно содержанию исходной коробки.           

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.BoxesApi();
let opts = {
  'Accept_Encoding': gzip, deflate, // String | 
  'InlineObject7': new Amazonapi.InlineObject7() // InlineObject7 | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]
 **InlineObject7** | [**InlineObject7**](InlineObject7.md)|  | [optional] 

### Return type

[**Null**](Null.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1BoxesStorekeepersGuidPatch

> Null apiV1BoxesStorekeepersGuidPatch(guid, opts)

# Изменить коробку сотрудником склада.

## Изменить коробку сотрудником склада.            Сотрудник склада не может редактировать содержание коробки, но ему доступно для         редактирования параметры коробки.         

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.BoxesApi();
let guid = "guid_example"; // String | 
let opts = {
  'Accept_Encoding': gzip, deflate, // String | 
  'InlineObject10': new Amazonapi.InlineObject10() // InlineObject10 | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]
 **InlineObject10** | [**InlineObject10**](InlineObject10.md)|  | [optional] 

### Return type

[**Null**](Null.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html

