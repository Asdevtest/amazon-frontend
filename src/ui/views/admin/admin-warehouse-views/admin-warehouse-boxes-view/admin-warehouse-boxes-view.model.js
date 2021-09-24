import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'

import {BoxesModel} from '@models/boxes-model'
import {SettingsModel} from '@models/settings-model'

import {getObjectFilteredByKeyArrayBlackList} from '@utils/object'

export class AdminWarehouseBoxesViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  boxes = []

  drawerOpen = false
  selectedBoxes = ['2096c_box']
  modalSendOwnProduct = false
  modalEditBox = false
  selectionModel = undefined

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeSortingModel(e) {
    this.sortModel = e.sortModel
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e.pageSize
  }

  getCurrentData() {
    return toJS(this.boxes)
  }

  onSelectionModel(model) {
    this.selectionModel = model
  }

  setDataGridState(state) {
    SettingsModel.setDataGridState(state, DataGridTablesKeys.ADMIN_BOXES)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.ADMIN_BOXES]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter
      this.curPage = state.pagination.page
      this.rowsPerPage = state.pagination.pageSize
    }
  }

  async loadData() {
    try {
      this.requestStatus = loadingStatuses.isLoading
      await this.getBoxes()
      this.requestStatus = loadingStatuses.success
    } catch (error) {
      this.requestStatus = loadingStatuses.failed
      console.log(error)
    }
  }

  async getBoxes() {
    try {
      const result = await BoxesModel.getBoxes()
      runInAction(() => {
        this.boxes = result.map(user => ({
          ...getObjectFilteredByKeyArrayBlackList(user, ['_id']),
          id: user._id,
        }))
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onTriggerDrawer() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage(e) {
    this.curPage = e.page
  }

  onChangeRowsPerPage = e => {
    this.rowsPerPage = Number(e.target.value)
    this.curPage = 1
  }

  onTriggerCheckbox = boxId => {
    const updatedselectedBoxes = this.selectedBoxes.includes(boxId)
      ? this.selectedBoxes.filter(id => id !== boxId)
      : this.selectedBoxes.concat(boxId)
    this.selectedBoxes = updatedselectedBoxes
  }

  onTriggerModal(modalState) {
    this[modalState] = !this[modalState]
  }
}
