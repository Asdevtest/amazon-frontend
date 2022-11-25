# TestSwagger.IntegrationsApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiV1IntegrationsCreateAndLinkSkuProductsPost**](IntegrationsApi.md#apiV1IntegrationsCreateAndLinkSkuProductsPost) | **POST** /api/v1/integrations/create_and_link_sku_products | # Создать, привязать товары к SKU. Спарсить данные. 
[**apiV1IntegrationsGetSkusByProductIdGuidGet**](IntegrationsApi.md#apiV1IntegrationsGetSkusByProductIdGuidGet) | **GET** /api/v1/integrations/get_skus_by_product_id/{guid} | Получить товары из склада (sku), через GUID продукта.
[**apiV1IntegrationsRefreshProductsPatch**](IntegrationsApi.md#apiV1IntegrationsRefreshProductsPatch) | **PATCH** /api/v1/integrations/refresh_products | # Обновить товары через парсер
[**apiV1IntegrationsSellerboardDashboardProductsDaysReportsLast30DaysGet**](IntegrationsApi.md#apiV1IntegrationsSellerboardDashboardProductsDaysReportsLast30DaysGet) | **GET** /api/v1/integrations/sellerboard_dashboard_products_days_reports_last_30_days | Получить месячный отчет селерборда.
[**apiV1IntegrationsSellerboardWarehouseProductsLinkSkuPatch**](IntegrationsApi.md#apiV1IntegrationsSellerboardWarehouseProductsLinkSkuPatch) | **PATCH** /api/v1/integrations/sellerboard_warehouse_products_link_sku | # Привязать к товару SKU.
[**apiV1IntegrationsSellerboardWarehouseProductsUnLinkSkuPatch**](IntegrationsApi.md#apiV1IntegrationsSellerboardWarehouseProductsUnLinkSkuPatch) | **PATCH** /api/v1/integrations/sellerboard_warehouse_products_unLink_sku | # Отвязать товар от SKU.
[**apiV1IntegrationsSellerboardWarehouseStocksGet**](IntegrationsApi.md#apiV1IntegrationsSellerboardWarehouseStocksGet) | **GET** /api/v1/integrations/sellerboard_warehouse_stocks | Получить днанные со склада.
[**apiV1IntegrationsWarehouseReportGet**](IntegrationsApi.md#apiV1IntegrationsWarehouseReportGet) | **GET** /api/v1/integrations/warehouse_report | Поиск по товарам со склада по: asin, sku, title..



## apiV1IntegrationsCreateAndLinkSkuProductsPost

> String apiV1IntegrationsCreateAndLinkSkuProductsPost(opts)

# Создать, привязать товары к SKU. Спарсить данные. 

## Создать, привязать товары к SKU. Спарсить данные.

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
  'body': new TestSwagger.InlineObject58() // InlineObject58 | 
};
apiInstance.apiV1IntegrationsCreateAndLinkSkuProductsPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Accept_Encoding** | **String**|  | [optional] 
 **body** | [**InlineObject58**](InlineObject58.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1IntegrationsGetSkusByProductIdGuidGet

> [InlineResponse20033] apiV1IntegrationsGetSkusByProductIdGuidGet(guid, opts)

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
let guid = null; // String | GUID продукта.
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
 **guid** | [**String**](.md)| GUID продукта. | 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse20033]**](InlineResponse20033.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1IntegrationsRefreshProductsPatch

> InlineResponse20035 apiV1IntegrationsRefreshProductsPatch(opts)

# Обновить товары через парсер

## Обновить товары через парсер.

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
  'body': ["null"] // [String] | 
};
apiInstance.apiV1IntegrationsRefreshProductsPatch(opts).then((data) => {
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

[**InlineResponse20035**](InlineResponse20035.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1IntegrationsSellerboardDashboardProductsDaysReportsLast30DaysGet

> [InlineResponse20034] apiV1IntegrationsSellerboardDashboardProductsDaysReportsLast30DaysGet(opts)

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
  'shopId': null, // String | GUID магазина
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
 **shopId** | [**String**](.md)| GUID магазина | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse20034]**](InlineResponse20034.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1IntegrationsSellerboardWarehouseProductsLinkSkuPatch

> String apiV1IntegrationsSellerboardWarehouseProductsLinkSkuPatch(opts)

# Привязать к товару SKU.

## Привязать к товару SKU. Проверки:  Наличие всех SKU и продукта Массив всех SKU с должны принадлежать данному магазину Только для клиента

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
  'body': new TestSwagger.InlineObject57() // InlineObject57 | 
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
 **body** | [**InlineObject57**](InlineObject57.md)|  | [optional] 

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
  'body': new TestSwagger.InlineObject59() // InlineObject59 | 
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
 **body** | [**InlineObject59**](InlineObject59.md)|  | [optional] 

### Return type

**String**

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiV1IntegrationsSellerboardWarehouseStocksGet

> [InlineResponse20033] apiV1IntegrationsSellerboardWarehouseStocksGet(opts)

Получить днанные со склада.

## Получить днанные со склада.  ## Это эндпоинт отдает все записи клиента.

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
  'shopId': null, // String | GUID магазина
  'Accept_Encoding': "Accept_Encoding_example" // String | 
};
apiInstance.apiV1IntegrationsSellerboardWarehouseStocksGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **shopId** | [**String**](.md)| GUID магазина | [optional] 
 **Accept_Encoding** | **String**|  | [optional] 

### Return type

[**[InlineResponse20033]**](InlineResponse20033.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiV1IntegrationsWarehouseReportGet

> [InlineResponse20033] apiV1IntegrationsWarehouseReportGet(opts)

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
apiInstance.apiV1IntegrationsWarehouseReportGet(opts).then((data) => {
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

[**[InlineResponse20033]**](InlineResponse20033.md)

### Authorization

[AccessTokenBearer](../README.md#AccessTokenBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

