import { restApiService } from '@services/rest-api-service/rest-api-service'

class RequestModelStatic {
  createProductSearchRequest = async data => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsSearchProductsPost({
      body: data,
    })
    return response
  }

  getProductSearchRequests = async () => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsSearchProductsGet()
    return response
  }

  updateProductSearchRequest = async (id, data) => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsSearchProductsGuidPatch(id, {
      body: data,
    })
    return response
  }

  removeProductSearchRequests = async id => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsSearchProductsGuidDelete(id, { body: {} })
    return response
  }

  createNicheSearchRequest = async data => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsSearchNichePost({
      body: data,
    })
    return response
  }

  getNicheSearchRequests = async () => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsSearchNicheGet()
    return response
  }

  updateNicheSearchRequest = async (id, data) => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsSearchNicheGuidPatch(id, {
      body: data,
    })
    return response
  }

  removeNicheSearchRequests = async id => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsSearchNicheGuidDelete(id, {
      body: {},
    })
    return response
  }

  createCustomSearchRequest = async data => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsCustomPost({
      body: data,
    })
    return response
  }

  getRequestProposalsCustomByRequestId = async requestId => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsCustomGuidProposalsGet(requestId)
    return response
  }

  updateCustomRequest = async (id, data) => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsCustomGuidPatch(id, {
      body: data,
    })
    return response
  }

  removeCustomRequests = async id => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsCustomGuidDelete(id, {
      body: {},
    })
    return response
  }

  completeRequest = async (requestId, requestProposalIds) => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsGuidCompletePost(requestId, {
      body: { requestProposalIds },
    })
    return response
  }

  // НОВЫЕ -------------------------------------------------------------- 11.02.2022
  createRequest = async data => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsCustomPost({
      body: data,
    })
    return response
  }

  editRequest = async (id, data) => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsCustomGuidPatch(id, {
      body: data,
    })
    return response
  }

  deleteRequest = async id => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsGuidDelete(id)
    return response
  }

  getRequests = async (type, opts) => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsGet(type, opts)
    return response
  }

  getRequestsCustom = async userId => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsCustomGet(userId)
    return response
  }

  getCustomRequestById = async id => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsCustomGuidGet(id)
    return response
  }

  pickupRequestById = async (id, data) => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsGuidPickupPost(id, { body: data })
    return response
  }

  calculateRequestCost = async id => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsCalculateRequestCostGuidGet(id)
    return response
  }

  toPublishRequest = async (id, data) => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsGuidToPublishPatch(id, { body: data })
    return response
  }

  abortRequest = async (id, data) => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsGuidAbortPatch(id, {
      body: data,
    })
    return response
  }

  createSimpleChatByUserId = async id => {
    const response = await restApiService.SearchRequestApi.apiV1ChatsGuidPost(id)
    return response
  }

  editRequestsMediaMany = async data => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsMediaManyPatch({ body: data })
    return response
  }

  updateDeadline = async (id, timeoutAt, maxAmountOfProposals) => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsGuidUpdateDeadlinePatch(id, {
      body: {
        timeoutAt,
        maxAmountOfProposals,
      },
    })
    return response
  }

  getExistingRequestsTypeRequests = async (typeTask, id) => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsGetExistingRequestsTypeTaskGuidGet(id, typeTask)
    return response
  }

  patchRequestsUploadedToListing = async data => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsUploadedToListingPatch({
      body: data,
    })
    return response
  }

  getRequestsByProductLight = async id => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsByProductLightGuidGet(id)
    return response
  }
}

export const RequestModel = new RequestModelStatic()
