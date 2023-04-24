# TestSwagger.UserInfoSchema

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**_id** | **String** | GUID пользователя в БД. | [optional] 
**name** | **String** | Имя пользователя. | 
**email** | **String** | email | [optional] 
**role** | **Number** |  | [optional] 
**fba** | **Boolean** | Флаг fba. | [optional] 
**active** | **Boolean** | Если истина - пользователь активен. Если нет - заблокирован админом. | [optional] 
**rate** | **Number** | Ставка, по который оплачивается сотрудник. | [optional] 
**balance** | **Number** | Баланс пользователя. | [optional] 
**balanceFreeze** | **Number** | Замороженная при оплате ордера сумма.. | [optional] 
**overdraft** | **Number** | Сумма на которую может уходить в минус пользователь. | [optional] 
**permissions** | [**[UserInfoSchemaPermissions]**](UserInfoSchemaPermissions.md) | Массив permission-ов. | [optional] 
**permissionGroups** | [**[UserInfoSchemaPermissionGroups]**](UserInfoSchemaPermissionGroups.md) | Массив групп permission-ов. | [optional] 
**masterUser** | [**UserInfoSchemaMasterUser**](UserInfoSchemaMasterUser.md) |  | [optional] 
**allowedRoles** | **[Number]** | Массив массив ролей. | [optional] 
**allowedStrategies** | **[Number]** | Массив доступных стратегий. | [optional] 
**canByMasterUser** | **Boolean** | Может ли данный пользователь быть мастер юзером. | [optional] 
**rating** | **Number** | Рейтинг пользователя. | [optional] 
**createdAt** | **Date** | Дата создания | [optional] 
**updatedAt** | **Date** | Дата изменения | [optional] 
**needConfirmPriceChange** | [**UserInfoSchemaNeedConfirmPriceChange**](UserInfoSchemaNeedConfirmPriceChange.md) |  | [optional] 
**needUpdateTariff** | [**UserInfoSchemaNeedUpdateTariff**](UserInfoSchemaNeedUpdateTariff.md) |  | [optional] 
**purchaseOrderRequired** | **[String]** |  | [optional] 
**updatesOnIdeas** | **Number** |  | [optional] 
**allowedSpec** | **[Number]** | Массив доступных специализаций фрилансера. | [optional] 
**tasksNewAll** | **Number** | Количество новых заданий у пользователя | [optional] 
**tasksAtProcessAll** | **Number** | Количество заданий в работе у пользователя | [optional] 
**tasksNewHigh** | **Number** | Количество новых заданий у пользователя с высоким приоритетом | [optional] 
**tasksAtProcessHigh** | **Number** | Количество заданий в работе у пользователяс высоким приоритетом | [optional] 
**freeOrders** | **Number** | Количество заказов из /buyers/orders/vac | [optional] 
**pendingOrders** | **Number** | Количество заказов 2, 3 статусы | [optional] 
**pendingOrdersByDeadline** | **Number** | Количество заказов 2, 3 статусы у которых до дедлайна меньше суток | [optional] 
**notPaid** | **Number** | Количество заказов 15, 19 статусы | [optional] 
**readyForPayment** | **Number** | Количество заказов 16 статусы | [optional] 
**needTrackNumber** | **Number** | Количество заказов 20 статус | [optional] 
**inbound** | **Number** | Количество заказов 25 статус | [optional] 
**confirmationRequired** | **Number** | Количество заказов 27 статус | [optional] 
**closedAndCanceled** | **Number** | Количество заказов 30,35,40 статусы | [optional] 
**allOrders** | **Number** | Количество заказов 15, 20, 25, 27, 19, 30, 35, 40 статусы | [optional] 


