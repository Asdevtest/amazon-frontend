import {restApiService} from '@services/rest-api-service/rest-api-service'

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
    const response = await restApiService.SearchRequestApi.apiV1RequestsSearchProductsGuidDelete(id, {body: {}})
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

  getRequests = async (type, subType) => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsGet(type, {kind: subType})
    return response
  }

  getCustomRequestById = async id => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsCustomGuidGet(id)
    return response
  }

  getRequestProposalsCustomByRequestId = async requestId => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsCustomGuidProposalsGet(requestId)
    return response
  }

  pickupRequestById = async id => {
    const response = await restApiService.SearchRequestApi.apiV1RequestsGuidPickupPost(id, {body: {}})
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
      body: {requestProposalIds},
    })
    return response
  }
}

export const RequestModel = new RequestModelStatic()
