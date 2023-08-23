# TestSwagger.InlineObject12

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **String** | Имя пользователя. | [optional] 
**email** | **String** | email | [optional] 
**role** | **Number** | Код роли присвоенный пользователю.    roles.root &#x3D; 0    roles.client &#x3D; 10    roles.super &#x3D; 20    roles.researcher &#x3D; 30    roles.freelancer &#x3D; 35    roles.buyer &#x3D; 40    roles.storekeeper &#x3D; 45    roles.candidate &#x3D; 50    roles.moderator &#x3D; 60     | [optional] 
**fba** | **Boolean** | Флаг fba. | [optional] 
**active** | **Boolean** | Если истина - пользователь активен. Если нет - заблокирован админом. | [optional] 
**isUserPreprocessingCenterUSA** | **Boolean** | Поле отвечает за то, берется ли в расчет бокс этого юзера(сторкипера) при подсчете товаров в дороге | [optional] 
**rate** | **Number** | Ставка, по который оплачивается сотрудник. | [optional] 
**balance** | **Number** | Текущий баланс пользователя. | [optional] 
**balanceFreeze** | **Number** | Замороженная при оплате ордера сумма. | [optional] 
**overdraft** | **Number** | Сумма на которую может уходить в минус пользователь. | [optional] 
**permissions** | **[String]** | Массив permission-ов. | [optional] 
**permissionGroups** | **[String]** | Массив групп permission-ов. | [optional] 
**allowedRoles** | **[Number]** | Массив массив ролей. | [optional] 
**allowedStrategies** | **[Number]** | Массив доступных стратегий. | [optional] 
**canByMasterUser** | **Boolean** | Может ли данный пользователь быть мастер юзером. | [optional] 
**hideSuppliers** | **Boolean** | Скрывать поставщиков от пользователя. | [optional] 
**allowedSpec** | **[Number]** | Массив доступных специализаций фрилансера. | [optional] 


