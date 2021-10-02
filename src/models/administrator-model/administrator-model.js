import {restApiService} from '@services/rest-api-service/rest-api-service'

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
    const response = await restApiService.administratorApi.apiV1AdminsPatchProductsGuidPatch(id, data)
    return response
  }

  makePayment = async data => {
    const response = await restApiService.administratorApi.apiV1AdminsMakePaymentPost(data)
    return response
  }

  getUsers = async () => {
    const response = await restApiService.administratorApi.apiV1AdminsUsersGet()
    return response
  }

  updateUser = async (id, data) => {
    const response = await restApiService.administratorApi.apiV1AdminsUsersGuidPatch(id, {
      InlineObject4: data,
    })
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
    const response = await restApiService.administratorApi.apiV1AdminsOrdersGet({status})
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
}

export const AdministratorModel = new AdministratorModelStatic()
