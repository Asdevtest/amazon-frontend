import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {mapTaskStatusEmumToKey, TaskStatus} from '@constants/task-status'

import {SettingsModel} from '@models/settings-model'
import {StorekeeperModel} from '@models/storekeeper-model'

import {warehouseVacantTasksViewColumns} from '@components/table-columns/warehouse/vacant-tasks-columns'

import {warehouseTasksDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDate} from '@utils/date-time'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'

export class WarehouseVacantViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  tasksVacant = []

  drawerOpen = false
  selectedTask = undefined
  showWarningModal = false

  rowHandlers = {
    onClickPickupBtn: item => this.onClickPickupBtn(item),
  }

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'standart'
  columnsModel = warehouseVacantTasksViewColumns(this.rowHandlers)

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeFilterModel(model) {
    this.filterModel = model
  }

  setDataGridState(state) {
    const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
      'sorting',
      'filter',
      'pagination',
      'density',
      'columns',
    ])

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.WAREHOUSE_VACANT_TASKS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.WAREHOUSE_VACANT_TASKS]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = warehouseVacantTasksViewColumns(this.rowHandlers).map(el => ({
        ...el,
        hide: state.columns?.lookup[el?.field]?.hide,
      }))
    }
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e
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
    return toJS(this.tasksVacant)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      await this.getTasksVacant()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async onClickPickupBtn(item) {
    try {
      await StorekeeperModel.pickupTask(item._id)
      this.onTriggerOpenModal('showWarningModal')
      await this.getTasksVacant()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onChangeTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage(e) {
    this.curPage = e
  }

  async getTasksVacant() {
    try {
      const result = await StorekeeperModel.getTasksVacant()

      runInAction(() => {
        this.tasksVacant = warehouseTasksDataConverter(
          result
            .sort(sortObjectsArrayByFiledDate('updatedAt'))
            .filter(task => task.status === mapTaskStatusEmumToKey[TaskStatus.NEW])
            .map(el => ({...el, beforeBoxes: el.boxesBefore})),
        )
      })
    } catch (error) {
      console.log(error)
      this.error = error

      if (error.body.message === 'По данному запросу ничего не найдено.') {
        runInAction(() => {
          this.tasksVacant = []
        })
      }
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
