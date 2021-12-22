# TestSwagger.SellerBoardApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1TestsGetMyDailyReportsGet**](SellerBoardApi.md#apiV1TestsGetMyDailyReportsGet) | **GET** /api/v1/tests/get_my_daily_reports | Получить дневной отчет селерборда.
[**apiV1TestsGetMyReportsLast30DaysGet**](SellerBoardApi.md#apiV1TestsGetMyReportsLast30DaysGet) | **GET** /api/v1/tests/get_my_reports_last_30_days | Получить месячный отчет селерборда.



## apiV1TestsGetMyDailyReportsGet

> [InlineResponse20011] apiV1TestsGetMyDailyReportsGet(opts)

Получить дневной отчет селерборда.

## Получить дневной отчет селерборда   ## Это эндпоинт отдает последние записи клиента.

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.SellerBoardApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1TestsGetMyDailyReportsGet(opts).then((data) => {
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

[**[InlineResponse20011]**](InlineResponse20011.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## apiV1TestsGetMyReportsLast30DaysGet

> [InlineResponse20012] apiV1TestsGetMyReportsLast30DaysGet(opts)

Получить месячный отчет селерборда.

## Получить месячный отчет селерборда   ## Это эндпоинт отдает последние записи клиента.

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.SellerBoardApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1TestsGetMyReportsLast30DaysGet(opts).then((data) => {
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

[**[InlineResponse20012]**](InlineResponse20012.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html

