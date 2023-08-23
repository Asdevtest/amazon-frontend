# TestSwagger.InlineResponse2005

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**_id** | **String** | GUID пользователя в БД. | 
**name** | **String** | Имя пользователя. | 
**email** | **String** | email | 
**role** | **Number** | Код роли присвоенный пользователю.    roles.root &#x3D; 0    roles.client &#x3D; 10    roles.super &#x3D; 20    roles.researcher &#x3D; 30    roles.freelancer &#x3D; 35    roles.buyer &#x3D; 40    roles.storekeeper &#x3D; 45    roles.candidate &#x3D; 50    roles.moderator &#x3D; 60     | 
**fba** | **Boolean** | Флаг fba. | 
**active** | **Boolean** | Если истина - пользователь активен. Если нет - заблокирован админом. | 
**isUserPreprocessingCenterUSA** | **Boolean** | Поле отвечает за то, берется ли в расчет бокс этого юзера(сторкипера) при подсчете товаров в дороге | [optional] 
**rate** | **Number** | Ставка, по который оплачивается сотрудник. | 
**balance** | **Number** | Баланс пользователя. | [optional] 
**balanceFreeze** | **Number** | Замороженная при оплате ордера сумма.. | [optional] 
**overdraft** | **Number** | Сумма на которую может уходить в минус пользователь. | [optional] 
**permissions** | [**[InlineResponse2005Permissions]**](InlineResponse2005Permissions.md) | Массив permission-ов. | [optional] 
**permissionGroups** | [**[InlineResponse2005PermissionGroups]**](InlineResponse2005PermissionGroups.md) | Массив групп permission-ов. | [optional] 
**masterUser** | **String** | GUID мастер пользователя к которму относится данный субпользователь. | [optional] 
**allowedStrategies** | **[Number]** | Массив доступных стратегий. | [optional] 
**allowedRoles** | **[Number]** | Массив массив ролей. | [optional] 
**canByMasterUser** | **Boolean** | Может ли данный пользователь быть мастер юзером. | [optional] 
**rating** | **Number** | Рейтинг пользователя. | [optional] 
**subUsers** | [**[InlineResponse2005SubUsers]**](InlineResponse2005SubUsers.md) | Массив id сабюзеров. | [optional] 
**masterUserInfo** | [**InlineResponse2005SubUsers**](InlineResponse2005SubUsers.md) |  | [optional] 
**allowedSpec** | **[Number]** | Массив возможных ролей фрилансера | [optional] 
**hideSuppliers** | **Boolean** | Скрывать поставщиков от пользователя. | [optional] 
**createdAt** | **Date** | Дата создания | [optional] 
**updatedAt** | **Date** | Дата изменения | [optional] 


