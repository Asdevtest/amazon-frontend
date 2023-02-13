# TestSwagger.GeneralApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1GeneralDataFiltersGet**](GeneralApi.md#apiV1GeneralDataFiltersGet) | **GET** /api/v1/general/data_filters | Получить данные по определенной таблице по определенной колонке



## apiV1GeneralDataFiltersGet

> [Object] apiV1GeneralDataFiltersGet(table, column, endpoint, opts)

Получить данные по определенной таблице по определенной колонке

# Получить данные по определенной таблице по определенной колонке## Фильтрация для сабов присутствует

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.GeneralApi();
let table = "table_example"; // String | Таблица
let column = "column_example"; // String | Колонка
let endpoint = "endpoint_example"; // String | 
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1GeneralDataFiltersGet(table, column, endpoint, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **table** | **String**| Таблица | 
 **column** | **String**| Колонка | 
 **endpoint** | **String**|  | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

**[Object]**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

