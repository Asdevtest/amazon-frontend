import { restApiService } from '@services/rest-api-service/rest-api-service'

class GeneralModelStatic {
  getDataForColumn = async (table, column, endpoint) => {
    const response = await restApiService.generalApi.apiV1GeneralDataFiltersGet({ table, column, endpoint })
    return response.data
  }

  getTagList = async () => {
    const response = await restApiService.generalApi.apiV1GeneralTagsGet()
    return response.data
  }

  getPagTagList = async options => {
    const response = await restApiService.generalApi.apiV1GeneralTagsPagGet(options)
    return response.data
  }

  createTag = async body => {
    const response = await restApiService.generalApi.apiV1GeneralTagsPost({ body })
    return response.data
  }
}

export const GeneralModel = new GeneralModelStatic()
