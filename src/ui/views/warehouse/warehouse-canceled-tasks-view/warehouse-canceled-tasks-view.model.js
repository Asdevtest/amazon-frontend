import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {mapTaskOperationTypeKeyToEnum, mapTaskOperationTypeToLabel} from '@constants/task-operation-type'
import {mapTaskStatusEmumToKey, TaskStatus} from '@constants/task-status'

import {SettingsModel} from '@models/settings-model'
import {StorekeeperModel} from '@models/storekeeper-model'

import {warehouseCanceledTasksViewColumns} from '@components/table-columns/warehouse/canceled-tasks-columns'

import {sortObjectsArrayByFiledDate} from '@utils/date-time'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'

export class WarehouseCanceledTasksViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  tasksMy = []
  curOpenedTask = {}

  drawerOpen = false

  rowHandlers = {
    setCurrentOpenedTask: item => this.setCurrentOpenedTask(item),
  }

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'standart'
  columnsModel = warehouseCanceledTasksViewColumns(this.rowHandlers)

  showTaskInfoModal = false

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

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.WAREHOUSE_CANCELED_TASKS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.WAREHOUSE_CANCELED_TASKS]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = warehouseCanceledTasksViewColumns(this.rowHandlers).map(el => ({
        ...el,
        hide: state.columns?.lookup[el?.field]?.hide,
      }))
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
    return toJS(this.tasksMy)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      await this.getTasksMy()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  setCurrentOpenedTask(item) {
    this.curOpenedTask = item
    this.onTriggerOpenModal('showTaskInfoModal')
  }

  onChangeTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage(e) {
    this.curPage = e
  }

  async getTasksMy() {
    try {
      const result = await StorekeeperModel.getTasksMy({
        status: mapTaskStatusEmumToKey[TaskStatus.NOT_SOLVED],
      })

      runInAction(() => {
        this.tasksMy = result
          .sort(sortObjectsArrayByFiledDate('updatedAt'))
          .map(el => ({...el, beforeBoxes: el.boxesBefore}))
          .map(order => ({
            ...order,
            id: order._id,
            tmpOperationType: mapTaskOperationTypeToLabel[mapTaskOperationTypeKeyToEnum[order.operationType]],
          }))
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
