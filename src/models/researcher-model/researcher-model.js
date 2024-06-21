import { restApiService } from '@services/rest-api-service/rest-api-service'

class ResearcherModelStatic {
  createProduct = async body => {
    const response = await restApiService.researcherApi.apiV1ResearchersProductsPost({ body })
    return response.data
  }

  getProductsVacant = async () => {
    const response = await restApiService.researcherApi.apiV1ResearchersProductsGet()
    return response.data
  }

  getProduct = async guid => {
    const response = await restApiService.researcherApi.apiV1ResearchersProductsGuidGet({ guid })
    return response
  }

  getPaymentsMy = async () => {
    const response = await restApiService.otherApi.apiV1OtherPaymentsMyGet()
    return response.data
  }

  updateProduct = async (guid, body) => {
    const response = await restApiService.researcherApi.apiV1ResearchersProductsGuidPatch({ guid, body })
    return response.data
  }

  removeProduct = async guid => {
    const response = await restApiService.researcherApi.apiV1ResearchersProductsGuidDelete({ guid })
    return response.data
  }

  checkProductExists = async (asin, strategy) => {
    const response = await restApiService.researcherApi.apiV1ResearchersCheckProductsAsinStrategyGet({ asin, strategy })
    return response.data
  }
}

export const ResearcherModel = new ResearcherModelStatic()
