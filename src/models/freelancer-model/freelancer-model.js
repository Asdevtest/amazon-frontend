import {restApiService} from '@services/rest-api-service/rest-api-service'

class FreelancerModelStatic {
  getPaymentsMy = async () => {
    const response = await restApiService.otherApi.apiV1OtherPaymentsMyGet()
    return response
  }
}

export const FreelancerModel = new FreelancerModelStatic()
