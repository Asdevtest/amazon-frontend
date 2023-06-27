import { restApiService } from '@services/rest-api-service/rest-api-service'

class IdeaModelStatic {
  getIdeas = async productId => {
    const response = await restApiService.ideaApi.apiV1IdeasGet(productId && { productId })
    return response
  }

  getIdeaById = async id => {
    const response = await restApiService.ideaApi.apiV1IdeasGuidGet(id)
    return response
  }

  getSupplierSearchRequests = async () => {
    const response = await restApiService.ideaApi.apiV1IdeasGetSupplierRequestsGet()
    return response
  }

  createSupplierSearchRequestForIdea = async (id, data) => {
    const response = await restApiService.ideaApi.apiV1IdeasFindSupplierGuidPost(id, { body: data })
    return response
  }

  editSupplierSearchRequestStatus = async (id, status) => {
    const response = await restApiService.ideaApi.apiV1IdeasEditRequestsStatusGuidPatch(id, { body: status })
    return response
  }

  createIdea = async data => {
    const response = await restApiService.ideaApi.apiV1IdeasPost({ body: data })
    return response
  }

  editIdea = async (id, data) => {
    const response = await restApiService.ideaApi.apiV1IdeasGuidPatch(id, { body: data })
    return response
  }

  removeIdea = async id => {
    const response = await restApiService.ideaApi.apiV1IdeasGuidDelete(id)
    return response
  }
  addSuppliersToIdea = async (id, data) => {
    const response = await restApiService.ideaApi.apiV1IdeasAddSuppliersGuidPost(id, { body: data })
    return response
  }

  removeSupplierFromIdea = async (id, data) => {
    const response = await restApiService.ideaApi.apiV1IdeasRemoveSupplierGuidPost(id, { body: data })
    return response
  }
}

export const IdeaModel = new IdeaModelStatic()
