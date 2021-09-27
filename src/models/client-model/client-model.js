import {restApiService} from '@services/rest-api-service/rest-api-service'

class ClientModelStatic {
  getProductsVacant = async () => {
    const response = await restApiService.clientApi.apiV1ClientsProductsVacGet()
    return response
  }

  pickupProduct = async id => {
    const response = await restApiService.clientApi.apiV1ClientsProductsPickupGuidPost(id)
    return response
  }

  updateProduct = async (id, data) => {
    const response = await restApiService.clientApi.apiV1ClientsProductsGuidPatch(id, {
      InlineObject18: data,
    })
    return response
  }

  getProductsMy = async () => {
    const response = await restApiService.clientApi.apiV1ClientsProductsMyGet()
    return response
  }

  makePayments = async productIds => {
    const response = await restApiService.clientApi.apiV1ClientsMakePaymentsPost({
      InlineObject19: {guids: productIds},
    })
    return response
  }

  getProductsPaid = async () => {
    const response = await restApiService.clientApi.apiV1ClientsProductsPaidGet()
    return response
  }

  createOrder = async data => {
    const response = await restApiService.clientApi.apiV1ClientsOrdersPost(data)
    return response
  }

  getOrders = async () => {
    const response = await restApiService.clientApi.apiV1ClientsOrdersGet()
    return response
  }

  updateOrder = async (id, data) => {
    const response = await restApiService.clientApi.apiV1ClientsOrdersGuidPatch(id, {
      InlineObject16: data,
    })
    return response
  }

  getOrder = async id => {
    const response = await restApiService.clientApi.apiV1ClientsOrdersGuidGet(id)
    return response
  }

  removeOrder = async id => {
    const response = await restApiService.clientApi.apiV1ClientsOrdersGuidDelete(id)
    return response
  }

  createTask = async data => {
    const response = await restApiService.clientApi.apiV1ClientsTasksPost(data)
    return response
  }

  getTasks = async () => {
    const response = await restApiService.clientApi.apiV1ClientsTasksGet()
    return response
  }

  getBatches = async () => {
    const response = await restApiService.clientApi.apiV1ClientsBatchesGet()
    return response
  }

  getBalance = async () => {
    const response = await restApiService.clientApi.apiV1ClientsPaymentsMyBalanceGet()
    return response
  }

  cancelTask = async id => {
    const response = await restApiService.clientApi.apiV1ClientsTasksGuidCancel(id)
    return response
  }
}

export const ClientModel = new ClientModelStatic()
