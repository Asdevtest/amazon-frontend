import { restApiService } from '@services/rest-api-service/rest-api-service'

class ParserModelStatic {
  getProfiles = async body => {
    const response = await restApiService.parserApi.apiV1IntegrationsParserAdminsProfilesGet({ ...body, noCache: true })
    return response.data
  }

  getProfilesForRequest = async body => {
    const response = await restApiService.parserApi.apiV1IntegrationsParserAdminsProfilesForRequestGuidGet({
      ...body,
      noCache: true,
    })
    return response.data
  }

  createProfile = async body => {
    const response = await restApiService.parserApi.apiV1IntegrationsParserAdminsProfilesPost({ body })
    return response.data
  }

  editProfile = async (guid, body) => {
    const response = await restApiService.parserApi.apiV1IntegrationsParserAdminsProfilesGuidPatch({ guid, body })
    return response.data
  }

  getRequests = async body => {
    const response = await restApiService.parserApi.apiV1IntegrationsParserAdminsProfilesReceivingRequestsGet({
      ...body,
      noCache: true,
    })
    return response.data
  }

  forceStart = async data => {
    const response = await restApiService.parserApi.apiV1IntegrationsParserAdminsProfilesStartPatch({
      body: { profileIds: data },
    })
    return response.data
  }

  forceStop = async data => {
    const response = await restApiService.parserApi.apiV1IntegrationsParserAdminsProfilesStopPatch({
      body: { profileIds: data },
    })
    return response.data
  }

  parsingProfile = async data => {
    const response = await restApiService.parserApi.apiV1IntegrationsParserClientsProfilesReceivingPost({
      body: { shopId: data },
    })
    return response.data
  }

  parsingAccess = async data => {
    const response = await restApiService.parserApi.apiV1IntegrationsParserClientsProfilesCheckPatch({
      body: { email: data },
    })
    return response.data
  }

  parsingStatus = async (guid, data) => {
    const response = await restApiService.parserApi.apiV1IntegrationsParserClientsProfilesGuidPatch({
      guid,
      body: { isActive: data },
    })
    return response.data
  }

  approveProfile = async (guid, data) => {
    const response = await restApiService.parserApi.apiV1IntegrationsParserAdminsProfilesApproveGuidPatch({
      guid,
      body: { profileId: data },
    })
    return response.data
  }

  rejectProfile = async guid => {
    const response = await restApiService.parserApi.apiV1IntegrationsParserAdminsProfilesRejectGuidPatch({ guid })
    return response.data
  }

  parsingProfileInvited = async guid => {
    const response = await restApiService.parserApi.apiV1IntegrationsParserClientsProfilesGuidInvitedPatch({ guid })
    return response.data
  }

  parsingProfileRegistred = async guid => {
    const response = await restApiService.parserApi.apiV1IntegrationsParserAdminsProfilesGuidRegisteredPatch({ guid })
    return response.data
  }

  parsingProfileRemoved = async guid => {
    const response = await restApiService.parserApi.apiV1IntegrationsParserAdminsProfilesGuidDelete({ guid })
    return response.data
  }

  bindProductToTable = async body => {
    const response = await restApiService.parserApi.apiV1IntegrationsParserClientsProductsLinkSkuPatch({ body })
    return response.data
  }

  getFieldsInventoryIntegration = async () => {
    const response = await restApiService.parserApi.apiV1IntegrationsParserFieldsForInventoryGet()
    return response.data
  }
}

export const ParserModel = new ParserModelStatic()
