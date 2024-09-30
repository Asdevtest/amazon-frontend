import { makeAutoObservable } from 'mobx'

import { snackNoticeKey } from '@constants/keys/snack-notifications'
import { UserRole, UserRoleCodeMapForRoutes, mapUserRoleEnumToKey } from '@constants/keys/user-roles'

import { ChatModel } from '@models/chat-model'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

export class HeaderModel {
  history = undefined
  requestStatus = undefined
  error = undefined

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

  get toggleServerSettings() {
    return ChatModel.toggleServerSettings
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

  onTriggerShowHints() {
    SettingsModel.onTriggerShowHints()
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
          return this.history.push(`/client/freelance/my-requests/custom-request?request-id=${noticeItem.crmItemId}`)

        case mapUserRoleEnumToKey[UserRole.FREELANCER]:
          return this.history.push(
            `/freelancer/freelance/my-proposals/custom-search-request?request-id=${noticeItem.crmItemId}`,
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
