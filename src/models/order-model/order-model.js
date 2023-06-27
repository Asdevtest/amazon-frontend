import { restApiService } from '@services/rest-api-service/rest-api-service'

class OrderModelStatic {
  changeOrderComments = async (id, data) => {
    const response = await restApiService.orderApi.apiV1OrdersCommentGuidPatch(id, { body: data })
    return response
  }

  changeOrderData = async (id, data) => {
    const response = await restApiService.orderApi.apiV1OrdersPendingGuidPatch(id, { body: data })
    return response
  }

  orderReadyForBoyout = async id => {
    const response = await restApiService.orderApi.apiV1OrdersReadyToBuyoutGuidPatch(id)
    return response
  }

  checkPendingOrderByProductGuid = async id => {
    const response = await restApiService.orderApi.apiV1OrdersCheckPendingOrderByProductGuidGet(id)
    return response
  }
}

export const OrderModel = new OrderModelStatic()
