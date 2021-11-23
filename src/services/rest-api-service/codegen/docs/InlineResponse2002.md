# Amazonapi.InlineResponse2002

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**_id** | **String** | GUID пользователя в БД. | 
**name** | **String** | Имя пользователя. | 
**email** | **String** | email | 
**role** | **Number** | Код роли присвоенный пользователю.    roles.root &#x3D; 0    roles.client &#x3D; 10    roles.super &#x3D; 20    roles.researcher &#x3D; 30    roles.buyer &#x3D; 40    roles.storekeeper &#x3D; 45    roles.candidate &#x3D; 50     | 
**fba** | **Boolean** | Флаг fba. | 
**active** | **Boolean** | Если истина - пользователь активен. Если нет - заблокирован админом. | 
**rate** | **Number** | Ставка, по который оплачивается сотрудник. | 
**balance** | **Number** | Балан сотрудника | [optional] 
**balanceFreeze** | **Number** | Замороженная при оплате ордера сумма. | [optional] 
**overdraft** | **Number** | Сумма на которую может уходить в минус пользователь. | [optional] 
**permissions** | [**[ApiV1AdminsUsersPermissions]**](ApiV1AdminsUsersPermissions.md) |  | [optional] 
**permissionGroups** | [**[ApiV1AdminsUsersPermissionGroups]**](ApiV1AdminsUsersPermissionGroups.md) |  | [optional] 
**createdAt** | **Date** | Дата создания | [optional] 


