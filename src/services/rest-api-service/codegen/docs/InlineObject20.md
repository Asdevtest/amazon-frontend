# Amazonapi.InlineObject20

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** | ASIN продукта | 
**lamazon** | **String** | Ссылка на этот продукт на амазоне. | 
**currentSupplier** | **String** | GUID поставщика | [optional] 
**category** | **String** | Категория | [optional] 
**bsr** | **Number** |  | 
**status** | **Number** |  Статус товара. У ресечера: 0 - новый товар.  10 - новый товар с поставщиком | [optional] [default to StatusEnum.0]
**amazon** | **Number** |  | 
**supplier** | **[String]** | Массив поставщиков. | 
**fbafee** | **Number** | ФБА комиссия | 
**delivery** | **Number** | Стоимость доставки. | 
**icomment** | **String** | Комментарии к товару. | 
**images** | **[String]** | Массив изображений. | 
**byboxprice** | **Number** | Цена | [optional] 
**researcherRate** | **Number** | Савка ресечера. | [optional] 
**supervisorRate** | **Number** | Савка супервайзера. | [optional] 
**buyerRate** | **Number** | Савка байера. | [optional] 



## Enum: StatusEnum


* `0` (value: `0`)

* `10` (value: `10`)




