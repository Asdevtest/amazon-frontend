export interface AnyType {}
// apiV1ClientsDestinationGet - IDestination
// apiV1ClientsProductsInfoForOrdersGet - any
// apiV1ProductsHsCodeGuidGet - [key: string]: object
// apiV1ProductsVariationsGuidGet - - [key: string]: object
// apiV1StorekeepersTasksLightPagMyGet
// apiV1StorekeepersTaskLightGuidGet

export interface IAnyTypes {
  [key: string]: object
}

/* 
getSettings = async () => {
  const response = await restApiService.administratorApi.apiV1AdminsGetSettingsGet()
  return response.data
} 

getAnnouncementsByGuid = async (guid, body) => {
  const response = await restApiService.announcementsApi.apiV1AnnouncementsGuidGet({
    guid,
    body,
  })
  return response.data
}

getOrderById = async guid => {
  const response = await restApiService.buyerApi.apiV1BuyersOrdersGuidGet({ guid })
  return response.data
}

getOrderById = async guid => {
  const response = await restApiService.clientApi.apiV1ClientsOrdersGuidGet({ guid })
  return response.data
}

getDataForColumn = async (table, column, endpoint) => {
  const response = await restApiService.generalApi.apiV1GeneralDataFiltersGet({ table, column, endpoint })
  return response.data
}
*/
