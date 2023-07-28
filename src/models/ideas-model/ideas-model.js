import { restApiService } from '@services/rest-api-service/rest-api-service'

class IdeaModelStatic {
  getIdeas = async parentId => {
    const response = await restApiService.ideaApi.apiV1IdeasByParentGuidGet(parentId)
    return response
  }

  getIdeaList = async data => {
    const response = await restApiService.ideaApi.apiV1IdeasPagMyGet(data)
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

  checkIdea = async id => {
    const response = await restApiService.ideaApi.apiV1IdeasOnCheckingGuidPatch(id)
    return response
  }

  changeStatusToSupplierSearchIdea = async id => {
    const response = await restApiService.ideaApi.apiV1IdeasSupplierSearchGuidPatch(id)
    return response
  }

  changeStatusToSupplierFound = async id => {
    const response = await restApiService.ideaApi.apiV1IdeasSupplierFoundGuidPatch(id)
    return response
  }

  changeStatusToSupplierNotFound = async id => {
    const response = await restApiService.ideaApi.apiV1IdeasSupplierNotFoundGuidPatch(id)
    return response
  }

  changeStatusToProductCreating = async id => {
    const response = await restApiService.ideaApi.apiV1IdeasProductCreatingGuidPatch(id)
    return response
  }

  changeStatusToAddingAsin = async id => {
    const response = await restApiService.ideaApi.apiV1IdeasAddingAsinGuidPatch(id)
    return response
  }

  changeStatusToFinished = async id => {
    const response = await restApiService.ideaApi.apiV1IdeasFinishedGuidPatch(id)
    return response
  }

  rejectIdea = async id => {
    const response = await restApiService.ideaApi.apiV1IdeasRejectedGuidPatch(id)
    return response
  }

  reopenIdea = async id => {
    const response = await restApiService.ideaApi.apiV1IdeasReopenGuidPatch(id)
    return response
  }
}

export const IdeaModel = new IdeaModelStatic()
