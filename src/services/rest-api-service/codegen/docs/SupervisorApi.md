# TestSwagger.SupervisorApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1SupervisorsProductsGuidPatch**](SupervisorApi.md#apiV1SupervisorsProductsGuidPatch) | **PATCH** /api/v1/supervisors/products/{guid} | # Изменить продукт.
[**apiV1SupervisorsProductsListingGuidPatch**](SupervisorApi.md#apiV1SupervisorsProductsListingGuidPatch) | **PATCH** /api/v1/supervisors/products/listing/{guid} | # Изменить листинг для продукта.
[**apiV1SupervisorsProductsMyGet**](SupervisorApi.md#apiV1SupervisorsProductsMyGet) | **GET** /api/v1/supervisors/products/my | # Получить список товаров взятых на проверку супервайзером.
[**apiV1SupervisorsProductsPickupGuidPost**](SupervisorApi.md#apiV1SupervisorsProductsPickupGuidPost) | **POST** /api/v1/supervisors/products/pickup/{guid} | # Закрепить продукт за супервайзером. Взять его в работу.
[**apiV1SupervisorsProductsVacGet**](SupervisorApi.md#apiV1SupervisorsProductsVacGet) | **GET** /api/v1/supervisors/products/vac | # Получить список вакантных товаров.



## apiV1SupervisorsProductsGuidPatch

> String apiV1SupervisorsProductsGuidPatch(guid, opts)

# Изменить продукт.

## Изменит продукт.  ## 20, 70, 80, 90 - эти статусы запускают процесс выплат. После того как поставлен   ## одн из таких статусов - больше нельзя така как появилась запись об оплате.     Возможные статусы продукта.      // Товар после заведения в базе ресерчером получает этот статус.      // Ресечер может дополнительно сменить его на статус 30      newProduct: 0,      researcherFoundSupplier: 10,      // Статусы, которые поставит супервайзер по итогам проверки      rejectedBySupervisorAtFistStep: 20, // Если ставит этот статус - должны заплатить супервайзеру.      toBuyerForSearch: 30,       // Статусы которые поставит байер по результатам своей работы.      buyerFoundSupplier: 40,      supplierWasNotFoundByBuyer:50,      supplierPriceWasNotAcceptable: 60,       // Статус которые проставит супервайзер по результатам второй проверки.      completeSuccess: 70,      // если был поставлен статус 70 то нужно учитывать предыдущий статус товара.      // если переходили с 10-&gt;70 оплачиваем ресечеру и супервайзеру.      // если переходили с 40-&gt;70 оплачиваем ресечеру, байеру и супервайзеру.      completeSupplierWasNotFund: 80,     // оплачиваем супервайзеру      completePriceWasNotAcceptable: 90      // оплачиваем только супервайзеру/    

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
let guid = "guid_example"; // String | GUID продукта, который планируем изменить
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject33() // InlineObject33 | 
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
 **guid** | **String**| GUID продукта, который планируем изменить | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject33**](InlineObject33.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


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
let guid = "guid_example"; // String | GUID продукта, который планируем изменить
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject34() // InlineObject34 | 
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
 **guid** | **String**| GUID продукта, который планируем изменить | 
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject34**](InlineObject34.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1SupervisorsProductsMyGet

> [InlineResponse200] apiV1SupervisorsProductsMyGet(opts)

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

[**[InlineResponse200]**](InlineResponse200.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


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
let guid = "guid_example"; // String | GUID продукта, который планируем изменить
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
 **guid** | **String**| GUID продукта, который планируем изменить | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1SupervisorsProductsVacGet

> [InlineResponse200] apiV1SupervisorsProductsVacGet(opts)

# Получить список вакантных товаров.

## Получить список вакантных товаров.   

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
apiInstance.apiV1SupervisorsProductsVacGet(opts).then((data) => {
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

[**[InlineResponse200]**](InlineResponse200.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html

