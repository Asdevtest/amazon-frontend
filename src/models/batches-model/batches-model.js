import {restApiService} from '@services/rest-api-service/rest-api-service'

export class BatchesModelStatic {
  getBatches = async status => {
    const response = await restApiService.batchesApi.apiV1BatchesGet({status})
    return response
  }

  calculateBoxDeliveryCostsInBatch = async boxesIds => {
    const response = await restApiService.batchesApi.apiV1BatchesCalculateBoxDeliveryCostsInBatchPost({
      body: {boxesIds},
    })
    return response
  }

  requestSendBoxToBatch = async boxesIds => {
    const response = await restApiService.batchesApi.apiV1BatchesRequestSendBoxesToBatchPost({
      body: {cancel: false, boxesIds},
    })
    return response
  }

  createBatch = async boxesIds => {
    const response = await restApiService.batchesApi.apiV1BatchesPost({
      body: {boxesIds},
    })
    return response
  }

  removeBoxFromBatch = async (id, boxesIds) => {
    const response = await restApiService.batchesApi.apiV1BatchesGuidRemoveBoxesPatch(id, {
      body: {boxesIds},
    })
    return response
  }

  addBoxToBatch = async (id, boxesIds) => {
    const response = await restApiService.batchesApi.apiV1BatchesGuidAddBoxesPatch(id, {
      body: {boxesIds},
    })
    return response
  }

  confirmSentToBatch = async id => {
    const response = await restApiService.batchesApi.apiV1BatchesGuidBatchHasDispatchedPatch(id)
    return response
  }

  editAttachedDocuments = async (id, data) => {
    const response = await restApiService.batchesApi.apiV1BatchesGuidEditAttachedDocumentsPatch(id, {
      body: {attachedDocuments: data},
    })
    return response
  }

  getBatchesbyProduct = async id => {
    const response = await restApiService.batchesApi.apiV1BatchesByProductGuidGet(id)
    return response
  }

  getBatchesByGuid = async id => {
    const response = await restApiService.batchesApi.apiV1BatchesGuidGet(id)
    return response
  }
}

export const BatchesModel = new BatchesModelStatic()
