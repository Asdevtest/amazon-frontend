# Amazonapi.InlineResponse200

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**_id** | **String** | GUID продукта в базе данных | 
**id** | **String** | ASIN продукта | 
**material** | **String** |  | [optional] 
**currentSupplier** | [**ApiV1AdminsGetProductsByStatusStatusCurrentSupplier**](ApiV1AdminsGetProductsByStatusStatusCurrentSupplier.md) |  | [optional] 
**category** | **String** | Категория | [optional] 
**lamazon** | **String** | Ссылка на этот продукт на амазоне. | 
**bsr** | **Number** |  | 
**fba** | **Boolean** | Признак fba | 
**express** | **Boolean** | Признак экспресс доставки. | [optional] 
**amazon** | **Number** |  | 
**height** | **Number** | Высота | [optional] 
**width** | **Number** | Ширина | [optional] 
**length** | **Number** | Длинна | [optional] 
**weight** | **Number** | Вес | [optional] 
**supplier** | [**[ApiV1AdminsGetProductsByStatusStatusCurrentSupplier]**](ApiV1AdminsGetProductsByStatusStatusCurrentSupplier.md) |  | 
**reffee** | **Number** | комиссия которую берет амазон за любой заказ - 15% | [optional] 
**fbafee** | **Number** | ФБА комиссия | [optional] 
**delivery** | **Number** | Стоимость доставки. | [optional] 
**fbaamount** | **Number** |  Общая сумма с фба. | [optional] 
**fbalink** | **String** | ФБА ссылка | [optional] 
**status** | **Number** | Код текущего статуса | [optional] 
**icomment** | **String** | Комментарии к товару. | 
**images** | **[String]** | Массив картинок. | [optional] 
**checkednotes** | **String** |  | [optional] 
**researcherFine** | **Number** | Размер штрафа менеджеру. | [optional] 
**researcherFineComment** | **String** | Комментарии к штрафу. | [optional] 
**supervisorFine** | **Number** | Размер штрафа на супервайзера. | [optional] 
**supervisorFineComment** | **String** | Комментарии к штрафу | [optional] 
**dirdecision** | **Number** | Код решения директора. | [optional] 
**amazonDescription** | **String** | Описание с сайта амазон. | [optional] 
**amazonDetail** | **String** | Данные из поля детали с сайта амазон. | [optional] 
**amazonTitle** | **String** | Заголовок на товар с сайта амазон. | [optional] 
**barCode** | **String** | Баркод | [optional] 
**minpurchase** | **Number** | Минимальный заказ | [optional] 
**profit** | **Number** | Прибыль | [optional] 
**margin** | **Number** | Маржа | [optional] 
**byboxprice** | **Number** | Цена | [optional] 
**createdby** | [**ApiV1AdminsGetProductsByStatusStatusCreatedby**](ApiV1AdminsGetProductsByStatusStatusCreatedby.md) |  | [optional] 
**createdat** | **Date** | Дата создания | [optional] 
**updateDate** | **Date** | Дата изменения | [optional] 
**checkedat** | **Date** | Дата проверки | [optional] 
**buyer** | [**ApiV1AdminsGetProductsByStatusStatusCreatedby**](ApiV1AdminsGetProductsByStatusStatusCreatedby.md) |  | [optional] 
**buyerscomment** | **String** | Комментарии к товару от байера. | [optional] 
**researcherRate** | **Number** | Савка ресечера. | [optional] 
**supervisorRate** | **Number** | Савка супервайзера. | [optional] 
**buyerRate** | **Number** | Савка байера. | [optional] 


