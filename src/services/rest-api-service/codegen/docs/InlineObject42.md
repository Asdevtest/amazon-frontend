# TestSwagger.InlineObject42

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** | ASIN продукта | 
**lamazon** | **String** | Ссылка на этот продукт на амазоне. | 
**lsupplier** | **String** | Ссылка на этот продукт на поставщика. | [optional] 
**currentSupplierId** | **String** | GUID поставщика | [optional] 
**category** | **String** | Категория | [optional] 
**bsr** | **Number** |  | [optional] 
**fba** | **Boolean** | Признак fba | [optional] 
**fbm** | **Boolean** | Признак fbm | [optional] 
**status** | **Number** |  Статус товара. У ресечера: 0 - новый товар.  10 - новый товар с поставщиком | [optional] 
**amazon** | **Number** |  | [optional] 
**suppliersIds** | **[String]** | Массив поставщиков. | [optional] 
**fbafee** | **Number** | ФБА комиссия | [optional] 
**delivery** | **Number** | Стоимость доставки. | [optional] 
**icomment** | **String** | Комментарии к товару. | [optional] 
**images** | **[String]** | Массив изображений. | [optional] 
**byboxprice** | **Number** | Цена | [optional] 
**reffee** | **Number** | комиссия которую берет амазон за любой заказ - 15% | [optional] 
**strategyStatus** | **Number** | У поля на данный момент будет 5 возможных значений: 0, 10, 20, 30, 40 | [optional] 


