import { restApiService } from '@services/rest-api-service/rest-api-service'

export class BatchesModelStatic {
  getBatches = async status => {
    const response = await restApiService.batchesApi.apiV1BatchesGet({ status })
    return response.data
  }

  calculateBoxDeliveryCostsInBatch = async boxesIds => {
    const response = await restApiService.batchesApi.apiV1BatchesCalculateBoxDeliveryCostsInBatchPost({
      body: { boxesIds },
    })
    return response.data
  }

  requestSendBoxToBatch = async boxesIds => {
    const response = await restApiService.batchesApi.apiV1BatchesRequestSendBoxesToBatchPost({
      body: { cancel: false, boxesIds },
    })
    return response.data
  }

  createBatch = async body => {
    const response = await restApiService.batchesApi.apiV1BatchesPost({
      body,
    })
    return response.data
  }

  changeBatch = async (guid, body) => {
    const response = await restApiService.batchesApi.apiV1BatchesGuidPatch({
      guid,
      body,
    })
    return response.data
  }

  removeBoxFromBatch = async (guid, boxesIds) => {
    const response = await restApiService.batchesApi.apiV1BatchesGuidRemoveBoxesPatch({
      guid,
      body: { boxesIds },
    })
    return response.data
  }

  addBoxToBatch = async (guid, boxesIds) => {
    const response = await restApiService.batchesApi.apiV1BatchesGuidAddBoxesPatch({
      guid,
      body: { boxesIds },
    })
    return response.data
  }

  confirmSentToBatch = async guid => {
    const response = await restApiService.batchesApi.apiV1BatchesGuidBatchHasDispatchedPatch({ guid })
    return response.data
  }

  editAttachedDocuments = async (guid, data) => {
    const response = await restApiService.batchesApi.apiV1BatchesGuidEditAttachedDocumentsPatch({
      guid,
      body: { attachedDocuments: data },
    })
    return response.data
  }

  getBatchesbyProduct = async (guid, archive) => {
    const response = await restApiService.batchesApi.apiV1BatchesByProductGuidGet({
      guid,
      archive,
    })
    return response.data
  }

  getBatchesByGuid = async guid => {
    const response = await restApiService.batchesApi.apiV1BatchesGuidGet({ guid })
    return response.data
  }

  getBatchesWithFiltersPag = async body => {
    const response = await restApiService.batchesApi.apiV1BatchesWithFiltersGet(body)
    return response.data
  }
  editUpdateBatches = async body => {
    const response = await restApiService.batchesApi.apiV1BatchesArchivePatch({
      body,
    })
    return response.data
  }
}

export const BatchesModel = new BatchesModelStatic()
