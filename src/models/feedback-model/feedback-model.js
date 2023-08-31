import { restApiService } from '@services/rest-api-service/rest-api-service'

class FeedbackModelStatic {
  sendFeedback = async (guid, feedback) => {
    const response = await restApiService.userApi.apiV1UsersFeedbackGuidPost(guid, {
      body: feedback,
    })
  }

  getFeedback = async guid => {
    const response = await restApiService.userApi.apiV1UsersFeedbackGuidGet(guid)
    return response
  }
}

export const FeedbackModel = new FeedbackModelStatic()
