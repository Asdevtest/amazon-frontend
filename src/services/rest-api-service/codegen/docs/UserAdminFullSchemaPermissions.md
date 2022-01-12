# TestSwagger.UserAdminFullSchemaPermissions

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**_id** | **String** | GUID Permission в базе данных | 
**key** | **String** | Permission ключ | 
**title** | **String** | Простое название. | 
**description** | **String** | Описание permission | 
**allowedUrls** | [**[UserAdminFullSchemaAllowedUrls]**](UserAdminFullSchemaAllowedUrls.md) | Массив доступных url. | 
**createdById** | **String** | GUID любого, кто последний создал permission. | 
**role** | **Number** | Роль для которого данный permission | 
**lastModifiedById** | **String** | GUID любого, кто последний редактировал permission. | [optional] 
**createdAt** | **Date** | Дата создания | 
**updatedAt** | **Date** | Дата изменения | 


