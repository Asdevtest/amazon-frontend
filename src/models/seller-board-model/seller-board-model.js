import {restApiService} from '@services/rest-api-service/rest-api-service'

class SellerBoardModelStatic {
  getMyDailyReports = async () => {
    const response = await restApiService.integrationsApi.apiV1IntegrationsSellerboardWarehouseReportsDailyGet()
    return response
  }

  getMyDailyReportsLast30Days = async () => {
    const response =
      await restApiService.integrationsApi.apiV1IntegrationsSellerboardDashboardProductsDaysReportsLast30DaysGet()
    return response
  }

  getStockGoodsByFilters = async filters => {
    const response = await restApiService.integrationsApi.apiV1IntegrationsSellerboardWarehouseProductsGet({filters})
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
}

export const SellerBoardModel = new SellerBoardModelStatic()
