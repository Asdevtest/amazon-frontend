# Amazonapi.InlineObject20

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**sku** | **String** | SKU - ставит склад - только для склада | [optional] 
**material** | **String** | add to new functional | [optional] 
**currentSupplier** | **String** | GUID поставщика | [optional] 
**category** | **String** | Категория | [optional] 
**lamazon** | **String** | Ссылка на этот продукт на амазоне. | [optional] 
**lsupplier** | **String** | Ссылка на поставщика. | [optional] 
**bsr** | **Number** |  | [optional] 
**fba** | **Boolean** | Признак fba | [optional] 
**express** | **Boolean** |  уточнить  | [optional] 
**amazon** | **Number** |  | [optional] 
**height** | **Number** |  | [optional] 
**width** | **Number** |  | [optional] 
**length** | **Number** |  | [optional] 
**weight** | **Number** |  | [optional] 
**supplier** | **[String]** |  | [optional] 
**reffee** | **Number** | комиссия которую берет амазон за любой заказ - 15% | [optional] 
**fbafee** | **Number** | ФБА комиссия | [optional] 
**delivery** | **Number** | Стоимость доставки. | [optional] 
**fbaamount** | **Number** |  Общая сумма с фба. | [optional] 
**fbalink** | **String** |  | [optional] 
**status** | **Number** |  Статус товара. У ресечера: 0 - новый товар.  10 - новый товар с поставщиком | [optional] [default to StatusEnum.0]
**icomment** | **String** | Комментарии к товару. | [optional] 
**images** | **[String]** |  | [optional] 
**amazonDescription** | **String** |  | [optional] 
**amazonDetail** | **String** |  | [optional] 
**amazonTitle** | **String** |  | [optional] 
**barCode** | **String** |  | [optional] 
**minpurchase** | **Number** |  | [optional] 
**profit** | **Number** | Прибыль | [optional] 
**margin** | **Number** | Маржа | [optional] 
**byboxprice** | **Number** | Цена | [optional] 



## Enum: StatusEnum


* `0` (value: `0`)

* `10` (value: `10`)




