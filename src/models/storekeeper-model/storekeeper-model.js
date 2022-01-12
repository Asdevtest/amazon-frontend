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

  getTasksMy = async data => {
    const response = await restApiService.strokeepersApi.apiV1StorekeepersTasksMyGet(data)
    return response
  }

  getPaymentsMy = async () => {
    const response = await restApiService.otherApi.apiV1OtherPaymentsMyGet()
    return response
  }

  updateTask = async (id, data) => {
    const response = await restApiService.strokeepersApi.apiV1StorekeepersTasksGuidPatch(id, {body: data})
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

  getBoxesMy = async () => {
    const response = await restApiService.strokeepersApi.apiV1StorekeepersBoxesGet()
    return response
  }

  updateBarcodeAndStatusInOrder = async (id, data) => {
    const response = await restApiService.strokeepersApi.apiV1StorekeepersOrdersSetBarcodeAndStatusGuidPatch(id, {
      body: data,
    })
    return response
  }

  resolveTask = async (id, data) => {
    const response = await restApiService.strokeepersApi.apiV1StorekeepersTasksDoneGuidPost(id, {body: data})
    return response
  }
}

export const StorekeeperModel = new StorekeeperModelStatic()
