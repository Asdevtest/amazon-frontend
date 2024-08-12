import { restApiService } from '@services/rest-api-service/rest-api-service'

class ParserModelStatic {
  getProfiles = async body => {
    const response = await restApiService.parserApi.apiV1IntegrationsParserAdminsProfilesGet({ ...body, noCache: true })
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

  onForceStart = async data => {
    const response = await restApiService.parserApi.apiV1IntegrationsParserAdminsProfilesStartPatch({
      body: { profileIds: data },
    })
    return response.data
  }

  onForceStop = async data => {
    const response = await restApiService.parserApi.apiV1IntegrationsParserAdminsProfilesStopPatch({
      body: { profileIds: data },
    })
    return response.data
  }

  onParsingProfile = async data => {
    const response = await restApiService.parserApi.apiV1IntegrationsParserClientsProfilesReceivingPost({
      body: { shopId: data },
    })
    return response.data
  }

  onParsingAccess = async data => {
    const response = await restApiService.parserApi.apiV1IntegrationsParserClientsProfilesCheckPatch({
      body: { email: data },
    })
    return response.data
  }

  onParsingStatus = async (guid, data) => {
    const response = await restApiService.parserApi.apiV1IntegrationsParserClientsProfilesGuidPatch({
      guid,
      body: { isActive: data },
    })
    return response.data
  }

  onApproveProfile = async (guid, data) => {
    const response = await restApiService.parserApi.apiV1IntegrationsParserAdminsProfilesApproveGuidPatch({
      guid,
      body: { profileId: data },
    })
    return response.data
  }

  onRejectProfile = async guid => {
    const response = await restApiService.parserApi.apiV1IntegrationsParserAdminsProfilesRejectGuidPatch({ guid })
    return response.data
  }
}

export const ParserModel = new ParserModelStatic()
