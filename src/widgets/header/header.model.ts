import { makeAutoObservable } from 'mobx'

import { snackNoticeKey } from '@constants/keys/snack-notifications'
import { UserRole, UserRoleCodeMapForRoutes, mapUserRoleEnumToKey } from '@constants/keys/user-roles'

import { ChatModel } from '@models/chat-model'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { restApiService } from '@services/rest-api-service/rest-api-service'

import { IFullUser } from '@typings/shared/full-user'
import { HistoryType } from '@typings/types/history'

export class HeaderModel {
  history?: HistoryType
  requestStatus = undefined
  error = undefined

  get userInfo() {
    return UserModel.userInfo as unknown as IFullUser
  }
  get showHints() {
    return SettingsModel.showHints
  }
  get snackNotifications() {
    return SettingsModel.snackNotifications
  }
  get simpleChats() {
    return ChatModel.simpleChats
  }
  get simpleMessageCrmItemId() {
    return (SettingsModel.snackNotifications[snackNoticeKey.SIMPLE_MESSAGE] as any)?.crmItemId || null
  }
  get toggleServerSettings() {
    return ChatModel.toggleServerSettings
  }

  constructor(history: HistoryType) {
    this.history = history

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  checkMessageIsRead(message: any) {
    const findChat = this.simpleChats.find(el => el._id === message.chatId)
    const findMessage = findChat?.messages.find(el => el._id === message._id)

    return findMessage ? findMessage.isRead : false
  }

  onExitFromRole() {
    UserModel.signOut()
  }

  onTriggerShowHints() {
    SettingsModel.onTriggerShowHints()
  }

  async onChangeUserInfo(role: any) {
    try {
      await UserModel.changeUserInfo(role)
      await this.forceUpdateToken()
      await UserModel.getUserInfo()

      this.history?.push(`/${UserRoleCodeMapForRoutes[role]}/dashboard`, {
        targetRoute: `/${UserRoleCodeMapForRoutes[role]}/dashboard`,
      })
    } catch (error) {
      console.error(error)
    }
  }

  async forceUpdateToken() {
    const userModel = await SettingsModel.loadValue('UserModel')
    const refreshToken = userModel.refreshToken

    await restApiService.userApi.apiV1UsersGetAccessTokenPost({ body: { refreshToken } }).then(({ data }) => {
      const accessToken = data?.accessToken

      SettingsModel.saveValue('UserModel', { ...userModel, accessToken })
      UserModel.setAccessToken(accessToken)

      ChatModel.disconnect()
      ChatModel.init(accessToken)
    })
  }

  onClickMessage(noticeItem: any) {
    if (!noticeItem.chatId) {
      return
    }

    if (!noticeItem.crmItemId) {
      this.history?.push(`/${UserRoleCodeMapForRoutes[this.userInfo.role]}/messages`, {
        chatId: noticeItem.chatId,
      })
    } else {
      switch (this.userInfo.role) {
        case mapUserRoleEnumToKey[UserRole.CLIENT]:
          return this.history?.push(`/client/freelance/my-requests/custom-request?request-id=${noticeItem.crmItemId}`, {
            chatId: noticeItem.chatId,
          })

        case mapUserRoleEnumToKey[UserRole.FREELANCER]:
          return this.history?.push(
            `/freelancer/freelance/my-proposals/custom-search-request?request-id=${noticeItem.crmItemId}`,
            {
              chatId: noticeItem.chatId,
            },
          )

        default:
          return
      }
    }
  }

  clearSnackNoticeByKey(key: any) {
    SettingsModel.setSnackNotifications({ key, notice: null })
  }
}
