# Amazonapi.ApiV1AdminsGetNotPaidProductsCreatedBy

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**_id** | **String** | GUID пользователя в БД. | 
**name** | **String** | Имя пользователя. | 
**email** | **String** | email | 
**role** | **Number** | Код роли присвоенный пользователю.    roles.root &#x3D; 0    roles.director &#x3D; 1    roles.super &#x3D; 2    roles.researcher &#x3D; 3    roles.buyer &#x3D; 4    roles.candidate &#x3D; 5     | 
**fba** | **Boolean** | Флаг fba. | 
**active** | **Boolean** | Если истина - пользователь активен. Если нет - заблокирован админом. | 
**rate** | **Number** | Ставка, по который оплачивается сотрудник. | 


