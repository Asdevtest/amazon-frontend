import {restApiService} from '@services/rest-api-service/rest-api-service'

export class BatchesModelStatic {
  getBatches = async () => {
    const response = await restApiService.batchesApi.apiV1BatchesGet()
    return response
  }

  calculateBoxDeliveryCostsInBatch = async boxesIds => {
    const response = await restApiService.batchesApi.apiV1BatchesCalculateBoxDeliveryCostsInBatchPost({
      body: {boxesIds},
    })
    return response
  }

  requestSendBoxToBatch = async boxesIds => {
    const response = await restApiService.boxesApi.apiV1BoxesRequestSendBoxesToBatchPost({
      body: {cancel: false, boxesIds},
    })
    return response
  }
}

export const BatchesModel = new BatchesModelStatic()
