import {restApiService} from '@services/rest-api-service/rest-api-service'

class OrderModelStatic {
  changeOrderComments = async (id, data) => {
    const response = await restApiService.orderApi.apiV1OrdersCommentGuidPatch(id, {body: data})
    return response
  }
}

export const OrderModel = new OrderModelStatic()
