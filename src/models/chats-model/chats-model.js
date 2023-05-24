import { restApiService } from '@services/rest-api-service/rest-api-service'

class ChatsModelStatic {
  createSimpleChatByUserId = async id => {
    const response = await restApiService.chatsApi.apiV1ChatsGuidPost(id)
    return response
  }

  createSimpleGroupChat = async data => {
    const response = await restApiService.chatsApi.apiV1ChatsGroupPost({ body: data })
    return response
  }

  createSimpleChatByUserEmail = async email => {
    const response = await restApiService.chatsApi.apiV1ChatsByEmailPost({ body: { email } })
    return response
  }

  getUsersEmails = async () => {
    const response = await restApiService.chatsApi.apiV1ChatsEmailsGet()
    return response
  }

  getUsersNames = async () => {
    const response = await restApiService.chatsApi.apiV1ChatsNamesGet()
    return response
  }
}

export const ChatsModel = new ChatsModelStatic()
