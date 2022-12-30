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


