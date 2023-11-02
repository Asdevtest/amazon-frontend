# TestSwagger.UserFullSchema

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**_id** | **String** | GUID пользователя в БД. | 
**name** | **String** | Имя пользователя. | 
**email** | **String** | email | 
**role** | **Number** | Код роли присвоенный пользователю.    roles.root &#x3D; 0    roles.client &#x3D; 10    roles.super &#x3D; 20    roles.researcher &#x3D; 30    roles.freelancer &#x3D; 35    roles.buyer &#x3D; 40    roles.storekeeper &#x3D; 45    roles.candidate &#x3D; 50    roles.moderator &#x3D; 60     | 
**fba** | **Boolean** | Флаг fba. | 
**active** | **Boolean** | Если истина - пользователь активен. Если нет - заблокирован админом. | 
**rate** | **Number** | Ставка, по который оплачивается сотрудник. | 
**balance** | **Number** | Баланс пользователя. | [optional] 
**balanceFreeze** | **Number** | Замороженная при оплате ордера сумма.. | [optional] 
**overdraft** | **Number** | Сумма на которую может уходить в минус пользователь. | [optional] 
**permissions** | **[String]** | Массив permission-ов. | [optional] 
**permissionGroups** | **[String]** | Массив групп permission-ов. | [optional] 
**masterUser** | **String** | GUID мастер пользователя к которму относится данный субпользователь. | [optional] 
**canByMasterUser** | **Boolean** | Флаг fba. | [optional] 
**rating** | **Number** | Рейтинг пользователя. | [optional] 
**allowedStrategies** | **[Number]** | Массив доступных стратегий. | [optional] 
**note** | [**UserFullSchemaNote**](UserFullSchemaNote.md) |  | [optional] 
**allowedSpec** | **[Number]** | Массив возможных ролей фрилансера | [optional] 
**allowedRoles** | **[Number]** | Массив массив ролей. | [optional] 
**createdAt** | **Date** | Дата создания | [optional] 
**updatedAt** | **Date** | Дата изменения | [optional] 


