# TestSwagger.ApiV1AdminsGetProductsByStatusSuppliers

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **String** | Название поставщика. | 
**link** | **String** | Ссылка на поставщика. | 
**price** | **Number** | Цена за еденицу, dollar | 
**amount** | **Number** | кол-во | 
**minlot** | **Number** | Минимальный лот. | 
**lotcost** | **Number** | Стоимость лота. | 
**images** | **[String]** | Массив картинок. | [optional] 
**comment** | **String** | Комментарий | 
**yuanRate** | **Number** | Курс доллара к юаню поставщика.  | [optional] 
**priceInYuan** | **Number** | Цена за еденицу, yuan | [optional] 
**batchDeliveryCostInDollar** | **Number** | Доставка партии, dollar | 
**batchDeliveryCostInYuan** | **Number** | Доставка партии, yuan | [optional] 
**batchTotalCostInDollar** | **Number** | Цена партии, dollar | [optional] 
**batchTotalCostInYuan** | **Number** | Цена партии, yuan | [optional] 
**amountInBox** | **Number** | Количество единиц в коробке. | [optional] 
**boxLengthCm** | **Number** | Размеры которые назвал поставщик при заказе ( могут отличаться с реальными). | [optional] 
**boxWidthCm** | **Number** | Размеры которые назвал поставщик при заказе ( могут отличаться с реальными). | [optional] 
**boxHeightCm** | **Number** | Размеры которые назвал поставщик при заказе ( могут отличаться с реальными). | [optional] 
**boxWeighGrossKg** | **Number** | Общий вес кг коробки который назвал поставщик. | [optional] 
**boxVolumeWeightKg** | **Number** | Объемный вес кг коробки, расчет на беке. | [optional] 
**_id** | **String** | GUID поставщика в БД | [optional] 


