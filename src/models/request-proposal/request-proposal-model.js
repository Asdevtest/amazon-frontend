import { BACKEND_API_URL } from '@constants/keys/env'

import { OtherModel } from '@models/other-model'

import { restApiService } from '@services/rest-api-service/rest-api-service'

class RequestProposalModelStatic {
  async onPostFile(fileData) {
    const formData = new FormData()

    const fileWithoutSpaces = new File([fileData], fileData.name.replace(/ /g, ''), {
      type: fileData.type,
      lastModified: fileData.lastModified,
    })

    formData.append('filename', fileWithoutSpaces)

    try {
      const fileName = await OtherModel.postImage(formData)
      return BACKEND_API_URL + '/uploads/' + fileName
    } catch (error) {
      console.log('error', error)
    }
  }

  createRequestProposalCustom = async (requestId, data) => {
    const response = await restApiService.RequestProposalsApi.apiV1RequestProposalsCustomPost({
      body: {
        requestId,
        details: data,
      },
    })
    return response
  }

  updateRequestProposalCustom = async (id, data) => {
    const response = await restApiService.RequestProposalsApi.apiV1RequestProposalsGuidProposalEditPatch(id, {
      body: { ...data },
    })
    return response
  }

  deleteRequestProposalCustom = async id => {
    const response = await restApiService.RequestProposalsApi.apiV1RequestProposalsCustomGuidDelete(id)
    return response
  }

  getRequestProposalsCustomByRequestId = async requestId => {
    const response = await restApiService.RequestProposalsApi.apiV1RequestProposalsCustomByRequestIdGuidGet(requestId)
    return response
  }

  getRequestProposalsCustom = async proposalId => {
    const response = await restApiService.RequestProposalsApi.apiV1RequestProposalsCustomGuidGet(proposalId)
    return response
  }

  requestProposalAccept = async proposalId => {
    const response = await restApiService.RequestProposalsApi.apiV1RequestProposalsGuidProposalAcceptPatch(proposalId, {
      body: {},
    })
    return response
  }

  requestProposalReject = async proposalId => {
    const response = await restApiService.RequestProposalsApi.apiV1RequestProposalsGuidProposalRejectPatch(proposalId, {
      body: {},
    })
    return response
  }

  requestProposalCorrected = async (proposalId, data) => {
    const response = await restApiService.RequestProposalsApi.apiV1RequestProposalsGuidProposalCorrectedPatch(
      proposalId,
      { body: data },
    )
    return response
  }

  requestProposalReadyToVerify = async proposalId => {
    const response = await restApiService.RequestProposalsApi.apiV1RequestProposalsGuidReadyToVerifyPatch(proposalId, {
      body: {},
    })
    return response
  }

  requestProposalResultToCorrect = async (proposalId, data) => {
    const response = await restApiService.RequestProposalsApi.apiV1RequestProposalsGuidResultToCorrectPatch(
      proposalId,
      { body: data },
    )
    return response
  }

  requestProposalResultCorrected = async (proposalId, data) => {
    const response = await restApiService.RequestProposalsApi.apiV1RequestProposalsGuidResultCorrectedPatch(
      proposalId,
      { body: data },
    )
    return response
  }

  requestProposalResultAccept = async (proposalId, data) => {
    const response = await restApiService.RequestProposalsApi.apiV1RequestProposalsGuidResultAcceptPatch(proposalId, {
      body: data || {},
    })
    return response
  }

  requestProposalCancelBeforDeal = async (proposalId, data) => {
    const response = await restApiService.RequestProposalsApi.apiV1RequestProposalsGuidCancelBeforeDealPatch(
      proposalId,
      {
        body: data || {},
      },
    )
    return response
  }

  requestProposalCancel = async (proposalId, data) => {
    const response = await restApiService.RequestProposalsApi.apiV1RequestProposalsGuidCancelPatch(proposalId, {
      body: data || {},
    })
    return response
  }

  requestProposalLinkOrUnlinkSupervisor = async (proposalId, data) => {
    const response = await restApiService.RequestProposalsApi.apiV1RequestProposalsGuidLinkOrUnlinkSupervisorPatch(
      proposalId,
      { body: data },
    )
    return response
  }

  requestProposalResultEdit = async (proposalId, data) => {
    const response = await restApiService.RequestProposalsApi.apiV1RequestProposalsCustomGuidResultEditPatch(
      proposalId,
      { body: data },
    )
    return response
  }

  getRequestProposalsForSupervisor = async (type, requestsType) => {
    const response = await restApiService.RequestProposalsApi.apiV1RequestProposalsGet(type, requestsType)
    return response
  }

  getFreelanceSourceFiles = async () => {
    const response = await restApiService.RequestProposalsApi.apiV1RequestProposalsFreelanceSourcesGet()
    return response
  }

  patchFreelanceSourceFilesByGuid = async (id, data) => {
    const response = await restApiService.RequestProposalsApi.apiV1RequestProposalsFreelanceSourcesGuidPatch(id, {
      body: data,
    })
    return response
  }

  deleteFreelanceSourceFilesByGuid = async id => {
    const response = await restApiService.RequestProposalsApi.apiV1RequestProposalsFreelanceSourcesGuidDelete(id)
    return response
  }
}

export const RequestProposalModel = new RequestProposalModelStatic()
