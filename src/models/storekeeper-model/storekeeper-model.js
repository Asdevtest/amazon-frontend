import {getLoggerServiceModel} from '@services/logger-service'
import {ApiClient} from '@services/rest-api-service/codegen/src'
import {restApiService} from '@services/rest-api-service/rest-api-service'

import {StorekeeperBatch, StorekeeperBox, StorekeeperTask} from './storekeeper-model.contracts'

class StorekeeperModelStatic {
  logger = undefined

  constructor() {
    this.logger = getLoggerServiceModel(this)
  }

  getBoxesVacant = async () => {
    try {
      const response = await restApiService.strokeepersApi.apiV1StorekeepersBoxesVacGet()
      this.logger.logResponse('getBoxesVacant', response)
      return ApiClient.convertToType(response, StorekeeperBox)
    } catch (error) {
      this.logger.logCoughtError('getBoxesVacant', error)
      throw error
    }
  }

  pickupBox = async id => {
    try {
      const response = await restApiService.strokeepersApi.apiV1StorekeepersBoxesPickupGuidPost(id)
      this.logger.logResponse('pickupBox', response)
    } catch (error) {
      this.logger.logCoughtError('pickupBox', error)
      throw error
    }
  }

  getBoxesMy = async id => {
    try {
      const response = await restApiService.strokeepersApi.apiV1StorekeepersBoxesMyGet(id)
      this.logger.logResponse('getBoxesMy', response)
      return ApiClient.convertToType(response, StorekeeperBox)
    } catch (error) {
      this.logger.logCoughtError('getBoxesMy', error)
      throw error
    }
  }

  updateBox = async (id, data) => {
    try {
      const response = await restApiService.strokeepersApi.apiV1StorekeepersTasksGuidPatch(id, data)
      this.logger.logResponse('updateBox', response)
    } catch (error) {
      this.logger.logCoughtError('updateBox', error)
      throw error
    }
  }

  getTasksVacant = async () => {
    try {
      const response = await restApiService.strokeepersApi.apiV1StorekeepersTasksVacGet()
      this.logger.logResponse('getTasksVacant', response)
      return ApiClient.convertToType(response, StorekeeperTask)
    } catch (error) {
      this.logger.logCoughtError('getTasksVacant', error)
      throw error
    }
  }

  pickupTask = async id => {
    try {
      const response = await restApiService.strokeepersApi.apiV1StorekeepersTasksPickupGuidPost(id)
      this.logger.logResponse('pickupTask', response)
    } catch (error) {
      this.logger.logCoughtError('pickupTask', error)
      throw error
    }
  }

  getTasksMy = async () => {
    try {
      const response = await restApiService.strokeepersApi.apiV1StorekeepersTasksMyGet()
      this.logger.logResponse('getTasksMy', response)
      return ApiClient.convertToType(response, StorekeeperTask)
    } catch (error) {
      this.logger.logCoughtError('getTasksMy', error)
      throw error
    }
  }

  getBatches = async () => {
    try {
      const response = await restApiService.strokeepersApi.apiV1StorekeepersBatchesGet()
      this.logger.logResponse('getBatches', response)
      return ApiClient.convertToType(response, StorekeeperBatch)
    } catch (error) {
      this.logger.logCoughtError('getBatches', error)
      throw error
    }
  }
}

export const StorekeeperModel = new StorekeeperModelStatic()
