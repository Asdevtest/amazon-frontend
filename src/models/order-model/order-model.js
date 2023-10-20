import { restApiService } from '@services/rest-api-service/rest-api-service'

class OrderModelStatic {
  changeOrderComments = async (guid, body) => {
    const response = await restApiService.orderApi.apiV1OrdersCommentGuidPatch({ guid, body })
    return response.data
  }

  changeOrderData = async (guid, body) => {
    const response = await restApiService.orderApi.apiV1OrdersPendingGuidPatch({ guid, body })
    return response.data
  }

  orderReadyForBoyout = async guid => {
    const response = await restApiService.orderApi.apiV1OrdersReadyToBuyoutGuidPatch({ guid })
    return response.data
  }

  checkPendingOrderByProductGuid = async guid => {
    const response = await restApiService.orderApi.apiV1OrdersCheckPendingOrderByProductGuidGet({ guid })
    return response.data
  }
}

export const OrderModel = new OrderModelStatic()
