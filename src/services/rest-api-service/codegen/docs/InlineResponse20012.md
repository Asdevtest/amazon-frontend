# Amazonapi.InlineResponse20012

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**destination** | **String** | Пункт назначения. | 
**deliveryMethod** | **Number** | Метод доставки - 1: Air , 2: Sea | 
**status** | **Number** | 0- новый, 10 - принята в работу сборщиком. Отправлена - 20, Доставлена - 30 | 
**boxes** | [**[InlineResponse20010]**](InlineResponse20010.md) |  | 
**totalCoast** | **Number** | Стоимость партии. | 
**invoice** | **String** | Инвойс - сопроводительный документ описывающий состав партии в деталях. | 
**createdAt** | **String** | Дата создания. | [optional] 



## Enum: DeliveryMethodEnum


* `1` (value: `1`)

* `2` (value: `2`)




