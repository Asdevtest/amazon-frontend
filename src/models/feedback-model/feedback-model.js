import { restApiService } from '@services/rest-api-service/rest-api-service'

class FeedbackModelStatic {
  sendFeedback = async (guid, body) => {
    await restApiService.userApi.apiV1UsersFeedbackGuidPost({
      guid,
      body,
    })
  }

  getFeedback = async guid => {
    const response = await restApiService.userApi.apiV1UsersFeedbackGuidGet({ guid })
    return response.data
  }

  getMyFeedback = async () => {
    const response = await restApiService.userApi.apiV1UsersFeedbackMyGet()
    return response.data
  }
}

export const FeedbackModel = new FeedbackModelStatic()
