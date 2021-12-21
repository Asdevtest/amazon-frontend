import {transformAndValidate} from 'class-transformer-validator'

import {restApiService} from '@services/rest-api-service/rest-api-service'

import {ResearcherCreateProductContract} from './researcher-model.contracts'

class ResearcherModelStatic {
  createProduct = async data => {
    const validationErrors = await transformAndValidate(ResearcherCreateProductContract, data)
    if (validationErrors.length) {
      throw validationErrors
    }
    const response = await restApiService.researcherApi.apiV1ResearchersProductsPost({body: data})
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
    const response = await restApiService.researcherApi.apiV1ResearcherPaymentsGet()
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
}

export const ResearcherModel = new ResearcherModelStatic()
