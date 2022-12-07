# TestSwagger.BuyerApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1BuyersOrdersGuidEditItemItemPatch**](BuyerApi.md#apiV1BuyersOrdersGuidEditItemItemPatch) | **PATCH** /api/v1/buyers/orders/{guid}/edit_item/{item} | # Редактировать номер заказа.
[**apiV1BuyersOrdersGuidEditPatch**](BuyerApi.md#apiV1BuyersOrdersGuidEditPatch) | **PATCH** /api/v1/buyers/orders/{guid}/edit | # Редактировать заказ.
[**apiV1BuyersOrdersGuidGet**](BuyerApi.md#apiV1BuyersOrdersGuidGet) | **GET** /api/v1/buyers/orders/{guid} | # Получить конкретный заказ по его GUID.
[**apiV1BuyersOrdersGuidPayToSupplierPatch**](BuyerApi.md#apiV1BuyersOrdersGuidPayToSupplierPatch) | **PATCH** /api/v1/buyers/orders/{guid}/pay_to_supplier | # Выставить статус оплачено поставщику.
[**apiV1BuyersOrdersGuidReturnOrderPatch**](BuyerApi.md#apiV1BuyersOrdersGuidReturnOrderPatch) | **PATCH** /api/v1/buyers/orders/{guid}/return_order | # Выставить статус пришёл не кондиционный - \&quot;возврат заказа\&quot;, returnOrder: 35.
[**apiV1BuyersOrdersGuidSetTotalPriceChangedPatch**](BuyerApi.md#apiV1BuyersOrdersGuidSetTotalPriceChangedPatch) | **PATCH** /api/v1/buyers/orders/{guid}/set_totalPriceChanged | # Задать изменение итоговой цены, totalPriceChanged.
[**apiV1BuyersOrdersGuidTrackNumberIssuedPatch**](BuyerApi.md#apiV1BuyersOrdersGuidTrackNumberIssuedPatch) | **PATCH** /api/v1/buyers/orders/{guid}/track_number_issued | # Выставить статус \&quot;выдан трек номер\&quot;.
[**apiV1BuyersOrdersMyGet**](BuyerApi.md#apiV1BuyersOrdersMyGet) | **GET** /api/v1/buyers/orders/my | # Получить список заказов текущего байера.
[**apiV1BuyersOrdersPagMyGet**](BuyerApi.md#apiV1BuyersOrdersPagMyGet) | **GET** /api/v1/buyers/orders/pag/my | # Получить список заказов текущего байера с пагинацией.
[**apiV1BuyersOrdersPickupGuidPost**](BuyerApi.md#apiV1BuyersOrdersPickupGuidPost) | **POST** /api/v1/buyers/orders/pickup/{guid} | # Закрепить заказ за байером. Взять его в работу.
[**apiV1BuyersOrdersSetInStockGuidPatch**](BuyerApi.md#apiV1BuyersOrdersSetInStockGuidPatch) | **PATCH** /api/v1/buyers/orders/set_in_stock/{guid} | # Редактировать номер заказа на inStock (30).
[**apiV1BuyersOrdersVacGet**](BuyerApi.md#apiV1BuyersOrdersVacGet) | **GET** /api/v1/buyers/orders/vac | # Получить список свободных заказов.
[**apiV1BuyersProductsGuidPatch**](BuyerApi.md#apiV1BuyersProductsGuidPatch) | **PATCH** /api/v1/buyers/products/{guid} | # Внести изменения в продукт.
[**apiV1BuyersProductsLightGet**](BuyerApi.md#apiV1BuyersProductsLightGet) | **GET** /api/v1/buyers/products/light | # Получить список товаров, где пользователь - баер товара(не архив).
[**apiV1BuyersProductsMyGet**](BuyerApi.md#apiV1BuyersProductsMyGet) | **GET** /api/v1/buyers/products/my | # Получить список товаров взятых в работу байером.
[**apiV1BuyersProductsPagMyGet**](BuyerApi.md#apiV1BuyersProductsPagMyGet) | **GET** /api/v1/buyers/products/pag/my | # Получить список товаров взятых в работу байером с пагинацией.
[**apiV1BuyersProductsPickupGuidPost**](BuyerApi.md#apiV1BuyersProductsPickupGuidPost) | **POST** /api/v1/buyers/products/pickup/{guid} | 
[**apiV1BuyersProductsVacGet**](BuyerApi.md#apiV1BuyersProductsVacGet) | **GET** /api/v1/buyers/products/vac | # Получить список вакантных товаров.
[**apiV1BuyersTasksCancelGuidPost**](BuyerApi.md#apiV1BuyersTasksCancelGuidPost) | **POST** /api/v1/buyers/tasks/cancel/{guid} | # Отменить задачу.
[**apiV1BuyersTasksGet**](BuyerApi.md#apiV1BuyersTasksGet) | **GET** /api/v1/buyers/tasks | # Показать все задачи данного пользователя.
[**apiV1BuyersTasksPost**](BuyerApi.md#apiV1BuyersTasksPost) | **POST** /api/v1/buyers/tasks | # Создать задачу.



## apiV1BuyersOrdersGuidEditItemItemPatch

> String apiV1BuyersOrdersGuidEditItemItemPatch(guid, item, opts)

# Редактировать номер заказа.

## Редактировать номер заказа

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BuyerApi();
let guid = null; // String | GUID заказа, который планируем изменить
let item = "item_example"; // String | 
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1BuyersOrdersGuidEditItemItemPatch(guid, item, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID заказа, который планируем изменить | 
 **item** | **String**|  | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1BuyersOrdersGuidEditPatch

> String apiV1BuyersOrdersGuidEditPatch(guid, opts)

# Редактировать заказ.

## Редактировать заказ.   Данный метод позволяет редактировать все поля кроме status и totalPriceChanged Проверки:  Пока нет проверок

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BuyerApi();
let guid = null; // String | GUID заказа, который планируем изменить
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject31() // InlineObject31 | 
};
apiInstance.apiV1BuyersOrdersGuidEditPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID заказа, который планируем изменить | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject31**](InlineObject31.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1BuyersOrdersGuidGet

> {String: Object} apiV1BuyersOrdersGuidGet(guid, opts)

# Получить конкретный заказ по его GUID.

## Получить конкретный заказ по его GUID.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BuyerApi();
let guid = null; // String | GUID заказа.
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1BuyersOrdersGuidGet(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID заказа. | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**{String: Object}**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1BuyersOrdersGuidPayToSupplierPatch

> String apiV1BuyersOrdersGuidPayToSupplierPatch(guid, opts)

# Выставить статус оплачено поставщику.

## Выставить статус оплачено поставщику.  При вызове данного метода статус меняется на 20 paid  Снимает средства с замороженных средств клиента и переводятся админу Проверки:  Нельзя повторно оплачивать поставщику. paidAt !&#x3D;&#x3D; null

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BuyerApi();
let guid = null; // String | GUID заказа
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1BuyersOrdersGuidPayToSupplierPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID заказа | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1BuyersOrdersGuidReturnOrderPatch

> String apiV1BuyersOrdersGuidReturnOrderPatch(guid, opts)

# Выставить статус пришёл не кондиционный - \&quot;возврат заказа\&quot;, returnOrder: 35.

## Выставить статус пришёл не кондиционный - \&quot;возврат заказа\&quot;, returnOrder: 35.   При вызове данного метода ставиться статус cancelByBuyer: 35 Средства обратно возвращаются на баланс клиента.  (если оплатили посташику то от баланса админа клиенту, если не было оплаты поставщику, то разморозка средств клиента)  Проверки:  Требуется комментарий байера. Нельзя вернуть заказ если заказ закрыт клиентом

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BuyerApi();
let guid = null; // String | GUID заказа.
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject29() // InlineObject29 | 
};
apiInstance.apiV1BuyersOrdersGuidReturnOrderPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID заказа. | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject29**](InlineObject29.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1BuyersOrdersGuidSetTotalPriceChangedPatch

> String apiV1BuyersOrdersGuidSetTotalPriceChangedPatch(guid, opts)

# Задать изменение итоговой цены, totalPriceChanged.

## Задать изменение итоговой цены, totalPriceChanged.   При повышении цены ставиться статус 19 needConfirmingToPriceChange, далее нужно ожидать подтверждения от клиента.  Если вернуть цену на старое значение, то статус возвращается к 15 atProcess. При понижении цены автоматом происходит возврат разницы клиенту, статус ставится 15 atProcess.  Проверки:  Нельзя менять цену после оплаты поставщику. paidAt !&#x3D;&#x3D; null

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BuyerApi();
let guid = null; // String | GUID заказа, который планируем изменить
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject30() // InlineObject30 | 
};
apiInstance.apiV1BuyersOrdersGuidSetTotalPriceChangedPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID заказа, который планируем изменить | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject30**](InlineObject30.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1BuyersOrdersGuidTrackNumberIssuedPatch

> String apiV1BuyersOrdersGuidTrackNumberIssuedPatch(guid, opts)

# Выставить статус \&quot;выдан трек номер\&quot;.

## Выставить статус \&quot;выдан трек номер\&quot;.  При вызове данного метода статус меняется на 25 trackNumberIssued  Если ранее не была произведена оплата(paidAt &#x3D;&#x3D;&#x3D; null), то производит оплату:   при оплате снимает средства с замороженных средств клиента и переводит админу Проверки:  пока нет проверок

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BuyerApi();
let guid = null; // String | GUID заказа
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1BuyersOrdersGuidTrackNumberIssuedPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID заказа | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1BuyersOrdersMyGet

> [InlineResponse20017] apiV1BuyersOrdersMyGet(opts)

# Получить список заказов текущего байера.

## Получить список заказов текущего байера.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BuyerApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1BuyersOrdersMyGet(opts).then((data) => {
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

[**[InlineResponse20017]**](InlineResponse20017.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1BuyersOrdersPagMyGet

> InlineResponse20018 apiV1BuyersOrdersPagMyGet(opts)

# Получить список заказов текущего байера с пагинацией.

## Получить список заказов текущего байера с пагинацией.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BuyerApi();
let opts = {
  'filters': "filters_example", // String |                Примеры: /boxes/pag/clients_light?filters=or[0][id][$eq]=B08F5VCNCY;or[1][amazonTitle][$contains]=drive                отдает все где ASIN = \"B08F5VCNCY\" или в amazonTitle встречается \"drive\", не чувствителен к регистру.                 без или: /boxes/pag/clients_light?filters=[amazonTitle][$contains]=drive                 Query параметры:                filters - фильтры по любые поля из модели продукта                shopId - ID магазина             
  'limit': 10.0, // Number | Лимит записей для пагинации
  'offset': 0.0, // Number | Смещение для пагинации
  'sortField': "sortField_example", // String | Название поля
  'sortType': "sortType_example", // String | Тип сортировки
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1BuyersOrdersPagMyGet(opts).then((data) => {
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

[**InlineResponse20018**](InlineResponse20018.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1BuyersOrdersPickupGuidPost

> String apiV1BuyersOrdersPickupGuidPost(guid, opts)

# Закрепить заказ за байером. Взять его в работу.

## Закрепить заказ за байером. Взять его в работу.  ##  На основании заказа НУЖНО СФОРМИРОВАТЬ коробки по кол-ву товаров в заказе.   ## Эндпоинт НЕ ВЕРНЕТ сформированные коробки что бы не плодить МАГИЮ или ГЛЮКИ.   ## Запросите закрепление заказа. Если операция пройдет успешно 204 - запросите создание коробки.   ## Следующим этапом сделаем возможность закреплять пачку заказов и пачку коробок готовить одним запросом. Но потом.   ## Текущая база не поддерживает транзакции.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BuyerApi();
let guid = null; // String | GUID заказа, который планируем изменить
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1BuyersOrdersPickupGuidPost(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID заказа, который планируем изменить | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1BuyersOrdersSetInStockGuidPatch

> String apiV1BuyersOrdersSetInStockGuidPatch(guid, opts)

# Редактировать номер заказа на inStock (30).

## Редактировать номер заказа на inStock (30)

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BuyerApi();
let guid = null; // String | GUID заказа, который планируем изменить
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject33() // InlineObject33 | 
};
apiInstance.apiV1BuyersOrdersSetInStockGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID заказа, который планируем изменить | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject33**](InlineObject33.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1BuyersOrdersVacGet

> [InlineResponse2001] apiV1BuyersOrdersVacGet(opts)

# Получить список свободных заказов.

## Получить список свободных заказов.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BuyerApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1BuyersOrdersVacGet(opts).then((data) => {
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

[**[InlineResponse2001]**](InlineResponse2001.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1BuyersProductsGuidPatch

> String apiV1BuyersProductsGuidPatch(guid, opts)

# Внести изменения в продукт.

## Внести изменения в продукт.  ## Байер может редактировать только товары со статусом: 35, 40, 50, 60, 235, 240, 250, 260.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BuyerApi();
let guid = null; // String | GUID продукта, который планируем изменить
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject28() // InlineObject28 | 
};
apiInstance.apiV1BuyersProductsGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID продукта, который планируем изменить | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject28**](InlineObject28.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1BuyersProductsLightGet

> [InlineResponse20015] apiV1BuyersProductsLightGet(opts)

# Получить список товаров, где пользователь - баер товара(не архив).

## Получить список товаров, где пользователь - баер товара(не архив).

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BuyerApi();
let opts = {
  'isCreatedByClient': true, // Boolean | Если true отдает товары созданные клиентом.
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1BuyersProductsLightGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **isCreatedByClient** | **Boolean**| Если true отдает товары созданные клиентом. | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse20015]**](InlineResponse20015.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1BuyersProductsMyGet

> [InlineResponse20014] apiV1BuyersProductsMyGet(opts)

# Получить список товаров взятых в работу байером.

## Получить список товаров взятых в работу байером.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BuyerApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1BuyersProductsMyGet(opts).then((data) => {
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
- **Accept**: application/json


## apiV1BuyersProductsPagMyGet

> InlineResponse20016 apiV1BuyersProductsPagMyGet(opts)

# Получить список товаров взятых в работу байером с пагинацией.

## Получить список товаров взятых в работу байером с пагинацией.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BuyerApi();
let opts = {
  'filters': "filters_example", // String |                Примеры: /products/pag/my?filters=or[0][id][$eq]=B08F5VCNCY;or[1][amazonTitle][$contains]=drive                отдает все где ASIN = \"B08F5VCNCY\" или в amazonTitle встречается \"drive\", не чувствителен к регистру.                 без или: /products/pag/my?filters=[amazonTitle][$contains]=drive                 Query параметры:                filters - фильтры по любые поля из модели продукта                shopId - ID магазина             
  'limit': 10.0, // Number | Лимит записей для пагинации
  'offset': 0.0, // Number | Смещение для пагинации
  'sortField': "sortField_example", // String | Название поля
  'sortType': "sortType_example", // String | Тип сортировки
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1BuyersProductsPagMyGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **filters** | **String**|                Примеры: /products/pag/my?filters&#x3D;or[0][id][$eq]&#x3D;B08F5VCNCY;or[1][amazonTitle][$contains]&#x3D;drive                отдает все где ASIN &#x3D; \&quot;B08F5VCNCY\&quot; или в amazonTitle встречается \&quot;drive\&quot;, не чувствителен к регистру.                 без или: /products/pag/my?filters&#x3D;[amazonTitle][$contains]&#x3D;drive                 Query параметры:                filters - фильтры по любые поля из модели продукта                shopId - ID магазина              | [optional] 
 **limit** | **Number**| Лимит записей для пагинации | [optional] [default to 10.0]
 **offset** | **Number**| Смещение для пагинации | [optional] [default to 0.0]
 **sortField** | **String**| Название поля | [optional] 
 **sortType** | **String**| Тип сортировки | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**InlineResponse20016**](InlineResponse20016.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1BuyersProductsPickupGuidPost

> String apiV1BuyersProductsPickupGuidPost(guid, opts)



## Закрепить продукт за байером. Взять его в работу.  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BuyerApi();
let guid = null; // String | GUID продукта, который планируем изменить
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1BuyersProductsPickupGuidPost(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| GUID продукта, который планируем изменить | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1BuyersProductsVacGet

> [InlineResponse20014] apiV1BuyersProductsVacGet(opts)

# Получить список вакантных товаров.

## Получить список вакантных товаров.   ## Товары со статусом 30 у которых не заполнен buyer   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BuyerApi();
let opts = {
  'isCreatedByClient': true, // Boolean | Если true отдает товары созданные клиентом.
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1BuyersProductsVacGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **isCreatedByClient** | **Boolean**| Если true отдает товары созданные клиентом. | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse20014]**](InlineResponse20014.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1BuyersTasksCancelGuidPost

> String apiV1BuyersTasksCancelGuidPost(guid, opts)

# Отменить задачу.

## Отменить задачу. Выставляет задаче статус 30.  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BuyerApi();
let guid = null; // String | guid отменяемой задачи
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1BuyersTasksCancelGuidPost(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**String**](.md)| guid отменяемой задачи | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1BuyersTasksGet

> [InlineResponse20019] apiV1BuyersTasksGet(opts)

# Показать все задачи данного пользователя.

## Показать все задачи данного пользователя.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BuyerApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1BuyersTasksGet(opts).then((data) => {
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


## apiV1BuyersTasksPost

> InlineResponse2014 apiV1BuyersTasksPost(opts)

# Создать задачу.

## Создать задачу.   Проверки: Все коробки должны быть от одного сторкипера. Все коробки должны быть от одного клиента.

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.BuyerApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject32() // InlineObject32 | 
};
apiInstance.apiV1BuyersTasksPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject32**](InlineObject32.md)|  | [optional] 

### Return type

[**InlineResponse2014**](InlineResponse2014.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

