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

  getUsers = async data => {
    const response = await restApiService.administratorApi.apiV1AdminsUsersPagGet(data)
    return response.data
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

  getSettings = async body => {
    const response = await restApiService.administratorApi.apiV1AdminsGetSettingsGet({ ...body, noCache: true })
    return response.data
  }

  getProxy = async () => {
    const response = await restApiService.administratorApi.apiV1AdminsProxyGet()
    return response.data
  }

  getFeedbacks = async body => {
    const response = await restApiService.administratorApi.apiV1AdminsFeedbackGet({ ...body, noCache: true })
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

  toggleServer = async (turn, body) => {
    const response = await restApiService.administratorApi.apiV1AdminsToggleServerPatch({ turn, body })
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

  createSpec = async title => {
    const response = await restApiService.administratorApi.apiV1AdminsFreelanceSpecsPost({ body: { title } })
    return response.data
  }

  editSpec = async (guid, title, archive) => {
    const response = await restApiService.administratorApi.apiV1AdminsFreelanceSpecsGuidPatch({
      guid,
      body: { title, archive },
    })
    return response.data
  }

  removeSpec = async guid => {
    const response = await restApiService.administratorApi.apiV1AdminsFreelanceSpecsGuidDelete({
      guid,
    })
    return response.data
  }

  createPatchNote = async body => {
    const response = await restApiService.administratorApi.apiV1AdminsPatchNotesPost({ body })
    return response.data
  }

  updatePatchNote = async (guid, body) => {
    const response = await restApiService.administratorApi.apiV1AdminsPatchNotesGuidPatch({ guid, body })
    return response.data
  }

  getPatchNoteVersions = async () => {
    const response = await restApiService.administratorApi.apiV1AdminsPatchNotesVersionsGet()
    return response.data
  }

  removePatchNote = async guid => {
    const response = await restApiService.administratorApi.apiV1AdminsPatchNotesGuidDelete({ guid })
    return response.data
  }

  exportPermissions = async () => {
    const response = await restApiService.administratorApi.apiV1AdminsPermissionGet()
    return response.data
  }

  patchLaunchPreDeadlineValue = async body => {
    const response = await restApiService.administratorApi.apiV1AdminsSetLaunchPreDeadlineValuePatch(body)
    return response.data
  }

  removeCountry = async guid => {
    const response = await restApiService.administratorApi.apiV1AdminsCountriesGuidDelete({ guid })
    return response.data
  }

  addCountry = async body => {
    const response = await restApiService.administratorApi.apiV1AdminsCountriesPost({ body })
    return response.data
  }

  editCountry = async (guid, body) => {
    const response = await restApiService.administratorApi.apiV1AdminsCountriesGuidPatch({ guid, body })
    return response.data
  }

  addCategory = async body => {
    const response = await restApiService.administratorApi.apiV1AdminsCategoriesPost({ body })
    return response.data
  }

  editCategory = async (guid, body) => {
    const response = await restApiService.administratorApi.apiV1AdminsCategoriesGuidPatch({ guid, body })
    return response.data
  }

  removeCategory = async guid => {
    const response = await restApiService.administratorApi.apiV1AdminsCategoriesGuidDelete({ guid })
    return response.data
  }

  rejectedFeedback = async guid => {
    const response = await restApiService.administratorApi.apiV1AdminsFeedbackGuidRejectedPatch({ guid })
    return response.data
  }

  getFeedback = async guid => {
    const response = await restApiService.administratorApi.apiV1AdminsFeedbackGuidGet({ guid })
    return response.data
  }

  approveFeedback = async guid => {
    const response = await restApiService.administratorApi.apiV1AdminsFeedbackGuidAcceptedPatch({ guid })
    return response.data
  }

  rejectFeedback = async guid => {
    const response = await restApiService.administratorApi.apiV1AdminsFeedbackGuidRejectedPatch({ guid })
    return response.data
  }

  inProcessFeedback = async guid => {
    const response = await restApiService.administratorApi.apiV1AdminsFeedbackGuidInProcessPatch({ guid })
    return response.data
  }

  sendReplyToFeedback = async (guid, body) => {
    const response = await restApiService.administratorApi.apiV1AdminsFeedbackGuidResponseToAnAppealPatch({
      guid,
      body,
    })
    return response.data
  }

  changePasswordById = async (guid, body) => {
    const response = await restApiService.administratorApi.apiV1AdminsUsersChangePasswordGuidPatch({
      guid,
      body,
    })
    return response.data
  }
}

export const AdministratorModel = new AdministratorModelStatic()
