# TestSwagger.UserInfoSchema

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**_id** | **String** | GUID пользователя в БД. | 
**name** | **String** | Имя пользователя. | 
**email** | **String** | email | 
**role** | **Number** |  | 
**fba** | **Boolean** | Флаг fba. | 
**active** | **Boolean** | Если истина - пользователь активен. Если нет - заблокирован админом. | 
**rate** | **Number** | Ставка, по который оплачивается сотрудник. | 
**balance** | **Number** | Баланс пользователя. | [optional] 
**balanceFreeze** | **Number** | Замороженная при оплате ордера сумма.. | [optional] 
**overdraft** | **Number** | Сумма на которую может уходить в минус пользователь. | [optional] 
**permissions** | [**[UserInfoSchemaPermissions]**](UserInfoSchemaPermissions.md) | Массив permission-ов. | [optional] 
**permissionGroups** | [**[UserInfoSchemaPermissionGroups]**](UserInfoSchemaPermissionGroups.md) | Массив групп permission-ов. | [optional] 
**masterUser** | **String** | GUID мастер пользователя к которму относится данный субпользователь. | [optional] 
**allowedRoles** | **[Number]** | Массив массив ролей. | [optional] 
**canByMasterUser** | **Boolean** | Может ли данный пользователь быть мастер юзером. | [optional] 
**createdAt** | **Date** | Дата создания | [optional] 
**updatedAt** | **Date** | Дата изменения | [optional] 


