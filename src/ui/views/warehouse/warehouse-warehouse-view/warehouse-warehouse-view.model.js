import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'

import {BoxesModel} from '@models/boxes-model'
import {SettingsModel} from '@models/settings-model'

import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
import {getObjectFilteredByKeyArrayBlackList} from '@utils/object'

export class WarehouseWarehouseViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  boxesMy = []

  drawerOpen = false

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  setDataGridState(state) {
    SettingsModel.setDataGridState(state, DataGridTablesKeys.WAREHOUSE_BOXES)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.WAREHOUSE_BOXES]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter
      this.curPage = state.pagination.page
      this.rowsPerPage = state.pagination.pageSize
    }
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e.pageSize
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeDrawerOpen(e, value) {
    this.drawerOpen = value
  }

  onChangeSortingModel(e) {
    this.sortModel = e.sortModel
  }

  onSelectionModel(model) {
    this.selectionModel = model
  }

  getCurrentData() {
    return toJS(this.boxesMy)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      await this.getBoxesMy()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  onTriggerDrawer() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage = (e, value) => {
    this.curPage = value
  }

  onChangeRowsPerPage = e => {
    this.rowsPerPage = Number(e.target.value)
    this.paginationPage = 1
  }

  async getBoxesMy() {
    try {
      const result = await BoxesModel.getBoxes()

      runInAction(() => {
        this.boxesMy = result.sort(sortObjectsArrayByFiledDateWithParseISO('createdAt')).map(user => ({
          ...getObjectFilteredByKeyArrayBlackList(user, ['_id']),
          id: user._id,
        }))
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }
}
