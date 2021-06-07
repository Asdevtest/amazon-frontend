import {restApiService} from '@services/rest-api-service/rest-api-service'

class BuyerModelStatic {
  getProductsVacant = async () => {
    const response = await restApiService.buyerApi.apiV1BuyersProductsVacGet()
    return response
  }

  getProductsMy = async () => {
    const response = await restApiService.buyerApi.apiV1BuyersProductsMyGet()
    return response
  }

  updateProduct = async (id, data) => {
    const response = await restApiService.buyerApi.apiV1BuyersProductsGuidPatch(id, data)
    return response
  }

  pickupProduct = async id => {
    const response = await restApiService.buyerApi.apiV1BuyersProductsPickupGuidPost(id)
    return response
  }

  getOrdersVacant = async () => {
    const response = await restApiService.buyerApi.apiV1BuyersOrdersVacGet()
    return response
  }

  getOrder = async id => {
    const response = await restApiService.buyerApi.apiV1BuyersOrdersGuidGet(id)
    return response
  }

  updateOrder = async (id, data) => {
    const response = await restApiService.buyerApi.apiV1BuyersOrdersGuidPatch(id, {InlineObject3: data})
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

  createBox = async data => {
    const response = await restApiService.buyerApi.apiV1BuyersBoxesPost(data)
    return response
  }

  getBoxesMy = async () => {
    const response = await restApiService.buyerApi.apiV1BuyersBoxesMyGet()
    return response
  }

  updateBox = async (id, data) => {
    const response = await restApiService.buyerApi.apiV1BuyersBoxesGuidPatch(id, {InlineObject5: data})
    return response
  }

  sendBoxToStoreKeeper = async boxId => {
    const response = await restApiService.buyerApi.apiV1BuyersBoxesSendToStorekeeperGuidPost(boxId)
    return response
  }

  getPaymentsMy = async () => {
    const response = await restApiService.buyerApi.apiV1BuyersPaymentsMyGet()
    return response
  }
}

export const BuyerModel = new BuyerModelStatic()
