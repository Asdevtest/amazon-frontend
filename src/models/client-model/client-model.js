import {getLoggerServiceModel} from '@services/logger-service'
import {ApiClient} from '@services/rest-api-service/codegen/src'
import {restApiService} from '@services/rest-api-service/rest-api-service'

import {
  ClientBatches,
  ClientBox,
  ClientCreateOrderResponse,
  ClientOrder,
  ClientProduct,
  ClientUser,
} from './client-model.contracts'

class ClientModelStatic {
  logger = undefined

  constructor() {
    this.logger = getLoggerServiceModel(this)
  }

  getProductsVacant = async () => {
    try {
      const response = await restApiService.clientApi.apiV1ClientsProductsVacGet()
      this.logger.logResponse('getProductsVacant', response)
      return ApiClient.convertToType(response, ClientProduct)
    } catch (error) {
      this.logger.logCoughtError('getProductsVacant', error)
      throw error
    }
  }

  pickupProduct = async id => {
    try {
      const response = await restApiService.clientApi.apiV1ClientsProductsPickupGuidPost(id)
      this.logger.logResponse('pickupProduct', response)
    } catch (error) {
      this.logger.logCoughtError('pickupProduct', error)
      throw error
    }
  }

  updateProduct = async (id, data) => {
    try {
      const response = await restApiService.clientApi.apiV1ClientsProductsGuidPatch(id, data)
      this.logger.logResponse('updateProduct', response)
    } catch (error) {
      this.logger.logCoughtError('updateProduct', error)
      throw error
    }
  }

  getProductsMy = async () => {
    try {
      const response = await restApiService.clientApi.apiV1ClientsProductsMyGet()
      this.logger.logResponse('getProductsMy', response)
      return ApiClient.convertToType(response, ClientProduct)
    } catch (error) {
      this.logger.logCoughtError('getProductsMy', error)
      throw error
    }
  }

  makePayments = async productIds => {
    try {
      const response = await restApiService.clientApi.apiV1ClientsMakePaymentsPost({InlineObject7: productIds})
      this.logger.logResponse('makePayments', response)
    } catch (error) {
      this.logger.logCoughtError('makePayments', error)
      throw error
    }
  }

  getProductsPaid = async () => {
    try {
      const response = await restApiService.clientApi.apiV1ClientsMakePaymentsPost()
      this.logger.logResponse('getProductsPaid', response)
      return ApiClient.convertToType(response, ClientProduct)
    } catch (error) {
      this.logger.logCoughtError('getProductsPaid', error)
      throw error
    }
  }

  createOrder = async data => {
    try {
      const response = await restApiService.clientApi.apiV1ClientsOrdersPost(data)
      this.logger.logResponse('createOreder', response)
      return ApiClient.convertToType(response, ClientCreateOrderResponse)
    } catch (error) {
      this.logger.logCoughtError('createOreder', error)
      throw error
    }
  }

  getOrders = async () => {
    try {
      const response = await restApiService.clientApi.apiV1ClientsOrdersGet()
      this.logger.logResponse('getOrders', response)
      return ApiClient.convertToType(response, ClientOrder)
    } catch (error) {
      this.logger.logCoughtError('getOrders', error)
      throw error
    }
  }

  updateOrder = async id => {
    try {
      const response = await restApiService.clientApi.apiV1ClientsOrdersGuidPatch(id)
      this.logger.logResponse('updateOrder', response)
    } catch (error) {
      this.logger.logCoughtError('updateOrder', error)
      throw error
    }
  }

  getOrder = async id => {
    try {
      const response = await restApiService.clientApi.apiV1ClientsOrdersGuidGet(id)
      this.logger.logResponse('getOrder', response)
      return ApiClient.convertToType(response, ClientOrder)
    } catch (error) {
      this.logger.logCoughtError('getOrder', error)
      throw error
    }
  }

  removeOrder = async id => {
    try {
      const response = await restApiService.clientApi.apiV1ClientsOrdersGuidDelete(id)
      this.logger.logResponse('removeOrder', response)
    } catch (error) {
      this.logger.logCoughtError('removeOrder', error)
      throw error
    }
  }

  getUsers = async () => {
    try {
      const response = await restApiService.clientApi.apiV1ClientsUsersGet()
      this.logger.logResponse('getUsers', response)
      return ApiClient.convertToType(response, ClientUser)
    } catch (error) {
      this.logger.logCoughtError('getUsers', error)
      throw error
    }
  }

  updateUser = async (id, data) => {
    try {
      const response = await restApiService.clientApi.apiV1ClientsUsersGuidPatch(id, {InlineObject10: data})
      this.logger.logResponse('updateUser', response)
    } catch (error) {
      this.logger.logCoughtError('updateUser', error)
      throw error
    }
  }

  getBoxes = async () => {
    try {
      const response = await restApiService.clientApi.apiV1ClientsBoxesGuidGet()
      this.logger.logResponse('getBoxes', response)
      return ApiClient.convertToType(response, ClientBox)
    } catch (error) {
      this.logger.logCoughtError('getBoxes', error)
      throw error
    }
  }

  getBox = async id => {
    try {
      const response = await restApiService.clientApi.apiV1ClientsBoxesGuidGet(id)
      this.logger.logResponse('getBox', response)
      return ApiClient.convertToType(response, ClientBox)
    } catch (error) {
      this.logger.logCoughtError('getBox', error)
      throw error
    }
  }

  createTask = async data => {
    try {
      const response = await restApiService.clientApi.apiV1ClientsTasksPost(data)
      this.logger.logResponse('createTask', response)
    } catch (error) {
      this.logger.logCoughtError('createTask', error)
      throw error
    }
  }

  getTasks = async () => {
    try {
      const response = await restApiService.clientApi.apiV1ClientsTasksGet()
      this.logger.logResponse('getTasks', response)
    } catch (error) {
      this.logger.logCoughtError('getTasks', error)
      throw error
    }
  }

  getBatches = async () => {
    try {
      const response = await restApiService.clientApi.apiV1ClientsBatchesGet()
      this.logger.logResponse('getBatches', response)
      return ApiClient.convertToType(response, ClientBatches)
    } catch (error) {
      this.logger.logCoughtError('getBatches', error)
      throw error
    }
  }
}

export const ClientModel = new ClientModelStatic()
