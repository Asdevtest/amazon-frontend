import {restApiService} from '@services/rest-api-service/rest-api-service'

class SellerBoardModelStatic {
  getMyDailyReports = async () => {
    const response = await restApiService.sellerBoardApi.apiV1TestsGetMyDailyReportsGet()
    return response
  }

  getMyDailyReportsLast30Days = async () => {
    const response = await restApiService.sellerBoardApi.apiV1TestsGetMyReportsLast30DaysGet()
    return response
  }
}

export const SellerBoardModel = new SellerBoardModelStatic()
