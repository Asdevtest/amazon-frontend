# TestSwagger.InlineObject19

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 308805189 (added new column asin for freelance my requests)
**destinationId** | **String** | GUID пункта назначения коробки | [optional] 
**logicsTariffId** | **String** | GUID тарифа к сторкипера | [optional] 
**fbaShipment** | **String** | Это номер конкретной коробки при отправке в амазон. | [optional] 
**fbaNumber** | **String** | Это номер конкретной коробки при отправке в амазон. | [optional] 
**clientComment** | **String** | Комментарии к коробке | [optional] 
**referenceId** | **String** | Дополнительное поле shippingLabel для доставки грузовиками | [optional] 
**trackNumberText** | **String** | Текст трек номера | [optional] 
**trackNumberFile** | **String** | Ссылка на фото трек номера | [optional] 
**upsTrackNumber** | **String** | Идентификатор UPS | [optional] 
**shippingLabel** | **String** | shippingLabel коробки | [optional] 
**isShippingLabelAttachedByStorekeeper** | **Boolean** | shippingLabel проклеен сторкипером | [optional] 
<<<<<<< HEAD
**prepId** | **String** | Значение информационного ключа | [optional] 
=======
=======
>>>>>>> 0e4122de3 (5346: in the admin role added a field, if the user is a freelancer, the field is displayed, it allows you to select the specialty of this freelancer)
**taskId** | **Number** | ID задачи, для типовых. Что бы можно было вывести нужную надпись для исполнителя. | 
**boxesBefore** | **[String]** |  | [optional] 
**boxes** | **[String]** |  | 
**operationType** | **String** | Тип операции | 
**clientComment** | **String** | Комментарий клиента. | [optional] [default to &#39;&#39;]
**buyerComment** | **String** | Комментарий баера | [optional] 
**images** | **[String]** | Массив картинок. | [optional] 
**storekeeperComment** | **String** | Комментарий работника склада. | [optional] 



## Enum: OperationTypeEnum


* `merge` (value: `"merge"`)

* `split` (value: `"split"`)

* `receive` (value: `"receive"`)

* `edit` (value: `"edit"`)


<<<<<<< HEAD
>>>>>>> d43a0e20d (5346: in the admin role added a field, if the user is a freelancer, the field is displayed, it allows you to select the specialty of this freelancer)
=======
>>>>>>> 308805189 (added new column asin for freelance my requests)
=======
>>>>>>> 0e4122de3 (5346: in the admin role added a field, if the user is a freelancer, the field is displayed, it allows you to select the specialty of this freelancer)


