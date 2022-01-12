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
      body: data,
    })
    return response
  }

  getProductsMy = async () => {
    const response = await restApiService.clientApi.apiV1ClientsProductsMyGet()
    return response
  }

  makePayments = async productIds => {
    const response = await restApiService.clientApi.apiV1ClientsMakePaymentsPost({
      body: {guids: productIds},
    })
    return response
  }

  getProductsPaid = async () => {
    const response = await restApiService.clientApi.apiV1ClientsProductsPaidGet()
    return response
  }

  createOrder = async data => {
    const response = await restApiService.clientApi.apiV1ClientsOrdersPost({body: data})
    return response
  }

  getOrders = async () => {
    const response = await restApiService.clientApi.apiV1ClientsOrdersGet()
    return response
  }

  updateOrder = async (id, data) => {
    const response = await restApiService.clientApi.apiV1ClientsOrdersGuidPatch(id, {
      body: data,
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
    const response = await restApiService.clientApi.apiV1ClientsTasksPost({body: data})
    return response
  }

  getTasks = async () => {
    const response = await restApiService.clientApi.apiV1ClientsTasksGet({
      offset: 0,
      limit: 100000,
      sortBy: 'createdAt',
      order: 'ASC',
    })
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

  getMyPayments = async () => {
    const response = await restApiService.otherApi.apiV1OtherPaymentsMyGet()
    return response
  }

  cancelTask = async id => {
    const response = await restApiService.clientApi.apiV1ClientsTasksCancelGuidPost(id)
    return response
  }

  orderConfirmPriceChange = async orderId => {
    const response = await restApiService.clientApi.apiV1ClientsOrdersGuidConfirmPriceChangePost(orderId, {body: {}})
    return response
  }

  orderRejectriceChange = async orderId => {
    const response = await restApiService.clientApi.apiV1ClientsOrdersGuidRejectPriceChangePost(orderId, {body: {}})
    return response
  }
}

export const ClientModel = new ClientModelStatic()
