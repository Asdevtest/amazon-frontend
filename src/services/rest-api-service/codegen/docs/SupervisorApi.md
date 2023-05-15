# TestSwagger.SupervisorApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1SupervisorsProductsGuidPatch**](SupervisorApi.md#apiV1SupervisorsProductsGuidPatch) | **PATCH** /api/v1/supervisors/products/{guid} | # Изменить продукт.
[**apiV1SupervisorsProductsLightGet**](SupervisorApi.md#apiV1SupervisorsProductsLightGet) | **GET** /api/v1/supervisors/products/light | # Получить облегченный список товаров взятых на проверку супервайзером.
[**apiV1SupervisorsProductsListingGuidPatch**](SupervisorApi.md#apiV1SupervisorsProductsListingGuidPatch) | **PATCH** /api/v1/supervisors/products/listing/{guid} | # Изменить листинг для продукта.
[**apiV1SupervisorsProductsMyGet**](SupervisorApi.md#apiV1SupervisorsProductsMyGet) | **GET** /api/v1/supervisors/products/my | # Получить список товаров взятых на проверку супервайзером.
[**apiV1SupervisorsProductsPagMyGet**](SupervisorApi.md#apiV1SupervisorsProductsPagMyGet) | **GET** /api/v1/supervisors/products/pag/my | # Получить список товаров взятых на проверку супервайзером с пагинацией.
[**apiV1SupervisorsProductsPickupGuidPost**](SupervisorApi.md#apiV1SupervisorsProductsPickupGuidPost) | **POST** /api/v1/supervisors/products/pickup/{guid} | # Закрепить продукт за супервайзером. Взять его в работу.
[**apiV1SupervisorsProductsVacGet**](SupervisorApi.md#apiV1SupervisorsProductsVacGet) | **GET** /api/v1/supervisors/products/vac | # Получить список вакантных товаров.



## apiV1SupervisorsProductsGuidPatch

> String apiV1SupervisorsProductsGuidPatch(guid, opts)

# Изменить продукт.

## Изменить продукт.  ## 20, 70, 80, 90 - эти статусы запускают процесс заполнения полей для выплат в продуете.    ## 270, 280, 290 - эти статусы запускают процесс авто выплат.   ## одн из таких статусов - больше нельзя так как появилась запись об оплате.     Возможные статусы продукта.      // Товар после заведения в базе ресерчером получает этот статус.      // Ресечер может дополнительно сменить его на статус 30      newProduct: 0,       researcherFoundSupplier: 10,      // Статусы, которые поставит супервайзер по итогам проверки      rejectedBySupervisorAtFistStep: 20, // Если ставит этот статус - должны заплатить супервайзеру.      toBuyerForSearch: 30,      buyerPickedUpProduct: 35,   // Статусы которые поставит байер по результатам своей работы.      buyerFoundSupplier: 40,      supplierWasNotFoundByBuyer:50,      supplierPriceWasNotAcceptable: 60,       // Статус которые проставит супервайзер по результатам второй проверки.      completeSuccess: 70,      // если был поставлен статус 70 то нужно учитывать предыдущий статус товара.      // если переходили с 10-&gt;70 оплачиваем ресечеру и супервайзеру.      // если переходили с 40-&gt;70 оплачиваем ресечеру, байеру и супервайзеру.      paidByClient: 75,     PLATFORMS_PRODUCT_COPY: 76, // копия товара от платформы, при покупке товара из бесплатно доступных     completeSupplierWasNotFund: 80,     // оплачиваем супервайзеру      completePriceWasNotAcceptable: 90      // оплачиваем только супервайзеру/      noPublished: 100,     PLATFORMS_FREE: 110, // продукт принадлежит платформе и распространяется бесплатно     CREATED_BY_CLIENT: 200, // товар создан клиентом     FROM_CLIENT_TO_BUYER_FOR_RESEARCH: 230, //статус говорит о том что клиент отправил товар на поиск поставщика баеру (устанавливает клиент)     FROM_CLIENT_BUYER_PICKED_PRODUCT: 235, // баер взял в работу товар клиента (устанавливает баер)     FROM_CLIENT_BUYER_FOUND_SUPPLIER: 240, // баер нашел поставщика для товара клиента     FROM_CLIENT_SUPPLIER_WAS_NOT_FOUND_BY_BUYER: 250, // баер не нашел поставщика для товара клиента (устанавливает баер)     FROM_CLIENT_SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE: 260, // цена товара у поставщика не подходит для товара клиента (устанавливает баер)     FROM_CLIENT_COMPLETE_SUCCESS: 270, //  успешно найден поставщик для товара клиента (этот товар не публикуется на бирже товаров, а все так же доступен для просмотра только клиенту который создал товар) (устанавливает супервизор)       FROM_CLIENT_PAID_BY_CLIENT: 275,      FROM_CLIENT_COMPLETE_SUPPLIER_WAS_NOT_FOUND: 280, //  поставщик не найден для товара клиента (устанавливает супервизор)     FROM_CLIENT_COMPLETE_PRICE_WAS_NOT_ACCEPTABLE: 290, // - цена товара у поставщика не подходит для товара клиента (устанавливает супервизор)   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.SupervisorApi();
let guid = null; // String | GUID продукта, который планируем изменить
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject116() // InlineObject116 | 
};
apiInstance.apiV1SupervisorsProductsGuidPatch(guid, opts).then((data) => {
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
 **body** | [**InlineObject116**](InlineObject116.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1SupervisorsProductsLightGet

> [InlineResponse20022] apiV1SupervisorsProductsLightGet(opts)

# Получить облегченный список товаров взятых на проверку супервайзером.

## Получить облегченный список товаров взятых на проверку супервайзером.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.SupervisorApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1SupervisorsProductsLightGet(opts).then((data) => {
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

[**[InlineResponse20022]**](InlineResponse20022.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1SupervisorsProductsListingGuidPatch

> String apiV1SupervisorsProductsListingGuidPatch(guid, opts)

# Изменить листинг для продукта.

## Изменить листинг для продукта.  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.SupervisorApi();
let guid = null; // String | GUID продукта, который планируем изменить
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject117() // InlineObject117 | 
};
apiInstance.apiV1SupervisorsProductsListingGuidPatch(guid, opts).then((data) => {
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
 **body** | [**InlineObject117**](InlineObject117.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1SupervisorsProductsMyGet

> [InlineResponse20069] apiV1SupervisorsProductsMyGet(opts)

# Получить список товаров взятых на проверку супервайзером.

## Получить список товаров взятых на проверку супервайзером.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.SupervisorApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1SupervisorsProductsMyGet(opts).then((data) => {
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

[**[InlineResponse20069]**](InlineResponse20069.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1SupervisorsProductsPagMyGet

> InlineResponse20070 apiV1SupervisorsProductsPagMyGet(opts)

# Получить список товаров взятых на проверку супервайзером с пагинацией.

## Получить список товаров взятых на проверку супервайзером с пагинацией.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.SupervisorApi();
let opts = {
  'status': "status_example", // String | Статус продукта
  'limit': 10.0, // Number | Лимит записей для пагинации
  'offset': 0.0, // Number | Смещение для пагинации
  'sortField': "sortField_example", // String | Название поля
  'sortType': "sortType_example", // String | Тип сортировки
  'filters': "filters_example", // String |                Возможные поля - любые поля продукта               2 варианта использования:                 1. Фильтр по одному полю:                   [amazonTitle][$eq]=some_title                 2. Фильтр по нескольким полям:                   or[0][amazonTitle][$eq]=some_title;or[1][asin][$eq]=some_asin                     Возвращает партии с коробками с продуктами, в которых amazonTitle равен some_title или asin равен some_asin               2 оператора совпадения:                 $eq - полное совпадение, нечувствителен к регистру                 $contains - наличие данной подстроки в поле, нечувствителен к регистру, предназначен только для строк             
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1SupervisorsProductsPagMyGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **status** | **String**| Статус продукта | [optional] 
 **limit** | **Number**| Лимит записей для пагинации | [optional] [default to 10.0]
 **offset** | **Number**| Смещение для пагинации | [optional] [default to 0.0]
 **sortField** | **String**| Название поля | [optional] 
 **sortType** | **String**| Тип сортировки | [optional] 
 **filters** | **String**|                Возможные поля - любые поля продукта               2 варианта использования:                 1. Фильтр по одному полю:                   [amazonTitle][$eq]&#x3D;some_title                 2. Фильтр по нескольким полям:                   or[0][amazonTitle][$eq]&#x3D;some_title;or[1][asin][$eq]&#x3D;some_asin                     Возвращает партии с коробками с продуктами, в которых amazonTitle равен some_title или asin равен some_asin               2 оператора совпадения:                 $eq - полное совпадение, нечувствителен к регистру                 $contains - наличие данной подстроки в поле, нечувствителен к регистру, предназначен только для строк              | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**InlineResponse20070**](InlineResponse20070.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1SupervisorsProductsPickupGuidPost

> String apiV1SupervisorsProductsPickupGuidPost(guid, opts)

# Закрепить продукт за супервайзером. Взять его в работу.

## Закрепить продукт за супервайзером. Взять его в работу.  ##  Выставляет у продукта поле checkedby  

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.SupervisorApi();
let guid = null; // String | GUID продукта, который планируем изменить
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1SupervisorsProductsPickupGuidPost(guid, opts).then((data) => {
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


## apiV1SupervisorsProductsVacGet

> [InlineResponse200] apiV1SupervisorsProductsVacGet(opts)

# Получить список вакантных товаров.

## Получить список вакантных товаров со статусами 5, 10, 35 или 205, 235, 240 если нужны товары созданные клиентом.   

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.SupervisorApi();
let opts = {
  'isCreatedByClient': true, // Boolean | Если true отдает товары созданные клиентом.
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1SupervisorsProductsVacGet(opts).then((data) => {
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

[**[InlineResponse200]**](InlineResponse200.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

