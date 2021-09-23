import {restApiService} from '@services/rest-api-service/rest-api-service'

export class BatchesModelStatic {
  getBatches = async () => {
    const response = await restApiService.batchesApi.apiV1BatchesGet()
    return response
  }
}

export const BatchesModel = new BatchesModelStatic()
