import { makeObservable } from 'mobx'

import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'

import { AdministratorModel } from '@models/administrator-model'
import { ChatModel } from '@models/chat-model'
import { ChatsModel } from '@models/chats-model'
import { DataGridTableModel } from '@models/data-grid-table-model'

import { IFeedback } from '@typings/models/administrators/feedback'

import { adminFeedbackConfig, fieldsForSearch, sortConfig } from './admin-feedback-view.config'
import { adminFeedbackViewColumns } from './admin-feedback.columns'

export class AdminFeedbackViewModel extends DataGridTableModel {
  showReplyFeedbackModal = false
  selectedFeedback?: IFeedback

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
      fieldsForSearch,
    })
    this.sortModel = sortConfig
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
