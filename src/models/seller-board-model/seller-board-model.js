import { restApiService } from '@services/rest-api-service/rest-api-service'

class SellerBoardModelStatic {
  getMyDailyReportsLast30Days = async shopId => {
    const response =
      await restApiService.integrationsApi.apiV1IntegrationsSellerboardDashboardProductsDaysReportsLast30DaysGet({
        shopId,
      })
    return response.data
  }

  getStockGoods = async shopId => {
    const response = await restApiService.integrationsApi.apiV1IntegrationsSellerboardWarehouseStocksGet({ shopId })
    return response.data
  }

  getStockGoodsByFilters = async filters => {
    const response = await restApiService.integrationsApi.apiV1IntegrationsWarehouseReportGet({ filters })
    return response.data
  }

  bindStockProductsBySku = async body => {
    const response = await restApiService.integrationsApi.apiV1IntegrationsSellerboardWarehouseProductsLinkSkuPatch({
      body,
    })
    return response.data
  }

  getProductsWithSkuById = async guid => {
    const response = await restApiService.integrationsApi.apiV1IntegrationsGetSkusByProductIdGuidGet({ guid })
    return response.data
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
}

export const SellerBoardModel = new SellerBoardModelStatic()
