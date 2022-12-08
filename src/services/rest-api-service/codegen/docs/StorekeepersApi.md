# TestSwagger.StorekeepersApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1StorekeepersBoxesCommentGuidPatch**](StorekeepersApi.md#apiV1StorekeepersBoxesCommentGuidPatch) | **PATCH** /api/v1/storekeepers/boxes/comment/{guid} | # Изменить комментарий коробки сторкипера.
[**apiV1StorekeepersBoxesGet**](StorekeepersApi.md#apiV1StorekeepersBoxesGet) | **GET** /api/v1/storekeepers/boxes | # Получить коробки и их строки по текущему сторкиперу.
[**apiV1StorekeepersBoxesGuidPatch**](StorekeepersApi.md#apiV1StorekeepersBoxesGuidPatch) | **PATCH** /api/v1/storekeepers/boxes/{guid} | # Изменить коробку сторкипером.
[**apiV1StorekeepersDestinationPost**](StorekeepersApi.md#apiV1StorekeepersDestinationPost) | **POST** /api/v1/storekeepers/destination | # Создать/обновить дестинейшн
[**apiV1StorekeepersDestructBatchGuidPost**](StorekeepersApi.md#apiV1StorekeepersDestructBatchGuidPost) | **POST** /api/v1/storekeepers/destruct_batch/{guid} | # Скопировать партию, расформировать, на коробки из партии создать задачи
[**apiV1StorekeepersGet**](StorekeepersApi.md#apiV1StorekeepersGet) | **GET** /api/v1/storekeepers/ | # Получить всех сторкиперов(все склады).
[**apiV1StorekeepersOrdersSetStatusGuidPatch**](StorekeepersApi.md#apiV1StorekeepersOrdersSetStatusGuidPatch) | **PATCH** /api/v1/storekeepers/orders/set_status/{guid} | # Изменить значение status в сущности заказ.
[**apiV1StorekeepersPagBoxesGet**](StorekeepersApi.md#apiV1StorekeepersPagBoxesGet) | **GET** /api/v1/storekeepers/pag/boxes | # Получить коробки и их строки по текущему сторкиперу с пагинацией.
[**apiV1StorekeepersTariffLogisticsGuidDelete**](StorekeepersApi.md#apiV1StorekeepersTariffLogisticsGuidDelete) | **DELETE** /api/v1/storekeepers/tariff-logistics/{guid} | # Удалить тариф доставки.
[**apiV1StorekeepersTariffLogisticsGuidPatch**](StorekeepersApi.md#apiV1StorekeepersTariffLogisticsGuidPatch) | **PATCH** /api/v1/storekeepers/tariff-logistics/{guid} | # Редактировать тариф доставки.
[**apiV1StorekeepersTariffLogisticsMyGet**](StorekeepersApi.md#apiV1StorekeepersTariffLogisticsMyGet) | **GET** /api/v1/storekeepers/tariff-logistics/my | # Получить всех тарифами доставки сторкипером.
[**apiV1StorekeepersTariffLogisticsPost**](StorekeepersApi.md#apiV1StorekeepersTariffLogisticsPost) | **POST** /api/v1/storekeepers/tariff-logistics | # Создать тарифами доставки.
[**apiV1StorekeepersTariffWarehouseGuidDelete**](StorekeepersApi.md#apiV1StorekeepersTariffWarehouseGuidDelete) | **DELETE** /api/v1/storekeepers/tariff-warehouse/{guid} | # Удалить тариф склада.
[**apiV1StorekeepersTariffWarehouseGuidPatch**](StorekeepersApi.md#apiV1StorekeepersTariffWarehouseGuidPatch) | **PATCH** /api/v1/storekeepers/tariff-warehouse/{guid} | # Редактировать тариф услуг склада.
[**apiV1StorekeepersTariffWarehouseMyGet**](StorekeepersApi.md#apiV1StorekeepersTariffWarehouseMyGet) | **GET** /api/v1/storekeepers/tariff-warehouse/my | # Получить все тарифы сторкипером.
[**apiV1StorekeepersTariffWarehousesPost**](StorekeepersApi.md#apiV1StorekeepersTariffWarehousesPost) | **POST** /api/v1/storekeepers/tariff-warehouses | # Создать тариф услуг склада.
[**apiV1StorekeepersTaskLightGuidGet**](StorekeepersApi.md#apiV1StorekeepersTaskLightGuidGet) | **GET** /api/v1/storekeepers/task_light/{guid} | # NEW! Получить задачу по его id.
[**apiV1StorekeepersTasksCancelGuidPost**](StorekeepersApi.md#apiV1StorekeepersTasksCancelGuidPost) | **POST** /api/v1/storekeepers/tasks/cancel/{guid} | # Отметить задачу, как отмененную..
[**apiV1StorekeepersTasksDoneGuidPost**](StorekeepersApi.md#apiV1StorekeepersTasksDoneGuidPost) | **POST** /api/v1/storekeepers/tasks/done/{guid} | # Отметить задачу, как выполненную.
[**apiV1StorekeepersTasksGuidPatch**](StorekeepersApi.md#apiV1StorekeepersTasksGuidPatch) | **PATCH** /api/v1/storekeepers/tasks/{guid} | # Изменить задачу.
[**apiV1StorekeepersTasksLightMyGet**](StorekeepersApi.md#apiV1StorekeepersTasksLightMyGet) | **GET** /api/v1/storekeepers/tasks_light/my | # Получить задачи закрепленные за данным сборщиком..
[**apiV1StorekeepersTasksLightPagMyGet**](StorekeepersApi.md#apiV1StorekeepersTasksLightPagMyGet) | **GET** /api/v1/storekeepers/tasks_light/pag/my | # Получить задачи закрепленные за данным сторкипером с пагинацией
[**apiV1StorekeepersTasksLightVacGet**](StorekeepersApi.md#apiV1StorekeepersTasksLightVacGet) | **GET** /api/v1/storekeepers/tasks_light/vac | # Получить задачи не закрепленные за сотрудниками склада.
[**apiV1StorekeepersTasksMyGet**](StorekeepersApi.md#apiV1StorekeepersTasksMyGet) | **GET** /api/v1/storekeepers/tasks/my | # Получить задачи закрепленные за данным сборщиком..
[**apiV1StorekeepersTasksPickupGuidPost**](StorekeepersApi.md#apiV1StorekeepersTasksPickupGuidPost) | **POST** /api/v1/storekeepers/tasks/pickup/{guid} | # Закрепить задачу за сборщиком.
[**apiV1StorekeepersTasksVacGet**](StorekeepersApi.md#apiV1StorekeepersTasksVacGet) | **GET** /api/v1/storekeepers/tasks/vac | # Deprecated! Получить задачи не закрепленные за сотрудниками склада.



## apiV1StorekeepersBoxesCommentGuidPatch

> String apiV1StorekeepersBoxesCommentGuidPatch(guid, opts)

# Изменить комментарий коробки сторкипера.

## Изменить комментарий коробки сторкипера.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.StorekeepersApi();
let guid = null; // String | GUID тарифа.
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject92() // InlineObject92 | 
};
apiInstance.apiV1StorekeepersBoxesCommentGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID тарифа. | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject92**](InlineObject92.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1StorekeepersBoxesGet

> [ApiV1BatchesBoxes] apiV1StorekeepersBoxesGet(opts)

# Получить коробки и их строки по текущему сторкиперу.

## Получить коробки и их строки по текущему сторкиперу.   Отдет все коробки кроме тех которые были в отбывших партии, со статусом: HAS_DISPATCHED  GUID сторкипера получаем из токена.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.StorekeepersApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1StorekeepersBoxesGet(opts).then((data) => {
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

[**[ApiV1BatchesBoxes]**](ApiV1BatchesBoxes.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1StorekeepersBoxesGuidPatch

> String apiV1StorekeepersBoxesGuidPatch(guid, opts)

# Изменить коробку сторкипером.

## Изменить коробку сторкипером.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.StorekeepersApi();
let guid = null; // String | GUID тарифа.
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject91() // InlineObject91 | 
};
apiInstance.apiV1StorekeepersBoxesGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID тарифа. | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject91**](InlineObject91.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1StorekeepersDestinationPost

> InlineResponse2016 apiV1StorekeepersDestinationPost(opts)

# Создать/обновить дестинейшн

## Создать/обновить дестинейшн  Доступно для сторкипера

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.StorekeepersApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject97() // InlineObject97 | 
};
apiInstance.apiV1StorekeepersDestinationPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject97**](InlineObject97.md)|  | [optional] 

### Return type

[**InlineResponse2016**](InlineResponse2016.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1StorekeepersDestructBatchGuidPost

> String apiV1StorekeepersDestructBatchGuidPost(guid, opts)

# Скопировать партию, расформировать, на коробки из партии создать задачи

## Создается копия партии, коробки получают статус IN_STOCK, слздаются задачи на принятие

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.StorekeepersApi();
let guid = null; // String | GUID партии в БД.
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1StorekeepersDestructBatchGuidPost(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID партии в БД. | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1StorekeepersGet

> [InlineResponse20050] apiV1StorekeepersGet(opts)

# Получить всех сторкиперов(все склады).

## Получить всех сторкиперов(все склады).  если вызвал килен, то показывает сколко коробок у каждого сторкипера пока тут только данные о сторкипере, далее должно быть вся информация о складе, с тарифами  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.StorekeepersApi();
let opts = {
  'boxStatus': "'IN_STOCK'", // String | Статус коробок,  которые нужно посчитать.
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1StorekeepersGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **boxStatus** | **String**| Статус коробок,  которые нужно посчитать. | [optional] [default to &#39;IN_STOCK&#39;]
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse20050]**](InlineResponse20050.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1StorekeepersOrdersSetStatusGuidPatch

> String apiV1StorekeepersOrdersSetStatusGuidPatch(guid, opts)

# Изменить значение status в сущности заказ.

## Изменить значение status  в сущности заказ.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.StorekeepersApi();
let guid = null; // String | GUID ордера, который мы хотим изменить
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject90() // InlineObject90 | 
};
apiInstance.apiV1StorekeepersOrdersSetStatusGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID ордера, который мы хотим изменить | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject90**](InlineObject90.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1StorekeepersPagBoxesGet

> InlineResponse20049 apiV1StorekeepersPagBoxesGet(opts)

# Получить коробки и их строки по текущему сторкиперу с пагинацией.

## Получить коробки и их строки по текущему сторкиперу с пагинацией.   Отдет все коробки кроме тех которые были в отбывших партии, со статусом: HAS_DISPATCHED  GUID сторкипера получаем из токена.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.StorekeepersApi();
let opts = {
  'filters': "filters_example", // String |                Примеры: /boxes/pag/clients_light?filters=or[0][id][$eq]=B08F5VCNCY;or[1][amazonTitle][$contains]=drive                отдает все где ASIN = \"B08F5VCNCY\" или в amazonTitle встречается \"drive\", не чувствителен к регистру.                 без или: /boxes/pag/clients_light?filters=[amazonTitle][$contains]=drive                 Query параметры:                filters - фильтры по любые поля из модели продукта                shopId - ID магазина             
  'limit': 10.0, // Number | Лимит записей для пагинации
  'offset': 0.0, // Number | Смещение для пагинации
  'sortField': "sortField_example", // String | Название поля
  'sortType': "sortType_example", // String | Тип сортировки
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1StorekeepersPagBoxesGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **filters** | **String**|                Примеры: /boxes/pag/clients_light?filters&#x3D;or[0][id][$eq]&#x3D;B08F5VCNCY;or[1][amazonTitle][$contains]&#x3D;drive                отдает все где ASIN &#x3D; \&quot;B08F5VCNCY\&quot; или в amazonTitle встречается \&quot;drive\&quot;, не чувствителен к регистру.                 без или: /boxes/pag/clients_light?filters&#x3D;[amazonTitle][$contains]&#x3D;drive                 Query параметры:                filters - фильтры по любые поля из модели продукта                shopId - ID магазина              | [optional] 
 **limit** | **Number**| Лимит записей для пагинации | [optional] [default to 10.0]
 **offset** | **Number**| Смещение для пагинации | [optional] [default to 0.0]
 **sortField** | **String**| Название поля | [optional] 
 **sortType** | **String**| Тип сортировки | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**InlineResponse20049**](InlineResponse20049.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1StorekeepersTariffLogisticsGuidDelete

> String apiV1StorekeepersTariffLogisticsGuidDelete(guid, opts)

# Удалить тариф доставки.

## Удалить тариф доставки.  Логическое удаление, isActual &#x3D; false.         При удалении тарифа доставки все коробки, принадлежащие тарифу, со статусами REQUESTED_SEND_TO_BATCH, IN_BATCH,         переводятся в статус NEED_TO_UPDATE_THE_TARIFF.         Проверки:         Доступно для сторкипера.

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.StorekeepersApi();
let guid = null; // String | GUID тарифа.
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1StorekeepersTariffLogisticsGuidDelete(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID тарифа. | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1StorekeepersTariffLogisticsGuidPatch

> String apiV1StorekeepersTariffLogisticsGuidPatch(guid, opts)

# Редактировать тариф доставки.

## Редактировать тариф доставки.  Доступно для сторкипера.         у коробок с статусами: NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE, REQUESTED_SEND_TO_BATCH, IN_BATCH,         при изменении тарифа происходит пересчет стоимостей доставок.         При повышении цены ставиться статус NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE, далее нужно ожидать подтверждения от клиента.         Если вернуть цену на старое значение, то статус возвращается к REQUESTED_SEND_TO_BATCH.         При понижении цены автоматом происходит возврат разницы клиенту, статус ставится REQUESTED_SEND_TO_BATCH

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.StorekeepersApi();
let guid = null; // String | GUID тарифа.
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject94() // InlineObject94 | 
};
apiInstance.apiV1StorekeepersTariffLogisticsGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID тарифа. | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject94**](InlineObject94.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1StorekeepersTariffLogisticsMyGet

> [ApiV1AdminsOrdersLogicsTariff] apiV1StorekeepersTariffLogisticsMyGet(opts)

# Получить всех тарифами доставки сторкипером.

## Получить всех тарифами доставки сторкипером.   доступно сторкипером  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.StorekeepersApi();
let opts = {
  'archive': true, // Boolean | Заархивирован ли тариф
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1StorekeepersTariffLogisticsMyGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **archive** | **Boolean**| Заархивирован ли тариф | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[ApiV1AdminsOrdersLogicsTariff]**](ApiV1AdminsOrdersLogicsTariff.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1StorekeepersTariffLogisticsPost

> InlineResponse2016 apiV1StorekeepersTariffLogisticsPost(opts)

# Создать тарифами доставки.

## Создать тарифами доставки.  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.StorekeepersApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject93() // InlineObject93 | 
};
apiInstance.apiV1StorekeepersTariffLogisticsPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject93**](InlineObject93.md)|  | [optional] 

### Return type

[**InlineResponse2016**](InlineResponse2016.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1StorekeepersTariffWarehouseGuidDelete

> String apiV1StorekeepersTariffWarehouseGuidDelete(guid, opts)

# Удалить тариф склада.

## Удалить тариф склада.  Доступно для сторкипера

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.StorekeepersApi();
let guid = null; // String | GUID тарифа.
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1StorekeepersTariffWarehouseGuidDelete(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID тарифа. | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1StorekeepersTariffWarehouseGuidPatch

> String apiV1StorekeepersTariffWarehouseGuidPatch(guid, opts)

# Редактировать тариф услуг склада.

## Редактировать тариф услуг склада.  Доступно для сторкипера

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.StorekeepersApi();
let guid = null; // String | GUID тарифа.
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject96() // InlineObject96 | 
};
apiInstance.apiV1StorekeepersTariffWarehouseGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID тарифа. | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject96**](InlineObject96.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1StorekeepersTariffWarehouseMyGet

> [ApiV1StorekeepersTariffWarehouses] apiV1StorekeepersTariffWarehouseMyGet(opts)

# Получить все тарифы сторкипером.

## Получить все тарифы сторкипером.   доступно сторкипером  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.StorekeepersApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1StorekeepersTariffWarehouseMyGet(opts).then((data) => {
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

[**[ApiV1StorekeepersTariffWarehouses]**](ApiV1StorekeepersTariffWarehouses.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1StorekeepersTariffWarehousesPost

> InlineResponse2016 apiV1StorekeepersTariffWarehousesPost(opts)

# Создать тариф услуг склада.

## Создать тариф услуг склада.  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.StorekeepersApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject95() // InlineObject95 | 
};
apiInstance.apiV1StorekeepersTariffWarehousesPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject95**](InlineObject95.md)|  | [optional] 

### Return type

[**InlineResponse2016**](InlineResponse2016.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1StorekeepersTaskLightGuidGet

> {String: Object} apiV1StorekeepersTaskLightGuidGet(guid, opts)

# NEW! Получить задачу по его id.

## NEW! Получить задачу по его id.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.StorekeepersApi();
let guid = null; // String | GUID задачи.
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1StorekeepersTaskLightGuidGet(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID задачи. | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**{String: Object}**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1StorekeepersTasksCancelGuidPost

> String apiV1StorekeepersTasksCancelGuidPost(guid, opts)

# Отметить задачу, как отмененную..

## Отметить задачу, как отмененную.  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.StorekeepersApi();
let guid = null; // String | GUID задачи, которую мы хотим изменить
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1StorekeepersTasksCancelGuidPost(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID задачи, которую мы хотим изменить | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1StorekeepersTasksDoneGuidPost

> String apiV1StorekeepersTasksDoneGuidPost(guid, opts)

# Отметить задачу, как выполненную.

## Отметить задачу, как выполненную.  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.StorekeepersApi();
let guid = null; // String | GUID задачи, которую мы хотим изменить
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject88() // InlineObject88 | 
};
apiInstance.apiV1StorekeepersTasksDoneGuidPost(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID задачи, которую мы хотим изменить | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject88**](InlineObject88.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1StorekeepersTasksGuidPatch

> String apiV1StorekeepersTasksGuidPatch(guid, opts)

# Изменить задачу.

## Изменить задачу. Здесь только статус.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.StorekeepersApi();
let guid = null; // String | GUID задачи, которую мы хотим изменить
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject89() // InlineObject89 | 
};
apiInstance.apiV1StorekeepersTasksGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID задачи, которую мы хотим изменить | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject89**](InlineObject89.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1StorekeepersTasksLightMyGet

> [InlineResponse2004] apiV1StorekeepersTasksLightMyGet(opts)

# Получить задачи закрепленные за данным сборщиком..

## Получить задачи закрепленные за данным сборщиком.  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.StorekeepersApi();
let opts = {
  'status': 3.4, // Number | Статус задачи для фильтра.
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1StorekeepersTasksLightMyGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **status** | **Number**| Статус задачи для фильтра. | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse2004]**](InlineResponse2004.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1StorekeepersTasksLightPagMyGet

> InlineResponse20048 apiV1StorekeepersTasksLightPagMyGet(opts)

# Получить задачи закрепленные за данным сторкипером с пагинацией

## олучить задачи закрепленные за данным сторкипером с пагинацией  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.StorekeepersApi();
let opts = {
  'status': 56, // Number | Статус задачи для фильтра.
  'offset': 56, // Number | Отступ от первой записи получаемой в запросе
  'limit': 56, // Number | Кол-во получаемых записей
  'filters': "filters_example", // String |                Примеры: /tasks_light/pag/my?filters=or[0][id][$eq]=B08F5VCNCY;or[1][amazonTitle][$contains]=drive                отдает все где ASIN = \"B08F5VCNCY\" или в amazonTitle встречается \"drive\", не чувствителен к регистру.                 без или: /tasks_light/pag/my?filters=[amazonTitle][$contains]=drive                 Query параметры:                filters - фильтры по любые поля из модели продукта              
  'sortField': "sortField_example", // String | Название поля
  'sortType': "sortType_example", // String | Тип сортировки
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1StorekeepersTasksLightPagMyGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **status** | **Number**| Статус задачи для фильтра. | [optional] 
 **offset** | **Number**| Отступ от первой записи получаемой в запросе | [optional] 
 **limit** | **Number**| Кол-во получаемых записей | [optional] 
 **filters** | **String**|                Примеры: /tasks_light/pag/my?filters&#x3D;or[0][id][$eq]&#x3D;B08F5VCNCY;or[1][amazonTitle][$contains]&#x3D;drive                отдает все где ASIN &#x3D; \&quot;B08F5VCNCY\&quot; или в amazonTitle встречается \&quot;drive\&quot;, не чувствителен к регистру.                 без или: /tasks_light/pag/my?filters&#x3D;[amazonTitle][$contains]&#x3D;drive                 Query параметры:                filters - фильтры по любые поля из модели продукта               | [optional] 
 **sortField** | **String**| Название поля | [optional] 
 **sortType** | **String**| Тип сортировки | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**InlineResponse20048**](InlineResponse20048.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1StorekeepersTasksLightVacGet

> [InlineResponse2004] apiV1StorekeepersTasksLightVacGet(opts)

# Получить задачи не закрепленные за сотрудниками склада.

## Получить задачи не закрепленные за сотрудниками склада.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.StorekeepersApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1StorekeepersTasksLightVacGet(opts).then((data) => {
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

[**[InlineResponse2004]**](InlineResponse2004.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1StorekeepersTasksMyGet

> [InlineResponse20019] apiV1StorekeepersTasksMyGet(opts)

# Получить задачи закрепленные за данным сборщиком..

## Получить задачи закрепленные за данным сборщиком.  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.StorekeepersApi();
let opts = {
  'status': 3.4, // Number | Статус задачи для фильтра.
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1StorekeepersTasksMyGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **status** | **Number**| Статус задачи для фильтра. | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse20019]**](InlineResponse20019.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1StorekeepersTasksPickupGuidPost

> String apiV1StorekeepersTasksPickupGuidPost(guid, opts)

# Закрепить задачу за сборщиком.

## Закрепить задачу за сборщиком.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.StorekeepersApi();
let guid = null; // String | GUID задачи, которую мы хотим изменить
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1StorekeepersTasksPickupGuidPost(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID задачи, которую мы хотим изменить | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1StorekeepersTasksVacGet

> [InlineResponse20019] apiV1StorekeepersTasksVacGet(opts)

# Deprecated! Получить задачи не закрепленные за сотрудниками склада.

## Получить задачи не закрепленные за сотрудниками склада.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.StorekeepersApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1StorekeepersTasksVacGet(opts).then((data) => {
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

[**[InlineResponse20019]**](InlineResponse20019.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

