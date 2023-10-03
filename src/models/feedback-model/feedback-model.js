import { restApiService } from '@services/rest-api-service/rest-api-service'

class FeedbackModelStatic {
  sendFeedback = async (guid, feedback) => {
    await restApiService.userApi.apiV1UsersFeedbackGuidPost(guid, {
      body: feedback,
    })
    return response
  }

  getFeedback = async guid => {
    const response = await restApiService.userApi.apiV1UsersFeedbackGuidGet(guid)
    return response
  }

  getMyFeedback = async () => {
    const response = await restApiService.userApi.apiV1UsersFeedbackMyGet()
    return response
  }
}

export const FeedbackModel = new FeedbackModelStatic()
