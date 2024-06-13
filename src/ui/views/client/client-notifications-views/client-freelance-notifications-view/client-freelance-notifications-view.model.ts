import { makeAutoObservable, makeObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { UserRole, UserRoleCodeMap } from '@constants/keys/user-roles'

import { DataGridTableModel } from '@models/data-grid-table-model'
import { TableSettingsModel } from '@models/table-settings'
import { UserModel } from '@models/user-model'

import { restApiService } from '@services/rest-api-service/rest-api-service'

import { loadingStatus } from '@typings/enums/loading-status'

import { clientFreelanceNotificationsColumns } from './client-freelance-notifications-columns'
import { observerConfig } from './observer-config'

export class ClientFreelanceNotificationsViewModel extends DataGridTableModel {
  constructor() {
    const rowHandlers = {
      onClickReplyBtn: (requestId: string, chatId: string) => this.onClickReply(requestId, chatId),
    }

    const columnsModel = clientFreelanceNotificationsColumns(rowHandlers)

    super({
      getMainDataMethod: restApiService.userApi.apiV1UsersInfoCountersGet,
      columnsModel,
      tableKey: DataGridTablesKeys.CLIENT_FREELANCE_NOTIFICATIONS,
    })

    this.initHistory()

    this.getDataGridState()

    this.getCurrentData()

    makeObservable(this, observerConfig)
  }

  // async getNotifications() {
  //   try {
  //     this.setRequestStatus(loadingStatus.IS_LOADING)
  //     const response = await restApiService.userApi.apiV1UsersInfoCountersGet()

  //     runInAction(() => {
  //       this.rowCount = response?.data?.freelanceNotices?.length
  //       this.notifications = response.data.freelanceNotices.map(el => {
  //         return {
  //           ...el.request,
  //           chatId: el.chatId,
  //           unreadMessages: el.unreadMessages,
  //         }
  //       })
  //     })

  //     this.setRequestStatus(loadingStatus.SUCCESS)
  //   } catch (error) {
  //     console.error(error)
  //     this.setRequestStatus(loadingStatus.FAILED)
  //   }
  // }

  async getCurrentData() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const result = await this.getMainDataMethod()
      const notifications = result?.data?.freelanceNotices

      runInAction(() => {
        this.currentData = notifications || []
        this.rowCount = notifications?.length || 0
      })

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)

      this.currentData = []
      this.rowCount = 0
    }
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
