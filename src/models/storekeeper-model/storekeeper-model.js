import {restApiService} from '@services/rest-api-service/rest-api-service'

class StorekeeperModelStatic {
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

  updateTask = async (id, data) => {
    const response = await restApiService.strokeepersApi.apiV1StorekeepersTasksGuidPatch(id, {InlineObject28: data})
    return response
  }

  getBatches = async () => {
    const response = await restApiService.strokeepersApi.apiV1StorekeepersBatchesGet()
    return response
  }

  getBalance = async () => {
    const response = await restApiService.strokeepersApi.apiV1StorekeepersPaymentsMyBalanceGet()
    return response
  }

  updateBarcodeAndStatusInOrder = async (id, data) => {
    const response = await restApiService.strokeepersApi.apiV1StorekeepersBarcodeAndStatusInOrderPatch(id, data)
    return response
  }

  resolveTask = async (id, data) => {
    const response = await restApiService.strokeepersApi.apiV1StorekeepersTasksDoneGuidPost(id, {InlineObject27: data})
    return response
  }
}

export const StorekeeperModel = new StorekeeperModelStatic()
