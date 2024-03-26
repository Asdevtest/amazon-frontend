import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { restApiService } from '@services/rest-api-service/rest-api-service'

import { ideasNotificationsViewColumns } from '@components/table/table-columns/overall/ideas-notifications-columns'

import { ideaNoticeDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'

export class BuyerIdeasNotificationsViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined
  loadingStatus = undefined

  ideas = []

  sortModel = []
  filterModel = { items: [] }
  densityModel = 'compact'
  isArchived = false
  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  rowHandlers = {
    onClickViewBtn: productId => this.onClickViewBtn(productId),
  }
  columnsModel = ideasNotificationsViewColumns(this.rowHandlers)

  get userInfo() {
    return UserModel.userInfo
  }

  constructor({ history }) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })

    this.setDataGridState()
  }

  onPaginationModelChange(model) {
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

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.CLIENT_IDEAS_NOTIFICATIONS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_IDEAS_NOTIFICATIONS]

    runInAction(() => {
      if (state) {
        this.sortModel = toJS(state.sortModel)
        this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
        this.paginationModel = toJS(state.paginationModel)
        this.columnVisibilityModel = toJS(state.columnVisibilityModel)
      }
    })
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
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
    return toJS(this.ideas)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)
      this.getDataGridState()

      await this.getIdeas()
      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatuses.FAILED)
    }
  }

  async getIdeas(isArchived = false) {
    try {
      const result = await restApiService.ideaApi.apiV1IdeasNotificationsGet({ archive: isArchived })

      runInAction(() => {
        this.ideas = ideaNoticeDataConverter(result).sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt'))
      })
    } catch (error) {
      console.error(error)
      runInAction(() => {
        this.ideas = []
      })
    }
  }

  async handleArchive() {
    await this.getIdeas(!this.isArchived)
    this.isArchived = !this.isArchived
  }

  onClickViewBtn(productId) {
    const win = window.open(
      `${window.location.origin}/buyer/my-products/product?product-id=${productId}&show-tab=ideas`,
      '_blank',
    )

    win?.focus()
  }

  setLoadingStatus(loadingStatus) {
    runInAction(() => {
      this.loadingStatus = loadingStatus
    })
  }
}
