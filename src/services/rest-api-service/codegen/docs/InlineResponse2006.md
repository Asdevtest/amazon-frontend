# Amazonapi.InlineResponse2006

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**_id** | **String** | GUID продукта в базе данных | 
**id** | **String** | ASIN продукта | 
**material** | **String** |  | [optional] 
**currentSupplier** | [**ApiV1AdminsGetProductsByStatusCurrentSupplier**](ApiV1AdminsGetProductsByStatusCurrentSupplier.md) |  | [optional] 
**currentSupplierId** | **String** | GUID поставщика в базе данных | [optional] 
**category** | **String** | Категория | [optional] 
**lamazon** | **String** | Ссылка на этот продукт на амазоне. | 
**lsupplier** | **String** | Ссылка на поставщика. | [optional] 
**bsr** | **Number** |  | 
**fba** | **Boolean** | Признак fba | 
**fbm** | **Boolean** | Признак fbm | [optional] 
**express** | **Boolean** | Признак экспресс доставки. | [optional] 
**amazon** | **Number** |  | 
**height** | **Number** | Высота | [optional] 
**width** | **Number** | Ширина | [optional] 
**length** | **Number** | Длинна | [optional] 
**weight** | **Number** | Вес | [optional] 
**suppliers** | [**[ApiV1AdminsGetProductsByStatusCurrentSupplier]**](ApiV1AdminsGetProductsByStatusCurrentSupplier.md) |  | 
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
**client** | [**ApiV1AdminsGetProductsByStatusClient**](ApiV1AdminsGetProductsByStatusClient.md) |  | [optional] 
**amazonDescription** | **String** | Описание с сайта амазон. | [optional] 
**amazonDetail** | **String** | Данные из поля детали с сайта амазон. | [optional] 
**amazonTitle** | **String** | Заголовок на товар с сайта амазон. | [optional] 
**barCode** | **String** | Баркод | [optional] 
**minpurchase** | **Number** | Минимальный заказ | [optional] 
**profit** | **Number** | Прибыль | [optional] 
**margin** | **Number** | Маржа | [optional] 
**byboxprice** | **Number** | Цена | [optional] 
**createdBy** | [**ApiV1AdminsGetProductsByStatusClient**](ApiV1AdminsGetProductsByStatusClient.md) |  | [optional] 
**createdAt** | **Date** | Дата создания | [optional] 
**updatedAt** | **Date** | Дата изменения | [optional] 
**checkedAt** | **Date** | Дата проверки | [optional] 
**buyer** | [**ApiV1AdminsGetProductsByStatusClient**](ApiV1AdminsGetProductsByStatusClient.md) |  | [optional] 
**buyersComment** | **String** | Комментарии к товару от байера. | [optional] 
**researcherRate** | **Number** | Савка ресечера. | [optional] 
**supervisorRate** | **Number** | Савка супервайзера. | [optional] 
**paidAt** | **Date** | Дата оплаты | [optional] 
**buyerRate** | **Number** | Савка байера. | [optional] 
**listingName** | **String** |  | [optional] 
**listingBulletPoints** | **[String]** | Массив ... | [optional] 
**listingProductDetails** | **String** |  | [optional] 
**listingSearchTerms** | **String** |  | [optional] 
**listingSubjectMatters** | **[String]** | Массив ... | [optional] 
**listingImages** | **[String]** | массив картинок(в виде прямых ссылок). | [optional] 
**listingTaskToFindSupplier** | **String** |  | [optional] 
**listingSupplierImportantPoints** | **String** |  | [optional] 
**listingExtraInfo** | **String** |  | [optional] 
**listingSupplierCompetitors** | **String** |  | [optional] 
**strategyStatus** | **Number** | У поля на данный момент будет 5 возможных значений: 0, 10, 20, 30, 40 | [optional] [default to 0]
**checkedby** | [**ApiV1AdminsGetProductsByStatusClient**](ApiV1AdminsGetProductsByStatusClient.md) |  | [optional] 


