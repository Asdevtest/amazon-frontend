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
      defaultSortModel: [{ field: 'unreadMessages', sort: 'desc' }],
    })
    makeObservable(this, observerConfig)

    this.getTableSettingsPreset()
  }

  onClickReply(requestId: string, chatId: string) {
    let url = ''
    // @ts-ignore
    if (UserRoleCodeMap[UserModel?.userInfo?.role] === UserRole.FREELANCER) {
      url = `/freelancer/freelance/my-proposals/custom-search-request?request-id=${requestId}&chatId=${chatId}`
    } else {
      url = `/client/freelance/my-requests/custom-request?request-id=${requestId}&chatId=${chatId}`
    }

    window?.open?.(url, '_blank')?.focus()
  }
}
