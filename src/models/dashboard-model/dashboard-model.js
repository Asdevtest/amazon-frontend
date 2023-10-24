import { restApiService } from '@services/rest-api-service/rest-api-service'

class DasboardModelStatic {
  getClientDashboadItems = async () => {
    const response = await restApiService.dashboardApi.apiV1DashboardClientCountsGet()
    return response.data
  }
  getBuyerDashboadItems = async () => {
    const response = await restApiService.dashboardApi.apiV1DashboardBuyerCountsGet()
    return response.data
  }
  getStorekeeperDashboadItems = async () => {
    const response = await restApiService.dashboardApi.apiV1DashboardStorekeeperCountsGet()
    return response.data
  }
  getSupervisorDashboadItems = async () => {
    const response = await restApiService.dashboardApi.apiV1DashboardSupervisorCountsGet()
    return response.data
  }
  getResearcherDashboadItems = async () => {
    const response = await restApiService.dashboardApi.apiV1DashboardResearcherCountsGet()
    return response.data
  }
  getFreelancerDashboadItems = async () => {
    const response = await restApiService.dashboardApi.apiV1DashboardFreelancerCountsGet()
    return response.data
  }
}

export const DashboardModel = new DasboardModelStatic()
