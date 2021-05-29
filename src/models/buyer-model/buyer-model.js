import {getLoggerServiceModel} from '@services/logger-service'
import {ApiClient} from '@services/rest-api-service/codegen/src'
import {restApiService} from '@services/rest-api-service/rest-api-service'

import {BuyerBox, BuyerOrder, BuyerPayment, BuyerProduct} from './buyer-model.contracts'

class BuyerModelStatic {
  logger = undefined

  constructor() {
    this.logger = getLoggerServiceModel(this)
  }

  getProductsVacant = async () => {
    try {
      const response = await restApiService.buyerApi.apiV1BuyersProductsVacGet()
      this.logger.logResponse('getProductsVacant', response)
      return ApiClient.convertToType(response, BuyerProduct)
    } catch (error) {
      this.logger.logCoughtError('getProductsVacant', error)
      throw error
    }
  }

  getProductsMy = async () => {
    try {
      const response = await restApiService.buyerApi.apiV1BuyersProductsMyGet()
      this.logger.logResponse('getProductsMy', response)
      return ApiClient.convertToType(response, BuyerProduct)
    } catch (error) {
      this.logger.logCoughtError('getProductsMy', error)
      throw error
    }
  }

  updateProduct = async (id, data) => {
    try {
      const response = await restApiService.buyerApi.apiV1BuyersProductsGuidPatch(id, data)
      this.logger.logResponse('updateProduct', response)
    } catch (error) {
      this.logger.logCoughtError('updateProduct', error)
      throw error
    }
  }

  pickupProduct = async id => {
    try {
      const response = await restApiService.buyerApi.apiV1BuyersProductsPickupGuidPost(id)
      this.logger.logResponse('pickupProduct', response)
    } catch (error) {
      this.logger.logCoughtError('pickupProduct', error)
      throw error
    }
  }

  getOrdersVacant = async () => {
    try {
      const response = await restApiService.buyerApi.apiV1BuyersOrdersVacGet()
      this.logger.logResponse('getOrdersVacant', response)
      return ApiClient.convertToType(response, BuyerOrder)
    } catch (error) {
      this.logger.logCoughtError('getOrdersVacant', error)
      throw error
    }
  }

  getOrder = async id => {
    try {
      const response = await restApiService.buyerApi.apiV1BuyersOrdersGuidGet(id)
      this.logger.logResponse('getOrdersVacant', response)
      return ApiClient.convertToType(response, BuyerOrder)
    } catch (error) {
      this.logger.logCoughtError('getOrdersVacant', error)
      throw error
    }
  }

  updateOrder = async (id, data) => {
    try {
      const response = await restApiService.buyerApi.apiV1BuyersOrdersGuidPatch(id, {InlineObject3: data})
      this.logger.logResponse('updateOrder', response)
    } catch (error) {
      this.logger.logCoughtError('updateOrder', error)
      throw error
    }
  }

  pickupOrder = async id => {
    try {
      const response = await restApiService.buyerApi.apiV1BuyersOrdersPickupGuidPost(id)
      this.logger.logResponse('pickupOrder', response)
    } catch (error) {
      this.logger.logCoughtError('pickupOrder', error)
      throw error
    }
  }

  getOrdersMy = async () => {
    try {
      const response = await restApiService.buyerApi.apiV1BuyersOrdersMyGet()
      this.logger.logResponse('getOrdersMy', response)
      return ApiClient.convertToType(response, BuyerOrder)
    } catch (error) {
      this.logger.logCoughtError('getOrdersMy', error)
      throw error
    }
  }

  createBox = async data => {
    try {
      const response = await restApiService.buyerApi.apiV1BuyersBoxesPost(data)
      this.logger.logResponse('createBox', response)
    } catch (error) {
      this.logger.logCoughtError('createBox', error)
      throw error
    }
  }

  getBoxesMy = async () => {
    try {
      const response = await restApiService.buyerApi.apiV1BuyersBoxesMyGet()
      this.logger.logResponse('getBoxesMy', response)
      return ApiClient.convertToType(response, BuyerBox)
    } catch (error) {
      this.logger.logCoughtError('getBoxesMy', error)
      throw error
    }
  }

  updateBox = async (id, data) => {
    try {
      const response = await restApiService.buyerApi.apiV1BuyersBoxesGuidPatch(id, {InlineObject5: data})
      this.logger.logResponse('updateBox', response)
    } catch (error) {
      this.logger.logCoughtError('updateBox', error)
      throw error
    }
  }

  sendBoxToStoreKeeper = async boxId => {
    try {
      const response = await restApiService.buyerApi.apiV1BuyersBoxesSendToStorekeeperGuidPost(boxId)
      this.logger.logResponse('sendBoxToStoreKeeper', response)
    } catch (error) {
      this.logger.logCoughtError('sendBoxToStoreKeeper', error)
      throw error
    }
  }

  getPaymentsMy = async () => {
    try {
      const response = await restApiService.buyerApi.apiV1BuyersPaymentsMyGet()
      this.logger.logResponse('getPaymentsMy', response)
      return ApiClient.convertToType(response, BuyerPayment)
    } catch (error) {
      this.logger.logCoughtError('getPaymentsMy', error)
      throw error
    }
  }
}

export const BuyerModel = new BuyerModelStatic()
