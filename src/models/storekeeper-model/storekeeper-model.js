import {restApiService} from '@services/rest-api-service/rest-api-service'

class StorekeeperModelStatic {
  getBoxesVacant = async () => {
    const response = await restApiService.strokeepersApi.apiV1StorekeepersBoxesVacGet()
    return response
  }

  pickupBox = async id => {
    const response = await restApiService.strokeepersApi.apiV1StorekeepersBoxesPickupGuidPost(id)
    return response
  }

  getBoxesMy = async id => {
    const response = await restApiService.strokeepersApi.apiV1StorekeepersBoxesMyGet(id)
    return response
  }

  updateBox = async (id, data) => {
    const response = await restApiService.strokeepersApi.apiV1StorekeepersTasksGuidPatch(id, data)
    return response
  }

  getTasksVacant = async () => {
    const response = await restApiService.strokeepersApi.apiV1StorekeepersTasksVacGet()
    return response
  }

  pickupTask = async id => {
    const response = await restApiService.strokeepersApi.apiV1StorekeepersTasksPickupGuidPost(id)
    return response
  }

  getTasksMy = async () => {
    const response = await restApiService.strokeepersApi.apiV1StorekeepersTasksMyGet()
    return response
  }

  getBatches = async () => {
    const response = await restApiService.strokeepersApi.apiV1StorekeepersBatchesGet()
    return response
  }
}

export const StorekeeperModel = new StorekeeperModelStatic()
