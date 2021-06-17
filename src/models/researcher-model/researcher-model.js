import {restApiService} from '@services/rest-api-service/rest-api-service'

class ResearcherModelStatic {
  createProduct = async data => {
    const response = await restApiService.researcherApi.apiV1ResearchersProductsPost(data)
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

  updateProduct = async (id, data) => {
    const response = await restApiService.researcherApi.apiV1ResearchersProductsGuidPatch(id, {InlineObject14: data})
    return response
  }

  removeProduct = async id => {
    const response = await restApiService.researcherApi.apiV1ResearchersProductsGuidDelete(id)
    return response
  }

  checkProductExists = async id => {
    const response = await restApiService.researcherApi.apiV1ResearchersCheckProductsIdGet(id)
    return response
  }

  parseAmazon = async id => {
    const response = await restApiService.researcherApi.apiV1ResearchersParseAmazonIdGet(id)
    return response
  }

  parseParseSellerCentral = async () => {
    const response = await restApiService.researcherApi.apiV1ResearchersParseSellercentralGet()
    return response
  }

  getPaymentsMy = async () => {
    const response = await restApiService.researcherApi.apiV1ResearchersPaymentsMyGet()
    return response
  }
}

export const ResearcherModel = new ResearcherModelStatic()
