import { makeAutoObservable } from 'mobx'

import { snackNoticeKey } from '@constants/keys/snack-notifications'
import { UserRole, UserRoleCodeMapForRoutes, mapUserRoleEnumToKey } from '@constants/keys/user-roles'

import { ChatModel } from '@models/chat-model'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { IMessage } from '@typings/models/chats/message'
import { IShutdownNotice } from '@typings/models/chats/shutdown-notice'
import { IFullUser } from '@typings/shared/full-user'
import { HistoryType } from '@typings/types/history'

export class HeaderModel {
  history?: HistoryType

  get userInfo() {
    return UserModel.userInfo as unknown as IFullUser
  }
  get snackNotifications() {
    return SettingsModel.snackNotifications as any
  }
  get simpleChats() {
    return ChatModel.simpleChats
  }
  get simpleMessageCrmItemId() {
    return (SettingsModel.snackNotifications[snackNoticeKey.SIMPLE_MESSAGE] as any)?.crmItemId
  }
  get toggleServerSettings() {
    return ChatModel.toggleServerSettings as IShutdownNotice
  }

  constructor(history: HistoryType) {
    this.history = history
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  checkMessageIsRead(message: IMessage) {
    const findChat = this.simpleChats.find(el => el._id === message.chatId)
    const findMessage = findChat?.messages.find(el => el._id === message._id)

    return findMessage ? findMessage.isRead : false
  }

  onClickMessage(noticeItem: any) {
    if (!noticeItem.chatId) {
      return
    }

    if (!noticeItem.crmItemId) {
      this.history?.push(`/${UserRoleCodeMapForRoutes[this.userInfo?.role]}/messages`, {
        chatId: noticeItem.chatId,
      })
    } else {
      switch (this.userInfo?.role) {
        case mapUserRoleEnumToKey[UserRole.CLIENT]:
          return this.history?.push(`/client/freelance/my-requests/custom-request?request-id=${noticeItem.crmItemId}`)

        case mapUserRoleEnumToKey[UserRole.FREELANCER]:
          return this.history?.push(
            `/freelancer/freelance/my-proposals/custom-search-request?request-id=${noticeItem.crmItemId}`,
          )

        default:
          return
      }
    }
  }

  clearSnackNoticeByKey(key: string) {
    SettingsModel.setSnackNotifications({ key, notice: null })
  }
}
