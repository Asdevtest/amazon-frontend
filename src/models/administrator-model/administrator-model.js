import { restApiService } from '@services/rest-api-service/rest-api-service'

class AdministratorModelStatic {
  logger = undefined

  getProductsNotPaid = async () => {
    const response = await restApiService.administratorApi.apiV1AdminsGetNotPaidProductsGet()
    return response
  }

  getProductsWaiting = async () => {
    const response = await restApiService.administratorApi.apiV1AdminsGetWaitingProductsGet()
    return response
  }

  getProductsVacant = async () => {
    const response = await restApiService.administratorApi.apiV1AdminsGetVacProductsGet()
    return response
  }

  getProductsChecking = async () => {
    const response = await restApiService.administratorApi.apiV1AdminsGetCheckingProductsGet()
    return response
  }

  pickupProductForCheck = async id => {
    const response = await restApiService.administratorApi.apiV1AdminsPickupProductGuidPost(id)
    return response
  }

  updateProduct = async (id, data) => {
    const response = await restApiService.administratorApi.apiV1AdminsPatchProductsGuidPatch(id, { body: data })
    return response
  }

  makePayment = async data => {
    const response = await restApiService.administratorApi.apiV1AdminsMakePaymentPost({ body: data })
    return response
  }

  getUsers = async () => {
    const response = await restApiService.administratorApi.apiV1AdminsUsersGet()
    return response
  }

  updateUser = async (id, data) => {
    const response = await restApiService.administratorApi.apiV1AdminsUsersGuidPatch(id, {
      body: data,
    })
    return response
  }

  createProxy = async data => {
    const response = await restApiService.administratorApi.apiV1AdminsProxyPost({ body: data })
    return response
  }

  removeUser = async id => {
    const response = await restApiService.administratorApi.apiV1AdminsUsersGuidDelete(id)
    return response
  }

  getBatches = async () => {
    const response = await restApiService.administratorApi.apiV1AdminsBatchesGet()
    return response
  }

  getProductsByStatus = async data => {
    const response = await restApiService.administratorApi.apiV1AdminsGetProductsByStatusGet(data)
    return response
  }

  getProductsPaid = async () => {
    const response = await restApiService.administratorApi.apiV1AdminsGetPaidProductsGet()
    return response
  }

  getOrdersByStatus = async status => {
    const response = await restApiService.administratorApi.apiV1AdminsOrdersGet({ status })
    return response
  }

  getBalance = async () => {
    const response = await restApiService.administratorApi.apiV1AdminsPaymentsMyBalanceGet()
    return response
  }

  getUsersById = async id => {
    const response = await restApiService.administratorApi.apiV1AdminsUsersGuidGet(id)
    return response
  }

  getPaymentsById = async id => {
    const response = await restApiService.administratorApi.apiV1AdminsUserPaymentsGetById(id)
    return response
  }

  getAllPayments = async () => {
    const response = await restApiService.administratorApi.apiV1AdminsPaymentsGet()
    return response
  }

  getTasks = async () => {
    const response = await restApiService.administratorApi.apiV1AdminsTasksGet()
    return response
  }

  getLightTasks = async () => {
    const response = await restApiService.administratorApi.apiV1AdminsTasksLightGet()
    return response
  }

  getSettings = async () => {
    const response = await restApiService.administratorApi.apiV1AdminsGetSettingsGet()
    return response
  }

  getProxy = async () => {
    const response = await restApiService.administratorApi.apiV1AdminsProxyGet()
    return response
  }

  getFeedback = async () => {
    const response = await restApiService.administratorApi.apiV1AdminsFeedbackGet()
    return response
  }

  setSettings = async data => {
    const response = await restApiService.administratorApi.apiV1AdminsSetSettingPatch({
      body: data,
    })
    return response
  }

  createDestination = async data => {
    const response = await restApiService.administratorApi.apiV1AdminsDestinationPost({ body: data })
    return response
  }

  editDestination = async (id, data) => {
    const response = await restApiService.administratorApi.apiV1AdminsDestinationEditGuidPatch(id, { body: data })
    return response
  }

  removeDestination = async id => {
    const response = await restApiService.administratorApi.apiV1AdminsDestinationGuidDelete(id)
    return response
  }

  toggleServer = async () => {
    const response = await restApiService.administratorApi.apiV1AdminsToggleServerPatch()
    return response
  }
}

export const AdministratorModel = new AdministratorModelStatic()
