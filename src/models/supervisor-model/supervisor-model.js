import { restApiService } from '@services/rest-api-service/rest-api-service'

class SupervisorModelStatic {
  getProductsVacant = async isCreatedByClient => {
    const response = await restApiService.supervisorApi.apiV1SupervisorsProductsVacGet({ isCreatedByClient })
    return response
  }

  getProductsMy = async () => {
    const response = await restApiService.supervisorApi.apiV1SupervisorsProductsMyGet()
    return response
  }

  getProductsMyPag = async options => {
    const response = await restApiService.supervisorApi.apiV1SupervisorsProductsPagMyGet(options)
    return response
  }

  getProductsMyLight = async () => {
    const response = await restApiService.supervisorApi.apiV1SupervisorsProductsLightGet()
    return response
  }

  updateProduct = async (id, data) => {
    const response = await restApiService.supervisorApi.apiV1SupervisorsProductsGuidPatch(id, { body: data })
    return response
  }

  getBalance = async () => {
    const response = await restApiService.supervisorApi.apiV1SupervisorsPaymentsMyBalanceGet()
    return response
  }

  getPaymentsMy = async () => {
    const response = await restApiService.otherApi.apiV1OtherPaymentsMyGet()
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

  updateProductListing = async (id, data) => {
    const response = await restApiService.supervisorApi.apiV1SupervisorsProductsListingGuidPatch(id, {
      body: data,
    })

    return response
  }
}

export const SupervisorModel = new SupervisorModelStatic()
