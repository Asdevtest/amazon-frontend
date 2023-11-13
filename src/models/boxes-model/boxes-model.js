import { restApiService } from '@services/rest-api-service/rest-api-service'

import { filterNullValues } from '@utils/object'

class BoxesModelStatic {
  createBox = async body => {
    const response = await restApiService.boxesApi.apiV1BoxesPost({ body })
    return response.data
  }

  getBoxes = async () => {
    const response = await restApiService.boxesApi.apiV1BoxesGet()
    return response.data
  }

  mergeBoxes = async (ids, boxBody) => {
    const response = await restApiService.boxesApi.apiV1BoxesMergePost({
      body: { guids: ids, boxBody },
    })
    return response.data
  }

  cancelMergeBoxes = async guid => {
    const response = await restApiService.boxesApi.apiV1BoxesCancelMergePost({
      body: { guid },
    })
    return response.data
  }

  cancelEditBoxes = async guid => {
    const response = await restApiService.boxesApi.apiV1BoxesCancelEditPost({
      body: { guid },
    })
    return response.data
  }

  splitBoxes = async (guid, data) => {
    const response = await restApiService.boxesApi.apiV1BoxesSplitPost({
      body: { guid, newBoxesParams: data },
    })
    return response.data
  }

  editBox = async (guid, body) => {
    const response = await restApiService.boxesApi.apiV1BoxesEditGuidPost({
      guid,
      body,
    })
    return response.data
  }

  editBoxAtClient = async (guid, body) => {
    const response = await restApiService.boxesApi.apiV1BoxesClientsGuidPatch({
      guid,
      body,
    })
    return response.data
  }

  editIsFormed = async (guid, body) => {
    const response = await restApiService.boxesApi.apiV1BoxesIsFormedGuidPatch({
      guid,
      body,
    })
    return response.data
  }

  regroupBoxes = async body => {
    const response = await restApiService.boxesApi.apiV1BoxesSuperboxRegroupPatch({ body })
    return response.data
  }

  cancelSplitBoxes = async guid => {
    const response = await restApiService.boxesApi.apiV1BoxesCancelSplitPost({
      body: { guid },
    })
    return response.data
  }

  approveBoxesOperation = async (request, id) => {
    const response = await restApiService.boxesApi.apiV1BoxesApprovePost(
      Array.isArray(request)
        ? {
            body: { guid: id, additionalBoxes: [...request] },
          }
        : {
            body: { guid: request },
          },
    )
    return response.data
  }

  getBoxesForCurClient = async data => {
    const response = await restApiService.boxesApi.apiV1BoxesClientsGet(filterNullValues(data))
    return response.data
  }

  getBoxesForCurClientLightPag = async data => {
    // const response = await restApiService.boxesApi.apiV1BoxesPagClientsLightGet(filterNullValues(data))
    const response = await restApiService.boxesApi.apiV1BoxesPagClientsLightGet(data)
    return response.data
  }

  getBoxesReadyToBatchStorekeeper = async () => {
    const response = await restApiService.boxesApi.apiV1BoxesStorekeepersSentToBatchGet()
    return response.data
  }

  getBoxesReadyToBatchClient = async () => {
    const response = await restApiService.boxesApi.apiV1BoxesClientsSentToBatchGet()
    return response.data
  }

  updateBox = async (guid, body) => {
    const response = await restApiService.boxesApi.apiV1BoxesStorekeepersGuidPatch({
      guid,
      body,
    })
    return response.data
  }

  getBoxesOfOrder = async guid => {
    const response = await restApiService.boxesApi.apiV1BoxesByOrderGuidGuidGet({ guid })
    return response.data
  }

  getBoxesByProductId = async guid => {
    const response = await restApiService.boxesApi.apiV1BoxesByProductGuidGuidGet({ guid })
    return response.data
  }

  getBoxesByProductIdLight = async guid => {
    const response = await restApiService.boxesApi.apiV1BoxesByProductGuidLightGuidGet({ guid })
    return response.data
  }

  getBoxesInTransfer = async guid => {
    const response = await restApiService.boxesApi.apiV1BoxesClientsInTransferGuidGet({ guid })
    return response.data
  }

  sendBoxesToBatch = async boxesIds => {
    const response = await restApiService.boxesApi.apiV1BoxesSendBoxesToBatchPost({ body: { boxesIds } })
    return response.data
  }

  setBarcodeAttachedCheckboxes = async (guid, data) => {
    const response = await restApiService.boxesApi.apiV1BoxesStorekeepersGuidSetItemsBarCodePatch({
      guid,
      body: { itemsBarCodeChanges: data },
    })
    return response.data
  }

  editBoxByStorekeeper = async (guid, data) => {
    const response = await restApiService.boxesApi.apiV1BoxesChangeDimensionsGuidPatch({ guid, body: data })
    return response.data
  }

  editAdditionalInfo = async (guid, data) => {
    const response = await restApiService.boxesApi.apiV1BoxesAdditionalInfoGuidPatch({ guid, body: data })
    return response.data
  }

  updatePrepId = async boxes => {
    const response = await restApiService.boxesApi.apiV1BoxesPrepIdPatch({ body: boxes })
    return response.data
  }

  getBoxById = async guid => {
    const response = await restApiService.boxesApi.apiV1BoxesGuidGet({ guid })
    return response.data
  }
}

export const BoxesModel = new BoxesModelStatic()
