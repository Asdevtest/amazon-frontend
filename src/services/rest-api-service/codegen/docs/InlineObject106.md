# TestSwagger.InlineObject106

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **String** | Название поставщика. | 
**link** | **String** | Ссылка на поставщика. | 
**price** | **Number** | Цена за еденицу, dollar | 
**amount** | **Number** | кол-во | 
**minlot** | **Number** | Минимальный лот. | 
**multiplicity** | **Boolean** | Имеет ли обязательный делитель на кол-во в заказе поставщик | [optional] 
**paymentMethods** | [**[ApiV1SuppliersPaymentMethods]**](ApiV1SuppliersPaymentMethods.md) |  | [optional] 
**images** | **[String]** | Массив картинок. | [optional] 
**comment** | **String** | Комментарий | 
**yuanRate** | **Number** | Курс доллара к юаню поставщика.  | [optional] 
**priceInYuan** | **Number** | Цена за еденицу, yuan | [optional] 
**batchDeliveryCostInDollar** | **Number** | Доставка партии, dollar | 
**batchDeliveryCostInYuan** | **Number** | Доставка партии, yuan | [optional] 
**batchTotalCostInDollar** | **Number** | Цена партии, dollar | [optional] 
**batchTotalCostInYuan** | **Number** | Цена партии, yuan | [optional] 
**productionTerm** | **Number** |  | [optional] 
**boxProperties** | [**ApiV1SuppliersBoxProperties**](ApiV1SuppliersBoxProperties.md) |  | [optional] 
**priceVariations** | [**[ApiV1SuppliersPriceVariations]**](ApiV1SuppliersPriceVariations.md) |  | [optional] 


