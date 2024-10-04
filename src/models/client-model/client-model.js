import { restApiService } from '@services/rest-api-service/rest-api-service'

class ClientModelStatic {
  getProductsVacant = async () => {
    const response = await restApiService.clientApi.apiV1ClientsProductsVacGet()
    return response.data
  }

  updateProduct = async (guid, data) => {
    const response = await restApiService.clientApi.apiV1ClientsProductsGuidPatch({
      guid,
      body: data,
    })
    return response.data
  }

  getProductsMy = async filters => {
    const response = await restApiService.clientApi.apiV1ClientsProductsMyGet({ filters })
    return response.data
  }

  getProductsMyFilteredByShopId = async guid => {
    const response = await restApiService.clientApi.apiV1ClientsProductsMyGet({ guid })
    return response.data
  }

  getProductsMyFilteredByShopIdWithPag = async data => {
    const response = await restApiService.clientApi.apiV1ClientsProductsMyWithPagV2Get(data)
    return response.data
  }

  makePayments = async productIds => {
    const response = await restApiService.clientApi.apiV1ClientsMakePaymentsPost({
      body: { guids: productIds },
    })
    return response.data
  }

  createOrder = async data => {
    const response = await restApiService.clientApi.apiV1ClientsOrdersPost({ body: data })
    return response.data
  }

  createFormedOrder = async data => {
    const response = await restApiService.clientApi.apiV1ClientsOrdersFormedPost({ body: data })
    return response.data
  }

  getOrders = async options => {
    const response = await restApiService.clientApi.apiV1ClientsOrdersGet(options)
    return response.data
  }

  getOrdersPag = async data => {
    const response = await restApiService.clientApi.apiV1ClientsPagOrdersGet(data)
    return response.data
  }

  updateOrder = async (guid, body) => {
    const response = await restApiService.clientApi.apiV1ClientsOrdersGuidPatch({
      guid,
      body,
    })
    return response.data
  }

  getOrderById = async guid => {
    const response = await restApiService.clientApi.apiV1ClientsOrdersGuidGet({ guid })
    return response.data
  }

  createTask = async data => {
    const response = await restApiService.clientApi.apiV1ClientsTasksPost({ body: data })
    return response.data
  }

  getTasks = async data => {
    const response = await restApiService.clientApi.apiV1ClientsTasksByBoxesGet({ ...data, noCache: true })
    return response.data
  }

  getMyPayments = async () => {
    const response = await restApiService.otherApi.apiV1OtherPaymentsMyGet()
    return response.data
  }

  cancelTask = async (guid, body) => {
    const response = await restApiService.clientApi.apiV1ClientsTasksCancelGuidPost({ guid, body })
    return response.data
  }

  orderConfirmPriceChange = async guid => {
    const response = await restApiService.clientApi.apiV1ClientsOrdersGuidConfirmPriceChangePost({ guid })
    return response.data
  }

  updateTariffIfTariffWasDeleted = async body => {
    const response = await restApiService.clientApi.apiV1ClientsBoxesUpdateTariffIfTariffWasDeletedPost({ body })
    return response.data
  }

  boxConfirmPriceChange = async body => {
    const response = await restApiService.clientApi.apiV1ClientsBoxesConfirmDeliveryPriceChangePost({
      body,
    })
    return response.data
  }

  cancelOrder = async guid => {
    const response = await restApiService.clientApi.apiV1ClientsOrdersGuidCancelPost({ guid })
    return response.data
  }

  returnBoxFromBatch = async body => {
    const response = await restApiService.clientApi.apiV1ClientsBoxesReturnBoxesToStockPost({ body })
    return response.data
  }

  getOrdersByProductId = async guid => {
    const response = await restApiService.clientApi.apiV1ClientsGetOrdersByProductIdGuidGet({ guid })
    return response.data
  }

  createProduct = async body => {
    const response = await restApiService.clientApi.apiV1ClientsProductsPost({ body })
    return response.data
  }

  calculatePriceToSeekSupplier = async guid => {
    const response = await restApiService.clientApi.apiV1ClientsProductsGuidGetPriceForClientGet({ guid })
    return response.data
  }

  calculatePriceToSeekSomeSuppliers = async ids => {
    const response = await restApiService.clientApi.apiV1ClientsProductsGetPriceForClientPost({
      body: {
        productIds: ids,
      },
    })
    return response.data
  }

  sendProductToSeekSomeSuppliers = async ids => {
    const response = await restApiService.clientApi.apiV1ClientsProductsFromClientReadyToBeCheckedBySupervisorPatch({
      body: {
        productIds: ids,
      },
    })
    return response.data
  }

  sendProductToSeekSupplier = async (guid, body) => {
    const response = await restApiService.clientApi.apiV1ClientsProductsGuidFromClientReadyToBeCheckedBySupervisorPatch(
      { guid, body },
    )
    return response.data
  }

  updateProductBarCode = async (guid, body) => {
    const response = await restApiService.clientApi.apiV1ClientsProductsGuidChangeBarCodePatch({
      guid,
      body,
    })
    return response.data
  }

  updateProductFourMonthesStock = async (guid, body) => {
    const response = await restApiService.clientApi.apiV1ClientsProductsGuidFourMonthesStockPatch({
      guid,
      body,
    })
    return response.data
  }

  editRecommendationForStockByGuid = async (guid, body) => {
    const response = await restApiService.clientApi.apiV1ClientsBoxesEditRecommendationForStockGuidPatch({
      guid,
      body,
    })
    return response.data
  }

  postAddRecommendationForStock = async (productId, storekeeperId, recommendedValue) => {
    const response = await restApiService.clientApi.apiV1ClientsBoxesAddRecommendationForStockPost({
      body: {
        productId,
        storekeeperId,
        recommendedValue,
      },
    })
    return response.data
  }

  getDestinations = async () => {
    const response = await restApiService.clientApi.apiV1ClientsDestinationGet()
    return response.data
  }

  getClientDestinations = async body => {
    const response = await restApiService.clientApi.apiV1ClientsDestinationsGet(body)
    return response.data
  }

  editShippingLabelFirstTime = async (guid, body) => {
    const response = await restApiService.clientApi.apiV1ClientsBoxesGuidEditShippingLabelFirstTimePatch({
      guid,
      body,
    })
    return response.data
  }

  editProductsStockUS = async (guid, body) => {
    const response = await restApiService.clientApi.apiV1ClientsProductsGuidStockUSAPatch({ guid, body })
    return response.data
  }

  getProductPermissionsData = async data => {
    const response = await restApiService.clientApi.apiV1ClientsProductsLightGet(data)
    return response.data
  }

  updateOrderStatusToReadyToProcess = async guid => {
    const response = await restApiService.clientApi.apiV1ClientsOrdersToReadyToProcessGuidPatch({ guid })
    return response.data
  }

  updateShops = async (body, queue) => {
    const response = await restApiService.clientApi.apiV1ClientsUpdateStoreDataPatch({ body, queue })
    return response.data
  }

  patchProductTransparency = async (guid, body) => {
    const response = await restApiService.clientApi.apiV1ClientsProductsGuidTransparencyPatch({ guid, body })
    return response.data
  }

  getProductsInfoForOrders = async productIds => {
    const response = await restApiService.clientApi.apiV1ClientsProductsInfoForOrdersGet({ productIds })
    return response.data
  }

  getProductById = async guid => {
    const response = await restApiService.clientApi.apiV1ClientsProductsDataGuidGet({ guid })
    return response.data
  }

  getProductMediaById = async guid => {
    const response = await restApiService.clientApi.apiV1ClientsProductsMediaGuidGet({ guid })
    return response.data
  }

  updateSeoFilesInProduct = async (guid, latestSeoFiles) => {
    const response = await restApiService.clientApi.apiV1ClientsProductsGuidUpdateSeoFilesPatch({
      guid,
      body: { latestSeoFiles },
    })
    return response.data
  }

  getListingReports = async body => {
    const response = await restApiService.clientApi.apiV1ClientsProductsListingReportsGet({ ...body, noCache: true })
    return response.data
  }

  getListingReportByProductId = async body => {
    const response = await restApiService.clientApi.apiV1ClientsProductsListingReportsByProductIdGuidGet({
      ...body,
      noCache: true,
    })
    return response.data
  }

  getListingReportById = async guid => {
    const response = await restApiService.clientApi.apiV1ClientsProductsListingReportsGuidGet({
      guid,
      noCache: true,
    })
    return response.data
  }

  createListingReport = async body => {
    const response = await restApiService.clientApi.apiV1ClientsProductsListingReportsPost({ body })
    return response.data
  }

  updateListingReport = async (guid, body) => {
    const response = await restApiService.clientApi.apiV1ClientsProductsListingReportsGuidPatch({ guid, body })
    return response.data
  }

  removeListingReport = async guid => {
    const response = await restApiService.clientApi.apiV1ClientsProductsListingReportsGuidDelete({ guid })
    return response.data
  }

  getShopsExport = async body => {
    const response = await restApiService.clientApi.apiV1ClientsShopsExportGet(body, {
      responseType: 'blob',
    })
    return response.data
  }
}

export const ClientModel = new ClientModelStatic()
