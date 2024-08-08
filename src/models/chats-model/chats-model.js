import { restApiService } from '@services/rest-api-service/rest-api-service'

class ChatsModelStatic {
  createSimpleChatByUserId = async guid => {
    const response = await restApiService.chatsApi.apiV1ChatsGuidPost({ guid })
    return response.data
  }

  createSimpleGroupChat = async data => {
    const response = await restApiService.chatsApi.apiV1ChatsGroupPost({ body: data })
    return response.data
  }

  getUsersNames = async () => {
    const response = await restApiService.chatsApi.apiV1ChatsNamesGet()
    return response.data
  }

  getPagChatMedia = async options => {
    const response = await restApiService.chatsApi.apiV1ChatsMediaPagGuidGet(options)
    return response.data
  }

  joinChat = async guid => {
    const response = await restApiService.chatsApi.apiV1ChatsJoinGuidPost({ guid })
    return response.data
  }
}

export const ChatsModel = new ChatsModelStatic()
