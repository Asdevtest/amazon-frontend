import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { UserRole, UserRoleCodeMap } from '@constants/keys/user-roles'
import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { restApiService } from '@services/rest-api-service/rest-api-service'

import { clientFreelanceNotificationsColumns } from '@components/table/table-columns/client/client-freelance-notifications-columns'

export class ClientFreelanceNotificationsViewModel {
  history = undefined
  requestStatus = undefined

  notifications = []

  rowCount = 0
  sortModel = []
  filterModel = { items: [] }
  densityModel = 'compact'
  columnVisibilityModel = {}
  paginationModel = { page: 0, pageSize: 15 }
  rowHandlers = {
    onClickReplyBtn: (requestId, chatId) => this.onClickReply(requestId, chatId),
  }
  columnsModel = clientFreelanceNotificationsColumns(this.rowHandlers)

  get currentData() {
    return this.notifications
  }

  constructor({ history }) {
    this.history = history

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  loadData() {
    try {
      this.getDataGridState()

      this.getNotifications()
    } catch (error) {
      console.log(error)
    }
  }

  async getNotifications() {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)
      const response = await restApiService.userApi.apiV1UsersInfoCountersGet()

      runInAction(() => {
        this.rowCount = response?.data?.freelanceNotices?.length
        this.notifications = response.data.freelanceNotices.map(el => {
          return {
            ...el.request,
            chatId: el.chatId,
            unreadMessages: el.unreadMessages,
          }
        })
      })

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.FAILED)
    }
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.CLIENT_FREELANCE_NOTIFICATIONS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_FREELANCE_NOTIFICATIONS]

    if (state) {
      this.sortModel = toJS(state.sortModel)
      this.filterModel = toJS(state.filterModel)
      this.paginationModel = toJS(state.paginationModel)
      this.columnVisibilityModel = toJS(state.columnVisibilityModel)
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel

    this.setDataGridState()
  }

  onSelectionModel(model) {
    this.selectedRowIds = model
  }

  onChangeFilterModel(model) {
    this.filterModel = model

    this.setDataGridState()
  }

  onPaginationModelChange(model) {
    this.paginationModel = model

    this.setDataGridState()
  }

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model

    this.setDataGridState()
  }

  onClickReply(requestId, chatId) {
    if (UserRoleCodeMap[UserModel.userInfo.role] === UserRole.FREELANCER) {
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
