import {restApiService} from '@services/rest-api-service/rest-api-service'

class ChatsModelStatic {
  createSimpleChatByUserId = async id => {
    const response = await restApiService.chatsApi.apiV1ChatsGuidPost(id)
    return response
  }
}

export const ChatsModel = new ChatsModelStatic()
