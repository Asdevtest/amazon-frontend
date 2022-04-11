import {restApiService} from '@services/rest-api-service/rest-api-service'

class StorekeeperModelStatic {
  getTasksVacant = async () => {
    const response = await restApiService.strokeepersApi.apiV1StorekeepersTasksVacGet()
    return response
  }

  getLightTasksVacant = async () => {
    const response = await restApiService.strokeepersApi.apiV1StorekeepersTasksLightVacGet()
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

  getLightTasksMy = async data => {
    const response = await restApiService.strokeepersApi.apiV1StorekeepersTasksLightMyGet(data)
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

  updateStatusInOrder = async (id, data) => {
    const response = await restApiService.strokeepersApi.apiV1StorekeepersOrdersSetStatusGuidPatch(id, {
      body: data,
    })
    return response
  }

  resolveTask = async (id, data) => {
    const response = await restApiService.strokeepersApi.apiV1StorekeepersTasksDoneGuidPost(id, {body: data})
    return response
  }

  getTaskById = async id => {
    const response = await restApiService.strokeepersApi.apiV1StorekeepersTaskLightGuidGet(id)
    return response
  }

  getStorekeepers = async () => {
    const response = await restApiService.strokeepersApi.apiV1StorekeepersGet()
    return response
  }

  getLogisticsTariffs = async () => {
    const response = await restApiService.strokeepersApi.apiV1StorekeepersTariffLogisticsMyGet()
    return response
  }

  createLogisticTariff = async data => {
    const response = await restApiService.strokeepersApi.apiV1StorekeepersTariffLogisticsPost({body: data})
    return response
  }

  editLogisticTariff = async (id, data) => {
    const response = await restApiService.strokeepersApi.apiV1StorekeepersTariffLogisticsGuidPatch(id, {body: data})
    return response
  }

  removeLogisticTariff = async id => {
    const response = await restApiService.strokeepersApi.apiV1StorekeepersTariffLogisticsGuidDelete(id)
    return response
  }

  getWarehouseTariffs = async () => {
    const response = await restApiService.strokeepersApi.apiV1StorekeepersTariffWarehouseMyGet()
    return response
  }

  createWarehouseTariff = async data => {
    const response = await restApiService.strokeepersApi.apiV1StorekeepersTariffWarehousesPost({body: data})
    return response
  }

  editWarehouseTariff = async (id, data) => {
    const response = await restApiService.strokeepersApi.apiV1StorekeepersTariffWarehouseGuidPatch(id, {body: data})
    return response
  }

  removeWarehouseTariff = async id => {
    const response = await restApiService.strokeepersApi.apiV1StorekeepersTariffWarehouseGuidDelete(id)
    return response
  }
}

export const StorekeeperModel = new StorekeeperModelStatic()
