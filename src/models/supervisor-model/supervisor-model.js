import { restApiService } from '@services/rest-api-service/rest-api-service'

import { filterNullValues } from '@utils/object'

class SupervisorModelStatic {
  getProductsVacant = async isCreatedByClient => {
    const response = await restApiService.supervisorApi.apiV1SupervisorsProductsVacGet({ isCreatedByClient })
    return response.data
  }

  getProductsMyPag = async options => {
    const response = await restApiService.supervisorApi.apiV1SupervisorsProductsPagMyGet(filterNullValues(options))
    return response.data
  }

  getProductsMyLight = async () => {
    const response = await restApiService.supervisorApi.apiV1SupervisorsProductsLightGet()
    return response.data
  }

  updateProduct = async (guid, body) => {
    const response = await restApiService.supervisorApi.apiV1SupervisorsProductsGuidPatch({ guid, body })
    return response.data
  }

  getPaymentsMy = async () => {
    const response = await restApiService.otherApi.apiV1OtherPaymentsMyGet()
    return response.data
  }

  pickupProduct = async guid => {
    const response = await restApiService.supervisorApi.apiV1SupervisorsProductsPickupGuidPost({ guid })
    return response.data
  }

  updateProductListing = async (guid, body) => {
    const response = await restApiService.supervisorApi.apiV1SupervisorsProductsListingGuidPatch({ guid, body })
    return response.data
  }
}

export const SupervisorModel = new SupervisorModelStatic()
