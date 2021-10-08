import {restApiService} from '@services/rest-api-service/rest-api-service'

class BoxesModelStatic {
  createBox = async data => {
    const response = await restApiService.boxesApi.apiV1BoxesPost(data)
    return response
  }

  getBoxes = async () => {
    const response = await restApiService.boxesApi.apiV1BoxesGet()
    return response
  }

  mergeBoxes = async ids => {
    const response = await restApiService.boxesApi.apiV1BoxesMergePost({
      InlineObject8: {guids: ids},
    })
    return response
  }

  cancelMergeBoxes = async id => {
    const response = await restApiService.boxesApi.apiV1BoxesCancelMergePost({
      InlineObject9: {guid: id},
    })
    return response
  }

  cancelEditBoxes = async id => {
    const response = await restApiService.boxesApi.apiV1BoxesCancelEditPost({
      InlineObject7: {guid: id},
    })
    return response
  }

  cancelEditBoxesByStorekeeper = async id => {
    const response = await restApiService.boxesApi.apiV1BoxesCancelEditByStorekeeperPost(id)
    return response
  }

  splitBoxes = async (id, data) => {
    const response = await restApiService.boxesApi.apiV1BoxesSplitPost({
      InlineObject10: {guid: id, itemsBoxSet: data},
    })
    return response
  }

  editBox = async ({id, data}) => {
    const response = await restApiService.boxesApi.apiV1BoxesEditGuidPost(id, data)
    return response
  }

  cancelSplitBoxes = async id => {
    const response = await restApiService.boxesApi.apiV1BoxesCancelSplitPost({
      InlineObject11: {guid: id},
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
            InlineObject12: {guid: id, additionalBoxes: [...request]},
          }
        : {
            InlineObject12: {guid: request},
          },
    )
    return response
  }

  removeBox = async id => {
    const response = await restApiService.boxesApi.apiV1BoxesGuidDelete(id)
    return response
  }

  getBoxesForCurClient = async () => {
    const response = await restApiService.boxesApi.apiV1BoxesClientsGet()
    return response
  }

  getBoxesDraftsForCurClient = async () => {
    const response = await restApiService.boxesApi.apiV1BoxesClientsDraftsGet()
    return response
  }

  updateBox = async (id, data) => {
    const response = await restApiService.boxesApi.apiV1BoxesStorekeepersGuidPatch(id, {
      InlineObject13: data,
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

  calculateBoxDeliveryCostsInBatch = async boxesIds => {
    const response = await restApiService.boxesApi.apiV1BoxesCalculateBoxDeliveryCostsInBatchPost({boxesIds})
    return response
  }

  sendBoxesToBatch = async boxesIds => {
    const response = await restApiService.boxesApi.apiV1BoxesSendBoxesToBatchPost({boxesIds})
    return response
  }

  requestSendBoxToBatch = async boxesIds => {
    const response = await restApiService.boxesApi.apiV1BoxesRequestSendBoxesToBatchPost({cancel: false, boxesIds})
    return response
  }
}

export const BoxesModel = new BoxesModelStatic()
