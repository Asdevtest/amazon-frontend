import {transformAndValidate} from 'class-transformer-validator'

import {restApiService} from '@services/rest-api-service/rest-api-service'

import {ResearcherCreateProductContract, ResearcherUpdateProductContract} from './researcher-model.contracts'

class ResearcherModelStatic {
  createProduct = async data => {
    const validationErrors = await transformAndValidate(ResearcherCreateProductContract, data)
    if (validationErrors.length) {
      throw validationErrors
    }
    const response = await restApiService.researcherApi.apiV1ResearchersProductsPost(data)
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

  updateProduct = async (id, data) => {
    await transformAndValidate(ResearcherUpdateProductContract, data)
    const response = await restApiService.researcherApi.apiV1ResearchersProductsGuidPatch(id, {InlineObject21: data})
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

  parseParseSellerCentral = async id => {
    const response = await restApiService.researcherApi.apiV1ResearchersParseSellercentralGet({
      id,
    })
    return response
  }

  getPaymentsMy = async () => {
    const response = await restApiService.researcherApi.apiV1ResearchersPaymentsMyGet()
    return response
  }
}

export const ResearcherModel = new ResearcherModelStatic()
