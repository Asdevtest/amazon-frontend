import {restApiService} from '@services/rest-api-service/rest-api-service'

class RequestProposalModelStatic {
  createRequestProposalCustom = async (requestId, data) => {
    const response = await restApiService.SearchRequestProposalApi.apiV1RequestProposalsCustomPost({
      body: {
        requestId,
        details: data,
      },
    })
    return response
  }

  updateRequestProposalCustom = async (id, data) => {
    const response = await restApiService.SearchRequestProposalApi.apiV1RequestProposalsGuidProposalEditPatch(id, {
      body: data,
    })
    return response
  }

  deleteRequestProposalCustom = async id => {
    const response = await restApiService.SearchRequestProposalApi.apiV1RequestProposalsCustomGuidDelete(id)
    return response
  }

  getRequestProposalsCustomByRequestId = async requestId => {
    const response = await restApiService.SearchRequestProposalApi.apiV1RequestProposalsCustomByRequestIdGuidGet(
      requestId,
    )
    return response
  }

  getRequestProposalsCustomByRequestId = async requestId => {
    const response = await restApiService.SearchRequestProposalApi.apiV1RequestProposalsCustomByRequestIdGuidGet(
      requestId,
    )
    return response
  }
}

export const RequestProposalModel = new RequestProposalModelStatic()
