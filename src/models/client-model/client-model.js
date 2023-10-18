// import axios from 'axios'
// import {BACKEND_API_URL} from '@constants/env'
import { restApiService } from '@services/rest-api-service/rest-api-service'

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

  getProductsMy = async filters => {
    const response = await restApiService.clientApi.apiV1ClientsProductsMyGet({ filters })
    return response
  }

  getProductsMyFilteredByShopId = async shopId => {
    const response = await restApiService.clientApi.apiV1ClientsProductsMyGet(shopId)
    return response
  }

  getProductsMyFilteredByShopIdWithPag = async data => {
    const response = await restApiService.clientApi.apiV1ClientsProductsMyWithPagGet(data)

    return response.data
  }

  makePayments = async productIds => {
    const response = await restApiService.clientApi.apiV1ClientsMakePaymentsPost({
      body: { guids: productIds },
    })
    return response
  }

  getProductsPaid = async () => {
    const response = await restApiService.clientApi.apiV1ClientsProductsPaidGet()
    return response
  }

  createOrder = async data => {
    const response = await restApiService.clientApi.apiV1ClientsOrdersPost({ body: data })
    return response
  }

  createFormedOrder = async data => {
    const response = await restApiService.clientApi.apiV1ClientsOrdersFormedPost({ body: data })
    return response
  }

  getOrders = async status => {
    const response = await restApiService.clientApi.apiV1ClientsOrdersGet({ status })
    return response
  }

  getOrdersPag = async data => {
    const response = await restApiService.clientApi.apiV1ClientsPagOrdersGet(data)
    return response
  }

  updateOrder = async (id, data) => {
    const response = await restApiService.clientApi.apiV1ClientsOrdersGuidPatch(id, {
      body: data,
    })
    return response
  }

  getOrderById = async id => {
    const response = await restApiService.clientApi.apiV1ClientsOrdersGuidGet(id)
    return response
  }

  removeOrder = async id => {
    const response = await restApiService.clientApi.apiV1ClientsOrdersGuidDelete(id)
    return response
  }

  createTask = async data => {
    const response = await restApiService.clientApi.apiV1ClientsTasksPost({ body: data })
    return response
  }

  getTasks = async data => {
    const response = await restApiService.clientApi.apiV1ClientsTasksByBoxesGet(data)
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

  cancelTask = async (id, data) => {
    const response = await restApiService.clientApi.apiV1ClientsTasksCancelGuidPost(id, { body: data })
    return response
  }

  orderConfirmPriceChange = async orderId => {
    const response = await restApiService.clientApi.apiV1ClientsOrdersGuidConfirmPriceChangePost(orderId, { body: {} })
    return response
  }

  updateTariffIfTariffWasDeleted = async data => {
    const response = await restApiService.clientApi.apiV1ClientsBoxesUpdateTariffIfTariffWasDeletedPost({ body: data })
    return response
  }

  boxConfirmPriceChange = async boxId => {
    const response = await restApiService.clientApi.apiV1ClientsBoxesConfirmDeliveryPriceChangePost({
      body: [{ boxId }],
    })
    return response
  }

  cancelOrder = async orderId => {
    const response = await restApiService.clientApi.apiV1ClientsOrdersGuidCancelPost(orderId, { body: {} })
    return response
  }

  returnBoxFromBatch = async boxIds => {
    const response = await restApiService.clientApi.apiV1ClientsBoxesReturnBoxesToStockPost({ body: boxIds })
    return response
  }

  getOrdersByProductId = async id => {
    const response = await restApiService.clientApi.apiV1ClientsGetOrdersByProductIdGuidGet(id)
    return response
  }

  createProduct = async data => {
    const response = await restApiService.clientApi.apiV1ClientsProductsPost({ body: data })
    return response
  }

  calculatePriceToSeekSupplier = async id => {
    const response = await restApiService.clientApi.apiV1ClientsProductsGuidGetPriceForClientGet(id)
    return response
  }

  calculatePriceToSeekSomeSuppliers = async ids => {
    const response = await restApiService.clientApi.apiV1ClientsProductsGetPriceForClientPost({
      body: {
        productIds: ids,
      },
    })
    return response
  }

  sendProductToSeekSomeSuppliers = async ids => {
    const response = await restApiService.clientApi.apiV1ClientsProductsFromClientReadyToBeCheckedBySupervisorPatch({
      body: {
        productIds: ids,
      },
    })
    return response
  }

  sendProductToSeekSupplier = async (id, data) => {
    const response = await restApiService.clientApi.apiV1ClientsProductsGuidFromClientReadyToBeCheckedBySupervisorPatch(
      id,
      {
        body: data,
      },
    )
    return response
  }

  updateProductBarCode = async (id, data) => {
    const response = await restApiService.clientApi.apiV1ClientsProductsGuidChangeBarCodePatch(id, {
      body: data,
    })
    return response
  }

  updateProductFourMonthesStock = async (id, data) => {
    const response = await restApiService.clientApi.apiV1ClientsProductsGuidFourMonthesStockPatch(id, {
      body: data,
    })
    return response
  }

  getDestinations = async () => {
    const response = await restApiService.clientApi.apiV1ClientsDestinationGet()
    return response
  }

  getClientDestinations = async filtersData => {
    const response = await restApiService.clientApi.apiV1ClientsDestinationsGet(filtersData)
    return response
  }

  editShippingLabelFirstTime = async (id, data) => {
    const response = await restApiService.clientApi.apiV1ClientsBoxesGuidEditShippingLabelFirstTimePatch(id, {
      body: data,
    })
    return response
  }

  getDashboardElementCount = async () => {
    const response = await restApiService.clientApi.apiV1DashboardClientCountsGet()
    return response
  }

  getDashboardBuyerElementCount = async () => {
    const response = await restApiService.clientApi.apiV1DashboardBuyerCountsGet()
    return response
  }
  getDashboardStorekeeperElementCount = async () => {
    const response = await restApiService.clientApi.apiV1DashboardStorekeeperCountsGet()
    return response
  }

  editProductsStockUS = async (id, data) => {
    const response = await restApiService.clientApi.apiV1ClientsProductsGuidStockUSAPatch(id, { body: data })
    return response
  }

  getProductPermissionsData = async data => {
    const response = await restApiService.clientApi.apiV1ClientsProductsLightGet(data)
    return response
  }

  updateBoxComment = async (id, data) => {
    const response = await restApiService.clientApi.apiV1ClientsBoxesCommentGuidPatch(id, {
      body: data,
    })
    return response
  }

  updateOrderStatusToReadyToProcess = async id => {
    const response = await restApiService.clientApi.apiV1ClientsOrdersToReadyToProcessGuidPatch(id)
    return response
  }

  updateShops = async data => {
    const response = await restApiService.clientApi.apiV1ClientsUpdateStoreDataPatch({ body: data })
    return response
  }
}

export const ClientModel = new ClientModelStatic()
