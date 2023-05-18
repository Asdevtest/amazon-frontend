import { restApiService } from '@services/rest-api-service/rest-api-service'

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
  getSupervisorDashboadItems = async () => {
    const response = await restApiService.dashboardApi.apiV1DashboardSupervisorCountsGet()
    return response
  }
  getResearcherDashboadItems = async () => {
    const response = await restApiService.dashboardApi.apiV1DashboardResearcherCountsGet()
    return response
  }
  getFreelancerDashboadItems = async () => {
    const response = await restApiService.dashboardApi.apiV1DashboardFreelancerCountsGet()
    return response
  }
}

export const DashboardModel = new DasboardModelStatic()
