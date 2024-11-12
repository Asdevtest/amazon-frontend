import { restApiService } from '@services/rest-api-service/rest-api-service'

class SellerBoardModelStatic {
  getMyDailyReportsLast30Days = async options => {
    const response =
      await restApiService.integrationsApi.apiV1IntegrationsSellerboardDashboardProductsDaysReportsLast30DaysGet(
        options,
      )
    return response.data
  }

  getStockGoods = async options => {
    const response = await restApiService.integrationsApi.apiV1IntegrationsSellerboardWarehouseStocksGet(options)
    return response.data
  }

  getStockGoodsByFilters = async filters => {
    const response = await restApiService.integrationsApi.apiV1IntegrationsWarehouseReportGet(filters)
    return response.data
  }

  bindStockProductsBySku = async body => {
    const response = await restApiService.integrationsApi.apiV1IntegrationsSellerboardWarehouseProductsLinkSkuPatch({
      body,
    })
    return response.data
  }

  getProductsWithSkuById = async guid => {
    const response = await restApiService.integrationsApi.apiV1IntegrationsGetSkusByProductIdGuidGet({
      guid,
      noCache: true,
    })
    return response?.data
  }

  createAndLinkSkuProducts = async body => {
    const response = await restApiService.integrationsApi.apiV1IntegrationsCreateAndLinkSkuProductsPost({
      body,
    })
    return response.data
  }

  refreshProducts = async body => {
    const response = await restApiService.integrationsApi.apiV1IntegrationsRefreshProductsPatch({
      body,
    })
    return response.data
  }

  unlinkSkuProduct = async body => {
    const response = await restApiService.integrationsApi.apiV1IntegrationsSellerboardWarehouseProductsUnLinkSkuPatch({
      body,
    })
    return response.data
  }

  deleteStockGoodsById = async guid => {
    const response = await restApiService.integrationsApi.apiV1IntegrationsSellerboardWarehouseStocksGuidDelete({
      guid,
    })
    return response.data
  }

  deleteMyDailyReportsLast30DaysById = async guid => {
    const response =
      await restApiService.integrationsApi.apiV1IntegrationsSellerboardDashboardProductsDaysReportsLast30DaysGuidDelete(
        { guid },
      )
    return response.data
  }

  getIntegrationsReportInventory = async options => {
    const response = await restApiService.integrationsApi.apiV1IntegrationsReportInventoryGet(options)
    return response.data
  }

  getIntegrationsReportPpcSalesWeeks = async options => {
    const response = await restApiService.integrationsApi.apiV1IntegrationsReportPpcSalesWeeksGet(options)
    return response.data
  }

  getIntegrationsReportInventoryShipments = async options => {
    const response = await restApiService.integrationsApi.apiV1IntegrationsReportInventoryShipmentsGet(options)
    return response.data
  }

  getIntegrationsReportReturns = async options => {
    const response = await restApiService.integrationsApi.apiV1IntegrationsReportReturnsGet(options)
    return response.data
  }

  getReportPpcSalesDays = async options => {
    const response = await restApiService.integrationsApi.apiV1IntegrationsReportPpcSalesDaysGet(options)
    return response.data
  }

  patchReportInventoryProductsLinkSku = async body => {
    const response = await restApiService.integrationsApi.apiV1IntegrationsReportInventoryProductsLinkSkuPatch({ body })
    return response.data
  }

  deleteIntegrationsReport = async (table, reportIds) => {
    const response = await restApiService.integrationsApi.apiV1IntegrationsRowsFromReportDelete({
      table,
      body: { reportIds },
    })
    return response.data
  }

  getIntegrationsReports = async options => {
    const response = await restApiService.integrationsApi.apiV1IntegrationsReportsGet(options)
    return response.data
  }
}

export const SellerBoardModel = new SellerBoardModelStatic()
