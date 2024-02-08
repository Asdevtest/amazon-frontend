export interface AnyType {}
// apiV1BuyersOrdersGuidGet - [key: string]: object
// apiV1ClientsOrdersGuidGet - [key: string]: object
// apiV1ClientsDestinationGet - IDestination
// apiV1ClientsProductsInfoForOrdersGet - any
// apiV1GeneralDataFiltersGet - Array<object>
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


*/
