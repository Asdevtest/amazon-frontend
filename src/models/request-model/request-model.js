import { restApiService } from '@services/rest-api-service/rest-api-service'

import { filterNullValues } from '@utils/object'

class RequestModelStatic {
  createRequest = async body => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsCustomPost({ body })
    return response.data
  }

  editRequest = async (guid, body) => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsCustomGuidPatch({ guid, body })
    return response.data
  }

  deleteRequest = async guid => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsGuidDelete({ guid })
    return response.data
  }

  getRequests = async data => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsGet(filterNullValues(data))
    return response.data
  }

  getCustomRequestById = async guid => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsCustomGuidGet({ guid, noCache: true })
    return response.data
  }

  pickupRequestById = async (guid, body) => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsGuidPickupPost({ guid, body })
    return response.data
  }

  calculateRequestCost = async guid => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsCalculateRequestCostGuidGet({ guid })
    return response.data
  }

  toPublishRequest = async (guid, body) => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsGuidToPublishPatch({ guid, body })
    return response.data
  }

  abortRequest = async (guid, body) => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsGuidAbortPatch({ guid, body })
    return response.data
  }

  editRequestsMediaMany = async body => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsMediaManyPatch({ body })
    return response.data
  }

  updateDeadline = async (guid, timeoutAt, maxAmountOfProposals) => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsGuidUpdateDeadlinePatch({
      guid,
      body: {
        timeoutAt,
        maxAmountOfProposals,
      },
    })
    return response.data
  }

  getExistingRequestsTypeRequests = async (guid, specType) => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsGetExistingRequestsSpecTypeGuidGet({
      guid,
      specType,
    })
    return response.data
  }

  patchRequestsUploadedToListing = async body => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsUploadedToListingPatch({
      body,
    })
    return response.data
  }

  getRequestsByProductLight = async data => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsByProductLightGuidGet(filterNullValues(data))
    return response.data
  }

  bindIdeaToRequest = async (guid, data) => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsIdeasGuidPatch({ guid, body: data })
    return response.data
  }

  manualCompletedRequest = async guid => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsCompletedGuidPatch({ guid })
    return response.data
  }
}

export const RequestModel = new RequestModelStatic()
