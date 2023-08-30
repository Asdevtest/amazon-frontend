import { restApiService } from '@services/rest-api-service/rest-api-service'

class FeedbackModelStatic {
  sendFeedback = async (guid, feedback) => {
    const response = await restApiService.userApi.apiV1UsersFeedbackGuidPost(guid, {
      body: feedback,
    })
  }
}

export const FeedbackModel = new FeedbackModelStatic()
