# TestSwagger.UserAdminFullSchemaPermissionGroups

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**_id** | **String** | GUID PermissionGroup в базе данных | [optional] 
**key** | **String** | Ключ группы пермишенов | 
**title** | **String** | Простое название | 
**description** | **String** | Описание группы пермишенов | 
**permissions** | [**[UserAdminFullSchemaPermissions]**](UserAdminFullSchemaPermissions.md) |  | 
**role** | **Number** | Роль для которого данная группа permission-ов | 
**createdById** | **String** | GUID любого, кто последний создал группу permission. | 
**lastModifiedById** | **String** | GUID любого, кто последний редактировал группу permission. | [optional] 
**createdAt** | **Date** | Дата создания | 
**updatedAt** | **Date** | Дата изменения | 


