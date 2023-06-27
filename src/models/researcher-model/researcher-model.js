import { restApiService } from '@services/rest-api-service/rest-api-service'

class ResearcherModelStatic {
  createProduct = async data => {
    const response = await restApiService.researcherApi.apiV1ResearchersProductsPost({ body: data })
    return response
  }

  getBalance = async () => {
    const response = await restApiService.researcherApi.apiV1ResearchersPaymentsMyBalanceGet()
    return response
  }

  getProductsVacant = async () => {
    const response = await restApiService.researcherApi.apiV1ResearchersProductsGet()
    return response
  }

  getProduct = async id => {
    const response = await restApiService.researcherApi.apiV1ResearchersProductsGuidGet(id)
    return response
  }

  getPaymentsMy = async () => {
    const response = await restApiService.otherApi.apiV1OtherPaymentsMyGet()
    return response
  }

  updateProduct = async (id, data) => {
    const response = await restApiService.researcherApi.apiV1ResearchersProductsGuidPatch(id, {
      body: data,
    })
    return response
  }

  removeProduct = async id => {
    const response = await restApiService.researcherApi.apiV1ResearchersProductsGuidDelete(id)
    return response
  }

  checkProductExists = async (asin, strategy) => {
    const response = await restApiService.researcherApi.apiV1ResearchersCheckProductsAsinStrategyGet(asin, strategy)
    return response
  }
}

export const ResearcherModel = new ResearcherModelStatic()
