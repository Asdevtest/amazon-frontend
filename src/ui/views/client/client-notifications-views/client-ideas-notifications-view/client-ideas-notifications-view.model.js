import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { restApiService } from '@services/rest-api-service/rest-api-service'

import { ideasNotificationsViewColumns } from '@components/table/table-columns/overall/ideas-notifications-columns'

import { ideaNoticeDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'
// import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
import { getObjectFilteredByKeyArrayWhiteList } from '@utils/object'

export class ClientIdeasNotificationsViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined
  error = undefined
  loadingStatus = undefined

  ideas = []

  sortModel = []
  filterModel = { items: [] }
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  isArchived = false

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

    reaction(
      () => SettingsModel.languageTag,
      () => this.updateColumnsModel(),
    )
  }

  changeColumnsModel(newHideState) {
    runInAction(() => {
      this.columnsModel = this.columnsModel.map(el => ({
        ...el,
        hide: !!newHideState[el?.field],
      }))
    })
  }

  async handleArchive() {
    await this.getIdeas(!this.isArchived)
    this.isArchived = !this.isArchived
  }

  async updateColumnsModel() {
    if (await SettingsModel.languageTag) {
      this.getDataGridState()
    }
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })
  }

  setDataGridState(state) {
    const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
      'sorting',
      'filter',
      'pagination',
      'density',
      'columns',
    ])
    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.CLIENT_IDEAS_NOTIFICATIONS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_IDEAS_NOTIFICATIONS]

    if (state) {
      runInAction(() => {
        this.sortModel = state.sorting.sortModel
        this.filterModel = state.filter.filterModel
        this.rowsPerPage = state.pagination.pageSize

        this.densityModel = state.density.value
        this.columnsModel = ideasNotificationsViewColumns(this.rowHandlers).map(el => ({
          ...el,
          hide: state.columns?.lookup[el?.field]?.hide,
        }))
      })
    }
  }

  onChangeRowsPerPage(e) {
    runInAction(() => {
      this.rowsPerPage = e
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
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getDataGridState()

      await this.getIdeas()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
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
      console.log(error)
      runInAction(() => {
        this.error = error
        this.ideas = []
      })
    }
  }

  onClickViewBtn(productId) {
    const win = window.open(
      `${window.location.origin}/client/inventory/product?product-id=${productId}&show-tab=ideas`,
      '_blank',
    )

    win?.focus()
  }

  onChangeCurPage(e) {
    runInAction(() => {
      this.curPage = e
    })
  }

  setLoadingStatus(loadingStatus) {
    runInAction(() => {
      this.loadingStatus = loadingStatus
    })
  }
}
