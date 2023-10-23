import { restApiService } from '@services/rest-api-service/rest-api-service'

import { filterNullValues } from '@utils/object'

class BuyerModelStatic {
  getProductsVacant = async isCreatedByClient => {
    const response = await restApiService.buyerApi.apiV1BuyersProductsVacGet({ isCreatedByClient })
    return response.data
  }

  getProductsMy = async () => {
    const response = await restApiService.buyerApi.apiV1BuyersProductsMyGet()
    return response.data
  }

  getProductsMyPag = async data => {
    const response = await restApiService.buyerApi.apiV1BuyersProductsPagMyGet(filterNullValues(data))
    return response.data
  }

  getProductsMyLight = async () => {
    const response = await restApiService.buyerApi.apiV1BuyersProductsLightGet()
    return response.data
  }

  updateProduct = async (guid, data) => {
    const response = await restApiService.buyerApi.apiV1BuyersProductsGuidPatch({
      guid,
      body: data,
    })
    return response.data
  }

  pickupProduct = async guid => {
    const response = await restApiService.buyerApi.apiV1BuyersProductsPickupGuidPost({ guid })
    return response.data
  }

  getOrdersVacant = async () => {
    const response = await restApiService.buyerApi.apiV1BuyersOrdersVacGet()
    return response.data
  }

  getOrder = async guid => {
    const response = await restApiService.buyerApi.apiV1BuyersOrdersGuidGet({ guid })
    return response.data
  }

  pickupOrder = async guid => {
    const response = await restApiService.buyerApi.apiV1BuyersOrdersPickupGuidPost({ guid })
    return response.data
  }

  getOrdersMy = async () => {
    const response = await restApiService.buyerApi.apiV1BuyersOrdersMyGet()
    return response.data
  }

  getOrdersMyPag = async data => {
    const response = await restApiService.buyerApi.apiV1BuyersOrdersPagMyGet(filterNullValues(data))
    return response.data
  }

  getPaymentsMy = async () => {
    const response = await restApiService.otherApi.apiV1OtherPaymentsMyGet()
    return response.data
  }

  postTask = async data => {
    const response = await restApiService.buyerApi.apiV1BuyersTasksPost({ body: data })
    return response.data
  }

  getTasksMy = async () => {
    const response = await restApiService.buyerApi.apiV1BuyersTasksGet()
    return response.data
  }

  editOrder = async (guid, data) => {
    const response = await restApiService.buyerApi.apiV1BuyersOrdersGuidEditPatch({
      guid,
      body: data,
    })
    return response.data
  }

  setOrderTotalPriceChanged = async (guid, data) => {
    const response = await restApiService.buyerApi.apiV1BuyersOrdersGuidSetTotalPriceChangedPatch({
      guid,
      body: data,
    })
    return response.data
  }

  orderPayToSupplier = async guid => {
    const response = await restApiService.buyerApi.apiV1BuyersOrdersGuidPayToSupplierPatch({ guid })
    return response.data
  }

  orderReadyForPayment = async (guid, data) => {
    const response = await restApiService.buyerApi.apiV1BuyersOrdersReadyForPaymentGuidPatch({ guid, body: data })
    return response.data
  }

  orderPartiallyPaid = async guid => {
    const response = await restApiService.buyerApi.apiV1BuyersOrdersPartiallyPaidGuidPatch({ guid })
    return response.data
  }

  orderTrackNumberIssued = async guid => {
    const response = await restApiService.buyerApi.apiV1BuyersOrdersGuidTrackNumberIssuedPatch({ guid })
    return response.data
  }

  orderSetInStock = async (guid, data) => {
    const response = await restApiService.buyerApi.apiV1BuyersOrdersSetInStockGuidPatch({ guid, body: data })
    return response.data
  }

  returnOrder = async (guid, data) => {
    const response = await restApiService.buyerApi.apiV1BuyersOrdersGuidReturnOrderPatch({
      guid,
      body: data,
    })
    return response.data
  }

  getOrderById = async guid => {
    const response = await restApiService.buyerApi.apiV1BuyersOrdersGuidGet({ guid })
    return response.data
  }

  changeOrderItem = async (guid, item) => {
    const response = await restApiService.buyerApi.apiV1BuyersOrdersGuidEditItemItemPatch({ guid, item })
    return response.data
  }

  setOrdersAtProcess = async guid => {
    const response = await restApiService.buyerApi.apiV1BuyersOrdersAtProcessGuidPatch({ guid })
    return response.data
  }

  getBuyersOrdersPaymentByStatus = async status => {
    const response = await restApiService.buyerApi.apiV1BuyersOrdersPaymentAmountGet({ status })
    return response.data
  }

  PatchBuyersOrdersPaymentByGuid = async (guid, data) => {
    const response = await restApiService.buyerApi.apiV1BuyersOrdersPaymentGuidPatch({ guid, body: data })
    return response.data
  }
}

export const BuyerModel = new BuyerModelStatic()
