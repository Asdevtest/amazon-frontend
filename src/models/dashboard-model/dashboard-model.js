import {restApiService} from '@services/rest-api-service/rest-api-service'

class DasboardModelStatic {
  getClientDashboadItems = async () => {
    const response = await restApiService.dashboardApi.apiV1DashboardClientCountsGet()
    return response
  }
  getBuyerDashboadItems = async () => {
    const response = await restApiService.dashboardApi.apiV1DashboardBuyerCountsGet()
    return response
  }
  getStorekeeperDashboadItems = async () => {
    const response = await restApiService.dashboardApi.apiV1DashboardStorekeeperCountsGet()
    return response
  }
}

export const DashboardModel = new DasboardModelStatic()
