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
}

export const BatchesModel = new BatchesModelStatic()
