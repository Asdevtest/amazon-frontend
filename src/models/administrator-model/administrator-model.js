import { restApiService } from '@services/rest-api-service/rest-api-service'

class AdministratorModelStatic {
  getProductsChecking = async () => {
    const response = await restApiService.administratorApi.apiV1AdminsGetCheckingProductsGet()
    return response.data
  }

  makePayment = async body => {
    const response = await restApiService.administratorApi.apiV1AdminsMakePaymentPost({ body })
    return response.data
  }

  getUsers = async () => {
    const response = await restApiService.administratorApi.apiV1AdminsUsersGet()
    return response
  }

  updateUser = async (guid, body) => {
    const response = await restApiService.administratorApi.apiV1AdminsUsersGuidPatch({
      guid,
      body,
    })
    return response.data
  }

  createProxy = async body => {
    const response = await restApiService.administratorApi.apiV1AdminsProxyPost({ body })
    return response.data
  }

  getProductsByStatus = async status => {
    const response = await restApiService.administratorApi.apiV1AdminsGetProductsByStatusGet({ status })
    return response.data
  }

  getProductsPaid = async () => {
    const response = await restApiService.administratorApi.apiV1AdminsGetPaidProductsGet()
    return response.data
  }

  getOrdersByStatus = async status => {
    const response = await restApiService.administratorApi.apiV1AdminsOrdersGet({ status })
    return response.data
  }

  getUsersById = async guid => {
    const response = await restApiService.administratorApi.apiV1AdminsUsersGuidGet({ guid })
    return response.data
  }

  getLightTasks = async () => {
    const response = await restApiService.administratorApi.apiV1AdminsTasksLightGet()
    return response.data
  }

  getTasksPag = async data => {
    const response = await restApiService.administratorApi.apiV1AdminsTasksPagGet(data)
    return response.data
  }

  getSettings = async () => {
    const response = await restApiService.administratorApi.apiV1AdminsGetSettingsGet()
    return response.data
  }

  getProxy = async () => {
    const response = await restApiService.administratorApi.apiV1AdminsProxyGet()
    return response.data
  }

  getFeedback = async () => {
    const response = await restApiService.administratorApi.apiV1AdminsFeedbackGet()
    return response.data
  }

  setSettings = async body => {
    const response = await restApiService.administratorApi.apiV1AdminsSetSettingPatch({
      body,
    })
    return response.data
  }

  createDestination = async body => {
    const response = await restApiService.administratorApi.apiV1AdminsDestinationPost({ body })
    return response.data
  }

  editDestination = async (guid, body) => {
    const response = await restApiService.administratorApi.apiV1AdminsDestinationEditGuidPatch({
      guid,
      body,
    })
    return response.data
  }

  removeDestination = async guid => {
    const response = await restApiService.administratorApi.apiV1AdminsDestinationGuidDelete({ guid })
    return response.data
  }

  toggleServer = async () => {
    const response = await restApiService.administratorApi.apiV1AdminsToggleServerPatch()
    return response.data
  }

  removePaymentMethod = async guid => {
    const response = await restApiService.administratorApi.apiV1AdminsPaymentMethodGuidDelete({ guid })
    return response.data
  }

  getUsersByRole = async role => {
    const response = await restApiService.administratorApi.apiV1AdminsUsersByRoleGet({ role })
    return response.data
  }

  bindOrUnbindUserToProduct = async body => {
    const response = await restApiService.administratorApi.apiV1AdminsProductLinkOrUnlinkUserRolePatch({ body })
    return response.data
  }

  removeRedFlag = async guid => {
    const response = await restApiService.administratorApi.apiV1AdminsRedFlagsGuidDelete({ guid })
    return response.data
  }

  createRedFlag = async body => {
    const response = await restApiService.administratorApi.apiV1AdminsRedFlagsPost({ body })
    return response.data
  }

  removeTags = async body => {
    const response = await restApiService.administratorApi.apiV1AdminsTagsDelete({ body })
    return response.data
  }

  editTag = async (guid, body) => {
    const response = await restApiService.administratorApi.apiV1AdminsTagsGuidPatch({
      guid,
      body,
    })
    return response.data
  }

  editRedFlag = async (guid, body) => {
    const response = await restApiService.administratorApi.apiV1AdminsRedFlagsGuidPatch({
      guid,
      body,
    })
    return response.data
  }

  getProductsPag = async data => {
    const response = await restApiService.administratorApi.apiV1AdminsProductsPagGet(data)
    return response.data
  }

  getOrdersPag = async data => {
    const response = await restApiService.administratorApi.apiV1AdminsOrdersPagGet(data)
    return response.data
  }

  createSpec = async body => {
    const response = await restApiService.administratorApi.apiV1AdminsFreelanceSpecsPost({ body })
    return response.data
  }

  editSpec = async (guid, title) => {
    const response = await restApiService.administratorApi.apiV1AdminsFreelanceSpecsGuidPatch({
      guid,
      body: { title },
    })
    return response.data
  }

  removeSpec = async guid => {
    const response = await restApiService.administratorApi.apiV1AdminsFreelanceSpecsGuidDelete({
      guid,
    })
    return response.data
  }
}

export const AdministratorModel = new AdministratorModelStatic()
