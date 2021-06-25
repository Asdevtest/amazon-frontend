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
      InlineObject5: {guids: ids},
    })
    return response
  }

  cancelMergeBoxes = async data => {
    const response = await restApiService.boxesApi.apiV1BoxesCancelMergePost({
      InlineObject6: data,
    })
    return response
  }

  splitBoxes = async (id, data) => {
    const response = await restApiService.boxesApi.apiV1BoxesSplitPost({
      InlineObject7: {guid: id, itemsBoxSet: data},
    })
    return response
  }

  cancelSplitBoxes = async data => {
    const response = await restApiService.boxesApi.apiV1BoxesCancelSplitPost({
      InlineObject8: data,
    })
    return response
  }

  getBoxesDrafts = async () => {
    const response = await restApiService.boxesApi.apiV1BoxesDraftsGet()
    return response
  }

  approveBoxesOperation = async data => {
    const response = await restApiService.boxesApi.apiV1BoxesApprovePost({InlineObject9: data})
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
      InlineObject10: data,
    })
    return response
  }
}

export const BoxesModel = new BoxesModelStatic()
