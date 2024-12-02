import { restApiService } from '@services/rest-api-service/rest-api-service'

class FeedbackModelStatic {
  sendFeedback = async (guid, body) => {
    await restApiService.userApi.apiV1UsersFeedbackGuidPost({
      guid,
      body,
    })
  }

  getFeedback = async (guid, body) => {
    const response = await restApiService.userApi.apiV1UsersFeedbackGuidGet({ guid, noCache: true, ...body })
    return response.data
  }

  getMyFeedback = async () => {
    const response = await restApiService.userApi.apiV1UsersFeedbackMyGet()
    return response.data
  }

  getSupplierFeedbacks = async guid => {
    const response = await restApiService.userApi.apiV1UsersFeedbackSupplierGuidGet({ guid })
    return response.data
  }

  async getSupplierReviewsById(guid, body) {
    const response = await restApiService.userApi.apiV1UsersFeedbackSupplierGuidGet({ guid, noCache: true, ...body })
    return response.data
  }
}

export const FeedbackModel = new FeedbackModelStatic()
