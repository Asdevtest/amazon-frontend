# TestSwagger.BuyerApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1BuyersOrdersAtProcessGuidPatch**](BuyerApi.md#apiV1BuyersOrdersAtProcessGuidPatch) | **PATCH** /api/v1/buyers/orders/at_process/{guid} | # Переместить заказ в статус atProcess
[**apiV1BuyersOrdersGuidEditItemItemPatch**](BuyerApi.md#apiV1BuyersOrdersGuidEditItemItemPatch) | **PATCH** /api/v1/buyers/orders/{guid}/edit_item/{item} | # Редактировать номер заказа.
[**apiV1BuyersOrdersGuidEditPatch**](BuyerApi.md#apiV1BuyersOrdersGuidEditPatch) | **PATCH** /api/v1/buyers/orders/{guid}/edit | # Редактировать заказ.
[**apiV1BuyersOrdersGuidGet**](BuyerApi.md#apiV1BuyersOrdersGuidGet) | **GET** /api/v1/buyers/orders/{guid} | # Получить конкретный заказ по его GUID.
[**apiV1BuyersOrdersGuidPayToSupplierPatch**](BuyerApi.md#apiV1BuyersOrdersGuidPayToSupplierPatch) | **PATCH** /api/v1/buyers/orders/{guid}/pay_to_supplier | # Выставить статус оплачено поставщику.
[**apiV1BuyersOrdersGuidReturnOrderPatch**](BuyerApi.md#apiV1BuyersOrdersGuidReturnOrderPatch) | **PATCH** /api/v1/buyers/orders/{guid}/return_order | # Выставить статус пришёл не кондиционный - \&quot;возврат заказа\&quot;, returnOrder: 35.
[**apiV1BuyersOrdersGuidSetTotalPriceChangedPatch**](BuyerApi.md#apiV1BuyersOrdersGuidSetTotalPriceChangedPatch) | **PATCH** /api/v1/buyers/orders/{guid}/set_totalPriceChanged | # Задать изменение итоговой цены, totalPriceChanged.
[**apiV1BuyersOrdersGuidTrackNumberIssuedPatch**](BuyerApi.md#apiV1BuyersOrdersGuidTrackNumberIssuedPatch) | **PATCH** /api/v1/buyers/orders/{guid}/track_number_issued | # Выставить статус \&quot;выдан трек номер\&quot;.
[**apiV1BuyersOrdersMyGet**](BuyerApi.md#apiV1BuyersOrdersMyGet) | **GET** /api/v1/buyers/orders/my | # Получить список заказов текущего байера.
[**apiV1BuyersOrdersPagMyGet**](BuyerApi.md#apiV1BuyersOrdersPagMyGet) | **GET** /api/v1/buyers/orders/pag/my | # Получить список заказов текущего байера с пагинацией.
[**apiV1BuyersOrdersPartiallyPaidGuidPatch**](BuyerApi.md#apiV1BuyersOrdersPartiallyPaidGuidPatch) | **PATCH** /api/v1/buyers/orders/partially_paid/{guid} | # Переместить заказ в статус partiallyPaid
[**apiV1BuyersOrdersPaymentAmountGet**](BuyerApi.md#apiV1BuyersOrdersPaymentAmountGet) | **GET** /api/v1/buyers/orders/payment_amount | # Получить общую стоимость заказов по статусам
[**apiV1BuyersOrdersPaymentGuidPatch**](BuyerApi.md#apiV1BuyersOrdersPaymentGuidPatch) | **PATCH** /api/v1/buyers/orders/payment/{guid} | # Изменить реквезиты ордера
[**apiV1BuyersOrdersPickupGuidPost**](BuyerApi.md#apiV1BuyersOrdersPickupGuidPost) | **POST** /api/v1/buyers/orders/pickup/{guid} | # Закрепить заказ за байером. Взять его в работу.
[**apiV1BuyersOrdersReadyForPaymentGuidPatch**](BuyerApi.md#apiV1BuyersOrdersReadyForPaymentGuidPatch) | **PATCH** /api/v1/buyers/orders/ready_for_payment/{guid} | # Переместить заказ в статус readyForPayment
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



## apiV1BuyersOrdersAtProcessGuidPatch

> String apiV1BuyersOrdersAtProcessGuidPatch(guid, opts)

# Переместить заказ в статус atProcess

Переместить заказ в статус atProcess

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
apiInstance.apiV1BuyersOrdersAtProcessGuidPatch(guid, opts).then((data) => {
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
  'body': new TestSwagger.InlineObject41() // InlineObject41 | 
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
 **body** | [**InlineObject41**](InlineObject41.md)|  | [optional] 

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
  'body': new TestSwagger.InlineObject39() // InlineObject39 | 
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
 **body** | [**InlineObject39**](InlineObject39.md)|  | [optional] 

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
  'body': new TestSwagger.InlineObject40() // InlineObject40 | 
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
 **body** | [**InlineObject40**](InlineObject40.md)|  | [optional] 

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

> [InlineResponse20025] apiV1BuyersOrdersMyGet(opts)

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

[**[InlineResponse20025]**](InlineResponse20025.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1BuyersOrdersPagMyGet

> InlineResponse20026 apiV1BuyersOrdersPagMyGet(opts)

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
  'filters': "filters_example", // String |                Возможные поля:               asin, amazonTitle, skusByClient, id, item               2 варианта использования:                 1. Фильтр по одному полю:                   [amazonTitle][$eq]=some_title                 2. Фильтр по нескольким полям:                   or[0][amazonTitle][$eq]=some_title;or[1][asin][$eq]=some_asin                     Возвращает партии с коробками с продуктами, в которых amazonTitle равен some_title или asin равен some_asin               2 оператора совпадения:                 $eq - полное совпадение, нечувствителен к регистру                 $contains - наличие данной подстроки в поле, нечувствителен к регистру, предназначен только для строк             
  'status': "status_example", // String | Статусы заказов, по которым идет фильтрация, разделенные запятыми
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
 **filters** | **String**|                Возможные поля:               asin, amazonTitle, skusByClient, id, item               2 варианта использования:                 1. Фильтр по одному полю:                   [amazonTitle][$eq]&#x3D;some_title                 2. Фильтр по нескольким полям:                   or[0][amazonTitle][$eq]&#x3D;some_title;or[1][asin][$eq]&#x3D;some_asin                     Возвращает партии с коробками с продуктами, в которых amazonTitle равен some_title или asin равен some_asin               2 оператора совпадения:                 $eq - полное совпадение, нечувствителен к регистру                 $contains - наличие данной подстроки в поле, нечувствителен к регистру, предназначен только для строк              | [optional] 
 **status** | **String**| Статусы заказов, по которым идет фильтрация, разделенные запятыми | [optional] 
 **limit** | **Number**| Лимит записей для пагинации | [optional] [default to 10.0]
 **offset** | **Number**| Смещение для пагинации | [optional] [default to 0.0]
 **sortField** | **String**| Название поля | [optional] 
 **sortType** | **String**| Тип сортировки | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**InlineResponse20026**](InlineResponse20026.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1BuyersOrdersPartiallyPaidGuidPatch

> String apiV1BuyersOrdersPartiallyPaidGuidPatch(guid, opts)

# Переместить заказ в статус partiallyPaid

Переместить заказ в статус partiallyPaid

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
apiInstance.apiV1BuyersOrdersPartiallyPaidGuidPatch(guid, opts).then((data) => {
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


## apiV1BuyersOrdersPaymentAmountGet

> InlineResponse20024 apiV1BuyersOrdersPaymentAmountGet(status, opts)

# Получить общую стоимость заказов по статусам

## Получить общую стоимость заказов по статусам

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
let status = "status_example"; // String | Order status
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1BuyersOrdersPaymentAmountGet(status, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **status** | **String**| Order status | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**InlineResponse20024**](InlineResponse20024.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1BuyersOrdersPaymentGuidPatch

> String apiV1BuyersOrdersPaymentGuidPatch(guid, opts)

# Изменить реквезиты ордера

Изменить реквезиты ордера

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
  'body': new TestSwagger.InlineObject38() // InlineObject38 | 
};
apiInstance.apiV1BuyersOrdersPaymentGuidPatch(guid, opts).then((data) => {
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
 **body** | [**InlineObject38**](InlineObject38.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
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


## apiV1BuyersOrdersReadyForPaymentGuidPatch

> String apiV1BuyersOrdersReadyForPaymentGuidPatch(guid, opts)

# Переместить заказ в статус readyForPayment

Переместить заказ в статус readyForPayment

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
  'body': new TestSwagger.InlineObject37() // InlineObject37 | 
};
apiInstance.apiV1BuyersOrdersReadyForPaymentGuidPatch(guid, opts).then((data) => {
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
 **body** | [**InlineObject37**](InlineObject37.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
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
  'body': new TestSwagger.InlineObject43() // InlineObject43 | 
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
 **body** | [**InlineObject43**](InlineObject43.md)|  | [optional] 

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
  'sortField': "sortField_example", // String | Поле, по которому сортировать запрос
  'sortType': "sortType_example", // String | Тип сортировки
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
 **sortField** | **String**| Поле, по которому сортировать запрос | [optional] 
 **sortType** | **String**| Тип сортировки | [optional] 
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
  'body': new TestSwagger.InlineObject36() // InlineObject36 | 
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
 **body** | [**InlineObject36**](InlineObject36.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1BuyersProductsLightGet

> [InlineResponse20022] apiV1BuyersProductsLightGet(opts)

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

[**[InlineResponse20022]**](InlineResponse20022.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1BuyersProductsMyGet

> [InlineResponse20021] apiV1BuyersProductsMyGet(opts)

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

[**[InlineResponse20021]**](InlineResponse20021.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1BuyersProductsPagMyGet

> InlineResponse20023 apiV1BuyersProductsPagMyGet(opts)

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
  'filters': "filters_example", // String |                Возможные поля - любые поля продукта               2 варианта использования:                 1. Фильтр по одному полю:                   [amazonTitle][$eq]=some_title                 2. Фильтр по нескольким полям:                   or[0][amazonTitle][$eq]=some_title;or[1][asin][$eq]=some_asin                     Возвращает партии с коробками с продуктами, в которых amazonTitle равен some_title или asin равен some_asin               2 оператора совпадения:                 $eq - полное совпадение, нечувствителен к регистру                 $contains - наличие данной подстроки в поле, нечувствителен к регистру, предназначен только для строк             
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
 **filters** | **String**|                Возможные поля - любые поля продукта               2 варианта использования:                 1. Фильтр по одному полю:                   [amazonTitle][$eq]&#x3D;some_title                 2. Фильтр по нескольким полям:                   or[0][amazonTitle][$eq]&#x3D;some_title;or[1][asin][$eq]&#x3D;some_asin                     Возвращает партии с коробками с продуктами, в которых amazonTitle равен some_title или asin равен some_asin               2 оператора совпадения:                 $eq - полное совпадение, нечувствителен к регистру                 $contains - наличие данной подстроки в поле, нечувствителен к регистру, предназначен только для строк              | [optional] 
 **limit** | **Number**| Лимит записей для пагинации | [optional] [default to 10.0]
 **offset** | **Number**| Смещение для пагинации | [optional] [default to 0.0]
 **sortField** | **String**| Название поля | [optional] 
 **sortType** | **String**| Тип сортировки | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**InlineResponse20023**](InlineResponse20023.md)

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

> [InlineResponse20021] apiV1BuyersProductsVacGet(opts)

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

[**[InlineResponse20021]**](InlineResponse20021.md)

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

> [InlineResponse20027] apiV1BuyersTasksGet(opts)

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

[**[InlineResponse20027]**](InlineResponse20027.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1BuyersTasksPost

> InlineResponse2015 apiV1BuyersTasksPost(opts)

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
  'body': new TestSwagger.InlineObject42() // InlineObject42 | 
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
 **body** | [**InlineObject42**](InlineObject42.md)|  | [optional] 

### Return type

[**InlineResponse2015**](InlineResponse2015.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

