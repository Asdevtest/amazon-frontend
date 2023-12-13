import { OtherModel } from '@models/other-model'

import { restApiService } from '@services/rest-api-service/rest-api-service'

import { filterNullValues } from '@utils/object'

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
      return '/uploads/' + fileName
    } catch (error) {
      console.log(error)
    }
  }

  updateRequestProposalCustom = async (guid, body) => {
    const response = await restApiService.RequestProposalsApi.apiV1RequestProposalsGuidProposalEditPatch({
      guid,
      body,
    })
    return response.data
  }

  getRequestProposalsCustomByRequestId = async guid => {
    const response = await restApiService.RequestProposalsApi.apiV1RequestProposalsCustomByRequestIdGuidGet({ guid })
    return response.data
  }

  getRequestProposalsCustom = async guid => {
    const response = await restApiService.RequestProposalsApi.apiV1RequestProposalsCustomGuidGet({ guid })
    return response.data
  }

  requestProposalAccept = async guid => {
    const response = await restApiService.RequestProposalsApi.apiV1RequestProposalsGuidProposalAcceptPatch({
      guid,
    })
    return response.data
  }

  requestProposalReject = async guid => {
    const response = await restApiService.RequestProposalsApi.apiV1RequestProposalsGuidProposalRejectPatch({ guid })
    return response
  }

  requestProposalCorrected = async (guid, body) => {
    const response = await restApiService.RequestProposalsApi.apiV1RequestProposalsGuidProposalCorrectedPatch({
      guid,
      body,
    })
    return response.data
  }

  requestProposalReadyToVerify = async guid => {
    const response = await restApiService.RequestProposalsApi.apiV1RequestProposalsGuidReadyToVerifyPatch({
      guid,
    })
    return response.data
  }

  requestProposalResultToCorrect = async (guid, body) => {
    const response = await restApiService.RequestProposalsApi.apiV1RequestProposalsGuidResultToCorrectPatch({
      guid,
      body,
    })
    return response.data
  }

  requestProposalResultCorrected = async (guid, body) => {
    const response = await restApiService.RequestProposalsApi.apiV1RequestProposalsGuidResultCorrectedPatch({
      guid,
      body,
    })
    return response.data
  }

  requestProposalResultAccept = async (guid, body) => {
    const response = await restApiService.RequestProposalsApi.apiV1RequestProposalsGuidResultAcceptPatch({ guid, body })
    return response.data
  }

  requestProposalCancelBeforDeal = async (guid, body) => {
    const response = await restApiService.RequestProposalsApi.apiV1RequestProposalsGuidCancelBeforeDealPatch({
      guid,
      body,
    })
    return response.data
  }

  requestProposalCancel = async (guid, body) => {
    const response = await restApiService.RequestProposalsApi.apiV1RequestProposalsGuidCancelPatch({ guid, body })
    return response.data
  }

  requestProposalLinkOrUnlinkSupervisor = async (guid, body) => {
    const response = await restApiService.RequestProposalsApi.apiV1RequestProposalsGuidLinkOrUnlinkSupervisorPatch({
      guid,
      body,
    })
    return response.data
  }

  requestProposalResultEdit = async (guid, body) => {
    const response = await restApiService.RequestProposalsApi.apiV1RequestProposalsCustomGuidResultEditPatch({
      guid,
      body,
    })
    return response.data
  }

  getRequestProposalsForSupervisor = async (type, kind) => {
    const response = await restApiService.RequestProposalsApi.apiV1RequestProposalsGet({ type, kind })
    return response.data
  }

  getFreelanceSourceFiles = async () => {
    const response = await restApiService.RequestProposalsApi.apiV1RequestProposalsFreelanceSourcesGet()
    return response.data
  }

  patchFreelanceSourceFilesByGuid = async (guid, body) => {
    const response = await restApiService.RequestProposalsApi.apiV1RequestProposalsFreelanceSourcesGuidPatch({
      guid,
      body,
    })
    return response.data
  }

  getRequestProposalsPagMy = async opts => {
    const response = await restApiService.RequestProposalsApi.apiV1RequestProposalsPagMyGet(filterNullValues(opts))
    return response.data
  }
}

export const RequestProposalModel = new RequestProposalModelStatic()
