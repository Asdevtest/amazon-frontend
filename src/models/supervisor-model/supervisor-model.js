import {restApiService} from '@services/rest-api-service/rest-api-service'

class SupervisorModelStatic {
  getProducsVacant = async () => {
    const response = await restApiService.supervisorApi.apiV1SupervisorsProductsVacGet()
    return response
  }

  getProducsMy = async () => {
    const response = await restApiService.supervisorApi.apiV1SupervisorsProductsMyGet()
    return response
  }

  updateProductStatus = async (id, data) => {
    const response = await restApiService.supervisorApi.apiV1SupervisorsProductsGuidPatch(id, data)
    return response
  }

  getPaymentsMy = async () => {
    const response = await restApiService.supervisorApi.apiV1SupervisorsPaymentsMyGet()
    return response
  }

  getPaymentsCreatedByMe = async () => {
    const response = await restApiService.supervisorApi.apiV1SupervisorsPaymentsCreatedByThisSuperGet()
    return response
  }

  pickupProduct = async id => {
    const response = await restApiService.supervisorApi.apiV1SupervisorsProductsPickupGuidPost(id)
    return response
  }
}

export const SupervisorModel = new SupervisorModelStatic()
