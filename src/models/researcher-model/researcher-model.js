import {getLoggerServiceModel} from '@services/logger-service'
import {ApiClient} from '@services/rest-api-service/codegen/src'
import {restApiService} from '@services/rest-api-service/rest-api-service'

import {
  ResearcherCheckProductExistResponse,
  ResearcherPayment,
  ResearcherProduct,
  ResearcherProductExternalResponse,
} from './researcher-model.contracts'

class ResearcherModelStatic {
  logger = undefined

  constructor() {
    this.logger = getLoggerServiceModel(this)
  }

  createProduct = async data => {
    try {
      const response = await restApiService.researcherApi.apiV1ResearchersProductsPost(data)
      this.logger.logResponse('createProduct', response)
    } catch (error) {
      this.logger.logCoughtError('createProduct', error)
      throw error
    }
  }

  getProducts = async () => {
    try {
      const response = await restApiService.researcherApi.apiV1ResearchersProductsGet()
      this.logger.logResponse('addProduct', response)
      return ApiClient.convertToType(response, ResearcherProduct)
    } catch (error) {
      this.logger.logCoughtError('addProduct', error)
      throw error
    }
  }

  getProduct = async id => {
    try {
      const response = await restApiService.researcherApi.apiV1ResearchersProductsGuidGet(id)
      this.logger.logResponse('getProduct', response)
      return ApiClient.convertToType(response, ResearcherProduct)
    } catch (error) {
      this.logger.logCoughtError('getProduct', error)
      throw error
    }
  }

  removeProduct = async id => {
    try {
      const response = await restApiService.researcherApi.apiV1ResearchersProductsGuidDelete(id)
      this.logger.logResponse('removeProduct', response)
    } catch (error) {
      this.logger.logCoughtError('removeProduct', error)
      throw error
    }
  }

  checkProductExists = async id => {
    try {
      const response = await restApiService.researcherApi.apiV1ResearchersCheckProductsIdGet(id)
      this.logger.logResponse('checkProductExists', response)
      return ApiClient.convertToType(response, ResearcherCheckProductExistResponse)
    } catch (error) {
      this.logger.logCoughtError('checkProductExists', error)
      throw error
    }
  }

  parseAmazon = async id => {
    try {
      const response = await restApiService.researcherApi.apiV1ResearchersParseAmazonIdGet(id)
      this.logger.logResponse('parseAmazon', response)
      return ApiClient.convertToType(response, ResearcherProductExternalResponse)
    } catch (error) {
      this.logger.logCoughtError('parseAmazon', error)
      throw error
    }
  }

  parseParseSellerCentral = async () => {
    try {
      const response = await restApiService.researcherApi.apiV1ResearchersParseSellercentralGet()
      this.logger.logResponse('parseParseSellerCentral', response)
      return ApiClient.convertToType(response, ResearcherProductExternalResponse)
    } catch (error) {
      this.logger.logCoughtError('parseParseSellerCentral', error)
      throw error
    }
  }

  getPaymentsMy = async () => {
    try {
      const response = await restApiService.researcherApi.apiV1ResearchersPaymentsMyGet()
      this.logger.logResponse('getPaymentsMy', response)
      return ApiClient.convertToType(response, ResearcherPayment)
    } catch (error) {
      this.logger.logCoughtError('getPaymentsMy', error)
      throw error
    }
  }
}

export const ResearcherModel = new ResearcherModelStatic()
