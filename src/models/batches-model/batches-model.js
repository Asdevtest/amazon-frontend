import { restApiService } from '@services/rest-api-service/rest-api-service'

export class BatchesModelStatic {
  getBatches = async status => {
    const response = await restApiService.batchesApi.apiV1BatchesGet({ status })
    return response
  }

  calculateBoxDeliveryCostsInBatch = async boxesIds => {
    const response = await restApiService.batchesApi.apiV1BatchesCalculateBoxDeliveryCostsInBatchPost({
      body: { boxesIds },
    })
    return response
  }

  requestSendBoxToBatch = async boxesIds => {
    const response = await restApiService.batchesApi.apiV1BatchesRequestSendBoxesToBatchPost({
      body: { cancel: false, boxesIds },
    })
    return response
  }

  createBatch = async data => {
    const response = await restApiService.batchesApi.apiV1BatchesPost({
      body: data,
    })
    return response
  }

  changeBatch = async (id, data) => {
    const response = await restApiService.batchesApi.apiV1BatchesGuidPatch(id, {
      body: data,
    })
    return response
  }

  removeBoxFromBatch = async (id, boxesIds) => {
    const response = await restApiService.batchesApi.apiV1BatchesGuidRemoveBoxesPatch(id, {
      body: { boxesIds },
    })
    return response
  }

  addBoxToBatch = async (id, boxesIds) => {
    const response = await restApiService.batchesApi.apiV1BatchesGuidAddBoxesPatch(id, {
      body: { boxesIds },
    })
    return response
  }

  confirmSentToBatch = async id => {
    const response = await restApiService.batchesApi.apiV1BatchesGuidBatchHasDispatchedPatch(id)
    return response
  }

  editAttachedDocuments = async (id, data) => {
    const response = await restApiService.batchesApi.apiV1BatchesGuidEditAttachedDocumentsPatch(id, {
      body: { attachedDocuments: data },
    })
    return response
  }

  getBatchesbyProduct = async (id, data) => {
    const response = await restApiService.batchesApi.apiV1BatchesByProductGuidGet(id, data)
    return response
  }

  getBatchesByGuid = async id => {
    const response = await restApiService.batchesApi.apiV1BatchesGuidGet(id)
    return response
  }

  getBatchesWithFiltersPag = async data => {
    const response = await restApiService.batchesApi.apiV1BatchesWithFiltersGet(data.status, data.options)
    return response
  }
  editUpdateBatches = async data => {
    const response = await restApiService.batchesApi.apiV1BatchesArchivePatch({
      body: data,
    })
    return response
  }
}

export const BatchesModel = new BatchesModelStatic()
