import {getLoggerServiceModel} from '@services/logger-service'
import {ApiClient} from '@services/rest-api-service/codegen/src'
import {restApiService} from '@services/rest-api-service/rest-api-service'

import {AdministratorProduct, AdministratorUser} from './administrator-model.contracts'

class AdministratorModelStatic {
  logger = undefined

  constructor() {
    this.logger = getLoggerServiceModel(this)
  }

  getProductsNotPaid = async () => {
    try {
      const response = await restApiService.administratorApi.apiV1AdminsGetNotPaidProductsGet()
      this.logger.logResponse('getNotPaidProducts', response)
      return ApiClient.convertToType(response, AdministratorProduct)
    } catch (error) {
      this.logger.logCoughtError('getNotPaidProducts', error)
      throw error
    }
  }

  getProductsWaiting = async () => {
    try {
      const response = await restApiService.administratorApi.apiV1AdminsGetWaitingProductsGet()
      this.logger.logResponse('getWaitingProducts', response)
      return ApiClient.convertToType(response, AdministratorProduct)
    } catch (error) {
      this.logger.logCoughtError('getWaitingProducts', error)
      throw error
    }
  }

  getProductsVacant = async () => {
    try {
      const response = await restApiService.administratorApi.apiV1AdminsGetVacProductsGet()
      this.logger.logResponse('getProductsVacant', response)
      return ApiClient.convertToType(response, AdministratorProduct)
    } catch (error) {
      this.logger.logCoughtError('getProductsVacant', error)
      throw error
    }
  }

  getProductsChecking = async () => {
    try {
      const response = await restApiService.administratorApi.apiV1AdminsGetCheckingProductsGet()
      this.logger.logResponse('getProductsChecking', response)
      return ApiClient.convertToType(response, AdministratorProduct)
    } catch (error) {
      this.logger.logCoughtError('getProductsChecking', error)
      throw error
    }
  }

  pickupProductForCheck = async id => {
    try {
      const response = await restApiService.administratorApi.apiV1AdminsPickupItemGuidPost(id)
      this.logger.logResponse('pickupProductForCheck', response)
    } catch (error) {
      this.logger.logCoughtError('pickupProductForCheck', error)
      throw error
    }
  }

  updateProduct = async (id, data) => {
    try {
      const response = await restApiService.administratorApi.apiV1AdminsPatchProductsGuidPatch(id, data)
      this.logger.logResponse('updateProduct', response)
    } catch (error) {
      this.logger.logCoughtError('updateProduct', error)
      throw error
    }
  }

  makePayment = async ids => {
    try {
      const response = await restApiService.administratorApi.apiV1AdminsMakePaymentPost({InlineObject1: ids})
      this.logger.logResponse('makePayment', response)
    } catch (error) {
      this.logger.logCoughtError('makePayment', error)
      throw error
    }
  }

  getUsers = async () => {
    try {
      const response = await restApiService.administratorApi.apiV1AdminsUsersGet()
      this.logger.logResponse('getUsers', response)
      return ApiClient.convertToType(response, AdministratorUser)
    } catch (error) {
      this.logger.logCoughtError('getUsers', error)
      throw error
    }
  }

  updateUser = async (id, data) => {
    try {
      const response = await restApiService.administratorApi.apiV1AdminsUsersGuidPatch(id, {InlineObject2: data})
      this.logger.logResponse('updateUser', response)
    } catch (error) {
      this.logger.logCoughtError('updateUser', error)
      throw error
    }
  }

  removeUser = async id => {
    try {
      const response = await restApiService.administratorApi.apiV1AdminsUsersGuidDelete(id)
      this.logger.logResponse('removeUser', response)
    } catch (error) {
      this.logger.logCoughtError('removeUser', error)
      throw error
    }
  }
}

export const AdministratorModel = new AdministratorModelStatic()
