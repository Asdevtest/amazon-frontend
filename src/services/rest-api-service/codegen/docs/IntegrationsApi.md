# TestSwagger.IntegrationsApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1IntegrationsGetSkusByProductIdGuidGet**](IntegrationsApi.md#apiV1IntegrationsGetSkusByProductIdGuidGet) | **GET** /api/v1/integrations/get_skus_by_product_id/{guid} | Получить товары из склада (sku), через GUID продукта.
[**apiV1IntegrationsSellerboardDashboardProductsDaysReportsLast30DaysGet**](IntegrationsApi.md#apiV1IntegrationsSellerboardDashboardProductsDaysReportsLast30DaysGet) | **GET** /api/v1/integrations/sellerboard_dashboard_products_days_reports_last_30_days | Получить месячный отчет селерборда.
[**apiV1IntegrationsSellerboardWarehouseProductsGet**](IntegrationsApi.md#apiV1IntegrationsSellerboardWarehouseProductsGet) | **GET** /api/v1/integrations/sellerboard_warehouse_products | Поиск по товарам со склада по: asin, sku, title..
[**apiV1IntegrationsSellerboardWarehouseProductsLinkSkuPatch**](IntegrationsApi.md#apiV1IntegrationsSellerboardWarehouseProductsLinkSkuPatch) | **PATCH** /api/v1/integrations/sellerboard_warehouse_products_link_sku | # Привязать к товару SKU.
[**apiV1IntegrationsSellerboardWarehouseProductsUnLinkSkuPatch**](IntegrationsApi.md#apiV1IntegrationsSellerboardWarehouseProductsUnLinkSkuPatch) | **PATCH** /api/v1/integrations/sellerboard_warehouse_products_unLink_sku | # Отвязать товар от SKU.
[**apiV1IntegrationsSellerboardWarehouseReportsDailyGet**](IntegrationsApi.md#apiV1IntegrationsSellerboardWarehouseReportsDailyGet) | **GET** /api/v1/integrations/sellerboard_warehouse_reports_daily | Получить дневной отчет селерборда.



## apiV1IntegrationsGetSkusByProductIdGuidGet

> [InlineResponse2008] apiV1IntegrationsGetSkusByProductIdGuidGet(guid, opts)

Получить товары из склада (sku), через GUID продукта.

## Получить товары из склада (sku), через GUID продукта   ## 

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.IntegrationsApi();
let guid = "guid_example"; // String | GUID продукта.
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1IntegrationsGetSkusByProductIdGuidGet(guid, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | **String**| GUID продукта. | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse2008]**](InlineResponse2008.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1IntegrationsSellerboardDashboardProductsDaysReportsLast30DaysGet

> [InlineResponse2009] apiV1IntegrationsSellerboardDashboardProductsDaysReportsLast30DaysGet(opts)

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

let apiInstance = new TestSwagger.IntegrationsApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1IntegrationsSellerboardDashboardProductsDaysReportsLast30DaysGet(opts).then((data) => {
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

[**[InlineResponse2009]**](InlineResponse2009.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1IntegrationsSellerboardWarehouseProductsGet

> [InlineResponse2008] apiV1IntegrationsSellerboardWarehouseProductsGet(opts)

Поиск по товарам со склада по: asin, sku, title..

## Поиск по товарам со склада по: asin, sku, title.  ## Это эндпоинт отдает все данные с уникальным sku, из последних записей.

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.IntegrationsApi();
let opts = {
  'filters': "filters_example", // String | Примеры: ?filters=or[0][sku][$eq]=L9-HOQU-YEE4;or[1][title][$contains]=Measuring отдает все где sku = \"L9-HOQU-YEE4\" или в title встречается \"Measuring\", не чувствителен к регистру.  без или: ?filters=[title][$contains]=Measuring
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1IntegrationsSellerboardWarehouseProductsGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **filters** | **String**| Примеры: ?filters&#x3D;or[0][sku][$eq]&#x3D;L9-HOQU-YEE4;or[1][title][$contains]&#x3D;Measuring отдает все где sku &#x3D; \&quot;L9-HOQU-YEE4\&quot; или в title встречается \&quot;Measuring\&quot;, не чувствителен к регистру.  без или: ?filters&#x3D;[title][$contains]&#x3D;Measuring | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse2008]**](InlineResponse2008.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1IntegrationsSellerboardWarehouseProductsLinkSkuPatch

> String apiV1IntegrationsSellerboardWarehouseProductsLinkSkuPatch(opts)

# Привязать к товару SKU.

## Привязать к товару SKU. Проверки:  Наличие всех SKU и продукта Отсутствие связи пары SKU и productId

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.IntegrationsApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject28() // InlineObject28 | 
};
apiInstance.apiV1IntegrationsSellerboardWarehouseProductsLinkSkuPatch(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject28**](InlineObject28.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1IntegrationsSellerboardWarehouseProductsUnLinkSkuPatch

> String apiV1IntegrationsSellerboardWarehouseProductsUnLinkSkuPatch(opts)

# Отвязать товар от SKU.

## Отвязать товар от SKU.  Нужна проверка может ли данный пользователь удалять связи!!!(пока такой проверки нет)

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.IntegrationsApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example", // String | 
  'body': new TestSwagger.InlineObject29() // InlineObject29 | 
};
apiInstance.apiV1IntegrationsSellerboardWarehouseProductsUnLinkSkuPatch(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject29**](InlineObject29.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1IntegrationsSellerboardWarehouseReportsDailyGet

> [InlineResponse2008] apiV1IntegrationsSellerboardWarehouseReportsDailyGet(opts)

Получить дневной отчет селерборда.

## Получить дневной отчет селерборда   ## Это эндпоинт отдает все записи клиента.

### Example

```javascript
import TestSwagger from 'test_swagger';
let defaultClient = TestSwagger.ApiClient.instance;
// Configure API key authorization: AccessTokenBearer
let AccessTokenBearer = defaultClient.authentications['AccessTokenBearer'];
AccessTokenBearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//AccessTokenBearer.apiKeyPrefix = 'Token';

let apiInstance = new TestSwagger.IntegrationsApi();
let opts = {
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1IntegrationsSellerboardWarehouseReportsDailyGet(opts).then((data) => {
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

[**[InlineResponse2008]**](InlineResponse2008.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

