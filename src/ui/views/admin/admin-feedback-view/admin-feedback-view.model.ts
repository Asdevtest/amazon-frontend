import { makeObservable } from 'mobx'

import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'

import { AdministratorModel } from '@models/administrator-model'
import { ChatModel } from '@models/chat-model'
import { ChatsModel } from '@models/chats-model'
import { DataGridTableModel } from '@models/data-grid-table-model'
import { UserModel } from '@models/user-model'

import { IFeedback } from '@typings/models/administrators/feedback'
import { IFullUser } from '@typings/shared/full-user'

import { adminFeedbackConfig } from './admin-feedback-view.config'
import { adminFeedbackViewColumns } from './admin-feedback.columns'

export class AdminFeedbackViewModel extends DataGridTableModel {
  showReplyFeedbackModal = false
  selectedFeedback?: IFeedback

  get userInfo() {
    return UserModel.userInfo as unknown as IFullUser
  }
  get simpleChats() {
    return ChatModel.simpleChats
  }

  constructor() {
    const columnsProps = {
      onClickOpenFeedback: (row: IFeedback) => this.onClickOpenFeedback(row),
    }
    const columnsModel = adminFeedbackViewColumns(columnsProps)
    super({
      getMainDataMethod: AdministratorModel.getFeedback,
      columnsModel,
    })
    this.sortModel = [{ field: 'updatedAt', sort: 'desc' }]
    this.getCurrentData()
    this.initHistory()
    makeObservable(this, adminFeedbackConfig)
  }

  onClickOpenFeedback(feedback: IFeedback) {
    this.selectedFeedback = feedback
    this.onTriggerOpenModal('showReplyFeedbackModal')
  }

  async onClickWrite(id: string) {
    try {
      if (!this.simpleChats.some(el => el.users.map(e => e._id).includes(id))) {
        await ChatsModel.createSimpleChatByUserId(id)
      }

      this.history.push(`/${UserRoleCodeMapForRoutes[this.userInfo.role]}/messages`, {
        id,
      })
    } catch (e) {
      console.error(e)
    }
  }
}
