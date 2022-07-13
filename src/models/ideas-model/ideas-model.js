import {restApiService} from '@services/rest-api-service/rest-api-service'

class IdeaModelStatic {
  getIdeas = async () => {
    const response = await restApiService.ideaApi.apiV1IdeasGet()
    return response
  }

  createIdea = async data => {
    const response = await restApiService.ideaApi.apiV1IdeasPost({body: data})
    return response
  }

  editIdea = async (id, data) => {
    const response = await restApiService.ideaApi.apiV1IdeasGuidPatch(id, {body: data})
    return response
  }

  removeIdea = async id => {
    const response = await restApiService.ideaApi.apiV1IdeasGuidDelete(id)
    return response
  }
}

export const IdeaModel = new IdeaModelStatic()
