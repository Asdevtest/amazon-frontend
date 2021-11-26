# Amazonapi.ProductSearchRequestApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1ProductSearchRequestsAddRequestPost**](ProductSearchRequestApi.md#apiV1ProductSearchRequestsAddRequestPost) | **POST** /api/v1/product_search_requests/add_request | # Создать заявку на поиск товара.
[**apiV1ProductSearchRequestsClientsGet**](ProductSearchRequestApi.md#apiV1ProductSearchRequestsClientsGet) | **GET** /api/v1/product_search_requests/clients | Получить список заявок созданных данным клиентом.
[**apiV1ProductSearchRequestsRemoveRequestGuidPatch**](ProductSearchRequestApi.md#apiV1ProductSearchRequestsRemoveRequestGuidPatch) | **PATCH** /api/v1/product_search_requests/remove_request/{guid} | # Удалить заявку по его GUID.
[**apiV1ProductSearchRequestsResearchersGet**](ProductSearchRequestApi.md#apiV1ProductSearchRequestsResearchersGet) | **GET** /api/v1/product_search_requests/researchers | Получить список всех доступных заявок.
[**apiV1ProductSearchRequestsUpdateRequestGuidPatch**](ProductSearchRequestApi.md#apiV1ProductSearchRequestsUpdateRequestGuidPatch) | **PATCH** /api/v1/product_search_requests/update_request/{guid} | #  Изменить заявку на поиск товара.



## apiV1ProductSearchRequestsAddRequestPost

> InlineResponse2015 apiV1ProductSearchRequestsAddRequestPost(InlineObject26, opts)

# Создать заявку на поиск товара.

## Добавление клиентом новой заявки на поиск товара. Рассчитывается исходя из формулы: бюджет Клиента деленный на количество необходимых предложений указанное Клиентом + стоимость работы Супервизора (в случае если в заявке указана необходимость проверки предложений от Ресерчеров Супервизором) – обратите внимание, что в списке выводится только стоимость подачи предложения для Ресерчера, без учета стоимости работы Супервизора!  

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.ProductSearchRequestApi();
let InlineObject26 = new Amazonapi.InlineObject26(); // InlineObject26 | 
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1ProductSearchRequestsAddRequestPost(InlineObject26, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **InlineObject26** | [**InlineObject26**](InlineObject26.md)|  | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]

### Return type

[**InlineResponse2015**](InlineResponse2015.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1ProductSearchRequestsClientsGet

> [InlineResponse2009] apiV1ProductSearchRequestsClientsGet(opts)

Получить список заявок созданных данным клиентом.

Получить список заявок созданных данным клиентом.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.ProductSearchRequestApi();
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1ProductSearchRequestsClientsGet(opts).then((data) => {
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

[**[InlineResponse2009]**](InlineResponse2009.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1ProductSearchRequestsRemoveRequestGuidPatch

> String apiV1ProductSearchRequestsRemoveRequestGuidPatch(guid, opts)

# Удалить заявку по его GUID.

## Удалить заявку по его GUID.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.ProductSearchRequestApi();
let guid = "guid_example"; // String | GUID в сущности в БД
let opts = {
  'Accept_Encoding': gzip, deflate, // String | 
  'body': null // Object | 
};
apiInstance.apiV1ProductSearchRequestsRemoveRequestGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| GUID в сущности в БД | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]
 **body** | **Object**|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html


## apiV1ProductSearchRequestsResearchersGet

> [InlineResponse2009] apiV1ProductSearchRequestsResearchersGet(opts)

Получить список всех доступных заявок.

Получить список всех доступных заявок.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.ProductSearchRequestApi();
let opts = {
  'Accept_Encoding': gzip, deflate // String | 
};
apiInstance.apiV1ProductSearchRequestsResearchersGet(opts).then((data) => {
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

[**[InlineResponse2009]**](InlineResponse2009.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1ProductSearchRequestsUpdateRequestGuidPatch

> String apiV1ProductSearchRequestsUpdateRequestGuidPatch(guid, opts)

#  Изменить заявку на поиск товара.

## Изменить заявку на поиск товара.   ## Нельзя менять после того как получены предложения.   

### Example

```javascript
import Amazonapi from 'amazonapi';
let defaultClient = Amazonapi.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new Amazonapi.ProductSearchRequestApi();
let guid = "guid_example"; // String | GUID продукта БД
let opts = {
  'Accept_Encoding': gzip, deflate, // String | 
  'InlineObject27': new Amazonapi.InlineObject27() // InlineObject27 | 
};
apiInstance.apiV1ProductSearchRequestsUpdateRequestGuidPatch(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| GUID продукта БД | 
 **Accept_Encoding** | **String**|  | [optional] [default to &#39;gzip, deflate&#39;]
 **InlineObject27** | [**InlineObject27**](InlineObject27.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/html

