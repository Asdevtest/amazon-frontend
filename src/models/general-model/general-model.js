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

  createTag = async title => {
    const response = await restApiService.generalApi.apiV1GeneralTagsPost({ body: { title } })
    return response.data
  }
}

export const GeneralModel = new GeneralModelStatic()
