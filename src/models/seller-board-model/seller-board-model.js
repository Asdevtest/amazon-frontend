import {restApiService} from '@services/rest-api-service/rest-api-service'

class SellerBoardModelStatic {
  getMyDailyReports = async () => {
    const response = await restApiService.integrationsApi.apiV1IntegrationsSellerboardWarehouseReportsDailyGet()
    return response
  }

  getMyDailyReportsLast30Days = async shopId => {
    const response =
      await restApiService.integrationsApi.apiV1IntegrationsSellerboardDashboardProductsDaysReportsLast30DaysGet(shopId)
    return response
  }

  getStockGoods = async shopId => {
    const response = await restApiService.integrationsApi.apiV1IntegrationsSellerboardWarehouseStocksGet(shopId)
    return response
  }

  getStockGoodsByFilters = async filters => {
    const response = await restApiService.integrationsApi.apiV1IntegrationsWarehouseReportGet({filters})
    return response
  }

  bindStockProductsBySku = async data => {
    const response = await restApiService.integrationsApi.apiV1IntegrationsSellerboardWarehouseProductsLinkSkuPatch({
      body: data,
    })
    return response
  }

  getProductsWithSkuById = async id => {
    const response = await restApiService.integrationsApi.apiV1IntegrationsGetSkusByProductIdGuidGet(id)
    return response
  }

  createAndLinkSkuProducts = async data => {
    const response = await restApiService.integrationsApi.apiV1IntegrationsCreateAndLinkSkuProductsPost({
      body: data,
    })
    return response
  }
}

export const SellerBoardModel = new SellerBoardModelStatic()
