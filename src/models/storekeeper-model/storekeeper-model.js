import { restApiService } from '@services/rest-api-service/rest-api-service'

class StorekeeperModelStatic {
  getTasksVacant = async () => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersTasksVacGet()
    return response
  }

  getLightTasksVacant = async () => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersTasksLightVacGet()
    return response
  }

  getLightTasksVacantPag = async data => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersTasksLightPagVacGet(data)
    return response
  }

  getLightTasksWithPag = async data => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersTasksLightPagMyGet(data)
    return response
  }

  pickupTask = async id => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersTasksPickupGuidPost(id)
    return response
  }

  pickupManyTasks = async data => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersTasksPickupManyPost({ body: data })
    return response
  }

  getTasksMy = async data => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersTasksMyGet(data)
    return response
  }

  getLightTasksMy = async data => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersTasksLightMyGet(data)
    return response
  }

  getPaymentsMy = async () => {
    const response = await restApiService.otherApi.apiV1OtherPaymentsMyGet()
    return response
  }

  updateTask = async (id, data) => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersTasksGuidPatch(id, { body: data })
    return response
  }

  getBatches = async () => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersBatchesGet()
    return response
  }

  getBalance = async () => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersPaymentsMyBalanceGet()
    return response
  }

  getBoxesMy = async () => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersBoxesGet()
    return response
  }

  getBoxesMyPag = async data => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersPagBoxesGet(data)
    return response
  }

  updateStatusInOrder = async (id, data) => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersOrdersSetStatusGuidPatch(id, {
      body: data,
    })
    return response
  }

  resolveTask = async (id, data) => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersTasksDoneGuidPost(id, { body: data })
    return response
  }

  getTaskById = async id => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersTaskLightGuidGet(id)
    return response
  }

  getStorekeepers = async (boxStatus, tariffType) => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersGet({ boxStatus, tariffType })
    return response
  }

  getLogisticsTariffs = async data => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersTariffLogisticsMyGet(data)
    return response
  }

  createLogisticTariff = async data => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersTariffLogisticsPost({ body: data })
    return response
  }

  editLogisticTariff = async (id, data) => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersTariffLogisticsGuidPatch(id, { body: data })
    return response
  }

  removeLogisticTariff = async id => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersTariffLogisticsGuidDelete(id)
    return response
  }

  getWarehouseTariffs = async () => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersTariffWarehouseMyGet()
    return response
  }

  createWarehouseTariff = async data => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersTariffWarehousesPost({ body: data })
    return response
  }

  editWarehouseTariff = async (id, data) => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersTariffWarehouseGuidPatch(id, { body: data })
    return response
  }

  removeWarehouseTariff = async id => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersTariffWarehouseGuidDelete(id)
    return response
  }

  editProductsHsCods = async data => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersProductsEditHsCodePatch({ body: data })
    return response
  }

  editStorekeperDestination = async data => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersDestinationPost({ body: data })
    return response
  }

  confirmSendToStorekeeper = async id => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersDestructBatchGuidPost(id)
    return response
  }

  editBox = async (id, data) => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersBoxesGuidPatch(id, { body: data })
    return response
  }

  updateBoxComment = async (id, data) => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersBoxesCommentGuidPatch(id, {
      body: data,
    })
    return response
  }

  getTaskReport = async id => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersTasksReportGuidGet(id)
    return response
  }

  updateTaskPriority = async (taskId, priority, reason) => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersTasksPriorityGuidPatchWithHttpInfo(taskId, {
      body: {
        priority,
        reason,
      },
    })
    return response
  }
}

export const StorekeeperModel = new StorekeeperModelStatic()
