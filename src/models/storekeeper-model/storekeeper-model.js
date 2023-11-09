import { restApiService } from '@services/rest-api-service/rest-api-service'

import { filterNullValues } from '@utils/object'

class StorekeeperModelStatic {
  getTasksVacant = async () => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersTasksVacGet()
    return response.data
  }

  getLightTasksVacant = async () => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersTasksLightVacGet()
    return response.data
  }

  getLightTasksVacantPag = async data => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersTasksLightPagVacGet(filterNullValues(data))
    return response.data
  }

  getLightTasksWithPag = async data => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersTasksLightPagMyGet(filterNullValues(data))
    return response.data
  }

  pickupTask = async guid => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersTasksPickupGuidPost({ guid })
    return response.data
  }

  pickupManyTasks = async body => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersTasksPickupManyPost({ body })
    return response.data
  }

  updateTask = async (guid, body) => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersTasksGuidPatch({ guid, body })
    return response.data
  }

  getBoxesMyPag = async data => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersPagBoxesGet(filterNullValues(data))
    return response.data
  }

  updateStatusInOrder = async (guid, body) => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersOrdersSetStatusGuidPatch({ guid, body })
    return response.data
  }

  resolveTask = async (guid, body) => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersTasksDoneGuidPost({ guid, body })
    return response.data
  }

  getTaskById = async guid => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersTaskLightGuidGet({ guid })
    return response.data
  }

  getStorekeepers = async (boxStatus, tariffType) => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersGet({ boxStatus, tariffType })
    return response.data
  }

  getLogisticsTariffs = async data => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersTariffLogisticsMyGet(filterNullValues(data))
    return response.data
  }

  createLogisticTariff = async body => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersTariffLogisticsPost({ body })
    return response.data
  }

  editLogisticTariff = async (guid, body) => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersTariffLogisticsGuidPatch({ guid, body })
    return response.data
  }

  removeLogisticTariff = async guid => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersTariffLogisticsGuidDelete({ guid })
    return response.data
  }

  getWarehouseTariffs = async () => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersTariffWarehouseMyGet()
    return response.data
  }

  createWarehouseTariff = async body => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersTariffWarehousesPost({ body })
    return response.data
  }

  editWarehouseTariff = async (guid, body) => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersTariffWarehouseGuidPatch({ guid, body })
    return response.data
  }

  removeWarehouseTariff = async guid => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersTariffWarehouseGuidDelete({ guid })
    return response.data
  }

  editStorekeperDestination = async body => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersDestinationPost({ body })
    return response.data
  }

  confirmSendToStorekeeper = async guid => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersDestructBatchGuidPost({ guid })
    return response.data
  }

  editBox = async (guid, body) => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersBoxesGuidPatch({ guid, body })
    return response.data
  }

  updateBoxComment = async (guid, body) => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersBoxesCommentGuidPatch({ guid, body })
    return response.data
  }

  getTaskReport = async guid => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersTasksReportGuidGet({ guid })
    return response.data
  }

  updateTaskPriority = async (guid, priority, reason) => {
    const response = await restApiService.storkeepersApi.apiV1StorekeepersTasksPriorityGuidPatch({
      guid,
      body: {
        priority,
        reason,
      },
    })
    return response.data
  }
}

export const StorekeeperModel = new StorekeeperModelStatic()
