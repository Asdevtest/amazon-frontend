import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {mapTaskStatusEmumToKey, TaskStatus} from '@constants/task-status'

import {SettingsModel} from '@models/settings-model'
import {StorekeeperModel} from '@models/storekeeper-model'

import {sortObjectsArrayByFiledDate} from '@utils/date-time'
import {getObjectFilteredByKeyArrayBlackList} from '@utils/object'

export class WarehouseCompletedViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  completedTasks = []
  curOpenedTask = {}

  drawerOpen = false

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15

  showTaskInfoModal = false

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  setDataGridState(state) {
    SettingsModel.setDataGridState(state, DataGridTablesKeys.WAREHOUSE_COMPLETED_TASKS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.WAREHOUSE_COMPLETED_TASKS]

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
    return toJS(this.completedTasks)
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

  async getTasksMy() {
    try {
      const result = await StorekeeperModel.getTasksMy()

      runInAction(() => {
        this.completedTasks = result
          .sort(sortObjectsArrayByFiledDate('updateDate'))
          .filter(task => task.status === mapTaskStatusEmumToKey[TaskStatus.SOLVED])
          .map(el => ({...el, beforeBoxes: el.boxesBefore}))
          .map(order => ({
            ...getObjectFilteredByKeyArrayBlackList(order, ['_id']),
            id: order._id,
          }))
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  setCurrentOpenedTask(item) {
    this.curOpenedTask = item
    this.onTriggerOpenModal('showTaskInfoModal')
  }

  onChangeTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage(e, value) {
    this.curPage = value
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
