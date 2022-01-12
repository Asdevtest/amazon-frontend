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
}

export const SellerBoardModel = new SellerBoardModelStatic()
