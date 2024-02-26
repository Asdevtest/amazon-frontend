import { restApiService } from '@services/rest-api-service/rest-api-service'

import { filterNullValues } from '@utils/object'

class IdeaModelStatic {
  getIdeas = async guid => {
    const response = await restApiService.ideaApi.apiV1IdeasByParentGuidGet({ guid, noCache: true })
    return response.data
  }

  getIdeaList = async data => {
    const response = await restApiService.ideaApi.apiV1IdeasPagMyGet(filterNullValues(data))
    return response.data
  }

  getIdeaById = async guid => {
    const response = await restApiService.ideaApi.apiV1IdeasGuidGet({ guid, noCache: true })
    return response.data
  }

  createIdea = async data => {
    const response = await restApiService.ideaApi.apiV1IdeasPost({ body: data })
    return response.data
  }

  editIdea = async (guid, body) => {
    const response = await restApiService.ideaApi.apiV1IdeasGuidPatch({ guid, body })
    return response.data
  }

  removeIdea = async guid => {
    const response = await restApiService.ideaApi.apiV1IdeasGuidDelete({ guid })
    return response.data
  }

  addSuppliersToIdea = async (guid, body) => {
    const response = await restApiService.ideaApi.apiV1IdeasAddSuppliersGuidPost({ guid, body })
    return response.data
  }

  removeSupplierFromIdea = async (guid, body) => {
    const response = await restApiService.ideaApi.apiV1IdeasRemoveSupplierGuidPost({ guid, body })
    return response.data
  }

  checkIdea = async guid => {
    const response = await restApiService.ideaApi.apiV1IdeasOnCheckGuidPatch({ guid })
    return response.data
  }

  changeStatusToSupplierSearchIdea = async guid => {
    const response = await restApiService.ideaApi.apiV1IdeasSupplierSearchGuidPatch({ guid })
    return response.data
  }

  changeStatusToSupplierFound = async guid => {
    const response = await restApiService.ideaApi.apiV1IdeasSupplierFoundGuidPatch({ guid })
    return response.data
  }

  changeStatusToSupplierNotFound = async guid => {
    const response = await restApiService.ideaApi.apiV1IdeasSupplierNotFoundGuidPatch({ guid })
    return response.data
  }

  changeStatusToProductCreating = async guid => {
    const response = await restApiService.ideaApi.apiV1IdeasProductCreatingGuidPatch({ guid })
    return response.data
  }

  changeStatusToAddingAsin = async guid => {
    const response = await restApiService.ideaApi.apiV1IdeasAddingAsinGuidPatch({ guid })
    return response.data
  }

  changeStatusToFinished = async guid => {
    const response = await restApiService.ideaApi.apiV1IdeasFinishedGuidPatch({ guid })
    return response.data
  }

  rejectIdea = async guid => {
    const response = await restApiService.ideaApi.apiV1IdeasRejectedGuidPatch({ guid })
    return response.data
  }

  reopenIdea = async guid => {
    const response = await restApiService.ideaApi.apiV1IdeasReopenGuidPatch({ guid })
    return response.data
  }

  setStatusToCheck = async guid => {
    const response = await restApiService.ideaApi.apiV1IdeasOnCheckGuidPatch({ guid })
    return response.data
  }

  setStatusToReject = async (guid, body) => {
    const response = await restApiService.ideaApi.apiV1IdeasRejectedGuidPatch({ guid, body })
    return response.data
  }

  setStatusToSupplierSearch = async guid => {
    const response = await restApiService.ideaApi.apiV1IdeasSupplierSearchGuidPatch({ guid })
    return response.data
  }

  setStatusToProductCreating = async guid => {
    const response = await restApiService.ideaApi.apiV1IdeasProductCreatingGuidPatch({ guid })
    return response.data
  }

  setStatusToAddingAsin = async guid => {
    const response = await restApiService.ideaApi.apiV1IdeasAddingAsinGuidPatch({ guid })
    return response.data
  }

  setStatusToFinished = async guid => {
    const response = await restApiService.ideaApi.apiV1IdeasFinishedGuidPatch({ guid })
    return response.data
  }

  setStatusToClosed = async guid => {
    const response = await restApiService.ideaApi.apiV1IdeasClosedGuidPatch({ guid })
    return response.data
  }

  restore = async guid => {
    const response = await restApiService.ideaApi.apiV1IdeasReopenGuidPatch({ guid })
    return response.data
  }
}

export const IdeaModel = new IdeaModelStatic()
