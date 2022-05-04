# TestSwagger.ApiV1BoxesSplitBoxItems

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**productId** | **String** | GUID продукта в БД | 
**amount** | **Number** | Кол-во продукта | 
**orderId** | **String** | GUID заказа в БД | 
**barCode** | **String** | Штрихкод продукта | [optional] 
**isBarCodeAttachedByTheStorekeeper** | **Boolean** | Прикреплен ли баркод к коробке сотрудником склада. | [optional] 
**isBarCodeAlreadyAttachedByTheSupplier** | **Boolean** | Кнопка в заказе, сообщающая складу что штрихкод на товар поклеен у поставщика. | [optional] 
**masterBoxAmount** | **Number** | Если задан этот параметр, то его значение будет скопировано в поле amount в сущность новой коробки. | [optional] 


