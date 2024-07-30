import { restApiService } from '@services/rest-api-service/rest-api-service'

class ParserModelStatic {
  getProfiles = async body => {
    const response = await restApiService.parserApi.apiV1IntegrationsParserAdminsProfilesGet(body)
    return response.data
  }

  createProfile = async body => {
    const response = await restApiService.parserApi.apiV1IntegrationsParserAdminsProfilesPost(body)
    return response.data
  }

  editProfile = async (guid, body) => {
    const response = await restApiService.parserApi.apiV1IntegrationsParserAdminsProfilesGuidPatch(guid, body)
    return response.data
  }

  getRequests = async body => {
    const response = await restApiService.parserApi.apiV1IntegrationsParserAdminsProfilesReceivingRequestsGet(body)
    return response.data
  }
}

export const ParserModel = new ParserModelStatic()
