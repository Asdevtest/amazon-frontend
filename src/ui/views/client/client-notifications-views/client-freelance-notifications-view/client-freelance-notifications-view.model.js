import { makeAutoObservable, runInAction, toJS } from 'mobx'
import { clientFreelanceNotificationsColumns } from '@components/table/table-columns/client/client-freelance-notifications-columns/client-freelance-notifications-columns'
import { SettingsModel } from '@models/settings-model'
import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { restApiService } from '@services/rest-api-service/rest-api-service'
import { UserRole, UserRoleCodeMap, UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { UserModel } from '@models/user-model'

export class ClientFreelanceNotificationsViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined
  error = undefined
  loadingStatus = undefined

  sortModel = []
  filterModel = { items: [] }
  densityModel = 'compact'

  notifications = []

  rowHandlers = {
    onClickReplyBtn: (requestId, chatId) => this.onClickReply(requestId, chatId),
  }

  columnsModel = clientFreelanceNotificationsColumns(this.rowHandlers)
  columnVisibilityModel = {}

  paginationModel = { page: 0, pageSize: 15 }

  constructor({ history }) {
    runInAction(() => {
      this.history = history
      this.getDataGridState()
    })
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async loadData() {
    try {
      this.loadingStatus = loadingStatuses.isLoading
      const response = await restApiService.userApi.apiV1UsersInfoGet()
      runInAction(() => {
        this.notifications = response.freelanceNotices.map(el => {
          return {
            ...el.request,
            unreadMessages: el.unreadMessages,
          }
        })
      })
      this.loadingStatus = loadingStatuses.success
    } catch (error) {
      runInAction(() => {
        this.loadingStatus = loadingStatuses.failed
        this.error = error
      })
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

    runInAction(() => {
      if (state) {
        this.sortModel = toJS(state.sortModel)
        this.filterModel = toJS(state.filterModel)
        this.paginationModel = toJS(state.paginationModel)
        this.columnVisibilityModel = toJS(state.columnVisibilityModel)
      }
    })
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
    })

    this.setDataGridState()
  }

  onSelectionModel(model) {
    runInAction(() => {
      this.selectedRowIds = model
    })
  }

  getCurrentData() {
    return toJS(this.notifications)
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })

    this.setDataGridState()
  }

  onChangePaginationModelChange(model) {
    runInAction(() => {
      this.paginationModel = model
    })

    this.setDataGridState()
  }

  onColumnVisibilityModelChange(model) {
    runInAction(() => {
      this.columnVisibilityModel = model
    })
    this.setDataGridState()
  }

  onClickReply(requestId, chatId) {
    if (UserRoleCodeMap[UserModel.userInfo.role] === UserRole.FREELANCER) {
      this.history.push(`/freelancer/freelance/my-proposals/custom-search-request?request-id=${requestId}`, {
        chatId,
      })
    } else {
      this.history.push(`/client/freelance/vacant-requests/custom-search-request?request-id=${requestId}`, {
        chatId,
      })
    }
    // const win = window.open(
    //   `${window.location.origin}/client/inventory/product?product-id=${productId}&show-tab=ideas`,
    //   '_blank',
    // )
    //
    // win?.focus()
  }
}
