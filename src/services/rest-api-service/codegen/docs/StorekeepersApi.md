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
[**apiV1StorekeepersTasksLightPagVacGet**](StorekeepersApi.md#apiV1StorekeepersTasksLightPagVacGet) | **GET** /api/v1/storekeepers/tasks_light/pag/vac | # Получить вакантные задачи закрепленные за данным сторкипером с пагинацией
[**apiV1StorekeepersTasksLightVacGet**](StorekeepersApi.md#apiV1StorekeepersTasksLightVacGet) | **GET** /api/v1/storekeepers/tasks_light/vac | # Получить задачи не закрепленные за сотрудниками склада.
[**apiV1StorekeepersTasksMyGet**](StorekeepersApi.md#apiV1StorekeepersTasksMyGet) | **GET** /api/v1/storekeepers/tasks/my | # Получить задачи закрепленные за данным сборщиком..
[**apiV1StorekeepersTasksPickupGuidPost**](StorekeepersApi.md#apiV1StorekeepersTasksPickupGuidPost) | **POST** /api/v1/storekeepers/tasks/pickup/{guid} | # Закрепить задачу за сборщиком.
[**apiV1StorekeepersTasksPickupManyPost**](StorekeepersApi.md#apiV1StorekeepersTasksPickupManyPost) | **POST** /api/v1/storekeepers/tasks/pickup/many | # Взять несколько задач сторкипером
[**apiV1StorekeepersTasksPriorityGuidPatch**](StorekeepersApi.md#apiV1StorekeepersTasksPriorityGuidPatch) | **PATCH** /api/v1/storekeepers/tasks/priority/{guid} | # Изменить приоритет задачи.
[**apiV1StorekeepersTasksReportGuidGet**](StorekeepersApi.md#apiV1StorekeepersTasksReportGuidGet) | **GET** /api/v1/storekeepers/tasks/report/{guid} | # Получить данные из boxesBefore в формате XLSX
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
  'body': new TestSwagger.InlineObject112() // InlineObject112 | 
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
 **body** | [**InlineObject112**](InlineObject112.md)|  | [optional] 

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
  'offset': 56, // Number | Отступ от первой записи получаемой в запросе
  'limit': 56, // Number | Кол-во получаемых записей
  'sortField': "sortField_example", // String | Название поля
  'sortType': "sortType_example", // String | Тип сортировки
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
 **offset** | **Number**| Отступ от первой записи получаемой в запросе | [optional] 
 **limit** | **Number**| Кол-во получаемых записей | [optional] 
 **sortField** | **String**| Название поля | [optional] 
 **sortType** | **String**| Тип сортировки | [optional] 
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
  'body': new TestSwagger.InlineObject111() // InlineObject111 | 
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
 **body** | [**InlineObject111**](InlineObject111.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1StorekeepersDestinationPost

> InlineResponse2017 apiV1StorekeepersDestinationPost(opts)

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
  'body': new TestSwagger.InlineObject117() // InlineObject117 | 
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
 **body** | [**InlineObject117**](InlineObject117.md)|  | [optional] 

### Return type

[**InlineResponse2017**](InlineResponse2017.md)

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

> [InlineResponse20070] apiV1StorekeepersGet(opts)

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
  'tariffType': 56, // Number | Тип тарифа(10, 20)
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
 **tariffType** | **Number**| Тип тарифа(10, 20) | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse20070]**](InlineResponse20070.md)

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
  'body': new TestSwagger.InlineObject110() // InlineObject110 | 
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
 **body** | [**InlineObject110**](InlineObject110.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1StorekeepersPagBoxesGet

> InlineResponse20069 apiV1StorekeepersPagBoxesGet(opts)

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
  'filters': "filters_example", // String |                Возможные поля: asin, amazonTitle, title, humanFriendlyId, orderHumanFriendlyId, orderItem               Поиск для полей продукта идет через схему Коробка -> Айтем коробки -> Продукт               2 варианта использования:                 1. Фильтр по одному полю:                   [amazonTitle][$eq]=some_title                 2. Фильтр по нескольким полям:                   or[0][amazonTitle][$eq]=some_title;or[1][asin][$eq]=some_asin                     Возвращает партии с коробками с продуктами, в которых amazonTitle равен some_title или asin равен some_asin               2 оператора совпадения:                 $eq - полное совпадение, нечувствителен к регистру                 $contains - наличие данной подстроки в поле, нечувствителен к регистру, предназначен только для строк             
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
 **filters** | **String**|                Возможные поля: asin, amazonTitle, title, humanFriendlyId, orderHumanFriendlyId, orderItem               Поиск для полей продукта идет через схему Коробка -&gt; Айтем коробки -&gt; Продукт               2 варианта использования:                 1. Фильтр по одному полю:                   [amazonTitle][$eq]&#x3D;some_title                 2. Фильтр по нескольким полям:                   or[0][amazonTitle][$eq]&#x3D;some_title;or[1][asin][$eq]&#x3D;some_asin                     Возвращает партии с коробками с продуктами, в которых amazonTitle равен some_title или asin равен some_asin               2 оператора совпадения:                 $eq - полное совпадение, нечувствителен к регистру                 $contains - наличие данной подстроки в поле, нечувствителен к регистру, предназначен только для строк              | [optional] 
 **limit** | **Number**| Лимит записей для пагинации | [optional] [default to 10.0]
 **offset** | **Number**| Смещение для пагинации | [optional] [default to 0.0]
 **sortField** | **String**| Название поля | [optional] 
 **sortType** | **String**| Тип сортировки | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**InlineResponse20069**](InlineResponse20069.md)

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
  'body': new TestSwagger.InlineObject114() // InlineObject114 | 
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
 **body** | [**InlineObject114**](InlineObject114.md)|  | [optional] 

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
  'tariffType': 56, // Number | Тип тарифа(10, 20)
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
 **tariffType** | **Number**| Тип тарифа(10, 20) | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[ApiV1AdminsOrdersLogicsTariff]**](ApiV1AdminsOrdersLogicsTariff.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1StorekeepersTariffLogisticsPost

> InlineResponse2017 apiV1StorekeepersTariffLogisticsPost(opts)

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
  'body': new TestSwagger.InlineObject113() // InlineObject113 | 
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
 **body** | [**InlineObject113**](InlineObject113.md)|  | [optional] 

### Return type

[**InlineResponse2017**](InlineResponse2017.md)

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
  'body': new TestSwagger.InlineObject116() // InlineObject116 | 
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
 **body** | [**InlineObject116**](InlineObject116.md)|  | [optional] 

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

> InlineResponse2017 apiV1StorekeepersTariffWarehousesPost(opts)

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
  'body': new TestSwagger.InlineObject115() // InlineObject115 | 
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
 **body** | [**InlineObject115**](InlineObject115.md)|  | [optional] 

### Return type

[**InlineResponse2017**](InlineResponse2017.md)

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
  'body': new TestSwagger.InlineObject107() // InlineObject107 | 
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
 **body** | [**InlineObject107**](InlineObject107.md)|  | [optional] 

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
  'body': new TestSwagger.InlineObject108() // InlineObject108 | 
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
 **body** | [**InlineObject108**](InlineObject108.md)|  | [optional] 

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

> InlineResponse20068 apiV1StorekeepersTasksLightPagMyGet(opts)

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
  'operationType': "operationType_example", // String | Типы задач разделенные запятой
  'priority': "priority_example", // String | Приоритет задачи
  'limit': 56, // Number | Кол-во получаемых записей
  'filters': "filters_example", // String |                Возможные поля: isBarCodeAttached, asin, amazonTitle, skusByClient, id, item, trackNumberText, humanFriendlyId               Поиск для полей продукта идет через схему Задача -> Коробка -> Айтем коробки -> Продукт               Под humanFriendlyId имеется ввиду humanFriendlyId коробки               2 варианта использования:                 1. Фильтр по одному полю:                   [amazonTitle][$eq]=some_title                 2. Фильтр по нескольким полям:                   or[0][amazonTitle][$eq]=some_title;or[1][asin][$eq]=some_asin                     Возвращает партии с коробками с продуктами, в которых amazonTitle равен some_title или asin равен some_asin               2 оператора совпадения:                 $eq - полное совпадение, нечувствителен к регистру                 $contains - наличие данной подстроки в поле, нечувствителен к регистру, предназначен только для строк             
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
 **operationType** | **String**| Типы задач разделенные запятой | [optional] 
 **priority** | **String**| Приоритет задачи | [optional] 
 **limit** | **Number**| Кол-во получаемых записей | [optional] 
 **filters** | **String**|                Возможные поля: isBarCodeAttached, asin, amazonTitle, skusByClient, id, item, trackNumberText, humanFriendlyId               Поиск для полей продукта идет через схему Задача -&gt; Коробка -&gt; Айтем коробки -&gt; Продукт               Под humanFriendlyId имеется ввиду humanFriendlyId коробки               2 варианта использования:                 1. Фильтр по одному полю:                   [amazonTitle][$eq]&#x3D;some_title                 2. Фильтр по нескольким полям:                   or[0][amazonTitle][$eq]&#x3D;some_title;or[1][asin][$eq]&#x3D;some_asin                     Возвращает партии с коробками с продуктами, в которых amazonTitle равен some_title или asin равен some_asin               2 оператора совпадения:                 $eq - полное совпадение, нечувствителен к регистру                 $contains - наличие данной подстроки в поле, нечувствителен к регистру, предназначен только для строк              | [optional] 
 **sortField** | **String**| Название поля | [optional] 
 **sortType** | **String**| Тип сортировки | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**InlineResponse20068**](InlineResponse20068.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1StorekeepersTasksLightPagVacGet

> InlineResponse20068 apiV1StorekeepersTasksLightPagVacGet(opts)

# Получить вакантные задачи закрепленные за данным сторкипером с пагинацией

## Получить вакантные задачи закрепленные за данным сторкипером с пагинацией  

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
  'priority': "priority_example", // String | Приоритет задачи
  'operationType': "operationType_example", // String | Типы задач разделенные запятой
  'filters': "filters_example", // String |                Возможные поля: asin, amazonTitle, title, humanFriendlyId, id, item, productId               Поиск для полей продукта идет через схему Партия -> Коробка -> Айтем коробки -> Продукт               Под humanFriendlyId имеется ввиду humanFriendlyId партии, не коробки               2 варианта использования:                 1. Фильтр по одному полю:                   [amazonTitle][$eq]=some_title                 2. Фильтр по нескольким полям:                   or[0][amazonTitle][$eq]=some_title;or[1][asin][$eq]=some_asin                     Возвращает партии с коробками с продуктами, в которых amazonTitle равен some_title или asin равен some_asin               2 оператора совпадения:                 $eq - полное совпадение, нечувствителен к регистру                 $contains - наличие данной подстроки в поле, нечувствителен к регистру, предназначен только для строк             
  'sortField': "sortField_example", // String | Название поля
  'sortType': "sortType_example", // String | Тип сортировки
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1StorekeepersTasksLightPagVacGet(opts).then((data) => {
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
 **priority** | **String**| Приоритет задачи | [optional] 
 **operationType** | **String**| Типы задач разделенные запятой | [optional] 
 **filters** | **String**|                Возможные поля: asin, amazonTitle, title, humanFriendlyId, id, item, productId               Поиск для полей продукта идет через схему Партия -&gt; Коробка -&gt; Айтем коробки -&gt; Продукт               Под humanFriendlyId имеется ввиду humanFriendlyId партии, не коробки               2 варианта использования:                 1. Фильтр по одному полю:                   [amazonTitle][$eq]&#x3D;some_title                 2. Фильтр по нескольким полям:                   or[0][amazonTitle][$eq]&#x3D;some_title;or[1][asin][$eq]&#x3D;some_asin                     Возвращает партии с коробками с продуктами, в которых amazonTitle равен some_title или asin равен some_asin               2 оператора совпадения:                 $eq - полное совпадение, нечувствителен к регистру                 $contains - наличие данной подстроки в поле, нечувствителен к регистру, предназначен только для строк              | [optional] 
 **sortField** | **String**| Название поля | [optional] 
 **sortType** | **String**| Тип сортировки | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**InlineResponse20068**](InlineResponse20068.md)

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

> [InlineResponse20027] apiV1StorekeepersTasksMyGet(opts)

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

[**[InlineResponse20027]**](InlineResponse20027.md)

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


## apiV1StorekeepersTasksPickupManyPost

> String apiV1StorekeepersTasksPickupManyPost(opts)

# Взять несколько задач сторкипером

Переврдит все задачи из статуса 0 в статус 10, storekeeper_id должен совпадать с _id юзера

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
  'body': ["a150bdc1-17bc-4fa4-929e-189b106f11bc"] // [String] | 
};
apiInstance.apiV1StorekeepersTasksPickupManyPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**[String]**](String.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1StorekeepersTasksPriorityGuidPatch

> String apiV1StorekeepersTasksPriorityGuidPatch(guid, opts)

# Изменить приоритет задачи.

## Изменить приоритет задачи.   

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
  'body': new TestSwagger.InlineObject109() // InlineObject109 | 
};
apiInstance.apiV1StorekeepersTasksPriorityGuidPatch(guid, opts).then((data) => {
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
 **body** | [**InlineObject109**](InlineObject109.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1StorekeepersTasksReportGuidGet

> File apiV1StorekeepersTasksReportGuidGet(guid, opts)

# Получить данные из boxesBefore в формате XLSX

## Получить данные из boxesBefore в формате XLSX

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
let guid = null; // String | GUID таски
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1StorekeepersTasksReportGuidGet(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID таски | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**File**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1StorekeepersTasksVacGet

> [InlineResponse20027] apiV1StorekeepersTasksVacGet(opts)

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

[**[InlineResponse20027]**](InlineResponse20027.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

