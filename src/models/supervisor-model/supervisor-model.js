import {getLoggerServiceModel} from '@services/logger-service'
import {ApiClient} from '@services/rest-api-service/codegen/src'
import {restApiService} from '@services/rest-api-service/rest-api-service'

import {SupervisorPayment, SupervisorProduct} from './supervisor-model.contracts'

class SuperVisorModelStatic {
  logger = undefined

  constructor() {
    this.logger = getLoggerServiceModel(this)
  }

  getProducsVacant = async () => {
    try {
      const response = await restApiService.supervisorApi.apiV1SupervisorsProductsVacGet()
      this.logger.logResponse('getProducsVacant', response)
      return ApiClient.convertToType(response, SupervisorProduct)
    } catch (error) {
      this.logger.logCoughtError('getProducsVacant', error)
      throw error
    }
  }

  getProducsMy = async () => {
    try {
      const response = await restApiService.supervisorApi.apiV1SupervisorsProductsMyGet()
      this.logger.logResponse('getProducsMy', response)
      return ApiClient.convertToType(response, SupervisorProduct)
    } catch (error) {
      this.logger.logCoughtError('getProducsMy', error)
      throw error
    }
  }

  updateProductStatus = async (id, data) => {
    try {
      const response = await restApiService.supervisorApi.apiV1SupervisorsProductsGuidPatch(id, data)
      this.logger.logResponse('updateProductStatus', response)
    } catch (error) {
      this.logger.logCoughtError('updateProductStatus', error)
      throw error
    }
  }

  getPaymentsMy = async () => {
    try {
      const response = await restApiService.supervisorApi.apiV1SupervisorsPaymentsMyGet()
      this.logger.logResponse('getPaymentsMy', response)
      return ApiClient.convertToType(response, SupervisorPayment)
    } catch (error) {
      this.logger.logCoughtError('getPaymentsMy', error)
      throw error
    }
  }

  getPaymentsCreatedByMe = async () => {
    try {
      const response = await restApiService.supervisorApi.apiV1SupervisorsPaymentsCreatedByThisSuperGet()
      this.logger.logResponse('getPaymentsCreatedByMe', response)
      return ApiClient.convertToType(response, SupervisorPayment)
    } catch (error) {
      this.logger.logCoughtError('getPaymentsCreatedByMe', error)
      throw error
    }
  }

  pickupProduct = async id => {
    try {
      const response = await restApiService.supervisorApi.apiV1SupervisorsProductsPickupGuidPost(id)
      this.logger.logResponse('pickupProduct', response)
    } catch (error) {
      this.logger.logCoughtError('pickupProduct', error)
      throw error
    }
  }
}

export const SuperVisorModel = new SuperVisorModelStatic()
