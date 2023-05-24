import { restApiService } from '@services/rest-api-service/rest-api-service'

class GeneralModelStatic {
  getDataForColumn = async (table, column, endpoint) => {
    const response = await restApiService.generalApi.apiV1GeneralDataFiltersGet(table, column, endpoint)
    return response
  }

  getTagList = async () => {
    const response = await restApiService.generalApi.apiV1GeneralTagsGet()
    return response
  }

  createTag = async title => {
    const response = await restApiService.generalApi.apiV1GeneralTagsPost({ body: { title } })
    return response
  }
}

export const GeneralModel = new GeneralModelStatic()
