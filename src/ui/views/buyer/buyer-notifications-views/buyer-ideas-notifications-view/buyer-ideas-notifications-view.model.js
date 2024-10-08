import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'

import { TableSettingsModel } from '@models/table-settings'
import { UserModel } from '@models/user-model'

import { restApiService } from '@services/rest-api-service/rest-api-service'

import { ideasNotificationsViewColumns } from '@components/table/table-columns/overall/ideas-notifications-columns'

import { ideaNoticeDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'

import { loadingStatus } from '@typings/enums/loading-status'

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

    TableSettingsModel.saveTableSettings(requestState, DataGridTablesKeys.CLIENT_IDEAS_NOTIFICATIONS)
  }

  getDataGridState() {
    const state = TableSettingsModel.getTableSettings(DataGridTablesKeys.CLIENT_IDEAS_NOTIFICATIONS)

    if (state) {
      this.sortModel = toJS(state.sortModel)
      this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
      this.paginationModel = toJS(state.paginationModel)
      this.columnVisibilityModel = toJS(state.columnVisibilityModel)
    }
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
      this.setRequestStatus(loadingStatus.IS_LOADING)
      this.getDataGridState()

      await this.getIdeas()
      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
      if (error.body && error.body.message) {
        runInAction(() => {
          this.error = error.body.message
        })
      }
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
