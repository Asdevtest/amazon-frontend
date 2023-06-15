# TestSwagger.InlineResponse20021

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**_id** | **String** | GUID продукта в базе данных | [optional] 
**asin** | **String** | ASIN продукта | [optional] 
**skusByClient** | **[String]** |  | [optional] 
**strategyStatus** | **Number** | У поля на данный момент будет 5 возможных значений: 0, 10, 20, 30, 40 | [optional] 
**checkednotes** | **String** |  | [optional] 
**bsr** | **Number** |  | [optional] 
**amazon** | **Number** |  | [optional] 
**reffee** | **Number** | комиссия которую берет амазон за любой заказ - 15% | [optional] 
**fbafee** | **Number** | ФБА комиссия | [optional] 
**fbaamount** | **Number** |  Общая сумма с фба. | [optional] 
**status** | **Number** | Код текущего статуса | [optional] 
**images** | **[String]** | Массив картинок. | [optional] 
**amazonTitle** | **String** | Заголовок на товар с сайта амазон. | [optional] 
**profit** | **Number** | Прибыль | [optional] 
**material** | **String** | Материл продукта | [optional] 
**productUsage** | **String** | Применение продукта | [optional] 
**chinaTitle** | **String** | chinese title? | [optional] 
**ideasOnCheck** | **Number** |  | [optional] 
**ideasVerified** | **Number** |  | [optional] 
**ideasClosed** | **Number** |  | [optional] 
**tags** | [**[ApiV1AdminsGetProductsByStatusTags]**](ApiV1AdminsGetProductsByStatusTags.md) |  | [optional] 
**redFlags** | [**[ApiV1AdminsGetProductsByStatusRedFlags]**](ApiV1AdminsGetProductsByStatusRedFlags.md) |  | [optional] 
**createdAt** | **Date** | Дата создания | [optional] 
**updatedAt** | **Date** | Дата изменения | [optional] 


