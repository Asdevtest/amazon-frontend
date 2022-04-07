import {restApiService} from '@services/rest-api-service/rest-api-service'

class BuyerModelStatic {
  getProductsVacant = async isCreatedByClient => {
    const response = await restApiService.buyerApi.apiV1BuyersProductsVacGet({isCreatedByClient})
    return response
  }

  getProductsMy = async () => {
    const response = await restApiService.buyerApi.apiV1BuyersProductsMyGet()
    return response
  }

  updateProduct = async (id, data) => {
    const response = await restApiService.buyerApi.apiV1BuyersProductsGuidPatch(id, {
      body: data,
    })
    return response
  }

  pickupProduct = async id => {
    const response = await restApiService.buyerApi.apiV1BuyersProductsPickupGuidPost(id)
    return response
  }

  getBalance = async () => {
    const response = await restApiService.buyerApi.apiV1BuyersPaymentsMyBalanceGet()
    return response
  }

  getOrdersVacant = async () => {
    const createdWithOutBuyersProducts = true // Добавить ордеры с продуктами в которых не участвовали байеры

    const response = await restApiService.buyerApi.apiV1BuyersOrdersVacGet(createdWithOutBuyersProducts)
    return response
  }

  getOrder = async id => {
    const response = await restApiService.buyerApi.apiV1BuyersOrdersGuidGet(id)
    return response
  }

  updateOrder = async (id, data) => {
    const response = await restApiService.buyerApi.apiV1BuyersOrdersGuidPatch(id, {
      body: data,
    })
    return response
  }

  pickupOrder = async id => {
    const response = await restApiService.buyerApi.apiV1BuyersOrdersPickupGuidPost(id)
    return response
  }

  getOrdersMy = async () => {
    const response = await restApiService.buyerApi.apiV1BuyersOrdersMyGet()
    return response
  }

  getPaymentsMy = async () => {
    const response = await restApiService.otherApi.apiV1OtherPaymentsMyGet()
    return response
  }

  getBatches = async () => {
    const response = await restApiService.buyerApi.apiV1BuyersBatchesGet()

    return response
  }

  postTask = async data => {
    const response = await restApiService.buyerApi.apiV1BuyersTasksPost({body: data})
    return response
  }

  getTasksMy = async () => {
    const response = await restApiService.buyerApi.apiV1BuyersTasksGet()

    return response
  }

  editOrder = async (id, data) => {
    const response = await restApiService.buyerApi.apiV1BuyersOrdersGuidEditPatch(id, {
      body: data,
    })
    return response
  }

  setOrderTotalPriceChanged = async (id, data) => {
    const response = await restApiService.buyerApi.apiV1BuyersOrdersGuidSetTotalPriceChangedPatch(id, {
      body: data,
    })
    return response
  }

  orderPayToSupplier = async id => {
    const response = await restApiService.buyerApi.apiV1BuyersOrdersGuidPayToSupplierPatch(id)
    return response
  }

  orderTrackNumberIssued = async id => {
    const response = await restApiService.buyerApi.apiV1BuyersOrdersGuidTrackNumberIssuedPatch(id)
    return response
  }

  returnOrder = async (id, data) => {
    const response = await restApiService.buyerApi.apiV1BuyersOrdersGuidReturnOrderPatch(id, {
      body: data,
    })
    return response
  }
}

export const BuyerModel = new BuyerModelStatic()
