import {restApiService} from '@services/rest-api-service/rest-api-service'

class FreelancerModelStatic {
  getPaymentsMy = async () => {
    const response = await restApiService.freelancerApi.apiV1FreelancerPaymentsGet()
    return response
  }
}

export const FreelancerModel = new FreelancerModelStatic()
