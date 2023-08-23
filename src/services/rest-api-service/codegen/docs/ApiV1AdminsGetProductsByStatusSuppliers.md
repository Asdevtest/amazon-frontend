# TestSwagger.ApiV1AdminsGetProductsByStatusSuppliers

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**_id** | **String** | GUID поставщика в БД | [optional] 
**name** | **String** | Название поставщика. | [optional] 
**link** | **String** | Ссылка на поставщика. | [optional] 
**price** | **Number** | Цена за еденицу, dollar | [optional] 
**amount** | **Number** | кол-во | [optional] 
**minlot** | **Number** | Минимальный лот. | [optional] 
**images** | **[String]** | Массив картинок. | [optional] 
**comment** | **String** | Комментарий | [optional] 
**yuanRate** | **Number** | Курс доллара к юаню поставщика.  | [optional] 
**multiplicity** | **Boolean** | Имеет ли обязательный делитель на кол-во в заказе поставщик | [optional] 
**priceInYuan** | **Number** | Цена за еденицу, yuan | [optional] 
**batchDeliveryCostInDollar** | **Number** | Доставка партии, dollar | [optional] 
**batchDeliveryCostInYuan** | **Number** | Доставка партии, yuan | [optional] 
**batchTotalCostInDollar** | **Number** | Цена партии, dollar | [optional] 
**batchTotalCostInYuan** | **Number** | Цена партии, yuan | [optional] 
**boxProperties** | [**ApiV1AdminsGetProductsByStatusBoxProperties**](ApiV1AdminsGetProductsByStatusBoxProperties.md) |  | [optional] 
**productionTerm** | **Number** |  | [optional] 
**createdBy** | [**ApiV1AnnouncementsMyCreatedBy**](ApiV1AnnouncementsMyCreatedBy.md) |  | [optional] 
**paymentMethods** | [**[ApiV1AdminsGetProductsByStatusPaymentMethods]**](ApiV1AdminsGetProductsByStatusPaymentMethods.md) |  | [optional] 
**priceVariations** | **[Object]** |  | [optional] 
**createdAt** | **Date** | Дата создания | [optional] 
**updatedAt** | **Date** | Дата обновления | [optional] 


