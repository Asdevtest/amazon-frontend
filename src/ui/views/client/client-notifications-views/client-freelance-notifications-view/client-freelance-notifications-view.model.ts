import { makeObservable } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { UserRole, UserRoleCodeMap } from '@constants/keys/user-roles'

import { DataGridTableModel } from '@models/data-grid-table-model'
import { UserModel } from '@models/user-model'

import { clientFreelanceNotificationsColumns } from './client-freelance-notifications-columns'
import { observerConfig } from './observer-config'

export class ClientFreelanceNotificationsViewModel extends DataGridTableModel {
  constructor() {
    const rowHandlers = {
      onClickReplyBtn: (requestId: string, chatId: string) => this.onClickReply(requestId, chatId),
    }

    const columnsModel = clientFreelanceNotificationsColumns(rowHandlers)

    super({
      getMainDataMethod: UserModel.getUsersFreelanceNotices,
      columnsModel,
      tableKey: DataGridTablesKeys.CLIENT_FREELANCE_NOTIFICATIONS,
    })

    this.sortModel = [{ field: 'unreadMessages', sort: 'desc' }]

    this.initHistory()

    this.getDataGridState()

    this.getCurrentData()

    makeObservable(this, observerConfig)
  }

  onClickReply(requestId: string, chatId: string) {
    // @ts-ignore
    if (UserRoleCodeMap[UserModel?.userInfo?.role] === UserRole.FREELANCER) {
      this.history.push(`/freelancer/freelance/my-proposals/custom-search-request?request-id=${requestId}`, {
        chatId,
      })
    } else {
      this.history.push(`/client/freelance/my-requests/custom-request?request-id=${requestId}`, {
        chatId,
      })
    }
  }
}
