# TestSwagger.PermissionGroupGetDtoSchemaPermissions

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**_id** | **String** | GUID Permission в базе данных | 
**key** | **String** | Permission ключ | 
**title** | **String** | Простое название. | 
**description** | **String** | Описание permission | 
**allowedUrls** | [**[InlineResponse2003AllowedUrls]**](InlineResponse2003AllowedUrls.md) | Массив доступных url. | 
**role** | **Number** | Роль для которого данный permission | 
**hierarchy** | **Number** | Для фронта, чтобы хранить иерархию. | [optional] 
**createdById** | **String** | GUID любого, кто последний создал permission. | 
**lastModifiedById** | **String** | GUID любого, кто последний редактировал permission. | [optional] 
**createdAt** | **Date** | Дата создания | 
**updatedAt** | **Date** | Дата изменения | 


