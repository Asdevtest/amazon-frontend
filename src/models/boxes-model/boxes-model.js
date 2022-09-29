import {restApiService} from '@services/rest-api-service/rest-api-service'

class BoxesModelStatic {
  createBox = async data => {
    const response = await restApiService.boxesApi.apiV1BoxesPost({body: data})
    return response
  }

  getBoxes = async () => {
    const response = await restApiService.boxesApi.apiV1BoxesGet()
    return response
  }

  mergeBoxes = async (ids, boxBody) => {
    const response = await restApiService.boxesApi.apiV1BoxesMergePost({
      body: {guids: ids, boxBody},
    })
    return response
  }

  cancelMergeBoxes = async id => {
    const response = await restApiService.boxesApi.apiV1BoxesCancelMergePost({
      body: {guid: id},
    })
    return response
  }

  cancelEditBoxes = async id => {
    const response = await restApiService.boxesApi.apiV1BoxesCancelEditPost({
      body: {guid: id},
    })
    return response
  }

  cancelEditBoxesByStorekeeper = async id => {
    const response = await restApiService.boxesApi.apiV1BoxesCancelEditByStorekeeperPost(id)
    return response
  }

  splitBoxes = async (id, data) => {
    const response = await restApiService.boxesApi.apiV1BoxesSplitPost({
      body: {guid: id, newBoxesParams: data},
    })
    return response
  }

  editBox = async ({id, data}) => {
    const response = await restApiService.boxesApi.apiV1BoxesEditGuidPost(id, {body: data})
    return response
  }

  editBoxAtClient = async (id, data) => {
    const response = await restApiService.boxesApi.apiV1BoxesClientsGuidPatch(id, {body: data})
    return response
  }

  cancelSplitBoxes = async id => {
    const response = await restApiService.boxesApi.apiV1BoxesCancelSplitPost({
      body: {guid: id},
    })
    return response
  }

  getBoxesDrafts = async () => {
    const response = await restApiService.boxesApi.apiV1BoxesDraftsGet()
    return response
  }

  approveBoxesOperation = async (request, id) => {
    const response = await restApiService.boxesApi.apiV1BoxesApprovePost(
      Array.isArray(request)
        ? {
            body: {guid: id, additionalBoxes: [...request]},
          }
        : {
            body: {guid: request},
          },
    )
    return response
  }

  removeBox = async id => {
    const response = await restApiService.boxesApi.apiV1BoxesGuidDelete(id)
    return response
  }

  getBoxesForCurClient = async (status, storekeeperId) => {
    const response = await restApiService.boxesApi.apiV1BoxesClientsGet(status, {storekeeperId})
    return response
  }

  getBoxesReadyToBatchClient = async storekeeperId => {
    const response = await restApiService.boxesApi.apiV1BoxesClientsSentToBatchGet({storekeeperId})
    return response
  }

  getBoxesReadyToBatchStorekeeper = async () => {
    const response = await restApiService.boxesApi.apiV1BoxesStorekeepersSentToBatchGet()
    return response
  }

  getBoxesDraftsForCurClient = async () => {
    const response = await restApiService.boxesApi.apiV1BoxesClientsDraftsGet()
    return response
  }

  updateBox = async (id, data) => {
    const response = await restApiService.boxesApi.apiV1BoxesStorekeepersGuidPatch(id, {
      body: data,
    })
    return response
  }

  getBoxesOfOrder = async id => {
    const response = await restApiService.boxesApi.apiV1BoxesByOrderGuidGuidGet(id)
    return response
  }

  getBoxesByProductId = async id => {
    const response = await restApiService.boxesApi.apiV1BoxesByProductGuidGuidGet(id)
    return response
  }

  sendBoxesToBatch = async boxesIds => {
    const response = await restApiService.boxesApi.apiV1BoxesSendBoxesToBatchPost({body: {boxesIds}})
    return response
  }

  setBarcodeAttachedCheckboxes = async (id, data) => {
    const response = await restApiService.boxesApi.apiV1BoxesStorekeepersGuidSetItemsBarCodePatch(id, {
      body: {itemsBarCodeChanges: data},
    })
    return response
  }

  editBoxByStorekeeper = async (id, data) => {
    const response = await restApiService.boxesApi.apiV1BoxesChangeDimensionsGuidPatch(id, {body: data})
    return response
  }
}

export const BoxesModel = new BoxesModelStatic()
