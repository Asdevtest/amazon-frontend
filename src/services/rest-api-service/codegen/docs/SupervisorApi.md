# Amazonapi.SupervisorApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1SupervisorsPaymentsCreatedByThisSuperGet**](SupervisorApi.md#apiV1SupervisorsPaymentsCreatedByThisSuperGet) | **GET** /api/v1/supervisors/payments/created_by_this_super | # Получить оплаты созданные данным супервайзером.
[**apiV1SupervisorsPaymentsMyBalanceGet**](SupervisorApi.md#apiV1SupervisorsPaymentsMyBalanceGet) | **GET** /api/v1/supervisors/payments/my-balance | Получить баланс для супервайзера.
[**apiV1SupervisorsPaymentsMyGet**](SupervisorApi.md#apiV1SupervisorsPaymentsMyGet) | **GET** /api/v1/supervisors/payments/my | # Получить все оплаты, которые были начислены супервайзеру.
[**apiV1SupervisorsProductsGuidPatch**](SupervisorApi.md#apiV1SupervisorsProductsGuidPatch) | **PATCH** /api/v1/supervisors/products/{guid} | # Изменить статус и дать комментарий доя продукта.
[**apiV1SupervisorsProductsMyGet**](SupervisorApi.md#apiV1SupervisorsProductsMyGet) | **GET** /api/v1/supervisors/products/my | # Получить список товаров взятых на проверку супервайзером.
[**apiV1SupervisorsProductsPickupGuidPost**](SupervisorApi.md#apiV1SupervisorsProductsPickupGuidPost) | **POST** /api/v1/supervisors/products/pickup/{guid} | # Закрепить продукт за супервайзером. Взять его в работу.
[**apiV1SupervisorsProductsVacGet**](SupervisorApi.md#apiV1SupervisorsProductsVacGet) | **GET** /api/v1/supervisors/products/vac | # Получить список вакантных товаров.



## apiV1SupervisorsPaymentsCreatedByThisSuperGet

> [InlineResponse2004] apiV1SupervisorsPaymentsCreatedByThisSuperGet(opts)

# Получить оплаты созданные данным супервайзером.

## Получить оплаты созданные данным супервайзером.

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.SupervisorApi();
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1SupervisorsPaymentsCreatedByThisSuperGet(opts).then((data) => {
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

[**[InlineResponse2004]**](InlineResponse2004.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1SupervisorsPaymentsMyBalanceGet

> Number apiV1SupervisorsPaymentsMyBalanceGet(opts)

Получить баланс для супервайзера.

Получить баланс для супервайзера.

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.SupervisorApi();
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1SupervisorsPaymentsMyBalanceGet(opts).then((data) => {
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

**Number**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1SupervisorsPaymentsMyGet

> [InlineResponse2004] apiV1SupervisorsPaymentsMyGet(opts)

# Получить все оплаты, которые были начислены супервайзеру.

## Получить все оплаты, которые были начислены супервайзеру.  

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.SupervisorApi();
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1SupervisorsPaymentsMyGet(opts).then((data) => {
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

[**[InlineResponse2004]**](InlineResponse2004.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1SupervisorsProductsGuidPatch

> String apiV1SupervisorsProductsGuidPatch(guid, InlineObject23, opts)

# Изменить статус и дать комментарий доя продукта.

## Изменить статус и дать комментарий для продукта.  ## 20, 70, 80, 90 - эти статусы запускают процесс выплат. После того как поставлен   ## одн из таких статусов - больше нельзя така как появилась запись об оплате.     Возможные статусы продукта.      // Товар после заведения в базе ресерчером получает этот статус.      // Ресечер может дополнительно сменить его на статус 30      newProduct: 0,      researcherFoundSupplier: 10,      // Статусы, которые поставит супервайзер по итогам проверки      rejectedBySupervisorAtFistStep: 20, // Если ставит этот статус - должны заплатить супервайзеру.      toBuyerForSearch: 30,       // Статусы которые поставит байер по результатам своей работы.      buyerFoundSupplier: 40,      supplierWasNotFoundByBuyer:50,      supplierPriceWasNotAcceptable: 60,       // Статус которые проставит супервайзер по результатам второй проверки.      completeSuccess: 70,      // если был поставлен статус 70 то нужно учитывать предыдущий статус товара.      // если переходили с 10-&gt;70 оплачиваем ресечеру и супервайзеру.      // если переходили с 40-&gt;70 оплачиваем ресечеру, байеру и супервайзеру.      completeSupplierWasNotFund: 80,     // оплачиваем супервайзеру      completePriceWasNotAcceptable: 90      // оплачиваем только супервайзеру/    

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.SupervisorApi();
let guid = "guid_example"; // String | GUID продукта, который планируем изменить
let InlineObject23 = new Amazonapi.InlineObject23(); // InlineObject23 | 
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1SupervisorsProductsGuidPatch(guid, InlineObject23, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| GUID продукта, который планируем изменить | 
 **InlineObject23** | [**InlineObject23**](InlineObject23.md)|  | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1SupervisorsProductsMyGet

> [InlineResponse200] apiV1SupervisorsProductsMyGet(opts)

# Получить список товаров взятых на проверку супервайзером.

## Получить список товаров взятых на проверку супервайзером.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.SupervisorApi();
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

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
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.SupervisorApi();
let guid = "guid_example"; // String | GUID продукта, который планируем изменить
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

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
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.SupervisorApi();
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
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
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**[InlineResponse200]**](InlineResponse200.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html

