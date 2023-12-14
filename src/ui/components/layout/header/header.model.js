import { makeAutoObservable } from 'mobx'

import { snackNoticeKey } from '@constants/keys/snack-notifications'
import { UserRole, UserRoleCodeMapForRoutes, mapUserRoleEnumToKey } from '@constants/keys/user-roles'

import { ChatModel } from '@models/chat-model'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { restApiService } from '@services/rest-api-service/rest-api-service'

export class HeaderModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  get role() {
    return UserModel.userInfo?.role
  }

  get allowedRoles() {
    return UserModel.userInfo?.allowedRoles
  }

  get balance() {
    return UserModel.userInfo?.balance
  }

  get userName() {
    return UserModel.userInfo?.name
  }

  get userId() {
    return UserModel.userInfo?._id
  }

  get masterUser() {
    return UserModel.userInfo?.masterUser
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
    return SettingsModel.snackNotifications[snackNoticeKey.SIMPLE_MESSAGE]?.crmItemId || null
  }

  constructor({ history }) {
    this.history = history
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  checkMessageIsRead(message) {
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

  async changeUserInfo(data) {
    try {
      await UserModel.changeUserInfo(data)
      await this.forceUpdateToken()
      await UserModel.getUserInfo()

      this.history.push(`/${UserRoleCodeMapForRoutes[data.role]}/dashboard`, {
        targetRoute: `/${UserRoleCodeMapForRoutes[data.role]}/dashboard`,
      })
    } catch (error) {
      console.log(error)
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

  changeUiTheme(theme) {
    SettingsModel.setUiTheme(theme)
  }

  onClickMessage(noticeItem) {
    if (!noticeItem.chatId) {
      return
    }

    if (!noticeItem.crmItemId) {
      this.history.push(`/${UserRoleCodeMapForRoutes[this.role]}/messages`, {
        chatId: noticeItem.chatId,
      })
    } else {
      switch (this.role) {
        case mapUserRoleEnumToKey[UserRole.CLIENT]:
          return this.history.push(`/client/freelance/my-requests/custom-request?request-id=${noticeItem.crmItemId}`, {
            chatId: noticeItem.chatId,
          })

        case mapUserRoleEnumToKey[UserRole.FREELANCER]:
          return this.history.push(
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

  clearSnackNoticeByKey(key) {
    SettingsModel.setSnackNotifications({ key, notice: null })
  }
}
